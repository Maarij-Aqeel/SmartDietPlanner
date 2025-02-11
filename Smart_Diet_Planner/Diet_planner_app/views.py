<<<<<<< HEAD
from django.shortcuts import render,redirect
from django.contrib.auth import logout
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.contrib import messages
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django import forms

def home(request):
    return render(request, 'Diet_planner_app/home.html')

=======
>>>>>>> 3b8310f06b86254bb1b6461d1c38aca9eccdb398
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.contrib.auth.models import User

from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.contrib.auth.models import User

def home(request):
    return render(request, 'Diet_planner_app/home.html')

def login(request):
    if request.method == 'POST':
        form_type = request.POST.get('form_type')  # Get form type (signup or signin)
        auth_method = request.POST.get('auth_method')  # Get auth method (manual or social)

        print(f"Received form_type: {form_type}")  # Debugging print

        # Handling Manual Sign-Up (Email/Password)
        if form_type == 'signup' and auth_method == 'manual':
            print("Handling Manual Sign-Up")  # Debugging print
            name = request.POST.get('name')
            email = request.POST.get('email')
            password = request.POST.get('password')

            print(f"Name: {name}, Email: {email}, Password: {password}")  # Debugging print

            # Check if email already exists
            if User.objects.filter(email=email).exists():
                messages.error(request, "Email already registered!")
                print("Email already registered")  # Debugging print
                return redirect('sign_up')  # Redirect back to the sign-up page

            # Create a new user manually
            user = User.objects.create_user(username=email, email=email, password=password, first_name=name)
            user.save()

            print(f"User created: {user}")  # Debugging print

            # Log the user in after successful sign-up
            user = authenticate(request, username=email, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, "Account created successfully! You are now logged in.")
                print(f"User authenticated and logged in: {user}")  # Debugging print
                return redirect('home')  # Redirect to home or dashboard page
            else:
                messages.error(request, "Error logging in after sign-up.")
                print("Error logging in after sign-up")  # Debugging print
                return redirect('sign_up')  # Redirect back to sign-up page

        # Handling Social Sign-Up (Google/Facebook)
        elif form_type == 'signup' and auth_method == 'social':
            print("Handling Social Sign-Up (Google/Facebook)")  # Debugging print
            # Social auth handles user creation automatically (using Django Allauth)
            # You don't need to handle anything here. Django Allauth takes care of the process
            pass
        
        # Handling Manual Sign-In (Email/Password)
        elif form_type == 'signin' and auth_method == 'manual':
            print("Handling Manual Sign-In")  # Debugging print
            email = request.POST.get('email')
            password = request.POST.get('password')

            print(f"Email: {email}, Password: {password}")  # Debugging print

            # Authenticate the user with the provided email and password
            user = authenticate(request, username=email, password=password)

            if user is not None:
                login(request, user)
                messages.success(request, "You are logged in successfully!")
                print(f"User authenticated and logged in: {user}")  # Debugging print
                return redirect('home')  # Redirect to home or dashboard page
            else:
                messages.error(request, "Invalid email or password!")
                print("Invalid email or password")  # Debugging print
                return redirect('sign_in')  # Redirect back to sign-in page

        # Handling Social Sign-In (Google/Facebook)
        elif form_type == 'signin' and auth_method == 'social':
            print("Handling Social Sign-In (Google/Facebook)")  # Debugging print
            # Social auth handles user login automatically (using Django Allauth)
            # You don't need to handle anything here. Django Allauth takes care of the process
            pass

    else:
        form = AuthenticationForm()  # If GET request, render an empty login form
    
    return render(request, 'Diet_planner_app/login.html', {'form': form})
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