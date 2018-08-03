# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models


# Create your models here.
class Precio(models.Model):
    articulo = models.ForeignKey('articulos.Articulo')
    servicio = models.ForeignKey('servicios.Servicio')
    vigencia_del = models.DateTimeField()
    vigencia_al = models.DateTimeField()
    importe = models.IntegerField()

    def __str__(self):
        return self.importe
