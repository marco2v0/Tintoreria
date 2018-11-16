from rest_framework.serializers import ModelSerializer
from tintoreria.empleados.models import Empleado

class EmpleadoSerializer(ModelSerializer):

    def to_internal_value(self, data):
        obj = super(EmpleadoSerializer, self).to_internal_value(data)
        instance_id = data.get('id', None)
        if instance_id:
            obj['id'] = instance_id
        return obj

    class Meta:
        model = Empleado
        fields = ('id',
                  'nombre',
                  'paterno',
                  'materno',
                  'puesto',
                  'status')