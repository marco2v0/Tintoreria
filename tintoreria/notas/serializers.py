from rest_framework.serializers import ModelSerializer
from tintoreria.notas.models import Nota, Detalle
from tintoreria.clientes.models import Cliente
from tintoreria.empleados.models import Empleado
from tintoreria.articulos.models import Articulo
from tintoreria.clientes.serializers import ClienteSerializer
from tintoreria.empleados.serializers import EmpleadoSerializer
from tintoreria.articulos.serializers import ArticuloSerializer

class DetalleSerializer(ModelSerializer):
  articulo = ArticuloSerializer(write_only=True)

  class Meta:
    model = Detalle
    fields = ('partida',
              'cantidad',
              'articulo')

class NotaSerializer(ModelSerializer):
    detalle = DetalleSerializer(many=True);
    cliente = ClienteSerializer(write_only=True)
    empleado = EmpleadoSerializer(write_only=True)

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
        #print(validated_data)
        nota = Nota()
        detalle_nota = Detalle()
        c = validated_data.pop('cliente')
        e = validated_data.pop('empleado')
        cliente = Cliente.objects.get(id=c['id'])
        empleado = Empleado.objects.get(id=e['id'])

        nota.cantidad = validated_data['cantidad']
        nota.observaciones = validated_data['observaciones']
        # nota.status = validated_data['status']
        nota.status = 'NVA'
        nota.fecha_termino = validated_data['fecha_termino']
        nota.fecha_entrega = validated_data['fecha_entrega']
        nota.descuento = validated_data['descuento']
        nota.empleado = empleado
        nota.cliente = cliente

        detalle_nota = validated_data['detalle']

        nota.save()

        detalle_nvo = Detalle()

        for detalle in detalle_nota:
            detalle_nvo.nota = nota
            a = detalle.pop('articulo')
            articulo = Articulo.objects.get(id=a['id'])
            detalle_nvo.partida = detalle['partida']
            detalle_nvo.cantidad = detalle['cantidad']
            detalle_nvo.articulo = articulo
            detalle_nvo.save()

        return validated_data