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
	}

	$scope.mostrar = function(){
		$http.get(
			'/api/cliente/'		
		).then(
			function(response){
				$scope.clientes = response.data;
			},
			function(err){
				console.log(err);
			}
		)
	}

	$scope.mostrar();

	$scope.guardar = function(){
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