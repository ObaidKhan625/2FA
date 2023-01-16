from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.LoginView.as_view()),
    path('register/', views.RegisterView.as_view()),
    path('set-two-factor-auth/', views.Set2FAView.as_view()),
    path('verify-two-factor-auth/', views.Verify2FAView.as_view()),
    path('is-logged-in/', views.isLoggedIn),
]
