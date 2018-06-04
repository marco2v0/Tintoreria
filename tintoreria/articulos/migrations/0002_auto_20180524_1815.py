# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-05-24 23:15
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('articulos', '0001_initial'),
        ('notas', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='articuloclasif',
            name='status',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='notas.Status'),
        ),
        migrations.AddField(
            model_name='articulo',
            name='clasificacion',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='articulos.ArticuloClasif'),
        ),
        migrations.AddField(
            model_name='articulo',
            name='status',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='notas.Status'),
        ),
    ]
