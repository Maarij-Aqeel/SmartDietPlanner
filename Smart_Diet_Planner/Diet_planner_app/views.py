from django.shortcuts import render

def home(request):
    return render(request,'Diet_planner_app/Home.html')
# Create your views here.
def login_view(request):
    return render(request, 'Diet_planner_app/login.html')
