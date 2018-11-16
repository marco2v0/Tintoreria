# -*- coding: utf-8 -*-

from __future__ import unicode_literals

import json
from rest_framework.views import APIView
from django.http import HttpResponse
from tintoreria.notas.models import Nota, Detalle
from django.views.generic import TemplateView
from tintoreria.notas.serializers import NotaSerializer, DetalleSerializer
from rest_framework import generics


# Create your views here.
class NotaView(TemplateView):
    template_name = 'notas/notas.html'

class NotaAPI(APIView):
    serializer = NotaSerializer

    def get(self, request, format=None):
        lista = Nota.objects.all()
        response = self.serializer(lista, many=True)
        return HttpResponse(json.dumps(response.data), content_type='application/json')


class NotaList(generics.ListCreateAPIView):
    queryset = Nota.objects.all()
    serializer_class = NotaSerializer


class NotaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Nota.objects.all()
    serializer_class = NotaSerializer

class DetalleAPI(APIView):
    serializer = DetalleSerializer

    def get(self, request, format=None):
        lista = Detalle.objects.all()
        response = self.serializer(lista, many=True)
        return HttpResponse(json.dumps(response.data), content_type='application/json')


class DetalleList(generics.ListCreateAPIView):
    queryset = Detalle.objects.all()
    serializer_class = DetalleSerializer


class DetalleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Detalle.objects.all()
    serializer_class = DetalleSerializer


'''def impresion_nota(request):
    n = request.GET.get('id')
    nota = Cliente.objects.get(id=c['id'])'''

