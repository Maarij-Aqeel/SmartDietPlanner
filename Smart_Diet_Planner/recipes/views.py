from django.shortcuts import render, get_object_or_404
from .models import Recipe

def recipe_view(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    return render(request, 'recipes/recipe_details.html', {'recipe': recipe})
