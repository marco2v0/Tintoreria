# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Insumo(models.Model):
	
	descripcion = models.CharField(max_length=255)
	fecha_captura = models.DateTimeField(auto_now_add=True)
	costo = models.FloatField()

	def __str__(self):
		return self.descripcion