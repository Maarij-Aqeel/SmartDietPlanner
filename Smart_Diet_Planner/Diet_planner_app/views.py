from django.shortcuts import render

def home(request):
    return render(request,'Diet_planner_app/Home.html')

def login(request):
    return render(request, 'Diet_planner_app/Login.html')

def about(request):
    return render(request, 'Diet_planner_app/About.html')

def contact(request):
    return render(request, 'Diet_planner_app/Contact.html')