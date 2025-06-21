from django.db import models
import ast

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
    image = models.ImageField(upload_to='recipes/', blank=True, null=True)


    
    def get_instructions_list(self):
        try:
            if self.instructions.startswith("c("):  # R-style vector
                cleaned = self.instructions.replace('c(', '').rstrip(')').strip()
                return [i.strip('" ').strip() for i in cleaned.split('",')]
            return ast.literal_eval(self.instructions)  
        except Exception:
            return [self.instructions] if self.instructions else []


    def get_ingredients_list(self):
        if not self.ingredients:
            return []
        try:
            # converting to list
            cleaned = self.ingredients.strip()
            if cleaned.startswith("c("):
                cleaned = cleaned[2:-1]
            items = ast.literal_eval(f"[{cleaned}]")
            return [item.capitalize() for item in items]
        except Exception:
            return [self.ingredients]  
    def __str__(self):
        return self.recipe_name