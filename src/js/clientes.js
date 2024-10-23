(function () {
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
                className: 'btn btn-success'
            },
            {
                extend: 'pdfHtml5',
                text: '<i class="fa-solid fa-file-pdf"></i>',
                titleAttr: 'Exportar a PDF',
                className: 'btn btn-danger'
            },
            {
                extend: 'csvHtml5',
                text: '<i class="fa-solid fa-file-csv"></i>',
                titleAttr: 'Exportar a CSV',
                className: 'btn btn-primary'
            },
            {
                extend: 'print',
                text: '<i class="fa-solid fa-print"></i>',
                titleAttr: 'Imprimir',
                className: 'btn btn-info'
            }

        ],
        columnDefs: [
            { orderable: false, targets: [3, 4, 7] }  // Desactiva la ordenación en la columna 8 (índice 7)
        ]
    };

    // Función para inicializar la DataTable
    async function initDataTable() {
        if (dataTableInit) {
            dataTable.destroy();  // Destruye la DataTable si ya existe
        }

        await listarClients();  // Llama a la función para listar usuarios

        // Inicializa la DataTable
        dataTable = $("#datatable_clients").DataTable(dataTableOption);

        dataTableInit = true;  // Marca que la DataTable fue inicializada
    }

    // Función para listar los usuarios
    async function listarClients() {
        try {
            const url = 'http://localhost:3000/api/clientes/listar';
            const resultado = await fetch(url);
            const clientes = await resultado.json();

            // Selecciona el cuerpo de la tabla
            const tableBody = document.getElementById('tableBody_clients');

            // Limpia el contenido del tbody antes de agregar nuevas filas
            tableBody.innerHTML = '';

            // Recorre los clientes y genera las filas de la tabla
            clientes.forEach((cliente, index) => {
                // Crea una nueva fila
                const row = document.createElement('tr');

                // Agrega celdas (td) a la fila con la información que quieres mostrar
                row.innerHTML = `
                    <td>${index + 1}</td> 
                    <td>${cliente.nombre}</td>
                    <td>${cliente.apellidos}</td>
                    <td>${cliente.correo}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.documento_identidad}</td>
                    <td>${cliente.fecha_nacimiento}</td>
                    <td>
                        <!-- Botón de editar que abre el modal -->
                        <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editarClienteModal${cliente.id}">
                            <i class="fa-solid fa-pen"></i>
                        </button>

                        <!-- Modal Editar Cliente -->
                        <div class="modal fade" id="editarClienteModal${cliente.id}" tabindex="-1" role="dialog" aria-labelledby="clientesModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="clientesModalLabel">Editar Cliente</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form action="clientes/editar?id=${cliente.id}" method="POST">
                                    <div class="form-group">
                                        <label for="nombre">Nombre</label>
                                        <input 
                                            type="text"
                                            class="form-control"
                                            id="nombre"
                                            name="nombre"
                                            value="${cliente.nombre}"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="apellidos">Apellidos</label>
                                        <input 
                                            type="text"
                                            class="form-control"
                                            id="apellidos"
                                            name="apellidos"
                                            value="${cliente.apellidos}"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="correo">Correo</label>
                                        <input 
                                            type="email"
                                            class="form-control"
                                            id="correo"
                                            name="correo"
                                            value="${cliente.correo}"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="telefono">Telefono</label>
                                        <input 
                                            type="text"
                                            class="form-control"
                                            id="telefono"
                                            name="telefono"
                                            value="${cliente.telefono}"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="documento_identidad">DNI</label>
                                        <input 
                                            type="text"
                                            class="form-control"
                                            id="documento_identidad"
                                            name="documento_identidad"
                                            value="${cliente.documento_identidad}"
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="fecha_nacimiento">Fecha de Nacimiento</label>
                                        <input 
                                            type="date"
                                            class="form-control"
                                            id="fecha_nacimiento"
                                            name="fecha_nacimiento"
                                            value="${cliente.fecha_nacimiento}"
                                        />
                                    </div>

                                    <!-- Botones en el formulario -->
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                        <button type="submit" class="btn btn-primary">Guardar</button>
                                    </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>

                        <!-- Formulario para eliminar -->
                        <form method="POST" action="/admin/clientes/eliminar" class="d-inline">
                            <input type="hidden" name="id" value="${cliente.id}">
                            <button class="btn btn-sm btn-danger" type="submit">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </form>
                    </td>
                `;


                // Agrega la fila a la tabla
                tableBody.appendChild(row);
            });

        } catch (error) {
            console.log(error);
        }
    }

    // Ejecuta la función cuando la ventana cargue
    window.addEventListener('load', async () => {
        await initDataTable();
    });
})();
