# -*- coding: utf-8 -*-
# Generated by Django 1.11.13 on 2018-08-03 00:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notas', '0014_auto_20180727_1812'),
    ]

    operations = [
        migrations.AddField(
            model_name='detalle',
            name='precio',
            field=models.IntegerField(null=True),
        ),
    ]
