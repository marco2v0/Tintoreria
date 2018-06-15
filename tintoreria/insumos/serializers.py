from rest_framework.serializers import ModelSerializer
from tintoreria.insumos.models import Insumo

class InsumoSerializer(ModelSerializer):

	class Meta:
		model  = Insumo
		fields = ('id',
			      'descripcion',
			      'costo')