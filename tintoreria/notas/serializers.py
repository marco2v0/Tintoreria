from rest_framework.serializers import ModelSerializer
from tintoreria.notas.models import Nota, Detalle
from tintoreria.clientes.models import Cliente
from tintoreria.empleados.models import Empleado
from tintoreria.articulos.models import Articulo
from tintoreria.clientes.serializers import ClienteSerializer
from tintoreria.empleados.serializers import EmpleadoSerializer
from tintoreria.articulos.serializers import ArticuloSerializer


class DetalleSerializer(ModelSerializer):
    articulo = ArticuloSerializer()

    class Meta:
        model = Detalle
        fields = ('partida',
                  'articulo',
                  'cantidad')


class NotaSerializer(ModelSerializer):
    detalle = DetalleSerializer(many=True);
    cliente = ClienteSerializer()
    empleado = EmpleadoSerializer()

    def create(self, validated_data):
        print("**************validated_data******************")
        print(validated_data)
        nota = Nota()
        detalle_nota = Detalle()
        e = validated_data.pop('empleado')
        c = validated_data.pop('cliente')
        empleado = Empleado.objects.get(id=e['id'])
        cliente = Cliente.objects.get(id=c['id'])

        nota.cantidad = validated_data['cantidad']
        nota.empleado = empleado
        nota.observaciones = validated_data['observaciones']
        nota.status = validated_data['status']
        nota.cliente = cliente
        nota.fecha_termino = validated_data['fecha_termino']
        nota.fecha_entrega = validated_data['fecha_entrega']
        nota.descuento = validated_data['descuento']

        print("**************detalle******************")

        detalle_nota = validated_data['detalle']

        nota.save()

        detalle_nvo = Detalle()

        for detalle in detalle_nota:
            detalle_nvo.nota = nota
            print detalle['articulo']
            a = detalle.pop('articulo')
            articulo = Articulo.objects.get(id=a['id'])
            detalle_nvo.articulo = articulo
            detalle_nvo.cantidad = detalle['cantidad']
            detalle_nvo.partida = detalle['partida']
            print("**************guarda detalle******************")
            detalle_nvo.save()
            print("**************guarda nuevo******************")

        return validated_data

    class Meta:
        model = Nota
        fields = ('id',
                  'cantidad',
                  'empleado',
                  'observaciones',
                  'status',
                  'cliente',
                  'fecha_termino',
                  'fecha_entrega',
                  'descuento',
                  'detalle')
