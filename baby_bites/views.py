from django.shortcuts import render, get_object_or_404, redirect
from django.views import generic
from django.contrib.auth.models import User
from .models import Post
from .forms import CommentForm


class PostList(generic.ListView):
    queryset = Post.objects.filter(status=1).order_by("-created_on")
    template_name = "index.html"
    paginate_by = 6


def post_detail(request, slug):
    queryset = Post.objects.filter(status=1)
    post = get_object_or_404(queryset, slug=slug)
    comments = post.comments.filter(approved=True).order_by("-created_on")
    comment_count = comments.count()

    if request.method == "POST":
        comment_form = CommentForm(data=request.POST)
        if comment_form.is_valid():
            comment = comment_form.save(commit=False)
            comment.post = post
            comment.author = request.user
            comment.save()
            return redirect("post_detail", slug=slug)
    else:
        comment_form = CommentForm()

    return render(
        request,
        "blog/post_detail.html",
        {
            "post": post,
            "comments": comments,
            "comment_count": comment_count,
            "comment_form": comment_form,
        },
    )


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

