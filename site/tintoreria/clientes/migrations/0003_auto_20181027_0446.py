# Generated by Django 2.1.1 on 2018-10-27 04:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0002_auto_20181027_0441'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='status',
            field=models.CharField(default='ACT', max_length=3),
        ),
    ]
