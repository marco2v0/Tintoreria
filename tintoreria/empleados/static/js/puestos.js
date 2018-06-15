app.controller('puestosCtrl', function($http, $scope){
	$scope.puesto = {
		'descripcion': null,
		'status': null
	}

	$scope.puesto_nvo = {
		'descripcion': null,
		'status': null
	}

	$scope.mostrar = function(){
		$http.get(
			'/api/puesto/'		
		).then(
			function(response){
				console.log(response.data);
				$scope.puestos = response.data;
			},
			function(err){
				console.log(err);
			}
		)
	}

	$scope.mostrar();

	$scope.guardar = function(){
		console.log($scope.puesto);
		$http.post(
			'/api/puesto/',
			$scope.puesto
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

	$scope.borrar = function(puesto){
		$http.delete(
			'/api/puesto/'+puesto.id
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

	$scope.update = function(puesto){
		
		$('#UpdateModal').modal('show');
		$scope.descripcion_m = puesto.descripcion;
		$scope.status_m = puesto.status;
		$scope.id_m = puesto.id;

	}

	$scope.actualizar = function(){
		$scope.puesto_nvo = {
		'descripcion': $scope.descripcion_m,
		'status': $scope.status_m,
		}
		console.log($scope.puesto);
		$http.put(
			'/api/puesto/'+$scope.id_m+'/',$scope.puesto_nvo
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

})