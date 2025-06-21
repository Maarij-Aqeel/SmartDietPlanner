import pandas as pd
import numpy as np
from recipes.models import Recipe
from django.core.management.base import BaseCommand
from django.core.exceptions import ValidationError
from django.conf import settings
VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']
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

        df = pd.read_csv(csv_file_path)

        for index, row in df.iterrows():
            recipe_name = row.get('recipe_name')
            if Recipe.objects.filter(recipe_name=recipe_name).exists():
                self.stdout.write(self.style.WARNING(f"[{index + 1}] '{recipe_name}' exists. Skipping."))
                continue

            try:
                # Handle times
                cook_time = None if pd.isna(row.get('cook_time')) else str(row.get('cook_time'))
                prep_time = None if pd.isna(row.get('prep_time')) else str(row.get('prep_time'))
                total_time = None if pd.isna(row.get('total_time')) else str(row.get('total_time'))

                # Fix image path
                image_base = row.get('image')
                fixed_image_path = None

                if image_base:
                    for ext in VALID_EXTENSIONS:
                        test_path = os.path.join(settings.MEDIA_ROOT, 'recipes', image_base + ext)
                        if os.path.exists(test_path):
                            fixed_image_path = f"recipes/{image_base}{ext}"
                            break

                recipe = Recipe(
                    recipe_name=recipe_name,
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
                    image=fixed_image_path,
                )

                recipe.full_clean()
                recipe.save()
                self.stdout.write(self.style.SUCCESS(f"[{index + 1}] Saved: {recipe.recipe_name}"))

            except ValidationError as e:
                self.stdout.write(self.style.WARNING(f"[{index + 1}] Validation Error: {e}"))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"[{index + 1}]  Error: {e}"))