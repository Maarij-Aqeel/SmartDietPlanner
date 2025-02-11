from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

def home(request):
    return render(request, 'Diet_planner_app/home.html')

def login(request):
    if request.method == 'POST':
        # Handle Sign Up
        if request.path == '/welcome/':
            try:
                name = request.POST.get('name')
                email = request.POST.get('email')
                password = request.POST.get('password')

                # Validate email format
                validate_email(email)

                # Check if user already exists
                if User.objects.filter(email=email).exists():
                    messages.error(request, 'Email already registered')
                    return redirect('login')

                # Create new user
                user = User.objects.create_user(
                    username=email,  # Using email as username
                    email=email,
                    password=password,
                    first_name=name
                )
                
                # Log the user in
                auth_login(request, user)

                print('User created successfully')
                print('User:', user)
                return redirect('welcome')

            except ValidationError:
                messages.error(request, 'Invalid email format')
                return redirect('login')
            except Exception as e:
                messages.error(request, 'Error creating account')
                return redirect('login')

        # Handle Sign In
        elif request.path == '/home/':
            try:
                email = request.POST.get('email')
                password = request.POST.get('password')

                # Authenticate user (remember we used email as username)
                user = authenticate(request, username=email, password=password)

                if user is not None:
                    auth_login(request, user)
                    return redirect('home')
                else:
                    messages.error(request, 'Invalid email or password')
                    return redirect('login')

            except Exception as e:
                messages.error(request, 'Error during login')
                return redirect('login')

    # If method is GET, just render the login page
    return render(request, 'Diet_planner_app/login.html')

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