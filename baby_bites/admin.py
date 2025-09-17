from django.contrib import admin
from .models import Post, Comment
from django.contrib import admin
from .models import About, CollaborateRequest
from django_summernote.admin import SummernoteModelAdmin


@admin.register(Post)
class PostAdmin(SummernoteModelAdmin):

    list_display = ('title', 'slug', 'status', 'created_on')
    search_fields = ['title' 'content']
    list_filter = ('status', 'created_on')
    prepopulated_fields = {'slug': ('title',)}
    summernote_fields = ('content',)


@admin.register(About)
class AboutAdmin(SummernoteModelAdmin):
    summernote_fields = ('content',)


@admin.register(CollaborateRequest)
class CollaborateRequestAdmin(admin.ModelAdmin):

    list_display = ('message', 'read',)


# Register your models here.
admin.site.register(Comment)
