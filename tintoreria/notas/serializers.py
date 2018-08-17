from rest_framework.serializers import ModelSerializer
from tintoreria.notas.models import Nota, Detalle
from tintoreria.clientes.models import Cliente
from tintoreria.articulos.models import Articulo
from tintoreria.servicios.models import Servicio
from tintoreria.clientes.serializers import ClienteSerializer
from tintoreria.articulos.serializers import ArticuloSerializer
from tintoreria.servicios.serializers import ServicioSerializer


class DetalleSerializer(ModelSerializer):
    #rticulo = ArticuloSerializer(write_only=True)
    #servicio = ServicioSerializer(write_only=True)
    articulo = ArticuloSerializer()
    servicio = ServicioSerializer()

    class Meta:
        model = Detalle
        fields = ('cantidad',
                  'articulo',
                  'servicio',
                  'precio')


class NotaSerializer(ModelSerializer):
    detalle = DetalleSerializer(many=True)
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
        print(validated_data)

        nota = Nota()
        c = validated_data.pop('cliente')
        cliente = Cliente.objects.get(id=c['id'])
        nota.cantidad = validated_data['cantidad']
        nota.observaciones = validated_data['observaciones']
        nota.status = 'NVA'
        nota.fecha_entrega = validated_data['fecha_entrega']
        nota.cliente = cliente

        detalle_nota = validated_data['detalle']
        #print(detalle_nota)

        nota.save()

        for detalle in detalle_nota:
            detalle_nvo = Detalle()
            detalle_nvo.nota = nota
            s = detalle.pop('servicio')
            servicio = Servicio.objects.get(id=s['id'])
            detalle_nvo.servicio = servicio
            a = detalle.pop('articulo')
            articulo = Articulo.objects.get(id=a['id'])
            detalle_nvo.articulo = articulo
            detalle_nvo.cantidad = detalle['cantidad']
            detalle_nvo.precio = detalle['precio']
            #print(servicio_nota)
            detalle_nvo.save()

        return validated_data

