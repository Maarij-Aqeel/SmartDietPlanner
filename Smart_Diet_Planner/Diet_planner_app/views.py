from django.shortcuts import render,redirect
from django.contrib.auth import logout

def home(request):
    return render(request, 'Diet_planner_app/home.html')

def login(request):
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