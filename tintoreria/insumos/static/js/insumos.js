app.controller('insumosCtrl', function($http, $scope){
	$scope.insumo = {
		'descripcion': null,
		'costo': null
	}

	$scope.insumo_nvo = {
		'descripcion': null,
		'costo': null
	}

	$scope.mostrar = function(){
		$http.get(
			'/api/insumo/'		
		).then(
			function(response){
				console.log(response.data);
				$scope.insumos = response.data;
			},
			function(err){
				console.log(err);
			}
		)
	}

	$scope.mostrar();

	$scope.guardar = function(){
		console.log($scope.insumo);
		$http.post(
			'/api/insumo/',
			$scope.insumo
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

	$scope.borrar = function(insumo){
		$http.delete(
			'/api/insumo/'+insumo.id
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

	$scope.update = function(insumo){
		
		$('#UpdateModal').modal('show');
		$scope.descripcion_m = insumo.descripcion;
		$scope.costo_m = insumo.costo;
		$scope.id_m = insumo.id;

	}

	$scope.actualizar = function(){
		$scope.insumo_nvo = {
		'descripcion': $scope.descripcion_m,
		'costo': $scope.costo_m,
		}
		console.log($scope.insumo);
		$http.put(
			'/api/insumo/'+$scope.id_m+'/',$scope.insumo_nvo
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