app.controller('notasCtrl', function($http, $scope){
	$scope.nota = {
		'cantidad': null,
		'persona_servicio': null,
		'observaciones': null,
		'status': null,
		'cliente': null,
		'fecha_termino': null,
		'fecha_entrega': null,
		'descuento': null,
		'servicio': null,
		'fecha_captura': null
	}

	$scope.nota_nvo = {
		'cantidad': null,
		'persona_servicio': null,
		'observaciones': null,
		'status': null,
		'cliente': null,
		'fecha_termino': null,
		'fecha_entrega': null,
		'descuento': null,
		'servicio': null,
		'fecha_captura': null
	}

	$scope.mostrar = function(){
		$http.get(
			'/api/nota/'		
		).then(
			function(response){
				console.log(response.data);
				$scope.notas = response.data;
			},
			function(err){
				console.log(err);
			}
		)
	}

	$scope.mostrar();

	$scope.guardar = function(){
		console.log($scope.nota);
		$http.post(
			'/api/nota/',
			$scope.nota
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

	$scope.borrar = function(nota){
		$http.delete(
			'/api/nota/'+nota.id
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

	$scope.update = function(nota){
		
		$('#UpdateModal').modal('show');
		$scope.cantidad_m = nota.cantidad;
		$scope.persona_servicio_m = nota.persona_servicio;
		$scope.observaciones_m = nota.observaciones;
		$scope.status_m = nota.status;
		$scope.cliente_m = nota.cliente;
		$scope.fecha_termino_m = nota.fecha_termino;
		$scope.fecha_entrega_m = nota.fecha_entrega;
		$scope.descuento_m = nota.descuento;
		$scope.servicio_m = nota.servicio;
		$scope.fecha_captura_m = nota.fecha_captura;
		$scope.id_m = nota.id;

	}

	$scope.actualizar = function(){
		$scope.cliente_nvo = {
		'cantidad': $scope.cantidad_m,
		'persona_servicio': $scope.persona_servicio_m,
		'observaciones': $scope.observaciones_m,
		'status': $scope.status_m,
		'cliente': $scope.cliente_m,
		'fecha_termino': $scope.fecha_termino_m,
		'fecha_entrega': $scope.fecha_entrega_m,
		'descuento': $scope.descuento_m,
		'servicio': $scope.servicio_m
		}
		console.log($scope.nota);
		$http.put(
			'/api/nota/'+$scope.id_m+'/',$scope.nota_nvo	
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