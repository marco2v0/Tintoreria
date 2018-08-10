# -*- coding: utf-8 -*-

from __future__ import unicode_literals

import json
from rest_framework.views import APIView
from django.http import HttpResponse
from tintoreria.clientes.models import Cliente
from django.views.generic import TemplateView
from django.shortcuts import render
from tintoreria.clientes.serializers import ClienteSerializer
from rest_framework import generics
from django.db.models import Q


# Create your views here.
class ClienteView(TemplateView):
    template_name = 'clientes/clientes.html'


class FormView(TemplateView):
    template_name = 'clientes/form.html'


class AddView(TemplateView):
    template_name = 'clientes/add.html'


class ClienteAPI(APIView):
    serializer = ClienteSerializer

    def get(self, request, format=None):
        lista = Cliente.objects.all()
        response = self.serializer(lista, many=True)
        return HttpResponse(json.dumps(response.data), content_type='application/json')


class ClienteList(generics.ListCreateAPIView):
    # queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

    def get_queryset(self):
        if 'q' in self.request.GET:
            q = self.request.GET.get('q')
            queryset = Cliente.objects.filter(
                Q(nombre__contains=q) |
                Q(materno__contains=q) |
                Q(paterno__contains=q))
            return queryset
        else:
            return Cliente.objects.all()

class ClienteDetail(generics.RetrieveUpdateDestroyAPIView):

    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
