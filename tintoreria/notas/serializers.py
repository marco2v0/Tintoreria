from rest_framework.serializers import ModelSerializer
from tintoreria.notas.models import Nota, Detalle, Servicio
from tintoreria.clientes.models import Cliente
from tintoreria.articulos.models import Articulo
from tintoreria.clientes.serializers import ClienteSerializer
from tintoreria.articulos.serializers import ArticuloSerializer


class DetalleSerializer(ModelSerializer):
    articulo = ArticuloSerializer(write_only=True)

    class Meta:
        model = Detalle
        fields = ('partida',
                  'cantidad',
                  'articulo')


class NotaSerializer(ModelSerializer):
    detalle = DetalleSerializer(many=True)
    #cliente = ClienteSerializer(write_only=True,required=False)
    cliente = ClienteSerializer(required=False)

    class Meta:
        model = Nota
        fields = ('id',
                  'cantidad',
                  'observaciones',
                  'status',
                  'fecha_termino',
                  'fecha_entrega',
                  'descuento',
                  'empleado',
                  'cliente',
                  'detalle')

    def create(self, validated_data):
        print("**************validated_data******************")
        # print(validated_data)

        nota = Nota()
        c = validated_data.pop('cliente')
        cliente = Cliente.objects.get(id=c['id'])
        nota.cantidad = validated_data['cantidad']
        nota.observaciones = validated_data['observaciones']
        nota.status = 'NVA'
        nota.fecha_entrega = validated_data['fecha_entrega']
        nota.cliente = cliente

        detalle_nota = validated_data['detalle']
        print(detalle_nota)

        nota.save()

        detalle_nvo = Detalle()
        servicio_nvo = Servicio()

        for detalle in detalle_nota:
            detalle_nvo.nota = nota
            a = detalle.pop('articulo')
            articulo = Articulo.objects.get(id=a['id'])
            detalle_nvo.partida = detalle['partida']
            detalle_nvo.cantidad = detalle['cantidad']
            detalle_nvo.articulo = articulo

            servicio_nota = detalle['servicio']
            print(servicio_nota)
            for servicio in servicio_nota:
                servicio_nvo.articulo = articulo
                servicio_nvo.detalle = detalle
                servicio_nvo.servicio = servicio['servicio']

            detalle_nvo.save()

        return validated_data
