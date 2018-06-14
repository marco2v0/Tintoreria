# -*- coding: utf-8 -*-

from __future__ import unicode_literals

import json
from rest_framework.views import APIView
from django.http import HttpResponse
from tintoreria.empleados.models import Empleado, Puesto
from django.views.generic import TemplateView
from django.shortcuts import render
from tintoreria.empleados.serializers import EmpleadoSerializer, PuestoSerializer
from rest_framework import generics

# Create your views here.
class EmpleadoView(TemplateView):
	template_name = 'empleados/empleados.html'

class PuestoView(TemplateView):
	template_name = 'empleados/puestos.html'

class EmpleadoAPI(APIView):
	serializer = EmpleadoSerializer

	def get(self,request,format=None):
		lista = Empleado.objects.all()
		response = self.serializer(lista,many=True)
		return HttpResponse(json.dumps(response.data),content_type='application/json')

class PuestoAPI(APIView):
	serializer = PuestoSerializer

	def get(self,request,format=None):
		lista = Puesto.objects.all()
		response = self.serializer(lista,many=True)
		return HttpResponse(json.dumps(response.data),content_type='application/json')

class EmpleadoList(generics.ListCreateAPIView):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class EmpleadoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

class PuestoList(generics.ListCreateAPIView):
    queryset = Puesto.objects.all()
    serializer_class = PuestoSerializer

class PuestoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Puesto.objects.all()
    serializer_class = PuestoSerializer