app.controller('serviciosCtrl', function($http, $scope){
	inicializaServicio = function(){
		$scope.servicio = {
			'nombre': null,
			'nombre_corto':null,
			'status': null
		}
	}

	inicializaServicio();

	$scope.servicio_nvo = {
		'nombre': null,
		'nombre_corto':null,
		'status': null
	}

    $scope.agregar = function(){
        $('#AddModal').modal('show');
        inicializaServicio();
    }

	$scope.mostrar = function(){
		$http.get(
			'/api/servicio/'		
		).then(
			function(response){
				//console.log(response.data);
				$scope.servicios = response.data;
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
		//console.log($scope.empleado);
		$scope.servicio.status = 'ACT';
		$http.post(
			'/api/servicio/',
			$scope.servicio
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

	$scope.borrar = function(servicio){
		$http.delete(
			'/api/servicio/'+servicio.id
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

	$scope.update = function(servicio){
		
		$('#UpdateModal').modal('show');
		$scope.nombre_m = servicio.nombre;
		$scope.nombre_corto_m = servicio.nombre_corto;
		$scope.status_m = servicio.status;
		$scope.id_m = servicio.id;

	}

	$scope.actualizar = function(){
		$scope.servicio_nvo = {
		'nombre': $scope.nombre_m,
		'nombre_corto': $scope.nombre_corto_m,
		'status': $scope.status_m
		}
		//console.log($scope.empleado);
		$http.put(
			'/api/servicio/'+$scope.id_m+'/',$scope.servicio_nvo
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