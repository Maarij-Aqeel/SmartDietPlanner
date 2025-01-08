from django.db import models

class Recipe(models.Model):
    recipe_name = models.CharField(max_length=255, null=False, blank=False)
    cook_time = models.DurationField(null=True, blank=True)
    prep_time = models.DurationField(null=True, blank=True)
    total_time = models.DurationField(null=True, blank=True)
    ingredients = models.TextField(null=True, blank=True)
    calories = models.FloatField(null=True, blank=True)
    fat = models.FloatField(null=True, blank=True)
    saturated_fat = models.FloatField(null=True, blank=True)
    cholesterol = models.FloatField(null=True, blank=True)
    sodium = models.FloatField(null=True, blank=True)
    carbohydrate = models.FloatField(null=True, blank=True)
    fiber = models.FloatField(null=True, blank=True)
    sugar = models.FloatField(null=True, blank=True)
    protein = models.FloatField(null=True, blank=True)
    instructions = models.TextField(null=True, blank=True)
    type = models.CharField(max_length=50, null=True, blank=True)
    cuisine = models.CharField(max_length=100, null=True, blank=True)
    image = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.recipe_name