app.controller('notasCtrl', function ($http, $scope) {
    $scope.empleados = [];

    function inicializaNota() {
        $scope.nota = {
            'cantidad': null,
            'observaciones': null,
            'cliente': null,
            'fecha_entrega': null,
            'pagado':0,
            'descuento':null,
            'total':null,
            'total_apagar':null,
            'detalle': []
        };
        cantidad_nota = 0;
        $scope.total_cantidad = 0;
        $scope.total_precio_total = 0;
    };

    function inicializaModificar() {
        $scope.nota_m = {
            'cantidad': null,
            'observaciones': null,
            'cliente': null,
            'fecha_entrega': null,
            'pagado':0,
            'descuento':null,
            'total':null,
            'total_apagar':null,
            'detalle': []
        };
        cantidad_nota_m = 0;
        $scope.total_cantidad_m = 0;
        $scope.total_precio_total_m = 0;
    }

    var cantidad_nota = 0;
    var cantidad_nota_m = 0;

    inicializaEmpleados = function () {
        let ruta = '/api/empleado/';
        $http.get(ruta).then(
            function (response) {
                $scope.empleados = response.data;
                //console.log($scope.empleados);
            });
    };

    inicializaClientes = function () {
        let ruta = '/api/cliente/';
        $http.get(ruta).then(
            function (response) {
                $scope.clientes = response.data;
                //console.log($scope.clientes);
            });
    };

    inicializaArticulos = function () {
        let ruta = '/api/articulo/';
        $http.get(ruta).then(
            function (response) {
                $scope.articulos = response.data;
                //console.log($scope.articulos);
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

    const limpiaDetalle = function () {
        $scope.detalle = {
            'articulo': null,
            'cantidad': null,
            'servicio': null,
            'precio_unitario': null,
            'precio': null
        }
    }

    const inicializaDetalle = function () {
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

    const inicializaDetalleM = function () {
        $scope.detalle_m = {
            'articulo': null,
            'cantidad': null,
            'servicio': null,
            'precio_unitario': null,
            'precio': null
        }
    }

    $scope.agregar = function(){
        $('#AddModal').modal('show');
        inicializaNota();
    }

    inicializaDetalle();
    inicializaDetalleM();

    $scope.mostrar = function (pagina) {
        inicializaEmpleados();
        inicializaClientes();
        inicializaArticulos();
        inicializaNota();
        inicializaModificar();
        inicializaServicios();

        /*if (pagina == null)
            ruta = '/api/nota/?page=1'
        else if (pagina === 'ant')
            ruta = $scope.notas.previous;
        else if (pagina === 'sig')
            ruta = $scope.notas.next;*/

        ruta = '/api/nota/';

        $http.get(
            ruta
        ).then(
            function (response) {
                console.log(response.data);
                $scope.notas = response.data;
            },
            function (err) {
                console.log(err);
            }
        )
    }

    $scope.mostrar(null);

    $scope.propertyName = 'fecha_entrega';
    $scope.reverse = false;

    $scope.sortBy = function(propertyName) {
       $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
       $scope.propertyName = propertyName;
    };

    $scope.guardar = function () {
        //console.log('*********NOTA A GUARDAR*********');
        //console.log($scope.nota);
        if ($scope.nota.cliente != null) {
            if ($scope.nota.fecha_entrega != null) {
                $scope.nota.cantidad = cantidad_nota;
                $scope.nota.descuento = $scope.descuento;
                $scope.nota.total = $scope.total_precio_total;
                $scope.nota.total_apagar = $scope.total_precio_final;
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
        if ($scope.detalle.articulo != null) {
            if ($scope.detalle.cantidad != null) {
                if ($scope.detalle.servicio != null) {
                    $scope.total_cantidad_descuento = 0;
                    $scope.total_cantidad = 0;
                    $scope.total_precio_total = 0;
                    cantidad_nota = parseInt(cantidad_nota) + parseInt($scope.detalle.cantidad);
                    let precioarticulo;
                    $http.get('/api/precio/?a=' + $scope.detalle.articulo.id + '&s=' + $scope.detalle.servicio.id).then(
                        function (response) {
                            precio = response.data[0];
                            //console.log(precio.importe);
                            $scope.detalle.precio_unitario = parseFloat(precio.importe);
                            $scope.detalle.precio = parseInt($scope.detalle.cantidad) * parseFloat(precio.importe);
                            $scope.nota.detalle.push($scope.detalle);
                            $scope.nota.detalle.forEach(function (valor, indice, array) {
                                $scope.total_cantidad += valor.cantidad;
                                $scope.total_precio_total += valor.precio;
                                //console.log($scope.detalle.servicio.nombre.substring(0,9));
                                if ($scope.detalle.servicio.nombre.substring(0,9) == 'Planchado'){
                                    $scope.total_cantidad_descuento += valor.cantidad;
                                }
                            });
                            $scope.descuento = Math.trunc($scope.total_cantidad_descuento / 12) * 12;
                            $scope.total_precio_final = $scope.total_precio_total - $scope.descuento;
                            $scope.ActualizaDebe();
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

    $scope.guardarDetM = function () {
        //console.log($scope.nota);
        if ($scope.detalle_m.articulo != null) {
            if ($scope.detalle_m.cantidad != null) {
                if ($scope.detalle_m.servicio != null) {
                    $scope.total_cantidad_m = 0;
                    $scope.total_precio_total_m = 0;
                    $scope.total_cantidad_descuento_m = 0;
                    let precioarticulo_m;
                    $http.get('/api/precio/?a=' + $scope.detalle_m.articulo.id + '&s=' + $scope.detalle_m.servicio.id).then(
                        function (response) {
                            precio_m = response.data[0];
                            //console.log(precio.importe);
                            $scope.detalle_m.precio_unitario = parseFloat(precio_m.importe);
                            $scope.detalle_m.precio = parseInt($scope.detalle_m.cantidad) * parseFloat(precio_m.importe);
                            $scope.nota_m.detalle.push($scope.detalle_m);
                            $scope.nota_m.detalle.forEach(function (valor, indice, array) {
                                $scope.total_cantidad_m += valor.cantidad;
                                $scope.total_precio_total_m += valor.precio;
                                //cantidad_nota_m = cantidad_nota_m + valor.cantidad;
                                console.log($scope.detalle_m.servicio.nombre.substring(0,9));
                                if ($scope.detalle_m.servicio.nombre.substring(0,9) == 'Planchado'){
                                    $scope.total_cantidad_descuento_m += valor.cantidad;
                                }
                            });
                            $scope.descuento_m = Math.trunc($scope.total_cantidad_descuento_m / 12) * 12;
                            $scope.total_precio_final_m = $scope.total_precio_total_m - $scope.descuento_m;
                            $scope.ActualizaDebeM();
                            limpiaDetalleM();
                            document.getElementById("articulo_m").focus();
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

    $scope.borrarDet = function (nota) {
        //console.log($scope.nota.detalle.indexOf(nota));
        $scope.nota.detalle.splice($scope.nota.detalle.indexOf(nota), 1)
        $scope.total_cantidad = 0;
        $scope.total_precio_total = 0;
        $scope.nota.detalle.forEach(function (valor, indice, array) {
            $scope.total_cantidad += valor.cantidad;
            $scope.total_precio_total += valor.precio;
        });
        //$scope.debe = $scope.total_precio_total - $scope.nota.pagado;
        $scope.ActualizaDebe();
        $scope.ActualizaDescuento();
        $scope.ActualizaTotalAPagar();
    }

    $scope.borrarDetM = function (nota) {
        //console.log($scope.nota.detalle.indexOf(nota));
        $scope.nota_m.detalle.splice($scope.nota_m.detalle.indexOf(nota), 1)
        $scope.total_cantidad_m = 0;
         $scope.total_precio_total_m = 0;
        $scope.nota_m.detalle.forEach(function (valor, indice, array) {
            $scope.total_cantidad_m += valor.cantidad;
            $scope.total_precio_total_m += valor.precio;
        });
        //$scope.debe_m = $scope.total_precio_total_m - $scope.nota_m.pagado;
        $scope.ActualizaDebeM();
    }

    $scope.borrar = function (nota) {

        if (nota.status === 'ASG') {
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
        console.log('*****NOTA_M****');
        console.log($scope.nota_m);

        if ($scope.nota_m.status === 'ASG') {
            $scope.mensaje = 'No puede editar la nota ya que ha sido asignada';
            $('#MensajeModal').modal('show');
        }
        else {
            $scope.nota_m.fecha_entrega = new Date($scope.nota_m.fecha_entrega);
            $scope.descuento_m = $scope.nota_m.descuento;
            $scope.total_precio_final_m = $scope.nota_m.total_apagar;
            $scope.debe_m = $scope.nota_m.total_apagar - $scope.nota_m.descuento - $scope.nota_m.pagado;
            $('#UpdateModal').modal('show');
            $scope.total_cantidad_m = 0;
            $scope.total_precio_total_m = 0;
            //Ciclo para obtener la cantidad total, precio total y precio unitario
            $scope.nota_m.detalle.forEach(function (valor, indice, array) {
                $scope.total_cantidad_m += valor.cantidad;
                $scope.total_precio_total_m += valor.precio;
            });
            //$scope.debe_m = $scope.total_precio_total_m - $scope.nota_m.pagado;
            $scope.ActualizaDebeM();
        }

    };

    $scope.ActualizaDebeM = function(){
        //console.log('Entra a funcion actualiza Debe M');
        $scope.debe_m = $scope.total_precio_final_m - $scope.nota_m.pagado;
    };

    $scope.ActualizaDebe = function(){
        //console.log('Entra a funcion actualiza Debe M');
        $scope.debe = $scope.total_precio_final - $scope.nota.pagado;
    };

    $scope.ActualizaDescuento = function(){
        $scope.descuento = Math.trunc($scope.total_cantidad / 12) * 12;
    };

    $scope.ActualizaTotalAPagar = function(){
        $scope.total_precio_final = $scope.total_precio_total - $scope.descuento;
    };

    $scope.ActualizaDescuentoM = function(){
        $scope.descuento_m = Math.trunc($scope.total_cantidad_m / 12) * 12;
    };

    $scope.ActualizaTotalAPagarM = function(){
        $scope.total_precio_final_m = $scope.total_precio_total_m - $scope.descuento_m;
    };

    $scope.consultar = function (nota) {

        $scope.nota_c = nota;
        $scope.nota_c.fecha_entrega = new Date($scope.nota_c.fecha_entrega);
        //console.log('*****NOTA_C****');
        //console.log($scope.nota_c);

        $('#ConsultaModal').modal('show');
        $scope.total_cantidad_c = 0;
        $scope.total_precio_total_c = 0;
        //Ciclo para obtener la cantidad total, precio total y precio unitario
        $scope.nota_c.detalle.forEach(function (valor, indice, array) {
            $scope.total_cantidad_c += valor.cantidad;
            $scope.total_precio_total_c += valor.precio;
        });
        $scope.debe_c = $scope.nota_c.total_apagar - $scope.nota_c.pagado;
    };

    $scope.Catalogoclientes = function () {
        $('#ClienteModal').modal('show');
        document.getElementById("cliente_ac").focus();
    };

    $scope.BuscaCliente = function (p_nombre) {
        console.log('consulta cliente');
        let ruta = '/api/cliente/?q=' + p_nombre;
        $http.get(ruta).then(
            function (response) {
                $scope.busquedaclientes = response.data;
                console.log($scope.busquedaclientes);
            });
    };

    $scope.asignaCliente = function (cliente) {
        $('#ClienteModal').modal('hide');
        $scope.nota.cliente = cliente;
        $scope.nota_m.cliente = cliente;
    };

    $scope.actualizar = function (nota) {
        console.log('$scope.total_cantidad_m =' + $scope.total_cantidad_m);
        $scope.nota_m.cantidad = $scope.total_cantidad_m;
        console.log($scope.nota_m);
        $http.put(
            '/api/nota/' + nota.id,
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
                    $scope.busquedaempleado = response.data;
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

        let ruta = '/api/nota/' + nota.id;
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