# -*- coding: utf-8 -*-

from __future__ import unicode_literals

import json
from rest_framework.views import APIView
from django.http import HttpResponse
from tintoreria.clientes.models import Cliente
from django.views.generic import TemplateView
from django.shortcuts import render
from tintoreria.clientes.serializers import ClienteSerializer


# Create your views here.
class ClienteView(TemplateView):
	template_name = 'clientes/clientes.html'

class ClienteAPI(APIView):
	serializer = ClienteSerializer

	def get(self,request,format=None):
		lista = Cliente.objects.all()
		response = self.serializer(lista,many=True)

		return HttpResponse(json.dumps(response.data),content_type='application/json')