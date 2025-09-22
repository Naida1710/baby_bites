from . import views
from django.urls import path, include

urlpatterns = [
    path('', views.PostList.as_view(), name='home'),
    path('recipes/6-months/', views.recipes_6_months, name='recipes_6_months'),
    path('recipes/8-months/', views.recipes_8_months, name='recipes_8_months'),
    path('recipes/10-months/', views.recipes_10_months, name='recipes_10_months'),
    path('recipes/12-months/', views.recipes_12_months, name='recipes_12_months'),
    path('post<slug:slug>/', views.post_detail, name='post_detail'),
    path('<slug:slug>/edit_comment/<int:comment_id>',
         views.comment_edit, name='comment_edit'),
    path('<slug:slug>/delete_comment/<int:comment_id>',
         views.comment_delete, name='comment_delete'),
    path('about/', include('about.urls')),
    path('recipes/', views.recipe_list, name='recipe_list'),
]
