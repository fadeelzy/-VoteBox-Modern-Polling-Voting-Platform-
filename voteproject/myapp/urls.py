from django.urls import path
from . import views


urlpatterns = [
    path('', views.landing, name="landing"),
    path("signup/", views.signup_view, name="signup"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path('dashboard/', views.dashboard, name="dashboard"),
    path('create/', views.create_poll, name="create_poll"), 
    path('poll/<int:poll_id>/', views.poll, name="poll"),
    path('results/<int:poll_id>/', views.results, name="results"),
]