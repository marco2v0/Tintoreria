app.controller('empleadosCtrl', function($http, $scope){
	$scope.empleado = {
		'nombre': null,
		'paterno': null,
		'materno': null,
		'puesto': null,
		'status': null
	}

	$scope.empleado_nvo = {
		'nombre': null,
		'paterno': null,
		'materno': null,
		'puesto': null,
		'status': null
	}

	$scope.mostrar = function(){
		$http.get(
			'/api/empleado/'		
		).then(
			function(response){
				console.log(response.data);
				$scope.empleados = response.data;
			},
			function(err){
				console.log(err);
			}
		)
	}

	$scope.mostrar();

	$scope.guardar = function(){
		console.log($scope.empleado);
		$http.post(
			'/api/empleado/',
			$scope.empleado
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

	$scope.borrar = function(empleado){
		$http.delete(
			'/api/empleado/'+empleado.id
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

	$scope.update = function(empleado){
		
		$('#UpdateModal').modal('show');
		$scope.nombre_m = empleado.nombre;
		$scope.paterno_m = empleado.paterno;
		$scope.materno_m = empleado.materno;
		$scope.puesto_m = empleado.puesto;
		$scope.status_m = empleado.status;
		$scope.id_m = empleado.id;

	}

	$scope.actualizar = function(){
		$scope.empleado_nvo = {
		'nombre': $scope.nombre_m,
		'paterno': $scope.paterno_m,
		'materno': $scope.materno_m,
		'puesto': $scope.puesto_m,
		'status': $scope.status_m
		}
		console.log($scope.empleado);
		$http.put(
			'/api/empleado/'+$scope.id_m+'/',$scope.empleado_nvo
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