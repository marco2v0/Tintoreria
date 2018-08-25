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
        $scope.total_cantidad = 0;
        $scope.total_precio_total = 0;
    }

    var cantidad_nota = 0;
    var cantidad_nota_m = 0;

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
            'precio': null
        }
    }

    const limpiaDetalleM = function () {
        $scope.detalle_m = {
            'articulo': null,
            'cantidad': null,
            'servicio': null,
            'precio_unitario': null,
            'precio': null
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
        console.log('*********NOTA A GUARDAR*********');
        console.log($scope.nota);
        if ($scope.nota.cliente != null) {
            if ($scope.nota.fecha_entrega != null) {
                $scope.nota.cantidad = cantidad_nota;
                $http.post(
                    '/api/nota/',
                    $scope.nota
                ).then(
                    function (response) {
                        $scope.mensaje = 'Registro guardado con exito';
                        $('#MensajeModal').modal('show');
                        $scope.mostrar(null);
                        $('#AddModal').modal('hide');
                    },
                    function (err) {
                        console.log(err);
                    }
                )
            }
            else {
                $scope.mensaje = 'Debe ingresar la fecha de entrega';
                $('#MensajeModal').modal('show');
            }
        }
        else {
            $scope.mensaje = 'Debe ingresar un cliente';
            $('#MensajeModal').modal('show');
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
                            $scope.detalle.precio = parseInt($scope.detalle.cantidad) * parseFloat(precio.importe);
                            $scope.nota.detalle.push($scope.detalle);
                            $scope.nota.detalle.forEach(function (valor, indice, array) {
                                $scope.total_cantidad += valor.cantidad;
                                $scope.total_precio_total += valor.precio;
                            });
                            limpiaDetalle();
                            document.getElementById("articulo_a").focus();
                        }
                    )
                }
                else {
                    $scope.mensaje = 'Debe ingresar al menos un servicio para el artículo';
                    $('#MensajeModal').modal('show');
                }
            }
            else {
                $scope.mensaje = 'Debe ingresar una cantidad para el artículo';
                $('#MensajeModal').modal('show');
            }
        }
        else {
            $scope.mensaje = 'Debe ingresar un articulo';
            $('#MensajeModal').modal('show');
        }

    }

    $scope.guardarDetM = function (nota) {
        //console.log($scope.nota);
        $scope.total_cantidad_m = 0;
        $scope.total_precio_total_m = 0;
        if ($scope.detalle_m.articulo != null) {
            if ($scope.detalle_m.cantidad != null) {
                if ($scope.detalle_m.servicio != null) {
                    cantidad_nota_m = parseInt(cantidad_nota_m) + parseInt($scope.detalle_m.cantidad);
                    let precioarticulo_m;
                    $http.get('/api/precio/?a=' + $scope.detalle_m.articulo.id + '&s=' + $scope.detalle_m.servicio.id).then(
                        function (response) {
                            precio_m = response.data.results[0];
                            //console.log(precio.importe);
                            $scope.detalle_m.precio_unitario = parseFloat(precio_m.importe);
                            $scope.detalle_m.precio = parseInt($scope.detalle_m.cantidad) * parseFloat(precio_m.importe);
                            $scope.nota_m.detalle.push($scope.detalle_m);
                            $scope.nota_m.detalle.forEach(function (valor, indice, array) {
                                $scope.total_cantidad_m += valor.cantidad;
                                $scope.total_precio_total_m += valor.precio;
                            });
                            limpiaDetalleM();
                            document.getElementById("articulo_m").focus();
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

        if ($scope.nota.status == 'ASG') {
            $scope.mensaje = 'No puede borrar la nota ya que ha sido asignada';
            $('#MensajeModal').modal('show');
        }
        else {
            $http.delete(
                '/api/nota/' + nota.id
            ).then(
                function (response) {
                    $scope.mensaje = 'Registro eliminado con exito';
                    $('#MensajeModal').modal('show');
                    $scope.mostrar();
                },
                function (err) {
                    console.log(err);
                }
            )
        }

    }

    $scope.update = function (nota) {

        $scope.nota_m = nota;
        $scope.nota_m.fecha_entrega = new Date($scope.nota_m.fecha_entrega);
        console.log('*****NOTA_M****');
        console.log($scope.nota_m);

        if ($scope.nota_m.status == 'ASG') {
            $scope.mensaje = 'No puede editar la nota ya que ha sido asignada';
            $('#MensajeModal').modal('show');
        }
        else {
            $('#UpdateModal').modal('show');
            $scope.total_cantidad_m = 0;
            $scope.total_precio_total_m = 0;
            //Ciclo para obtener la cantidad total, precio total y precio unitario
            $scope.nota_m.detalle.forEach(function (valor, indice, array) {
                $scope.total_cantidad_m += valor.cantidad;
                $scope.total_precio_total_m += valor.precio;
            });
        }

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

    $scope.asignaCliente = function (cliente) {
        $('#ClienteModal').modal('hide');
        $scope.nota.cliente = cliente;
    }

    $scope.actualizar = function (nota) {
        console.log($scope.nota_m);
        $http.put(
            '/api/nota/' + nota.id + '/',
            nota
        ).then(
            function (response) {
                $scope.mensaje = 'Registro actualizado con exito';
                $('#MensajeModal').modal('show');
                $scope.mostrar();
                $('#UpdateModal').modal('hide');
            },
            function (err) {
                console.log(err);
            }
        )
    }

    $scope.updateEmpleado = function (nota) {

        if (nota.status == 'ASG') {
            $scope.mensaje = 'La nota seleccionada ya fue asignada';
            $('#MensajeModal').modal('show');
        }
        else if (nota.status == 'NVA') {
            //console.log(nota);
            $scope.notaActualizaEmpleado = nota;
            let ruta = '/api/empleado/?status=ACT';
            $http.get(ruta).then(
                function (response) {
                    $scope.busquedaempleado = response.data.results;
                    //console.log($scope.busquedaempleado);
                    $('#EmpleadoModal').modal('show');
                });
        }

    }

    $scope.asignaEmpleado = function (nota, empleado) {
        console.log('***nota actualizar empleado*****');
        nota.empleado = empleado;
        nota.status = 'ASG';
        let fechaActual = new Date();
        nota.fecha_termino = fechaActual;
        console.log(nota);

        let ruta = '/api/nota/' + nota.id + '/';
        $http.put(ruta, nota).then(
            function (response) {
                $('#EmpleadoModal').modal('hide');
                //$scope.nota.cliente = cliente;
                $scope.mensaje = 'Registro actualizado con exito';
                $('#MensajeModal').modal('show');
                $scope.mostrar();
            });
    }

})