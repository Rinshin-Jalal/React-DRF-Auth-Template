from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from django.conf.urls import url
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('public.urls')),
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    url(r"^media/(?P<path>.*)$",serve,{'document_root':settings.MEDIA_ROOT}),
    url(r"^static/(?P<path>.*)$",serve,{'document_root':settings.STATIC_ROOT}),
] 

