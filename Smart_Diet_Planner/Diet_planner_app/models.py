from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Step 1
    age = models.PositiveIntegerField(null=True, blank=True)
    height = models.FloatField(null=True, blank=True)
    height_unit = models.CharField(max_length=10, default="cm")  # cm or in
    gender = models.CharField(max_length=10, choices=[("Male", "Male"), ("Female", "Female")], null=True, blank=True)
    current_weight = models.FloatField(null=True, blank=True)
    target_weight = models.FloatField(null=True, blank=True)
    weight_unit = models.CharField(max_length=10, default="kg")  # kg or lb

    # Step 2
    food_allergies = models.CharField(max_length=255, blank=True)  # Comma-separated values
    cooking_skill = models.CharField(max_length=20, choices=[
        ("Beginner", "Beginner"), ("Intermediate", "Intermediate"), ("Advanced", "Advanced")
    ], null=True, blank=True)
    budget = models.CharField(max_length=30, choices=[
        ("Low", "Low"), ("Mid", "Mid"), ("No restrictions", "No restrictions")
    ], null=True, blank=True)
    physical_activity = models.CharField(max_length=20, choices=[
        ("Sedentary", "Sedentary"), ("Light", "Light"), ("Moderate", "Moderate"), ("Active", "Active")
    ], null=True, blank=True)
    include_exercise = models.BooleanField(default=False)

    # Step 3
    meal_prep_time = models.CharField(max_length=30, blank=True)
    meals_per_day = models.CharField(max_length=20, blank=True)
    cooking_frequency = models.CharField(max_length=50, blank=True)
    commitment_duration = models.CharField(max_length=100, blank=True)

    # Step 4
    additional_info = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.first_name}'s Profile"
