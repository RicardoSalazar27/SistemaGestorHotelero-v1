(function (){

    let dataTable;
    let dataTableInit = false;

    // Opciones de DataTables
    const dataTableOption = {
        destroy: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/2.1.8/i18n/es-MX.json',
        },
        //dom: 'Bfrtip', // Agrega la sección para los botones
        dom: '<"row mb-2"<"d-flex justify-content-start col-sm-6"f><"d-flex justify-content-end col-sm-6"B>>' +  // B-> botones, F -> búsqueda
        '<"row"<"col-sm-12"tr>>' +             // T -> tabla
         '<"row d-flex justify-content-between"<"col d-flex justify-content-start"l><"col d-flex justify-content-center"i><"col d-flex justify-content-end"p>>' ,  // L-> de entradas  - I -> número de resultados por página, P-> paginador
        buttons: [
            {
                extend: 'excelHtml5',
                text: '<i class="fa-solid fa-file-excel"></i>',
                titleAttr: 'Exportar a Excel',
                exportOptions: {
                    columns: ':not(.no-export)' // Asegúrate de que la clase 'no-export' esté en la columna que quieres ocultar
                },
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fa-solid fa-file-pdf"></i>',
                titleAttr: 'Exportar a PDF',
                exportOptions: {
                    columns: ':not(.no-export)' // Asegúrate de que la clase 'no-export' esté en la columna que quieres ocultar
                },
                className: 'btn btn-danger'
            },
            {
                extend: 'csvHtml5',
                text: '<i class="fa-solid fa-file-csv"></i>',
                titleAttr: 'Exportar a CSV',
                exportOptions: {
                    columns: ':not(.no-export)' // Asegúrate de que la clase 'no-export' esté en la columna que quieres ocultar
                },
                className: 'btn btn-primary'
            },
            {
                extend: 'print',
                text: '<i class="fa-solid fa-print"></i>',
                titleAttr: 'Imprimir',
                exportOptions: {
                    columns: ':not(.no-export)' // Asegúrate de que la clase 'no-export' esté en la columna que quieres ocultar
                },
                className: 'btn btn-info'
            }

        ],
        columnDefs: [
            { orderable: false, targets: [6,8] },  // Desactiva la ordenación en la columna 8 (índice 7)
            { visible: false, targets: [5] }
        ],
    };


    //Ejecutar Funciones
    initDataTable();

    // Función para inicializar la DataTable
    async function initDataTable() {
        if (dataTableInit) {
            dataTable.destroy();  // Destruye la DataTable si ya existe
        }

        await listarHabitaciones();  // Llama a la función para listar usuarios

        // Inicializa la DataTable
        dataTable = $("#datatable_habitaciones").DataTable(dataTableOption);

        dataTableInit = true;  // Marca que la DataTable fue inicializada
    }

    async function listarHabitaciones() {
        try {
            const url = 'http://localhost:3000/api/habitaciones/listar';
            const resultado = await fetch(url);
            const habitaciones = await resultado.json();
    
            const url2 = 'http://localhost:3000/api/niveles/listar';
            const resultado2 = await fetch(url2);
            const niveles = await resultado2.json();

            const url3 = 'http://localhost:3000/api/categorias/listar';
            const resultado3 = await fetch(url3);
            const categorias = await resultado3.json();
    
            const estatusDictionary = {
                0: 'Inactivo',
                1: 'Activo'
            };

            // Selecciona el cuerpo de la tabla
            const tableBody = document.getElementById('tableBody_habitaciones');
    
            // Limpia el contenido del tbody antes de agregar nuevas filas
            tableBody.innerHTML = '';
    
            // Recorre las habitaciones y genera las filas de la tabla
            habitaciones.forEach((habitacion, index) => {
                // Encuentra el nombre del nivel correspondiente al `nivel_id` de la habitación
                const nivel = niveles.find(nivel => nivel.id === habitacion.nivel_id);
                const nombreNivel = nivel ? nivel.nombre : 'Sin Nivel';

                const categoria = categorias.find(categoria => categoria.id === habitacion.categoria_id)
                const nombreCategoria = categoria ? categoria.nombre : 'Sin Categoria';

                // Genera todas las opciones del select dinámicamente
                let opcionesNiveles = '';
                niveles.forEach(nivel => {
                    opcionesNiveles += `
                        <option value="${nivel.id}" ${habitacion.nivel_id === nivel.id ? 'selected' : ''}>${nivel.nombre}</option>
                    `;
                });

                let opcionesCategoria = '';
                categorias.forEach( categoria =>{
                    opcionesCategoria += `
                        <option value="${categoria.id}" ${habitacion.categoria_id === categoria.id ? 'selected' : ''}>${categoria.nombre}</option>
                    `;
                });
    
                // Crea una nueva fila
                const row = document.createElement('tr');
    
                // Agrega celdas (td) a la fila con la información que quieres mostrar
                row.innerHTML = `
                    <td>${index + 1}</td> 
                    <td>${habitacion.nombre}</td>
                    <td>${nombreNivel}</td> <!-- Muestra el nombre del nivel en lugar del ID -->
                    <td>${nombreCategoria}</td>
                    <td>${habitacion.precio}</td>
                    <td>${habitacion.tarifa}</td>
                    <td>${habitacion.detalles}</td>
                    <td>${estatusDictionary[habitacion.estatus]}</td>
                    <td>
                        <!-- Botón de editar que abre el modal -->
                        <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editarHabitacionModal${habitacion.id}">
                            <i class="fa-solid fa-pen"></i>
                        </button>

                        <!-- Modal Editar Habitacion -->
                        <div class="modal fade modal-editarHabitacion" id="editarHabitacionModal${habitacion.id}" tabindex="-1" role="dialog" aria-labelledby="habitacionesModalLabel" aria-hidden="true">

                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="habitacionesModalLabel">Editar Habitacion</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form method="POST">
                                            <div class="form-group">
                                                <label for="nombre">Nombre</label>
                                                <input type="text" class="form-control" id="nombre${habitacion.id}" name="nombre" value="${habitacion.nombre}" />
                                            </div>
                                            <div class="form-group">
                                                <label for="nivel_id">Nivel</label>
                                                <select class="form-control" id="nivel_id${habitacion.id}" name="nivel_id">
                                                     ${opcionesNiveles} <!-- Aquí se incluyen todas las opciones generadas -->
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="categoria_id">Categoria</label>
                                                <select class="form-control" id="categoria_id${habitacion.id}" name="categoria_id">
                                                     ${opcionesCategoria} <!-- Aquí se incluyen todas las opciones generadas -->
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="precio">Precio</label>
                                                <input type="number" class="form-control" id="precio${habitacion.id}" name="precio" value="${habitacion.precio}" />
                                            </div>
                                            <div class="form-group">
                                                <label for="detalles">Detalles</label>
                                                <input type="text" class="form-control" id="detalles${habitacion.id}" name="detalles" value="${habitacion.detalles}" />
                                            </div>
                                            <div class="form-group">
                                                <label for="estatus">Estatus</label>
                                                <select class="form-control" id="estatus${habitacion.id}" name="estatus">
                                                    <option value="1" ${habitacion.estatus == 1 ? 'selected' : ''}>Activo</option>
                                                    <option value="0" ${habitacion.estatus == 0 ? 'selected' : ''}>Inactivo</option>
                                                </select>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                                <button type="button" class="btn btn-primary btn-actualizarHabitacion" data-id="${habitacion.id}">Guardar</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <!-- Botón de eliminar -->
                        <button class="btn btn-sm btn-danger btn-eliminarHabitacion" data-id="${habitacion.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            // Delegación para actualizar habitacion
            tableBody.addEventListener('click', function(e) {
                if (e.target.classList.contains('btn-actualizarHabitacion')) {
                    const habitacioniD = e.target.getAttribute('data-id');
                    actualizarHabitacion(habitacioniD);
                }
            // Delegación para eliminar habitacion
                if (e.target.classList.contains('btn-eliminarHabitacion')) {
                    const habitacionId = e.target.getAttribute('data-id');
                    confirmarEliminacion(habitacionId);
                }
            });

            // Subir actualización del cliente
            async function actualizarHabitacion(id) {
                const habitacion = {
                    id,
                    nombre: document.querySelector(`#nombre${id}`).value.trim(),
                    nivel_id: document.querySelector(`#nivel_id${id}`).value.trim(),
                    categoria_id: document.querySelector(`#categoria_id${id}`).value.trim(),
                    precio: document.querySelector(`#precio${id}`).value.trim(),
                    detalles: document.querySelector(`#detalles${id}`).value.trim(),
                    estatus: document.querySelector(`#estatus${id}`).value
                };
                await subirActualizacionHabitacion(habitacion);  // Envía los datos para actualización
            }

            async function subirActualizacionHabitacion(habitacion) {
                const datos = new FormData();
                Object.entries(habitacion).forEach(([key, value]) => datos.append(key, value));

                try {
                    const url = 'http://localhost:3000/api/habitaciones/actualizar';
                    const respuesta = await fetch(url, {
                        method: 'POST',
                        body: datos
                    });
            
                    const resultado = await respuesta.json();
                    mostrarAlerta(resultado.titulo, resultado.mensaje, resultado.tipo);
            
                    // Cerrar el modal inmediatamente
                    const modal = document.querySelector(`#editarHabitacionModal${habitacion.id}`);
                    if (modal) {
                        $(modal).modal('hide');
                    }
            
                    // Llama a listarClients para actualizar los datos sin destruir DataTable
                    await initDataTable();
            
                } catch (error) {
                    console.log(error);
                }
            }

        } catch (error) {
            console.log(error);
        }

        function confirmarEliminacion(id){
            Swal.fire({
                title: '¿Estás seguro?',
                text: "Esta acción no se puede deshacer.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {//result.isConfirmed verifica si el usuario ha hecho clic en "Sí, eliminar".
                    try {
                        const datos = new FormData();
                        datos.append('id', id);

                        const url = `http://localhost:3000/api/habitaciones/eliminar`;
                        const respuesta = await fetch(url, {
                            method: 'POST',
                            body: datos
                        });
                        
                        const resultado = await respuesta.json();
                        mostrarAlerta(resultado.titulo, resultado.mensaje, resultado.tipo);
                        
                        if (resultado.tipo === 'success') { //l servidor indica que la eliminación fue exitosa
                            await initDataTable();
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            });   
        }
        
    }

    function mostrarAlerta(titulo, mensaje, tipo) {
        Swal.fire({
            icon: tipo,
            title: titulo,
            text: mensaje,
        }).then(() => {
            $('.modal').modal('hide'); // Cierra todos los modales activos
        });
    }  

})();