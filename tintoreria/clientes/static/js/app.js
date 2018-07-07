const app = angular.module('App', [])

app.config(function($httpProvider) {
  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
});

app.controller('clientesCtrl', function($http, $scope){
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

	$scope.mostrar = function(){
		$http.get(
			'/api/cliente/'		
		).then(
			function(response){
				console.log(response.data.results);
				$scope.clientes = response.data.results;
			},
			function(err){
				console.log(err);
			}
		)
	}

	$scope.mostrar();

	$scope.guardar = function(){
		console.log($scope.cliente);
		$http.post(
			'/api/cliente/',
			$scope.cliente		
		).then(
			function(response){
				alert("Registro guardado con exito");
				$scope.mostrar();
				$('#AddModal').modal('hide');
			},
			function(err){
				console.log(err);
			}
		)
		
	}

	$scope.borrar = function(cliente){
		$http.delete(
			'/api/cliente/'+cliente.id
		).then(
			function(response){
				alert("Registro eliminado con exito");
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
				alert("Registro actualizado con exito");
				$scope.mostrar();
				$('#UpdateModal').modal('hide');
			},
			function(err){
				console.log(err);
			}
		)
	}

	/*
	$http.put(
		'/api/',
		{"nombre":"Raul","paterno":"Flores","materno":"Arroyo"}		
	).then(
		function(response){
			$scope.clientes = response.data;
		},
		function(err){
			console.log(err);
		}
	)

	$http.delete(
		'/api/'		
	).then(
		function(response){
			$scope.clientes = response.data;
		},
		function(err){
			console.log(err);
		}
	)*/
})