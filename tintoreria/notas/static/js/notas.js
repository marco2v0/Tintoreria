app.controller('notasCtrl', function ($http, $scope) {
    $scope.empleados = [];

    function inicializaAgregar() {
        $scope.nota = {
            'cantidad': null,
            'observaciones': null,
            'cliente': null,
            'fecha_entrega': null,
            'detalle': []
        };
        cantidad_nota = 0;
    }

    var cantidad_nota = 0;

    inicializaEmpleados = function () {
        let ruta = '/api/empleado/';
        $http.get(ruta).then(
            function (response) {
                $scope.empleados = response.data.results;
                //console.log($scope.empleados);
            });
    };

    inicializaClientes = function () {
        let ruta = '/api/cliente/';
        $http.get(ruta).then(
            function (response) {
                $scope.clientes = response.data.results;
                //console.log($scope.clientes);
            });
    };

    inicializaArticulos = function () {
        let ruta = '/api/articulo/';
        $http.get(ruta).then(
            function (response) {
                $scope.articulos = response.data.results;
                //console.log($scope.articulos);
            });
    };

    inicializaServicios = function () {
        let ruta = '/api/servicio/';
        $http.get(ruta).then(
            function (response) {
                $scope.servicios = response.data.results;
                //console.log($scope.servicios);
            });
    };

    const limpiaDetalle = function () {
        $scope.detalle = {
            'articulo': null,
            'cantidad': null,
            'servicio': null,
            'precio_unitario': null,
            'precio_total': null
        }
    }

    limpiaDetalle();

    $scope.mostrar = function (pagina) {
        inicializaEmpleados();
        inicializaClientes();
        inicializaArticulos();
        inicializaAgregar();
        inicializaServicios();
        if (pagina == null)
            ruta = '/api/nota/?page=1'
        else if (pagina == 'ant')
            ruta = $scope.notas.previous;
        else if (pagina == 'sig')
            ruta = $scope.notas.next;

        $http.get(
            ruta
        ).then(
            function (response) {
                //console.log(response.data);
                $scope.notas = response.data;
            },
            function (err) {
                console.log(err);
            }
        )
    }

    $scope.mostrar(null);

    $scope.guardar = function () {
        console.log($scope.nota);
        if ($scope.nota.cliente != null) {
            if ($scope.nota.fecha_entrega != null) {
                $scope.nota.cantidad = cantidad_nota;
                $http.post(
                    '/api/nota/',
                    $scope.nota
                ).then(
                    function (response) {
                        alert("Registro guardado con exito");
                        //$('#alertSuccess').alert();
                        $scope.mostrar(null);
                        $('#AddModal').modal('hide');
                    },
                    function (err) {
                        console.log(err);
                    }
                )
            }
            else {
                alert("Debe ingresar la fecha de entrega");
            }
        }
        else {
            alert("Debe ingresar un cliente");
        }
    }

    $scope.guardarDet = function (nota) {
        //console.log($scope.nota);
        $scope.total_cantidad = 0;
        $scope.total_precio_total = 0;
        if ($scope.detalle.articulo != null) {
            if ($scope.detalle.cantidad != null) {
                if ($scope.detalle.servicio != null) {
                    cantidad_nota = parseInt(cantidad_nota) + parseInt($scope.detalle.cantidad);
                    let precioarticulo;
                    $http.get('/api/precio/?a=' + $scope.detalle.articulo.id + '&s=' + $scope.detalle.servicio.id).then(
                        function (response) {
                            precio = response.data.results[0];
                            //console.log(precio.importe);
                            $scope.detalle.precio_unitario = parseFloat(precio.importe);
                            $scope.detalle.precio_total = parseInt($scope.detalle.cantidad) * parseFloat(precio.importe);
                            $scope.nota.detalle.push($scope.detalle);
                            $scope.nota.detalle.forEach(function (valor, indice, array) {
                                $scope.total_cantidad += valor.cantidad;
                                $scope.total_precio_total += valor.precio_total;
                            });
                            limpiaDetalle();
                            document.getElementById("articulo_a").focus();
                        }
                    )
                }
                else {
                    alert("Debe ingresar al menos un servicio para el artículo");
                }
            }
            else {
                alert("Debe ingresar una cantidad para el artículo");
            }
        }
        else {
            alert("Debe ingresar un articulo");
        }

    }

    $scope.borrarDet = function (nota) {
        console.log($scope.nota.detalle.indexOf(nota));
        $scope.nota.detalle.splice($scope.nota.detalle.indexOf(nota), 1)
        partida = 0;
        $scope.nota.detalle.forEach(function (detalle) {
            partida += 1;
            detalle.partida = partida;
        })
        //partida += 1;

    }

    $scope.borrar = function (nota) {
        $http.delete(
            '/api/nota/' + nota.id
        ).then(
            function (response) {
                alert("Registro eliminado con exito");
                $scope.mostrar();
            },
            function (err) {
                console.log(err);
            }
        )

    }

    $scope.update = function (nota) {

        $('#UpdateModal').modal('show');
        $scope.empleado_m = nota.empleado.nombre;
        $scope.cliente_m = nota.cliente.nombre;
        $scope.descuento_m = nota.descuento;
        $scope.fecha_termino_m = nota.fecha_termino;
        $scope.fecha_entrega_m = nota.fecha_entrega;
        $scope.observaciones_m = nota.observaciones;
        $scope.status_m = nota.status;
        $scope.id_m = nota.id;

    }

    $scope.Catalogoclientes = function () {
        $('#ClienteModal').modal('show');
    }

    $scope.BuscaCliente = function (p_nombre) {
        let ruta = '/api/cliente/?q=' + p_nombre;
        $http.get(ruta).then(
            function (response) {
                $scope.busquedaclientes = response.data.results;
                //console.log($scope.busquedaclientes);
            });
    }

    $scope.AsignaCliente = function (cliente) {
        $('#ClienteModal').modal('hide');
        $scope.cliente_a = cliente.nombre + ' ' + cliente.paterno + ' ' + cliente.materno;
    }

    ObtienePrecio = function (p_articulo, p_servicio) {
        console.log(p_articulo);
        console.log(p_servicio)
        let ruta = '/api/precio/?a=' + p_articulo + '&s=' + p_servicio;
        console.log(ruta)
        $http.get(ruta).then(
            function (response) {
                precio = response.data.results;
                console.log(precio);
                return precio;
            }
        )
    };

    $scope.actualizar = function () {
        $scope.nota_nvo = {
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
        //console.log($scope.nota);
        $http.put(
            '/api/nota/' + $scope.id_m + '/', $scope.nota_nvo
        ).then(
            function (response) {
                alert("Registro actualizado con exito");
                $scope.mostrar();
                $('#UpdateModal').modal('hide');
            },
            function (err) {
                console.log(err);
            }
        )
    }

})