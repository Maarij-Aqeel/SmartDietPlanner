from django.shortcuts import render

def home(request):
    return render(request, 'Diet_planner_app/home.html')

def login(request):
    return render(request, 'Diet_planner_app/login.html')

def about(request):
    return render(request, 'Diet_planner_app/about.html')

def contact(request):
    return render(request, 'Diet_planner_app/contact.html')