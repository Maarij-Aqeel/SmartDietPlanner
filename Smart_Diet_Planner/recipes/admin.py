from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Recipe

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = (
        'recipe_name', 'cook_time', 'prep_time', 'total_time',
        'ingredients', 'calories', 'fat', 'saturated_fat', 'cholesterol',
        'sodium', 'carbohydrate', 'fiber', 'sugar', 'protein',
        'type', 'cuisine', 'image'
    )
    search_fields = ('recipe_name', 'type', 'cuisine')
    list_filter = ('type', 'cuisine')
    readonly_fields = ('calories', 'fat', 'protein', 'carbohydrate', 'fiber', 'sugar')
    fieldsets = (
        ('Basic Information', {
            'fields': ('recipe_name', 'type', 'cuisine', 'image')
        }),
        ('Time Information', {
            'fields': ('prep_time', 'cook_time', 'total_time')
        }),
        ('Nutritional Information', {
            'fields': ('calories', 'fat', 'protein', 'carbohydrate', 'fiber', 'sugar')
        }),
        ('Instructions', {
            'fields': ('ingredients', 'instructions')
        }),
    )
