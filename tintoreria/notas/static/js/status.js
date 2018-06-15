app.controller('statusCtrl', function($http, $scope){
	$scope.stat = {
		'valor': null,
		'descripcion': null
	}

	$scope.stat_nvo = {
		'valor': null,
		'descripcion': null
	}

	$scope.mostrar = function(){
		$http.get(
			'/api/status/'		
		).then(
			function(response){
				console.log(response.data);
				$scope.status = response.data;
			},
			function(err){
				console.log(err);
			}
		)
	}

	$scope.mostrar();

	$scope.guardar = function(){
		console.log($scope.stat);
		$http.post(
			'/api/status/',
			$scope.stat
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

	$scope.borrar = function(stat){
		$http.delete(
			'/api/status/'+stat.id
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

	$scope.update = function(stat){
		
		$('#UpdateModal').modal('show');
		$scope.valor_m = stat.costo;
		$scope.descripcion_m = stat.descripcion;
		$scope.id_m = stat.id;

	}

	$scope.actualizar = function(){
		$scope.stat_nvo = {
		'valor': $scope.valor_m,
		'descripcion': $scope.descripcion_m
		}
		console.log($scope.stat);
		$http.put(
			'/api/status/'+$scope.id_m+'/',$scope.stat_nvo
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