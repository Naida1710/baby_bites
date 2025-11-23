from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField
from ckeditor.fields import RichTextField
from django.utils.text import slugify

AGE_GROUP_CHOICES = [
        ('6_months', '6 Months'),
        ('8_months', '8 Months'),
        ('10_months', '10 Months'),
        ('12_months', '12 Months'),
    ]

class About(models.Model):
    title = models.CharField(max_length=200, unique=True)
    profile_image = CloudinaryField('image', default='placeholder')
    updated_on = models.DateTimeField(auto_now=True)
    content = models.TextField()
    content = RichTextField()

    def __str__(self):
        return self.title


class Post(models.Model):
    
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="blog_posts"
    )
    featured_image = CloudinaryField('image', default='placeholder')
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)

    excerpt = models.TextField(blank=True)
    updated_on = models.DateTimeField(auto_now=True)
    age_group = models.CharField(max_length=20, choices=AGE_GROUP_CHOICES, default="6_months")
    likes = models.ManyToManyField(User, related_name='post_likes', blank=True)
    approved = models.BooleanField(default=False)



    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1
            # Check for duplicates and add a suffix if needed
            while Post.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)



    def total_likes(self):
        return self.likes.count()

    def __str__(self):
        return self.title


class CollaborateRequest(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"Request from {self.name}"


class Recipe(models.Model):
    AGE_GROUP_CHOICES = [
        ('6_months', '6 Months'),
        ('8_months', '8 Months'),
        ('10_months', '10 Months'),
        ('12_months', '12 Months'),
    ]

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]
  

    title = models.CharField(max_length=200)
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    age_group = models.CharField(max_length=20, choices=AGE_GROUP_CHOICES, default='6_months')
    approved = models.BooleanField(default=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending')

    featured_image = CloudinaryField('image', default='placeholder')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title



class Comment(models.Model):
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="comments"
    )
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="commenter"
    )
    body = models.TextField()
    approved = models.BooleanField(default=False)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_on"]

    def __str__(self):
        return f"Comment {self.body} by {self.author}"
