from django.shortcuts import render, get_object_or_404
from django.views import generic
from .models import Post


# Create your views here.
class PostList(generic.ListView):
    queryset = Post.objects.all()
    template_name = "post_list.html"
    template_name = "index.html"
    paginate_by = 6


def post_detail(request, slug):

    queryset = Post.objects.filter(status=1)
    post = get_object_or_404(queryset, slug=slug)
    comments = post.comments.all().order_by("-created_on")
    comment_count = post.comments.filter(approved=True).count()

    return render(
        request,
        "blog/post_detail.html",
        {
            "post": post,
            "comments": comments,
            "comment_count": comment_count,
        },
    )


def recipes_6_months(request):
    posts = Post.objects.filter(age_group="6_months", status=1)
    return render(request, "recipes/6_months.html", {"posts": posts})


def recipes_8_months(request):
    posts = Post.objects.filter(age_group="8_months", status=1)
    return render(request, "recipes/8_months.html")


def recipes_10_months(request):
    posts = Post.objects.filter(age_group="10_months", status=1)
    return render(request, "recipes/10_months.html")

def recipes_12_months(request):
    posts = Post.objects.filter(age_group="12_months", status=1)
    return render(request, "recipes/12_months.html")
