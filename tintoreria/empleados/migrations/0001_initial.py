# Generated by Django 2.1.1 on 2018-09-20 23:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Empleado',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=30)),
                ('paterno', models.CharField(max_length=30)),
                ('materno', models.CharField(max_length=30)),
                ('status', models.CharField(max_length=3)),
            ],
        ),
        migrations.CreateModel(
            name='Puesto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('descripcion', models.CharField(max_length=255)),
                ('fecha_captura', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(max_length=3)),
            ],
        ),
        migrations.AddField(
            model_name='empleado',
            name='puesto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='empleados.Puesto'),
        ),
    ]
