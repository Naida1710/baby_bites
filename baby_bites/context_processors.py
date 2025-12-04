from .models import Post

def pending_recipe_count(request):
    if request.user.is_authenticated:
        if request.user.username == "Mama":
            # Count all pending recipes from all users
            count = Post.objects.filter(approved=False).count()
        else:
            # Count only the current user's pending recipes
            count = Post.objects.filter(author=request.user, approved=False).count()
        return {"pending_recipe_count": count}
    return {"pending_recipe_count": 0}
