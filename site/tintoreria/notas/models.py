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
    total = models.FloatField(default=0)
    total_apagar = models.FloatField(default=0)


    def __str__(self):
        return self.cliente

class Detalle(models.Model):
    nota = models.ForeignKey(Nota, on_delete=models.CASCADE, related_name="detalle", db_column='nota_id')
    articulo = models.ForeignKey('articulos.Articulo',on_delete=models.PROTECT)
    cantidad = models.IntegerField()
    planchado = models.CharField(max_length=1,null=True)
    lavado = models.CharField(max_length=1,null=True)
    tintoreria = models.CharField(max_length=1,null=True)
    teflon = models.CharField(max_length=1,null=True)
    tefloncyp = models.CharField(max_length=1,null=True)
    almidon = models.CharField(max_length=1,null=True)
    costura = models.CharField(max_length=1,null=True)
    precio = models.FloatField(null=True)
    precio_unitario = models.FloatField(null=True)

    def delete(self, *args, **kwargs):
        try:
            super(Detalle, self).delete(*args, **kwargs)
        except:
            raise ValidationError({'Detalle de orden de venta usada':
                                   'Otros elementos depende de el, borre primero los otros elementos'})

    def __str__(self):
        return self.nota