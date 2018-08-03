# -*- coding: utf-8 -*-

from __future__ import unicode_literals

import json
from rest_framework.views import APIView
from django.http import HttpResponse
from tintoreria.precios.models import Precio
from django.views.generic import TemplateView
from django.shortcuts import render
from tintoreria.precios.serializers import PrecioSerializer
from rest_framework import generics


# Create your views here.
class PrecioView(TemplateView):
    template_name = 'precios/precios.html'


class PrecioAPI(APIView):
    serializer = PrecioSerializer

    def get(self, request, format=None):
        lista = Precio.objects.all()
        response = self.serializer(lista, many=True)
        return HttpResponse(json.dumps(response.data), content_type='application/json')


class PrecioList(generics.ListCreateAPIView):
    queryset = Precio.objects.all()
    serializer_class = PrecioSerializer


class PrecioDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Precio.objects.all()
    serializer_class = PrecioSerializer
