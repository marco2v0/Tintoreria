# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-11-16 04:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('articulos', '0002_articulo_descripcion_corta'),
    ]

    operations = [
        migrations.AddField(
            model_name='articulo',
            name='clasificacion',
            field=models.CharField(default='Planchado', max_length=30),
            preserve_default=False,
        ),
    ]
