# Generated by Django 2.1.1 on 2018-10-28 23:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notas', '0004_auto_20181027_0441'),
    ]

    operations = [
        migrations.AddField(
            model_name='nota',
            name='total',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='nota',
            name='total_apagar',
            field=models.FloatField(default=0),
        ),
    ]
