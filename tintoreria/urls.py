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
from tintoreria.notas.views import NotaView, NotaAPI, NotaList, NotaDetail, StatusView, StatusAPI, StatusList, StatusDetail
from tintoreria.insumos.views import InsumoView, InsumoAPI, InsumoList, InsumoDetail
from tintoreria.empleados.views import EmpleadoView, EmpleadoAPI, EmpleadoList, EmpleadoDetail, PuestoView, PuestoAPI, PuestoList, PuestoDetail
from django.views.decorators.csrf import csrf_exempt



urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^clientes/', TemplateView.as_view(template_name='clientes/clientes.html')),
    url(r'^notas/', TemplateView.as_view(template_name='notas/notas.html')),
    url(r'^status/', TemplateView.as_view(template_name='notas/status.html')),
    url(r'^empleados/', TemplateView.as_view(template_name='empleados/empleados.html')),
    url(r'^puestos/', TemplateView.as_view(template_name='empleados/puestos.html')),
    url(r'^insumos/', TemplateView.as_view(template_name='insumos/insumos.html')),
    url(r'^test2/', ClienteView.as_view()),
    url(r'^api/cliente/$', csrf_exempt(ClienteList.as_view())),
    url(r'^api/cliente/(?P<pk>[0-9]+)/$', csrf_exempt(ClienteDetail.as_view())),
    url(r'^api/nota/$', csrf_exempt(NotaList.as_view())),
    url(r'^api/nota/(?P<pk>[0-9]+)/$', csrf_exempt(NotaDetail.as_view())),
    url(r'^api/status/$', csrf_exempt(StatusList.as_view())),
    url(r'^api/status/(?P<pk>[0-9]+)/$', csrf_exempt(StatusDetail.as_view())),
    url(r'^api/empleado/$', csrf_exempt(EmpleadoList.as_view())),
    url(r'^api/empleado/(?P<pk>[0-9]+)/$', csrf_exempt(EmpleadoDetail.as_view())),
    url(r'^api/puesto/$', csrf_exempt(PuestoList.as_view())),
    url(r'^api/puesto/(?P<pk>[0-9]+)/$', csrf_exempt(PuestoDetail.as_view())),
    url(r'^api/insumo/$', csrf_exempt(InsumoList.as_view())),
    url(r'^api/insumo/(?P<pk>[0-9]+)/$', csrf_exempt(InsumoDetail.as_view())),
]
