#!/bin/bash

NAME="tintoreria" # Nombre dela aplicación
DJANGODIR=/home/marco/Proyectos/Tintoreria/site # Ruta dela carpeta donde esta la aplicación reemplazar <user> con el nombre de usuario
SOCKFILE=/home/marco/Proyectos/Tintoreria/run/gunicorn.sock # Ruta donde se creará el archivo de socket unix para comunicarnos
USER=marco # Usuario con el que vamos a correr laapp
GROUP=marco # Grupo con el quese va a correr laapp
NUM_WORKERS=3 # Número de workers quese van a utilizar para correr la aplicación
DJANGO_SETTINGS_MODULE=tintoreria.settings # ruta de los settings
DJANGO_WSGI_MODULE=tintoreria.wsgi # Nombre del módulo wsgi

echo "Starting $NAME as `whoami`"

# Activar el entorno virtual
cd /home/marco/Proyectos/venv/bin
source activate
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH

# Crear la carpeta run si no existe para guardar el socket linux
RUNDIR=$(dirname $SOCKFILE)
test -d$RUNDIR || mkdir -p $RUNDIR

# Iniciar la aplicación django por medio de gunicorn
exec ../bin/gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $NUM_WORKERS \
  --user=$USER --group=$GROUP \
  --bind=unix:$SOCKFILE \
  --log-level=debug \
  --log-file=-
