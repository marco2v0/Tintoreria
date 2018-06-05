from rest_framework.serializers import ModelSerializer
from tintoreria.clientes.models import Cliente

class ClienteSerializer(ModelSerializer):

	class Meta:
		model  = Cliente
		fields = ('id','nombre','paterno','materno')