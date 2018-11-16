# -*- coding: utf-8 -*-

from __future__ import unicode_literals

import json
from rest_framework.views import APIView
from django.http import HttpResponse
from tintoreria.empleados.models import Empleado
from django.views.generic import TemplateView
from tintoreria.empleados.serializers import EmpleadoSerializer
from rest_framework import generics
from django.db.models import Q


# Create your views here.
class EmpleadoView(TemplateView):
    template_name = 'empleados/empleados.html'

class EmpleadoAPI(APIView):
    serializer = EmpleadoSerializer

    def get(self, request, format=None):
        lista = Empleado.objects.all()
        response = self.serializer(lista, many=True)
        return HttpResponse(json.dumps(response.data), content_type='application/json')

class EmpleadoList(generics.ListCreateAPIView):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer

    def get_queryset(self):
        if 'status' in self.request.GET:
            status = self.request.GET.get('status')
            queryset = Empleado.objects.filter(
                Q(status=status))
            return queryset
        else:
            return Empleado.objects.all()


class EmpleadoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer
