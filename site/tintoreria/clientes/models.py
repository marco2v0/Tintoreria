# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Cliente(models.Model):
	
	nombre = models.CharField(max_length=30)
	paterno = models.CharField(max_length=30)
	materno = models.CharField(max_length=30,null=True)
	direccion = models.CharField(max_length=30)
	ciudad = models.CharField(max_length=30,null=True)
	colonia = models.CharField(max_length=30)
	cp = models.CharField(max_length=5,null=True)
	estado = models.CharField(max_length=3,null=True)
	tel_fijo = models.CharField(max_length=20,null=True)
	tel_movil = models.CharField(max_length=20,null=True)
	tel_trabajo = models.CharField(max_length=20,null=True)
	email = models.CharField(max_length=30,null=True)
	status = models.CharField(max_length=3,default="ACT")
	sexo = models.CharField(max_length=1)
	fecha_captura = models.DateTimeField(auto_now_add=True)

	def get_direccion(self):
		return self.direccion + ' ' + self.ciudad + ' ' + self.colonia
	def get_nombre_completo(self):
		return self.nombre + ' ' + self.paterno + ' ' + self.materno

	def __str__(self):
		return self.nombre