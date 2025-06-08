from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import logout
from .models import UserProfile
import json
from recipes.rag import process_query

def home(request):
    return render(request, 'Diet_planner_app/home.html')

def login(request):
    if request.method == 'POST':
        

        form_type = request.POST.get('form_type')
        auth_method = request.POST.get('auth_method', 'manual')
        
        if auth_method != 'manual':
            messages.error(request, "Invalid authentication method.")
            return render(request, 'Diet_planner_app/login.html')
        
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        # Validate email and password
        if not all([email, password]):
            messages.error(request, "Email and password are required!")
            return render(request, 'Diet_planner_app/login.html')
        
        if form_type == 'signup':

            # Handle Sign-Up
            name = request.POST.get('name')
            if not name:
                messages.error(request, "Name is required for registration!")
                return render(request, 'Diet_planner_app/login.html')
            
            # Check if email already exists
            if User.objects.filter(email=email).exists():
                messages.error(request, "Email already registered!")
                return render(request, 'Diet_planner_app/login.html')
            
            try:
                # Create new user
                user = User.objects.create_user(
                    username=email, 
                    email=email, 
                    password=password, 
                    first_name=name
                )
                
                # Login the new user
                user = authenticate(request, username=email, password=password)
                if user:
                    auth_login(request, user)
                    messages.success(request, "Account created successfully! Welcome!")
                    return redirect('welcome')
                
            except Exception as e:
                messages.error(request, "Error creating account. Please try again.")
                return render(request, 'Diet_planner_app/login.html')
        
        elif form_type == 'signin':
            # Handle Sign-In

            user = authenticate(request, username=email, password=password)
            if user:
                auth_login(request, user)
                messages.success(request, "Welcome back!")
                return redirect('home')
            else:
                messages.error(request, "Invalid email or password!")
                return render(request, 'Diet_planner_app/login.html')
        
        else:
            messages.error(request, "Invalid form type.")
    
    # GET request
    form = AuthenticationForm()
    return render(request, 'Diet_planner_app/login.html', {'form': form})


def save_profile(request):
    if request.method == "POST":
        data = json.loads(request.body)

        profile, created = UserProfile.objects.get_or_create(user=request.user)
        profile.age = data.get('age')
        profile.height = data.get('height')
        profile.height_unit = data.get('height_unit')
        profile.gender = data.get('gender')
        profile.current_weight = data.get('current_weight')
        profile.target_weight = data.get('target_weight')
        profile.weight_unit = data.get('weight_unit')
        profile.food_allergies = ','.join(data.get('allergies', []))
        profile.cooking_skill = data.get('cooking_skill')
        profile.budget = data.get('budget')
        profile.physical_activity = data.get('physical_activity')
        profile.include_exercise = data.get('include_exercise')
        profile.meal_prep_time = data.get('meal_prep_time')
        profile.meals_per_day = data.get('meals_per_day')
        profile.cooking_frequency = data.get('cooking_frequency')
        profile.commitment_duration = data.get('commitment_duration')
        profile.additional_info = data.get('additional_info')
        profile.save()

        return JsonResponse({"success": True})
    
    return JsonResponse({"success": False}, status=400)
    
def about(request):
    return render(request, 'Diet_planner_app/about.html')

def contact(request):
    return render(request, 'Diet_planner_app/contact.html')

def logout_view(request):
    logout(request)
    return redirect('/')

def welcome(request):
    return render(request, 'Diet_planner_app/welcome.html')

def form(request):
    return render(request, 'Diet_planner_app/multiform.html')

def plan(request):
    return render(request, 'Diet_planner_app/plan.html')

def policy(request):
    return render(request, 'Diet_planner_app/policy.html')

def terms(request):
    return render(request, 'Diet_planner_app/terms.html')

def roadmap(request):
    return render(request, 'Diet_planner_app/roadmap.html')

def features(request):
    return render(request, 'Diet_planner_app/featured_recipes.html')

def recipe_query(request):

    if request.method == "POST" and request.headers.get('X-Requested-With') == 'XMLHttpRequest':

        if request.user.is_authenticated:
            user=request.user

        data = json.loads(request.body)
        query = data.get('query')
        history = data.get('history', [])

        response, updated_history = process_query(query, history)

        return JsonResponse({
            'response': response,
            'history': updated_history
        })

    return JsonResponse({'error': 'Invalid request'}, status=400)
