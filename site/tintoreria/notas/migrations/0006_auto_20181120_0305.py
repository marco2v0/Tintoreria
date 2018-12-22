# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-11-20 03:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notas', '0005_auto_20181028_2325'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='detalle',
            name=b'servicio',
        ),
        migrations.AddField(
            model_name='detalle',
            name='almidon',
            field=models.CharField(max_length=1, null=True),
        ),
        migrations.AddField(
            model_name='detalle',
            name='costura',
            field=models.CharField(max_length=1, null=True),
        ),
        migrations.AddField(
            model_name='detalle',
            name='lavado',
            field=models.CharField(max_length=1, null=True),
        ),
        migrations.AddField(
            model_name='detalle',
            name='planchado',
            field=models.CharField(max_length=1, null=True),
        ),
        migrations.AddField(
            model_name='detalle',
            name='teflon',
            field=models.CharField(max_length=1, null=True),
        ),
        migrations.AddField(
            model_name='detalle',
            name='tefloncyp',
            field=models.CharField(max_length=1, null=True),
        ),
        migrations.AddField(
            model_name='detalle',
            name='tintoreria',
            field=models.CharField(max_length=1, null=True),
        ),
    ]