### This filder contains the foillowing csv files:
---
* **diets folder:** \
     Contains the original dataset files imported from Kaggle
* **recipes folder:** \
     Contains the recipes dataset I found online for recipe ingredients and steps. The recipes_filtered.csv file contains the filtered rows from the original data excluding recipes under the 'Desserts' and 'Bread' cuisine path, since these are irrelevant to our goals.
* **finetuning_data_v1:** \
     Contains the original dataset for model tuning. It contains about 8000 rows and was initially used to tune the model
* **dataset-expanded:** \
     Contains the augmented datasets, all of them containing only the 'query' and 'response' columns: \
      \
	&rarr; diet_conversations.csv: Contains the augmented diets data. \
	&rarr; recipe_conversations.csv: Contains the augmented recipes data. \
	&rarr; finetuning_data_v2.csv: Contains the augmented dataset with around 22000 rows used for model finetuning
