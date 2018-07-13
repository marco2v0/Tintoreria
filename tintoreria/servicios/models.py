# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models


# Create your models here.
class Servicio(models.Model):
    nombre = models.CharField(max_length=30)
    status = models.CharField(max_length=3)

    def __str__(self):
        return self.nombre
