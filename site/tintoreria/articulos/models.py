# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Articulo(models.Model):
	
	descripcion = models.CharField(max_length=255)
	descripcion_corta = models.CharField(max_length=8)
	fecha_captura = models.DateTimeField(auto_now_add=True)
	status = models.CharField(max_length=3)
	clasificacion = models.CharField(max_length=30)

	def __str__(self):
		return self.descripcion