# Generated by Django 2.1.1 on 2018-10-28 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('servicios', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servicio',
            name='nombre',
            field=models.CharField(max_length=60),
        ),
    ]
