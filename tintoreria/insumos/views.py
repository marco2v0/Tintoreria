# -*- coding: utf-8 -*-

from __future__ import unicode_literals

import json
from rest_framework.views import APIView
from django.http import HttpResponse
from tintoreria.insumos.models import Insumo
from django.views.generic import TemplateView
from django.shortcuts import render
from tintoreria.insumos.serializers import InsumoSerializer
from rest_framework import generics

# Create your views here.
class InsumoView(TemplateView):
	template_name = 'insumos/insumos.html'

class InsumoAPI(APIView):
	serializer = InsumoSerializer

	def get(self,request,format=None):
		lista = Insumo.objects.all()
		response = self.serializer(lista,many=True)
		return HttpResponse(json.dumps(response.data),content_type='application/json')


class InsumoList(generics.ListCreateAPIView):
    queryset = Insumo.objects.all()
    serializer_class = InsumoSerializer


class InsumoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Insumo.objects.all()
    serializer_class = InsumoSerializer



