# -*- coding: utf-8 -*-

from __future__ import unicode_literals

import json
from rest_framework.views import APIView
from django.http import HttpResponse
from tintoreria.articulos.models import Articulo
from django.views.generic import TemplateView
from django.shortcuts import render
from tintoreria.articulos.serializers import ArticuloSerializer
from rest_framework import generics

# Create your views here.
class ArticuloView(TemplateView):
	template_name = 'articulos/articulos.html'

class ArticuloAPI(APIView):
	serializer = ArticuloSerializer

	def get(self,request,format=None):
		lista = Articulo.objects.all()
		response = self.serializer(lista,many=True)
		return HttpResponse(json.dumps(response.data),content_type='application/json')


class ArticuloList(generics.ListCreateAPIView):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer


class ArticuloDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer



