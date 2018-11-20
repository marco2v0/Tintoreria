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
from django.views.generic import TemplateView
from tintoreria.clientes.views import ClienteView, ClienteAPI, ClienteList, ClienteDetail
from tintoreria.notas.views import NotaView, NotaAPI, NotaList, NotaDetail
from tintoreria.insumos.views import InsumoView, InsumoAPI, InsumoList, InsumoDetail
from tintoreria.articulos.views import ArticuloView, ArticuloAPI, ArticuloList, ArticuloDetail
from tintoreria.servicios.views import ServicioView, ServicioAPI, ServicioList, ServicioDetail
from tintoreria.precios.views import PrecioView, PrecioAPI, PrecioList, PrecioDetail
from tintoreria.empleados.views import EmpleadoView, EmpleadoAPI, EmpleadoList, EmpleadoDetail
from tintoreria.core.views import CoreView
from django.views.decorators.csrf import csrf_exempt



urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^clientes/', TemplateView.as_view(template_name='clientes/clientes.html'),name = 'clientes'),
    url(r'^notas/', TemplateView.as_view(template_name='notas/notas.html'),name = 'notas'),
    url(r'^status/', TemplateView.as_view(template_name='notas/status.html')),
    url(r'^empleados/', TemplateView.as_view(template_name='empleados/empleados.html'),name='empleados'),
    url(r'^insumos/', TemplateView.as_view(template_name='insumos/insumos.html'),name='insumos'),
    url(r'^articulos/', TemplateView.as_view(template_name='articulos/articulos.html'),name='articulos'),
    url(r'^servicios/', TemplateView.as_view(template_name='servicios/servicios.html'),name='servicios'),
    url(r'^precios/', TemplateView.as_view(template_name='precios/precios.html'),name='precios'),
    url(r'^api/cliente/$', csrf_exempt(ClienteList.as_view())),
    url(r'^api/cliente/(?P<pk>[0-9]+)/$', csrf_exempt(ClienteDetail.as_view())),
    url(r'^api/nota/$', csrf_exempt(NotaList.as_view())),
    url(r'^api/nota/(?P<pk>[0-9]+)$', csrf_exempt(NotaDetail.as_view())),
    url(r'^api/empleado/$', csrf_exempt(EmpleadoList.as_view())),
    url(r'^api/empleado/(?P<pk>[0-9]+)/$', csrf_exempt(EmpleadoDetail.as_view())),
    url(r'^api/insumo/$', csrf_exempt(InsumoList.as_view())),
    url(r'^api/insumo/(?P<pk>[0-9]+)/$', csrf_exempt(InsumoDetail.as_view())),
    url(r'^api/articulo/$', csrf_exempt(ArticuloList.as_view())),
    url(r'^api/articulo/(?P<pk>[0-9]+)/$', csrf_exempt(ArticuloDetail.as_view())),
    url(r'^api/servicio/$', csrf_exempt(ServicioList.as_view())),
    url(r'^api/servicio/(?P<pk>[0-9]+)/$', csrf_exempt(ServicioDetail.as_view())),
    url(r'^api/precio/$', csrf_exempt(PrecioList.as_view())),
    url(r'^api/precio/(?P<pk>[0-9]+)/$', csrf_exempt(PrecioDetail.as_view())),

    url(r'^$', TemplateView.as_view(template_name='core/core.html'), name='menu'),
]
