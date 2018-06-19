from rest_framework.serializers import ModelSerializer
from tintoreria.articulos.models import Articulo

class ArticuloSerializer(ModelSerializer):

	class Meta:
		model  = Articulo
		fields = ('id',
			      'descripcion',
			      'status',
			      'clasificacion')