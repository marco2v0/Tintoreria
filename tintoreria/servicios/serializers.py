from rest_framework.serializers import ModelSerializer
from tintoreria.servicios.models import Servicio


class ServicioSerializer(ModelSerializer):

    def to_internal_value(self, data):
        obj = super(ServicioSerializer, self).to_internal_value(data)
        instance_id = data.get('id', None)
        if instance_id:
            obj['id'] = instance_id
        return obj

    class Meta:
        model = Servicio
        fields = ('id',
                  'nombre',
                  'status')
