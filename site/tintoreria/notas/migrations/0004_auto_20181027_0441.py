# Generated by Django 2.1.1 on 2018-10-27 04:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('notas', '0003_auto_20181005_2323'),
    ]

    operations = [
        migrations.AlterField(
            model_name='detalle',
            name='nota',
            field=models.ForeignKey(db_column='nota_id', on_delete=django.db.models.deletion.CASCADE, related_name='detalle', to='notas.Nota'),
        ),
    ]
