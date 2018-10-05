# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models

class Nota(models.Model):
    fecha_captura = models.DateTimeField(auto_now_add=True)
    cantidad = models.IntegerField()
    empleado = models.ForeignKey('empleados.Empleado', on_delete=models.PROTECT, related_name="empleado", null=True,blank=True)
    observaciones = models.TextField(null=True)
    status = models.CharField(max_length=3,default='NVA')
    cliente = models.ForeignKey('clientes.Cliente', on_delete=models.PROTECT)
    fecha_termino = models.DateTimeField(null=True)
    fecha_entrega = models.DateTimeField()
    descuento = models.FloatField(null=True)
    pagado = models.FloatField(default=0)

    def __str__(self):
        return self.cliente

class Detalle(models.Model):
    nota = models.ForeignKey(Nota, on_delete=models.PROTECT, related_name="detalle", db_column='nota_id')
    articulo = models.ForeignKey('articulos.Articulo',on_delete=models.PROTECT)
    cantidad = models.IntegerField()
    servicio = models.ForeignKey('servicios.Servicio',null=True,on_delete=models.PROTECT)
    precio = models.FloatField(null=True)
    precio_unitario = models.FloatField(null=True)

    def __str__(self):
        return self.nota