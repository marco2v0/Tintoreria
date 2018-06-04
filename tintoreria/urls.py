"""tintoreria URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
#from tintoreria.clientes.views import Cliente
from django.views.generic import TemplateView
from tintoreria.clientes.views import ClienteView, ClienteAPI, ClienteList, ClienteDetail
from django.views.decorators.csrf import csrf_exempt



urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^clientes/', TemplateView.as_view(template_name='clientes/clientes.html')),
    url(r'^form/', TemplateView.as_view(template_name='clientes/form.html')),
    url(r'^add/', TemplateView.as_view(template_name='clientes/add.html')),
    url(r'^test2/', ClienteView.as_view()),
    #url(r'^api', ClienteAPI.as_view(), name="api"),
    url(r'^api/cliente/$', csrf_exempt(ClienteList.as_view())),
    url(r'^api/cliente/(?P<pk>[0-9]+)/$', csrf_exempt(ClienteDetail.as_view())),
]
