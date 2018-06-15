# -*- coding: utf-8 -*-

from __future__ import unicode_literals

import json
from rest_framework.views import APIView
from django.http import HttpResponse
from tintoreria.notas.models import Nota, Status
from django.views.generic import TemplateView
from django.shortcuts import render
from tintoreria.notas.serializers import NotaSerializer, StatusSerializer
from rest_framework import generics

# Create your views here.
class NotaView(TemplateView):
	template_name = 'notas/notas.html'

class NotaAPI(APIView):
	serializer = NotaSerializer

	def get(self,request,format=None):
		lista = Nota.objects.all()
		response = self.serializer(lista,many=True)
		return HttpResponse(json.dumps(response.data),content_type='application/json')


class NotaList(generics.ListCreateAPIView):
    queryset = Nota.objects.all()
    serializer_class = NotaSerializer


class NotaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Nota.objects.all()
    serializer_class = NotaSerializer

class StatusView(TemplateView):
	template_name = 'notas/status.html'

class StatusAPI(APIView):
	serializer = StatusSerializer

	def get(self,request,format=None):
		lista = Status.objects.all()
		response = self.serializer(lista,many=True)
		return HttpResponse(json.dumps(response.data),content_type='application/json')


class StatusList(generics.ListCreateAPIView):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer


class StatusDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Status.objects.all()
    serializer_class = StatusSerializer