from rest_framework.serializers import ModelSerializer
from tintoreria.articulos.models import Articulo

class ArticuloSerializer(ModelSerializer):

	def to_internal_value(self, data):
		obj = super(ArticuloSerializer, self).to_internal_value(data)
		instance_id = data.get('id', None)
		if instance_id:
			obj['id'] = instance_id
		return obj

	class Meta:
		model  = Articulo
		fields = ('id',
			      'descripcion',
			      'status')