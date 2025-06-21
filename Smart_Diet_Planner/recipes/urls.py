from django.urls import path
from . import views

urlpatterns = [
    path('detail/<int:pk>/', views.recipe_view, name='recipe_detail'),

]