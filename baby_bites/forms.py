from django import forms
from .models import Post, Comment, CollaborateRequest
from ckeditor.widgets import CKEditorWidget


class CollaborateForm(forms.ModelForm):
    class Meta:
        model = CollaborateRequest
        fields = ('name', 'email', 'message')


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['body']
        widgets = {
            'body': forms.Textarea(attrs={'id': 'id_body', 'class': 'form-control', 'placeholder': 'Write your comment...'}),
        }

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content', 'featured_image', 'excerpt', 'age_group']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'excerpt': forms.Textarea(attrs={'class': 'form-control'}),
            'content': CKEditorWidget(),
            'age_group': forms.Select(attrs={'class': 'form-select'}),
            
        }
