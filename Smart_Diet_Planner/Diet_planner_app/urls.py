from django.urls import path
from . import views


urlpatterns = [
    path('',views.home,name = 'home'),
    path('login/',views.login,name = 'login'),
    path('About/',views.about,name = 'about'),
    path('Contact/',views.contact,name = 'contact'),
    path('logout',views.logout_view),
    path('form/', views.form, name='form'),
    path('welcome/', views.welcome, name='welcome'),
    path('plan/', views.plan, name='plan'),
    path('policy/', views.policy, name='policy'),
    path('terms/', views.terms, name='terms')
]