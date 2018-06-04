# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Cliente(models.Model):
	
	nombre = models.CharField(max_length=30)
	paterno = models.CharField(max_length=30)
	materno = models.CharField(max_length=30)
	direccion = models.CharField(max_length=30)
	ciudad = models.CharField(max_length=30)
	colonia = models.CharField(max_length=30)
	cp = models.CharField(max_length=5)
	estado = models.CharField(max_length=3)
	tel_fijo = models.CharField(max_length=20)
	tel_movil = models.CharField(max_length=20)
	tel_trabajo = models.CharField(max_length=20)
	email = models.CharField(max_length=30)
	status = models.CharField(max_length=3)
	sexo = models.CharField(max_length=2)
	fecha_captura = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.nombre