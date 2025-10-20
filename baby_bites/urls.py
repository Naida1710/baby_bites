from django.urls import path, include
from . import views
from allauth.account.views import LoginView

urlpatterns = [
    path('', views.PostList.as_view(), name='home'),  # or views.index, pick one
    path('recipes/all/', views.all_recipes, name='all_recipes'),

    path('recipes/', views.recipe_list, name='recipe_list'),  # Make sure this view exists
    path('recipes/6-months/', views.recipes_6_months, name='recipes_6_months'),
    path('recipes/8-months/', views.recipes_8_months, name='recipes_8_months'),
    path('recipes/10-months/', views.recipes_10_months, name='recipes_10_months'),
    path('recipes/12-months/', views.recipes_12_months, name='recipes_12_months'),
    path('recipes/<slug:slug>/', views.post_detail, name='post_detail'),  # post detail under recipes/
    path('<slug:slug>/edit_comment/<int:comment_id>/', views.comment_edit, name='comment_edit'),
    path('<slug:slug>/delete_comment/<int:comment_id>/', views.comment_delete, name='comment_delete'),
    path('about/', include('about.urls')),
    path('accounts/login/', LoginView.as_view(), name='account_login'),
    path('post/<int:pk>/like/', views.toggle_like, name='toggle_like'),
    path('create/', views.create_post, name='create_post'),
]

