( function (){
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
            { orderable: false, targets: [2] }  // Desactiva la ordenación en la columna 8 (índice 7)
        ],
    };

    //Ejecutar Funciones
    initDataTable();

    // Función para inicializar la DataTable
    async function initDataTable() {
        if (dataTableInit) {
            dataTable.destroy();  // Destruye la DataTable si ya existe
        }

        await listarCategorias();  // Llama a la función para listar categorias

        // Inicializa la DataTable
        dataTable = $("#datatable_categorias").DataTable(dataTableOption);

        dataTableInit = true;  // Marca que la DataTable fue inicializada
    }

    async function listarCategorias(){
        try {

            const url = 'http://localhost:3000/api/categorias/listar';
            const resultado = await fetch(url);
            const categorias = await resultado.json();

            const estatusDictionary = {
                0: 'Inactivo',
                1: 'Activo'
            };

            // Selecciona el cuerpo de la tabla
            const tableBody = document.getElementById('tableBody_categorias');
    
            // Limpia el contenido del tbody antes de agregar nuevas filas
            tableBody.innerHTML = '';

            // Recorre las categorias y genera las filas de la tabla
            categorias.forEach((categoria, index) => {
                
                // Crea una nueva fila
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${index + 1}</td> 
                    <td>${categoria.nombre}</td>
                    <td class="text-center">${categoria.capacidad_maxima}</td>
                    <td>${estatusDictionary[categoria.estatus]}</td>
                    <td>
                        <!-- Botón de editar que abre el modal -->
                        <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editarCategoriaModal${categoria.id}">
                            <i class="fa-solid fa-pen"></i>
                        </button>

                        <!-- Modal Editar Categoria -->
                        <div class="modal fade modal-editarCategoria" id="editarCategoriaModal${categoria.id}" tabindex="-1" role="dialog" aria-labelledby="categoriasModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="categoriasModalLabel">Editar Categoria</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form method="POST">
                                            <div class="form-group">
                                                <label for="nombre">Nombre</label>
                                                <input type="text" class="form-control" id="nombre${categoria.id}" name="nombre" value="${categoria.nombre}" />
                                            </div>
                                            <div class="form-group">
                                                <label for="capacidad_maxima">Capacidad Maxima</label>
                                                <input type="number" class="form-control" id="capacidad_maxima${categoria.id}" name="capacidad_maxima" value="${categoria.capacidad_maxima}" />
                                            </div>
                                            <div class="form-group">
                                                <label for="estatus">Estatus</label>
                                                <select class="form-control" id="estatus${categoria.id}" name="estatus">
                                                    <option value="1" ${categoria.estatus == 1 ? 'selected' : ''}>Activo</option>
                                                    <option value="0" ${categoria.estatus == 0 ? 'selected' : ''}>Inactivo</option>
                                                </select>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                                <button type="button" class="btn btn-primary btn-actualizarCategoria" data-id="${categoria.id}">Guardar</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Botón de eliminar -->
                        <button class="btn btn-sm btn-danger btn-eliminarCategoria" data-id="${categoria.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            // Delegación para actualizar categoria
            tableBody.addEventListener('click', function(e) {
                if (e.target.classList.contains('btn-actualizarCategoria')) {
                    const categoriaId = e.target.getAttribute('data-id');
                    actualizarCategoria(categoriaId);
                }
            // Delegación para eliminar categoria
                if (e.target.classList.contains('btn-eliminarCategoria')) {
                    const categoriaId = e.target.getAttribute('data-id');
                    confirmarEliminacion(categoriaId);
                }
            });

            // Subir actualización del cliente
            async function actualizarCategoria(id) {
                const categoria = {
                    id,
                    nombre: document.querySelector(`#nombre${id}`).value.trim(),
                    capacidad_maxima: document.querySelector(`#capacidad_maxima${id}`).value.trim(),
                    estatus: document.querySelector(`#estatus${id}`).value
                };
                await subirActualizacionCategoria(categoria);  // Envía los datos para actualización
            }

            async function subirActualizacionCategoria(categoria) {
                const datos = new FormData();
                Object.entries(categoria).forEach(([key, value]) => datos.append(key, value));

                try {
                    const url = 'http://localhost:3000/api/categorias/actualizar';
                    const respuesta = await fetch(url, {
                        method: 'POST',
                        body: datos
                    });
            
                    const resultado = await respuesta.json();
                    mostrarAlerta(resultado.titulo, resultado.mensaje, resultado.tipo);
            
                    // Cerrar el modal inmediatamente
                    const modal = document.querySelector(`#editarCategoriaModal${categoria.id}`);
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

                        const url = `http://localhost:3000/api/categorias/eliminar`;
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