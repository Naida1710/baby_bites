from django.shortcuts import render, get_object_or_404, reverse
from django.shortcuts import render, get_object_or_404, redirect
from .models import About
from django.views import generic
from django.contrib.auth.models import User
from .models import Post, Comment
from django.contrib import messages
from .forms import CommentForm
from .forms import CollaborateForm
from django.http import HttpResponseRedirect
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required
from .models import Post
from .models import Recipe
from .forms import PostForm
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.db import models
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.admin.views.decorators import staff_member_required



@login_required
def create_post(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user

            # Only admin/staff recipes are automatically approved
            if request.user.is_staff or request.user.is_superuser:
                post.approved = True
                messages.success(request, 'Your recipe has been posted successfully and is live.')
            else:
                post.approved = False
                messages.info(request, 'Your recipe has been submitted and is awaiting admin approval.')

            post.save()
            return redirect("home")
    else:
        form = PostForm()

    return render(request, 'baby_bites/create_post.html', {'form': form})


def send_mail_page(request):
    context = {}

    if request.method == 'POST':
        address = request.POST.get('address')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        if address and subject and message:
            try:
                send_mail(subject, message, settings.EMAIL_HOST_USER, [address])
                context['result'] = 'Email sent successfully'
            except Exception as e:
                context['result'] = f'Error sending email: {e}'
        else:
            context['result'] = 'All fields are required'
    
    return render(request, "index.html", context)

@login_required
def my_recipes(request):
    if request.user.username == "Mama":
        # Mama only sees pending recipes from all users
        pending_posts = Post.objects.filter(approved=False).order_by('-created_on')

        return render(request, 'baby_bites/my_recipes.html', {
            'pending_posts': pending_posts,
            'is_mama': True,
        })
    else:
        # Regular users see their own pending and approved recipes
        user_posts = Post.objects.filter(author=request.user).order_by('-created_on')
        pending_posts = user_posts.filter(approved=False)
        approved_posts = user_posts.filter(approved=True)

        return render(request, 'baby_bites/my_recipes.html', {
            'pending_posts': pending_posts,
            'approved_posts': approved_posts,
            'is_mama': False,
        })

@login_required
def my_pending_recipes(request):
    recipes = Post.objects.filter(author=request.user, approved=False).order_by('-created_on')
    return render(request, 'baby_bites/my_recipes_list.html', {
        'recipes': recipes,
        'title': 'Pending Recipes'
    })

@login_required
def my_approved_recipes(request):
    recipes = Post.objects.filter(author=request.user, approved=True).order_by('-created_on')
    return render(request, 'baby_bites/my_recipes_list.html', {
        'recipes': recipes,
        'title': 'Approved Recipes'
    })


def recipe_list(request):
    posts = Post.objects.all()  # Query to get all the posts
    return render(request, 'recipes/all_recipes.html', {'posts': posts})

@login_required
def comment_edit(request, slug, comment_id):
    if request.method == "POST":
        post = get_object_or_404(Post, slug=slug, approved=True)
        comment = get_object_or_404(Comment, pk=comment_id)

        if comment.author != request.user:
            return JsonResponse({'success': False, 'message': "You can only edit your own comments!"})

        body = request.POST.get("body", "").strip()
        if body:
            comment.body = body
            comment.edited = True
            comment.edited_on = timezone.now()
            comment.save()
            return JsonResponse({
                'success': True,
                'body': comment.body,
                'edited_on': comment.edited_on.strftime("%d %b %Y %H:%M")
            })
        else:
            return JsonResponse({'success': False, 'message': "Comment cannot be empty!"})

    return JsonResponse({'success': False, 'message': "Invalid request"})


@login_required
def comment_delete(request, slug, comment_id):
    """
    View to delete a comment immediately by the author.
    """
    comment = get_object_or_404(Comment, pk=comment_id)
    post = get_object_or_404(Post, slug=slug)

    if comment.author != request.user:
        messages.error(request, "You can only delete your own comments!")
        return redirect('post_detail', slug=slug)

    comment.delete()
    messages.success(request, "Comment deleted successfully!")
    return redirect('post_detail', slug=slug)


    # Your logic here
    return render(request, 'index.html')

@login_required
def toggle_like(request, pk):
    post = get_object_or_404(Post, pk=pk)
    user = request.user

    if user.is_authenticated:
        if user in post.likes.all():
            post.likes.remove(user)
        else:
            post.likes.add(user)

        # Check if it's an AJAX request
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            html = render_to_string('partials/like_button.html',
                                     {'post': post, 'user': user})
            return JsonResponse({'html': html})

    return redirect('post_detail', slug=post.slug)


def about_view(request):
    if request.method == "POST":
        collaborate_form = CollaborateForm(data=request.POST)
        if collaborate_form.is_valid():
            collaborate_form.save()
            messages.add_message(request, messages.SUCCESS, "Collaboration request received! I endeavour to respond within 2 working days.")

    about = About.objects.all().order_by('-updated_on').first()
    collaborate_form = CollaborateForm()

    return render(
        request,
        "baby_bites/about.html",
        {
            "about": about,
            "collaborate_form": collaborate_form
        },
    )


def home(request):
    return render(request, 'baby_bites/home.html')


class PostList(generic.ListView):
    model = Post
    template_name = "baby_bites/post_list.html"
    paginate_by = 6
    context_object_name = 'posts'

    def get_queryset(self):
        order = self.request.GET.get('order', 'latest')  # default to latest
        qs = Post.objects.filter(approved=True)
        if order == 'earliest':
            return qs.order_by('created_on')
        return qs.order_by('-created_on')


def post_detail(request, slug):
    queryset = Post.objects.all()
    post = get_object_or_404(queryset, slug=slug)
    comments = post.comments.filter(approved=True).order_by("-created_on")
    comment_count = comments.count()

    if request.method == "POST":
        if not request.user.is_authenticated:
            messages.error(request, "You must be logged in to comment.")
            return redirect("account_login")

        comment_form = CommentForm(data=request.POST)
        if comment_form.is_valid():
            comment = comment_form.save(commit=False)
            comment.post = post
            comment.author = request.user
            comment.approved = True  # ✅ Automatically approve
            comment.save()
            messages.success(request, "Your comment was posted successfully.")
            return redirect(f"{reverse('post_detail', kwargs={'slug': slug})}#message-container")
    else:
        comment_form = CommentForm()

    return render(
        request,
        "baby_bites/post_detail.html",
        {
            "post": post,
            "comments": comments,
            "comment_count": comment_count,
            "comment_form": comment_form,
        },
    )

@staff_member_required
def approve_recipe(request, recipe_id):
    recipe = get_object_or_404(Recipe, id=recipe_id)
    recipe.status = 'approved'
    recipe.save()
    return redirect('admin_pending_recipes')

# views.py
def recipe_list(request):
    order = request.GET.get('order', 'latest')
    post_list = Post.objects.filter(approved=True)

    if order == 'earliest':
        post_list = post_list.order_by('created_on')
    else:  # latest by default
        post_list = post_list.order_by('-created_on')

    paginator = Paginator(post_list, 6)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        'posts': page_obj,
        'is_paginated': page_obj.has_other_pages(),
        'page_obj': page_obj,
        'paginator': paginator,
    }
    return render(request, 'baby_bites/post_list.html', context)

@login_required
def profile_page(request):
    user = get_object_or_404(User, pk=request.user.pk)
    comments = user.commenter.all()
    return render(request, "your_template.html", {"comments": comments})


def recipes_6_months(request):
    order = request.GET.get('order', 'latest')

    recipes = Post.objects.filter(age_group="6_months", approved=True)

    if order == 'earliest':
        recipes = recipes.order_by('created_on')
    else:
        recipes = recipes.order_by('-created_on')

    return render(request, "recipes/6_months.html", {
        "recipes": recipes,
        "order": order,
    })


def recipes_8_months(request):
    order = request.GET.get('order', 'latest')

    recipes = Post.objects.filter(age_group="8_months", approved=True)

    if order == 'earliest':
        recipes = recipes.order_by('created_on')
    else:
        recipes = recipes.order_by('-created_on')

    return render(request, "recipes/8_months.html", {
        "recipes": recipes,
        "order": order,
    })


def recipes_10_months(request):
    order = request.GET.get('order', 'latest')

    recipes = Post.objects.filter(age_group="10_months", approved=True)

    if order == 'earliest':
        recipes = recipes.order_by('created_on')
    else:
        recipes = recipes.order_by('-created_on')

    return render(request, "recipes/10_months.html", {
        "recipes": recipes,
        "order": order,
    })

def recipes_12_months(request):
    order = request.GET.get('order', 'latest')

    recipes = Post.objects.filter(age_group="12_months", approved=True)

    if order == 'earliest':
        recipes = recipes.order_by('created_on')
    else:
        recipes = recipes.order_by('-created_on')

    return render(request, "recipes/12_months.html", {
        "recipes": recipes,
        "order": order,
    })