# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Empleado(models.Model):
	
	nombre = models.CharField(max_length=30)
	paterno = models.CharField(max_length=30)
	materno = models.CharField(max_length=30)
	puesto = models.ForeignKey('empleados.Puesto',on_delete=models.CASCADE)
	status = models.ForeignKey('notas.Status',
								on_delete=models.CASCADE,
								null=True)

	def __str__(self):
		return self.nombre

class Puesto(models.Model):
	descripcion = models.CharField(max_length=255)
	fecha_captura = models.DateTimeField(auto_now_add=True)
	status = models.CharField(max_length=3)

	def __str__(self):
		return self.descripcion