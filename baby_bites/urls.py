from django.urls import path, include
from . import views
from .views import home
from allauth.account.views import LoginView

urlpatterns = [
    path('', views.PostList.as_view(), name='home'),
    path('recipes/6-months/', views.recipes_6_months, name='recipes_6_months'),
    path('recipes/8-months/', views.recipes_8_months, name='recipes_8_months'),
    path('recipes/10-months/', views.recipes_10_months, name='recipes_10_months'),
    path('recipes/12-months/', views.recipes_12_months, name='recipes_12_months'),
    path('post/<slug:slug>/', views.post_detail, name='post_detail'),  # Added missing slash before <slug>
    path('<slug:slug>/edit_comment/<int:comment_id>/', views.comment_edit, name='comment_edit'),  # Added missing trailing slash
    path('<slug:slug>/delete_comment/<int:comment_id>/', views.comment_delete, name='comment_delete'),  # Added missing trailing slash
    path('about/', include('about.urls')),
    path('recipes/', views.recipe_list, name='recipe_list'),
    path('accounts/login/', LoginView.as_view(), name='account_login'),
    path('post/<int:pk>/like/', views.toggle_like, name='toggle_like'),
]