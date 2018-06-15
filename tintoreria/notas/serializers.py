from rest_framework.serializers import ModelSerializer
from tintoreria.notas.models import Nota, Status

class NotaSerializer(ModelSerializer):

	class Meta:
		model  = Nota
		fields = ('id',
			      'cantidad',
			      'persona_servicio',
			      'observaciones',
			      'status',
			      'cliente',
			      'fecha_termino',
			      'fecha_entrega',
			      'descuento',
			      'servicio')

class StatusSerializer(ModelSerializer):

	class Meta:
		model  = Status
		fields = ('id',
			      'valor',
			      'descripcion')