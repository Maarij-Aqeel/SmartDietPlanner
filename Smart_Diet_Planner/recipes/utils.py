from rest_framework import serializers
from .models import Recipe

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe 
        fields = '__all__'

def get_recipes_data():
    recipes = Recipe.objects.all()
    serializer = RecipeSerializer(recipes, many=True)
    return serializer.data 