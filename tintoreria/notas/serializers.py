from rest_framework.serializers import ModelSerializer
from tintoreria.notas.models import Nota, Status, Detalle

class DetalleSerializer (ModelSerializer):
	
	class Meta:
		model = Detalle
		fields = ('partida',
			      'articulo',
			      'cantidad')

class NotaSerializer(ModelSerializer):
	detalle = DetalleSerializer(many=True);

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
			      'detalle',
			      'servicio')

class StatusSerializer(ModelSerializer):

	class Meta:
		model  = Status
		fields = ('id',
			      'valor',
			      'descripcion')