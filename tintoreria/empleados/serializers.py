from rest_framework.serializers import ModelSerializer
from tintoreria.empleados.models import Empleado, Puesto

class EmpleadoSerializer(ModelSerializer):

	class Meta:
		model  = Empleado
		fields = ('id',
			      'nombre',
			      'paterno',
			      'materno',
			      'puesto',
			      'status')

class PuestoSerializer(ModelSerializer):

	class Meta:
		model  = Puesto
		fields = ('id',
			      'descripcion',
			      'status')