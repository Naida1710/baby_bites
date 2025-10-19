from django.shortcuts import render, get_object_or_404, reverse
from django.shortcuts import render, get_object_or_404, redirect

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


def create_post(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)  # Don't save yet
            post.author = request.user      # Set the author to the logged-in user
            post.save()                    # Now save
            return redirect('post_detail', slug=post.slug)
    else:
        form = PostForm()
    return render(request, 'create_post.html', {'form': form})

    

def comment_edit(request, slug, comment_id):
    """
    view to edit comments
    """
    if request.method == "POST":

        queryset = Post.objects.filter(status=1)
        post = get_object_or_404(queryset, slug=slug)
        comment = get_object_or_404(Comment, pk=comment_id)
        comment_form = CommentForm(data=request.POST, instance=comment)

        if comment_form.is_valid() and comment.author == request.user:
            comment = comment_form.save(commit=False)
            comment.post = post
            comment.approved = False
            comment.save()
            messages.add_message(request, messages.SUCCESS, 'Comment Updated!')
        else:
            messages.add_message(request, messages.ERROR, 'Error updating comment!')

    return HttpResponseRedirect(reverse('post_detail', args=[slug]))


def comment_delete(request, slug, comment_id):
    """
    view to delete comment
    """
    queryset = Post.objects.filter(status=1)
    post = get_object_or_404(queryset, slug=slug)
    comment = get_object_or_404(Comment, pk=comment_id)

    if comment.author == request.user:
        comment.delete()
        messages.add_message(request, messages.SUCCESS, 'Comment deleted!')
    else:
        messages.add_message(request, messages.ERROR, 'You can only delete your own comments!')

    return HttpResponseRedirect(reverse('post_detail', args=[slug]))

def index(request):
    # Your logic here
    return render(request, 'index.html')

def toggle_like(request, pk):
    post = get_object_or_404(Post, pk=pk)
    user = request.user
    if user.is_authenticated:
        if user in post.likes.all():
            post.likes.remove(user)
        else:
            post.likes.add(user)
    return redirect('post_detail', slug=post.slug)



def about_me(request):
    if request.method == "POST":
        collaborate_form = CollaborateForm(data=request.POST)
        if collaborate_form.is_valid():
            collaborate_form.save()
            messages.add_message(request, messages.SUCCESS, "Collaboration request received! I endeavour to respond within 2 working days.")

    about = About.objects.all().order_by('-updated_on').first()
    collaborate_form = CollaborateForm()

    return render(
        request,
        "about/about.html",
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
        if order == 'earliest':
            return Post.objects.filter(status=1).order_by('created_on')
        return Post.objects.filter(status=1).order_by('-created_on')


def post_detail(request, slug):
    queryset = Post.objects.filter(status=1)
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
            return redirect("post_detail", slug=slug)
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


# views.py
def recipe_list(request):
    order = request.GET.get('order', 'latest')
    if order == 'earliest':
        post_list = Post.objects.all().order_by('created_on')
    else:  # latest by default
        post_list = Post.objects.all().order_by('-created_on')

    paginator = Paginator(post_list, 10)  # Show 10 posts per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    context = {
        'posts': page_obj,
        'is_paginated': page_obj.has_other_pages(),
        'page_obj': page_obj,
        'paginator': paginator,
    }
    return render(request, 'baby_bites/post_list.html', context)

def profile_page(request):
    user = get_object_or_404(User, pk=request.user.pk)
    comments = user.commenter.all()
    return render(request, "your_template.html", {"comments": comments})


def recipes_6_months(request):
    posts = Post.objects.filter(age_group="6_months", status=1)
    return render(request, "recipes/6_months.html", {"posts": posts})


def recipes_8_months(request):
    posts = Post.objects.filter(age_group="8_months", status=1)
    return render(request, "recipes/8_months.html", {"posts": posts})


def recipes_10_months(request):
    posts = Post.objects.filter(age_group="10_months", status=1)
    return render(request, "recipes/10_months.html", {"posts": posts})


def recipes_12_months(request):
    posts = Post.objects.filter(age_group="12_months", status=1)
    return render(request, "recipes/12_months.html", {"posts": posts})
