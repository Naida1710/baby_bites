from django.urls import path, include
from . import views
from allauth.account.views import LoginView
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from .views import CustomPasswordResetView 

urlpatterns = [
    path('', views.PostList.as_view(), name='home'),
    path('all-recipes/', views.recipe_list, name='all_recipes'),
    path('recipes/', views.recipe_list, name='recipe_list'),
    path('recipes/6-months/', views.recipes_6_months, name='recipes_6_months'),
    path('recipes/8-months/', views.recipes_8_months, name='recipes_8_months'),
    path('recipes/10-months/', views.recipes_10_months, name='recipes_10_months'),
    path('recipes/12-months/', views.recipes_12_months, name='recipes_12_months'),
    path('recipes/<slug:slug>/edit_comment/<int:comment_id>/', views.comment_edit, name='comment_edit'),
    path('recipes/<slug:slug>/delete_comment/<int:comment_id>/', views.comment_delete, name='comment_delete'),
    path('recipes/<slug:slug>/', views.post_detail, name='post_detail'),
    path('reset_password/', CustomPasswordResetView.as_view(), name='password_reset'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(
        template_name='account/password_reset_confirm.html',
        success_url='/reset_password_complete/'
    ), name='password_reset_confirm'),
    path("my-recipes/", views.my_recipes, name="my_recipes"),
    path('my-recipes/pending/', views.my_pending_recipes, name='my_pending_recipes'),
    path('my-recipes/approved/', views.my_approved_recipes, name='my_approved_recipes'),
    path('about/', views.about_view, name='about'),
    path('post/<int:pk>/like/', views.toggle_like, name='toggle_like'),
    path('create/', views.create_post, name='create_post'),
    path('', views.send_mail_page),
    path('accounts/login/', LoginView.as_view(), name='account_login'),
     
]

# Only in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)