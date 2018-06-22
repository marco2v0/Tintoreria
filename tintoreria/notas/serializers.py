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

	def create (self, validated_data):
		print(validated_data)
		#detalle_nota = validated_data.pop('detalle')
		#print(detalle_nota)
		nota = Nota()
		detalle_nota = Detalle()
		nota.cantidad = validated_data['cantidad']
		nota.persona_servicio = validated_data['persona_servicio']
		nota.observaciones = validated_data['observaciones']
		nota.status = validated_data['status']
		nota.cliente = validated_data['cliente']
		nota.fecha_termino = validated_data['fecha_termino']
		nota.fecha_entrega = validated_data['fecha_entrega']
		nota.descuento = validated_data['descuento']
		nota.servicio = validated_data['servicio']
		#nota.id = validated_data['id']

		detalle_nota = validated_data['detalle']

		nota.save()

		detalle_nvo = Detalle()

		for detalle in detalle_nota:
			detalle_nvo.nota = nota
			detalle_nvo.articulo = detalle['articulo']
			detalle_nvo.cantidad = detalle['cantidad']
			detalle_nvo.partida = detalle['partida']
			detalle_nvo.save()
			print(detalle_nvo.cantidad)

		return validated_data

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