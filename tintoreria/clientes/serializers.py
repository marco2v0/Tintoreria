from rest_framework.serializers import ModelSerializer
from tintoreria.clientes.models import Cliente

class ClienteSerializer(ModelSerializer):

	class Meta:
		model  = Cliente
		fields = ('id',
			      'nombre',
			      'paterno',
			      'materno',
			      'direccion',
			      'ciudad',
			      'colonia',
			      'cp',
			      'estado',
			      'tel_fijo',
			      'tel_movil',
			      'tel_trabajo',
			      'email',
			      'status',
			      'sexo')