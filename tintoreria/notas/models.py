# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models


class Status(models.Model):
	valor = models.CharField(max_length=1)
	descripcion = models.CharField(max_length=255)
	fecha_captura = models.DateTimeField(auto_now_add=True)

	class Meta:
		verbose_name = 'Status'
		verbose_name_plural = 'Status'

	def __str__(self):
		return self.valor

class Nota(models.Model):
	
	fecha_captura = models.DateTimeField(auto_now_add=True)
	cantidad = models.IntegerField()
	persona_servicio = models.ForeignKey('empleados.Empleado',on_delete=models.CASCADE)
	observaciones = models.TextField()
	status = models.ForeignKey('Status',on_delete=models.CASCADE, null=True)
	cliente = models.ForeignKey('clientes.Cliente',on_delete=models.CASCADE)
	fecha_termino = models.DateTimeField()
	fecha_entrega = models.DateTimeField()
	descuento = models.IntegerField()
	servicio = models.CharField(max_length=20)

	def __str__(self):
		return self.folio

