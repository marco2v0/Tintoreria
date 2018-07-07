# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Articulo(models.Model):
	
	descripcion = models.CharField(max_length=255)
	fecha_captura = models.DateTimeField(auto_now_add=True)
	status = models.CharField(max_length=3)
	#clasificacion = models.ForeignKey('articulos.Clasificacion',on_delete=models.CASCADE)

	def __str__(self):
		return self.descripcion

"""class Clasificacion(models.Model):
	descripcion = models.CharField(max_length=255)
	fecha_captura = models.DateTimeField(auto_now_add=True)
	status = models.ForeignKey('notas.Status',on_delete=models.CASCADE, null=True)*/

	def __str__(self):
		return self.descripcion"""