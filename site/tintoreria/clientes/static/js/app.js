const app = angular.module('App', [])

app.config(function($httpProvider) {
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
});

app.controller('clientesCtrl', function($http, $scope){

	inicializaCliente = function(){
		$scope.cliente = {
			'nombre': null,
			'paterno': null,
			'materno': null,
			'direccion': null,
			'ciudad': null,
			'colonia': null,
			'cp': null,
			'estado': null,
			'tel_fijo': null,
			'tel_movil': null,
			'tel_trabajo': null,
			'email': null,
			'status': null,
			'sexo': null
		}
	};

	$scope.cliente_nvo = {
		'nombre': null,
		'paterno': null,
		'materno': null,
		'direccion': null,
		'ciudad': null,
		'colonia': null,
		'cp': null,
		'estado': null,
		'tel_fijo': null,
		'tel_movil': null,
		'tel_trabajo': null,
		'email': null,
		'status': null,
		'sexo': null
	}

	$scope.agregar = function(){
		$('#AddModal').modal('show');
		inicializaCliente();
	}

	$scope.mostrar = function(){
		$http.get(
			'/api/cliente/'		
		).then(
			function(response){
				//console.log(response.data);
				$scope.clientes = response.data;
			},
			function(err){
				console.log(err);
			}
		)
	}

	$scope.mostrar();

	$scope.propertyName = 'nombre';
	$scope.reverse = false;

	$scope.sortBy = function(propertyName) {
	   $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
	   $scope.propertyName = propertyName;
	};

	$scope.guardar = function(){
		//console.log($scope.cliente);
		if ($scope.cliente.nombre != null) {
			if ($scope.cliente.paterno != null) {
				if ($scope.cliente.direccion != null) {
					if ($scope.cliente.colonia != null) {
						if ($scope.cliente.sexo != null) {
							$scope.cliente.status = 'ACT';
							$http.post(
								'/api/cliente/',
								$scope.cliente		
							).then(
								function(response){
									$scope.mensaje = 'Registro guardado con exito';
					                $('#MensajeModal').modal('show');
									$scope.mostrar();
									$('#AddModal').modal('hide');
								},
								function(err){
									console.log(err);
								}
							)
						}
						else {
		                $scope.mensaje = 'Debe ingresar el sexo del cliente';
		                $('#MensajeModal').modal('show');
		            	}
					}
					else {
		                $scope.mensaje = 'Debe ingresar la colonia del cliente';
		                $('#MensajeModal').modal('show');
		            }
				}
				else {
	                $scope.mensaje = 'Debe ingresar la dirección del cliente';
	                $('#MensajeModal').modal('show');
	            }
			}
			else {
	                $scope.mensaje = 'Debe ingresar el apellido paterno del cliente';
	                $('#MensajeModal').modal('show');
	            }
		}
		else {
                $scope.mensaje = 'Debe ingresar el nombre del cliente';
                $('#MensajeModal').modal('show');
            }
	}

	$scope.borrar = function(cliente){
		$http.delete(
			'/api/cliente/'+cliente.id
		).then(
			function(response){
				$scope.mensaje = 'Registro eliminado con exito';
				$('#MensajeModal').modal('show');
				$scope.mostrar();
			},
			function(err){
				console.log(err);
			}
		)
		
	}

	$scope.update = function(cliente){
		
		$('#UpdateModal').modal('show');
		$scope.nombre_m = cliente.nombre;
		$scope.paterno_m = cliente.paterno;
		$scope.materno_m = cliente.materno;
		$scope.direccion_m = cliente.direccion;
		$scope.ciudad_m = cliente.ciudad;
		$scope.colonia_m = cliente.colonia;
		$scope.cp_m = cliente.cp;
		$scope.estado_m = cliente.estado;
		$scope.tel_fijo_m = cliente.tel_fijo;
		$scope.tel_movil_m = cliente.tel_movil;
		$scope.tel_trabajo_m = cliente.tel_trabajo;
		$scope.email_m = cliente.email;
		$scope.sexo_m = cliente.sexo;
		$scope.status_m = cliente.status;
		$scope.id_m = cliente.id;
	}

	$scope.actualizar = function(){
		$scope.cliente_nvo = {
		'nombre': $scope.nombre_m,
		'paterno': $scope.paterno_m,
		'materno': $scope.materno_m,
		'direccion': $scope.direccion_m,
		'ciudad': $scope.ciudad_m,
		'colonia': $scope.colonia_m,
		'cp': $scope.cp_m,
		'estado': $scope.estado_m,
		'tel_fijo': $scope.tel_fijo_m,
		'tel_movil': $scope.tel_movil_m,
		'tel_trabajo': $scope.tel_trabajo_m,
		'email': $scope.email_m,
		'status': $scope.status_m,
		'sexo': $scope.sexo_m
		}
		console.log($scope.cliente);
		$http.put(
			'/api/cliente/'+$scope.id_m+'/',$scope.cliente_nvo	
		).then(
			function(response){
				$scope.mensaje = 'Registro actualizado con exito';
                $('#MensajeModal').modal('show');
				$scope.mostrar();
				$('#UpdateModal').modal('hide');
			},
			function(err){
				console.log(err);
			}
		)
	}

})