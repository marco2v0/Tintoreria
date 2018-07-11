# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-07-07 23:11
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('notas', '0008_auto_20180704_1924'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nota',
            name='empleado',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='empleado', to='empleados.Empleado'),
        ),
    ]