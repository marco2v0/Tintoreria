app.controller('articulosCtrl', function($http, $scope){
	$scope.articulo = {
		'descripcion': null,
		'status': null
	}

	$scope.articulo_nvo = {
		'descripcion': null,
		'status': null
	}

	$scope.mostrar = function(){
		$http.get(
			'/api/articulo/'		
		).then(
			function(response){
				console.log(response.data);
				$scope.articulos = response.data;
			},
			function(err){
				console.log(err);
			}
		)
	}

	$scope.mostrar();

	$scope.guardar = function(){
		console.log($scope.articulo);
		$http.post(
			'/api/articulo/',
			$scope.articulo
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

	$scope.borrar = function(articulo){
		$http.delete(
			'/api/articulo/'+articulo.id
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

	$scope.update = function(articulo){
		
		$('#UpdateModal').modal('show');
		$scope.descripcion_m = articulo.descripcion;
		$scope.status_m = articulo.status;
		$scope.id_m = articulo.id;

	}

	$scope.actualizar = function(){
		$scope.articulo_nvo = {
		'descripcion': $scope.descripcion_m,
		'status': $scope.status_m
		}
		console.log($scope.articulo);
		$http.put(
			'/api/articulo/'+$scope.id_m+'/',$scope.articulo_nvo
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