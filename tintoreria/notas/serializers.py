from rest_framework.serializers import ModelSerializer
from tintoreria.notas.models import Nota

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