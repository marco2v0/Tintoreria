# -*- coding: utf-8 -*-

from __future__ import unicode_literals

import json
from rest_framework.views import APIView
from django.http import HttpResponse
from tintoreria.servicios.models import Servicio
from django.views.generic import TemplateView
from django.shortcuts import render
from tintoreria.servicios.serializers import ServicioSerializer
from rest_framework import generics


# Create your views here.
class ServicioView(TemplateView):
    template_name = 'servicios/servicios.html'


class ServicioAPI(APIView):
    serializer = ServicioSerializer

    def get(self, request, format=None):
        lista = Servicio.objects.all()
        response = self.serializer(lista, many=True)
        return HttpResponse(json.dumps(response.data), content_type='application/json')


class ServicioList(generics.ListCreateAPIView):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer


class ServicioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Servicio.objects.all()
    serializer_class = ServicioSerializer
