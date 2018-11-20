from rest_framework.serializers import ModelSerializer
from tintoreria.notas.models import Nota, Detalle
from tintoreria.clientes.models import Cliente
from tintoreria.articulos.models import Articulo
from tintoreria.servicios.models import Servicio
from tintoreria.empleados.models import Empleado
from tintoreria.clientes.serializers import ClienteSerializer
from tintoreria.articulos.serializers import ArticuloSerializer
from tintoreria.servicios.serializers import ServicioSerializer
from tintoreria.empleados.serializers import EmpleadoSerializer
from tintoreria.notas.functions import impresion

class DetalleSerializer(ModelSerializer):
    #articulo = ArticuloSerializer(write_only=True)
    #servicio = ServicioSerializer(write_only=True)
    articulo = ArticuloSerializer()
    servicio = ServicioSerializer()

    class Meta:
        model = Detalle
        fields = ('cantidad',
                  'articulo',
                  'servicio',
                  'precio',
                  'precio_unitario')


class NotaSerializer(ModelSerializer):
    detalle = DetalleSerializer(many=True)
    cliente = ClienteSerializer(required=False)
    empleado = EmpleadoSerializer(required=False,allow_null=True)

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
                  'pagado',
                  'descuento',
                  'total',
                  'total_apagar',
                  'detalle')

    def create(self, validated_data):
        #print("**************CREATE******************")
        #print(validated_data)

        nota = Nota()
        c = validated_data.pop('cliente')
        cliente = Cliente.objects.get(id=c['id'])
        nota.cantidad = validated_data['cantidad']
        nota.observaciones = validated_data['observaciones']
        nota.status = 'NVA'
        nota.fecha_entrega = validated_data['fecha_entrega']
        nota.cliente = cliente
        nota.pagado = validated_data['pagado']
        nota.descuento = validated_data['descuento']
        nota.total = validated_data['total']
        nota.total_apagar = validated_data['total_apagar']
        #print(nota.pagado)
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
            detalle_nvo.precio_unitario = detalle['precio_unitario']
            #print(servicio_nota)
            detalle_nvo.save()

        #impresion(nota)

        return nota

    def update(self, instance, validated_data):
        print("**************UPDATE******************")
        #print(validated_data)
        c = validated_data.pop('cliente')
        #print c
        if c:
            cliente = Cliente.objects.get(id=c['id'])
            instance.cliente = cliente
        instance.fecha_entrega = validated_data.get('fecha_entrega',instance.fecha_entrega)
        instance.observaciones = validated_data.get('observaciones',instance.observaciones)
        c = validated_data.pop('empleado')
        #print c
        if c:
            empleado = Empleado.objects.get(id=c['id'])
            instance.empleado = empleado
        instance.status = validated_data.get('status',instance.status)
        instance.fecha_termino = validated_data.get('fecha_termino',instance.fecha_termino)
        instance.cantidad = validated_data.get('cantidad',instance.cantidad)
        instance.pagado = validated_data.get('pagado',instance.pagado)
        instance.descuento = validated_data.get('descuento',instance.descuento)

        Detalle.objects.filter(nota=instance).delete()

        detalle_nota = validated_data.get('detalle',instance.detalle)
        for detalle in detalle_nota:
            detalle_nvo = Detalle()
            detalle_nvo.nota = instance
            s = detalle.pop('servicio')
            servicio = Servicio.objects.get(id=s['id'])
            detalle_nvo.servicio = servicio
            a = detalle.pop('articulo')
            articulo = Articulo.objects.get(id=a['id'])
            detalle_nvo.articulo = articulo
            detalle_nvo.cantidad = detalle['cantidad']
            detalle_nvo.precio = detalle['precio']
            detalle_nvo.precio_unitario = detalle['precio_unitario']
            detalle_nvo.save()

        instance.save()

        return instance