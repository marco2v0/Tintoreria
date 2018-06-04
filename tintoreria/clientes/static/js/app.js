angular.module('App', [])
.controller('clientesCtrl', function($http, $scope){
	$scope.cliente = {
		'nombre': null,
		'paterno': null,
		'materno': null,
	}


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

	$scope.guardar = function(){
		$http.post(
			'/api/cliente/',
			$scope.cliente		
		).then(
			function(response){
				
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