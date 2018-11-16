from rest_framework.serializers import ModelSerializer
from tintoreria.precios.models import Precio
from tintoreria.articulos.serializers import ArticuloSerializer
from tintoreria.servicios.serializers import ServicioSerializer
from tintoreria.articulos.models import Articulo
from tintoreria.servicios.models import Servicio


class PrecioSerializer(ModelSerializer):

    articulo = ArticuloSerializer()
    servicio = ServicioSerializer()

    def to_internal_value(self, data):
        obj = super(PrecioSerializer, self).to_internal_value(data)
        instance_id = data.get('id', None)
        if instance_id:
            obj['id'] = instance_id
        return obj

    class Meta:
        model = Precio
        fields = ('id',
                  'articulo',
                  'servicio',
                  'vigencia_del',
                  'vigencia_al',
                  'importe')

    def create(self, validated_data):

      precio = Precio()
      a = validated_data.pop('articulo')
      articulo = Articulo.objects.get(id=a['id'])
      precio.articulo = articulo
      s = validated_data.pop('servicio')
      servicio = Servicio.objects.get(id=s['id'])
      precio.servicio = servicio
      precio.vigencia_del = validated_data['vigencia_del']
      precio.vigencia_al = validated_data['vigencia_al']
      precio.importe = validated_data['importe']

      precio.save()

      return precio

    def update (self,instance,validated_data):
      
      a = validated_data.pop('articulo')
      articulo = Articulo.objects.get(id=a['id'])
      instance.articulo = articulo
      s = validated_data.pop('servicio')
      servicio = Servicio.objects.get(id=s['id'])
      instance.servicio = servicio
      instance.vigencia_del = validated_data.get('vigencia_del',instance.vigencia_del)
      instance.vigencia_al = validated_data.get('vigencia_al',instance.vigencia_al)
      instance.importe = validated_data.get('importe',instance.importe)

      instance.save()

      return instance
