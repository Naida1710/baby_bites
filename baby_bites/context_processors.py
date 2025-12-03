from .models import Post

def pending_recipe_count(request):
    if request.user.is_authenticated:
        return {
            "pending_recipe_count": Post.objects.filter(author=request.user, approved=False).count()
        }
    return {"pending_recipe_count": 0}
