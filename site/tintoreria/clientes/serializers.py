from rest_framework.serializers import ModelSerializer
from tintoreria.clientes.models import Cliente

class ClienteSerializer(ModelSerializer):

	def to_internal_value(self, data):
		obj = super(ClienteSerializer, self).to_internal_value(data)
		instance_id = data.get('id', None)
		if instance_id:
			obj['id'] = instance_id
		return obj

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