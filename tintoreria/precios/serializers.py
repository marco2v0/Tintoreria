from rest_framework.serializers import ModelSerializer
from tintoreria.precios.models import Precio


class PrecioSerializer(ModelSerializer):

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
