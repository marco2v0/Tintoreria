app.controller('preciosCtrl', function($http, $scope){
	inicializaPrecio = function(){
		$scope.precio = {
			'articulo': null,
			'servicio': null,
			'vigencia_del': null,
			'vigencia_al': null,
			'importe':null
		}
	}

	$scope.precio_nvo = {
		'articulo': null,
		'servicio': null,
		'vigencia_del': null,
		'vigencia_al': null,
		'importe':null
	}

    inicializaArticulos = function () {
        let ruta = '/api/articulo/';
        $http.get(ruta).then(
            function (response) {
                $scope.articulos = response.data;
                console.log($scope.articulos);
            });
    };

    inicializaServicios = function () {
        let ruta = '/api/servicio/';
        $http.get(ruta).then(
            function (response) {
                $scope.servicios = response.data;
                //console.log($scope.servicios);
            });
    };

	$scope.agregar = function(){
		$('#AddModal').modal('show');
		inicializaPrecio();
	}

	$scope.mostrar = function(pagina){
		inicializaArticulos();
        inicializaPrecio();
        inicializaServicios();

        /*if (pagina === null)
            ruta = '/api/precio/?page=1'
        else if (pagina === 'ant')
            ruta = $scope.precios.previous;
        else if (pagina === 'sig')
            ruta = $scope.precios.next;*/

        ruta = '/api/precio/';

		$http.get(
			ruta
		).then(
			function(response){
				console.log(response.data);
				$scope.precios = response.data;
			},
			function(err){
				console.log(err);
			}
		)
	}

	$scope.mostrar(null);

	$scope.propertyName = 'articulo.descripcion';
	$scope.reverse = false;

	$scope.sortBy = function(propertyName) {
	   $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
	   $scope.propertyName = propertyName;
	};

	$scope.guardar = function(){
		//console.log($scope.empleado);
		$http.post(
			'/api/precio/',
			$scope.precio
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

	$scope.borrar = function(precio){
		$http.delete(
			'/api/precio/'+precio.id
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

	$scope.update = function(precio){
		
		$('#UpdateModal').modal('show');
		$scope.articulo_m = precio.articulo;
		$scope.servicio_m = precio.servicio;
		$scope.vigencia_del_m = new Date(precio.vigencia_del);
		$scope.vigencia_al_m = new Date(precio.vigencia_al);
		$scope.importe_m = precio.importe;
		$scope.id_m = precio.id;

	}

	$scope.actualizar = function(){
		$scope.precio_nvo = {
		'articulo': $scope.articulo_m,
		'servicio': $scope.servicio_m,
		'vigencia_del': $scope.vigencia_del_m,
		'vigencia_al': $scope.vigencia_al_m,
		'importe': $scope.importe_m
		}
		//console.log($scope.empleado);
		$http.put(
			'/api/precio/'+$scope.id_m+'/',$scope.precio_nvo
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