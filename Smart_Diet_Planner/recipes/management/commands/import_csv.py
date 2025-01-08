import pandas as pd
import numpy as np
from recipes.models import Recipe
from django.core.management.base import BaseCommand
from django.core.exceptions import ValidationError
import os


class Command(BaseCommand):
    help = "Import recipes from a CSV file"

    def add_arguments(self, parser):
        parser.add_argument(
            'csv_file',
            type=str,
            help="Path to the CSV file containing recipes",
        )

    def handle(self, *args, **options):
        command_folder = os.path.dirname(__file__)
        csv_file_name = options['csv_file']
        csv_file_path = os.path.join(command_folder, csv_file_name)

        if not os.path.exists(csv_file_path):
            self.stdout.write(self.style.ERROR(f"CSV file not found at {csv_file_path}"))
            return

        # Load data with pandas
        df = pd.read_csv(csv_file_path)

        for index, row in df.iterrows():
            existing_recipe = Recipe.objects.filter(recipe_name=row.get('recipe_name')).first()

            if existing_recipe:
                self.stdout.write(
                    self.style.WARNING(f"[{index + 1}] Recipe '{row.get('recipe_name')}' already exists. Skipping."))
                continue

            try:
                # Handle cook_time specifically for null values
                cook_time_value = row.get('cook_time')
                cook_time = None if pd.isna(cook_time_value) else str(cook_time_value)

                # Handle prep_time and total_time similarly
                prep_time_value = row.get('prep_time')
                prep_time = None if pd.isna(prep_time_value) else str(prep_time_value)

                total_time_value = row.get('total_time')
                total_time = None if pd.isna(total_time_value) else str(total_time_value)

                recipe = Recipe(
                    recipe_name=row.get('recipe_name'),
                    cook_time=cook_time,
                    prep_time=prep_time,
                    total_time=total_time,
                    ingredients=row.get('ingredients'),
                    calories=float(row['calories']) if pd.notna(row.get('calories')) else None,
                    fat=float(row['fat']) if pd.notna(row.get('fat')) else None,
                    saturated_fat=float(row['saturated_fat']) if pd.notna(row.get('saturated_fat')) else None,
                    cholesterol=float(row['cholesterol']) if pd.notna(row.get('cholesterol')) else None,
                    sodium=float(row['sodium']) if pd.notna(row.get('sodium')) else None,
                    carbohydrate=float(row['carbohydrate']) if pd.notna(row.get('carbohydrate')) else None,
                    fiber=float(row['fiber']) if pd.notna(row.get('fiber')) else None,
                    sugar=float(row['sugar']) if pd.notna(row.get('sugar')) else None,
                    protein=float(row['protein']) if pd.notna(row.get('protein')) else None,
                    instructions=row.get('instructions'),
                    type=row.get('type'),
                    cuisine=row.get('cuisine'),
                    image=row.get('image'),
                )
                recipe.full_clean()
                recipe.save()
                self.stdout.write(self.style.SUCCESS(f"[{index + 1}] Saved: {recipe.recipe_name}"))
            except ValidationError as e:
                self.stdout.write(self.style.WARNING(f"[{index + 1}] Validation Error: {e}"))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"[{index + 1}] Unexpected Error: {e}"))