app.controller('articulosCtrl', function($http, $scope){
	inicializaArticulo = function(){
		$scope.articulo = {
			'descripcion': null,
			'descripcion_corta':null,
			'status': null
		}
	};

	inicializaArticulo();

	$scope.articulo_nvo = {
		'descripcion': null,
		'descripcion_corta':null,
		'status': null
	}

	$scope.agregar = function(){
		$('#AddModal').modal('show');
		inicializaArticulo();
	}

	$scope.mostrar = function(pagina){

        /*if (pagina == null)
            ruta = '/api/articulo/?page=1'
        else if (pagina === 'ant')
            ruta = $scope.articulos.previous;
        else if (pagina === 'sig')
            ruta = $scope.articulos.next;*/

        ruta = '/api/articulo/';

		$http.get(
			ruta		
		).then(
			function(response){
				//console.log(response.data);
				$scope.articulos = response.data;
			},
			function(err){
				console.log(err);
			}
		)
	}

	$scope.mostrar(null);

	$scope.propertyName = 'descripcion';
	$scope.reverse = false;

	$scope.sortBy = function(propertyName) {
	   $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
	   $scope.propertyName = propertyName;
	};

	$scope.guardar = function(){
		//console.log($scope.articulo);
		$scope.articulo.status = 'ACT';
		$http.post(
			'/api/articulo/',
			$scope.articulo
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

	$scope.borrar = function(articulo){
		$http.delete(
			'/api/articulo/' + articulo.id
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

	$scope.update = function(articulo){
		
		$('#UpdateModal').modal('show');
		$scope.descripcion_m = articulo.descripcion;
		$scope.descripcion_corta_m = articulo.descripcion_corta;
		$scope.status_m = articulo.status;
		$scope.id_m = articulo.id;

	}

	$scope.actualizar = function(){
		$scope.articulo_nvo = {
		'descripcion': $scope.descripcion_m,
		'descripcion_corta':$scope.descripcion_corta_m,
		'status': $scope.status_m
		}
		//console.log($scope.articulo);
		$http.put(
			'/api/articulo/'+$scope.id_m+'/',$scope.articulo_nvo
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