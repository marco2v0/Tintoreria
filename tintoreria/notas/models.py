# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models


class Nota(models.Model):
    fecha_captura = models.DateTimeField(auto_now_add=True)
    cantidad = models.IntegerField()
    empleado = models.ForeignKey('empleados.Empleado', related_name="empleado", null=True,blank=True)
    observaciones = models.TextField(null=True)
    status = models.CharField(max_length=3,default='NVA')
    cliente = models.ForeignKey('clientes.Cliente')
    fecha_termino = models.DateTimeField(null=True)
    fecha_entrega = models.DateTimeField()
    descuento = models.IntegerField(null=True)

    def __str__(self):
        return self.cliente


class Detalle(models.Model):
    nota = models.ForeignKey(Nota, related_name="detalle", db_column='nota_id')
    partida = models.IntegerField()
    articulo = models.ForeignKey('articulos.Articulo')
    cantidad = models.IntegerField()

    def __str__(self):
        return self.nota

class Servicio(models.Model):
    detalle = models.ForeignKey(Detalle, related_name="servicio", db_column='detalle_id')
    articulo = models.ForeignKey('articulos.Articulo')
    servicio = models.ForeignKey('servicios.Servicio')

    def __str__(self):
        return self.nota