from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/token/access/', TokenRefreshView.as_view(), name='token_get_access'),
    path('api/token/both/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('verify/email/', views.EmailVerifyView.as_view(),name="verify_email"),
    path('u/<int:pk>/ser/', views.UserDetail.as_view()),
    path('u/s/e/r/s/', views.UserList.as_view()),
    path('user/new/', views.UserCreate.as_view()),
]
