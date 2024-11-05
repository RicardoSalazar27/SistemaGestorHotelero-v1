(function (){

    let dataTable;
    let dataTableInit = false;

    //Configuracion DataTable
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
            { orderable: false, targets: [3, 8] },  // Desactiva la ordenación en la columna 8 (índice 7)
            { visible: false, targets: [5,6,13,14] }
        ]
    };

    //Ejecutar Funciones
    initDatable();

    //Inicializamos DataTable
    async function initDatable(){
        if(dataTableInit){
            dataTable.destroy(); //Destruye la tabla si ya existe previamente
        }

        await listarUsers();

        //Inicializa DataTable
        dataTable = $('#datatable_users').DataTable(dataTableOption);

        dataTableInit = true;
    }

    // Funcion para listar a los usuarios
    async function listarUsers(){

        const rolesDictionary = {
            1: 'Administrador',
            2: 'General',
            3: 'Limpieza'
        };

        const estatusDictionary = {
            0: 'Inactivo',
            1: 'Activo'
        };

        try{

            const url = 'http://localhost:3000/api/usuarios/listar';
            const resultado = await fetch(url);
            const usuarios = await resultado.json();
            
            //Selecciono el cuerpo de la tabla
            const tableBody = document.getElementById('tableBody_users');

            tableBody.innerHTML = '';

            //Recorreo el arreglo de usuarios y genera las filas de la tabla
            usuarios.forEach((usuario, index) => {
                
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.direccion}</td>   
                    <td>${usuario.email}</td>
                    <td>${usuario.password}</td>
                    <td>${usuario.password2}</td>
                    <td>${usuario.fecha_nacimiento}</td>
                    <td>${rolesDictionary[usuario.rol_id]}</td>
                    <td>${estatusDictionary[usuario.estatus]}</td>
                    <td>${usuario.fecha_creacion}</td>
                    <td>${usuario.ultimo_acceso}</td>
                    <td class="text-center">
                        ${usuario.confirmado == 1 
                            ? '<i class="fa-solid fa-check-circle text-success" title="Confirmado"></i>' 
                            : '<i class="fa-solid fa-times-circle text-danger" title="No Confirmado"></i>'}
                    </td>
                    <td>${usuario.password_actual}</td>
                    <td>${usuario.password_nuevo}</td>
                    <td>
                        <!-- Botón de editar que abre el modal -->
                        <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editarUsuarioModal${usuario.id}">
                            <i class="fa-solid fa-pen"></i>
                        </button>

                        <!-- Modal Editar Cliente -->
                        <div class="modal fade modal-editarUsuario" id="editarUsuarioModal${usuario.id}" tabindex="-1" role="dialog" aria-labelledby="UsuarioModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="usuariosModalLabel">Editar Usuario</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form method="POST">
                                            <div class="form-group">
                                                <label for="nombre">Nombre</label>
                                                <input type="text" class="form-control" id="nombre${usuario.id}" name="nombre" value="${usuario.nombre}" />
                                            </div>
                                            <div class="form-group">
                                                <label for="apellidos">Apellidos</label>
                                                <input type="text" class="form-control" id="apellido${usuario.id}" name="apellidos" value="${usuario.apellido}" />
                                            </div>
                                            <div class="form-group">
                                                <label for="direccion">Direccion</label>
                                                <input type="text" class="form-control" id="direccion${usuario.id}" name="direccion" value="${usuario.direccion}" />
                                            </div>
                                            <div class="form-group">
                                                <label for="correo">Correo</label>
                                                <input type="email" class="form-control" id="correo${usuario.id}" name="correo" value="${usuario.email}" />
                                            </div>
                                            <div class="form-group">
                                                <label for="fecha_nacimiento">Fecha de Nacimiento</label>
                                                <input type="date" class="form-control" id="fecha_nacimiento${usuario.id}" name="fecha_nacimiento" value="${usuario.fecha_nacimiento}" />
                                            </div>
                                            <div class="form-group">
                                                <label for="rol_id">Rol</label>
                                                <select class="form-control" id="rol_id${usuario.id}" name="rol_id">
                                                    <option value="1" ${usuario.rol_id == 1 ? 'selected' : ''}>Administrador</option>
                                                    <option value="2" ${usuario.rol_id == 2 ? 'selected' : ''}>General</option>
                                                    <option value="3" ${usuario.rol_id == 3 ? 'selected' : ''}>Limpieza</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="estatus">Estatus</label>
                                                <select class="form-control" id="estatus${usuario.id}" name="estatus">
                                                    <option value="1" ${usuario.estatus == 1 ? 'selected' : ''}>Activo</option>
                                                    <option value="0" ${usuario.estatus == 0 ? 'selected' : ''}>Inactivo</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="confirmado">Confirmado</label>
                                                <select class="form-control" id="confirmado${usuario.id}" name="confirmado">
                                                    <option value="1" ${usuario.confirmado == 1 ? 'selected' : ''}>Confirmado</option>
                                                    <option value="0" ${usuario.confirmado == 0 ? 'selected' : ''}>No Confirmado</option>
                                                </select>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                                <button type="button" class="btn btn-primary btn-actualizarUsuario" data-id="${usuario.id}">Guardar</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        <!-- Botón de eliminar -->
                        <button class="btn btn-sm btn-danger btn-eliminarCliente" data-id="${usuario.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;

                tableBody.appendChild(row);                
            });

            // Delegación para actualizar usuario
            tableBody.addEventListener('click', function(e) {
                if (e.target.classList.contains('btn-actualizarUsuario')) {
                    const UsuarioId = e.target.getAttribute('data-id');
                    actualizarUsuario(UsuarioId);
                }
                // Delegación para eliminar cliente
                if (e.target.classList.contains('btn-eliminarUsuario')) {
                    const UsuarioId = e.target.getAttribute('data-id');
                    confirmarEliminacionUsuario(UsuarioId);
                }
                });

                // Subir actualización del cliente
                async function actualizarUsuario(id) {
                    const usuario = {
                        id,
                        nombre: document.querySelector(`#nombre${id}`).value.trim(),
                        apellido: document.querySelector(`#apellido${id}`).value.trim(),
                        direccion: document.querySelector(`#direccion${id}`).value.trim(),
                        email: document.querySelector(`#correo${id}`).value.trim(),
                        fecha_nacimiento: document.querySelector(`#fecha_nacimiento${id}`).value,
                        rol_id: document.querySelector(`#rol_id${id}`).value, // Value from select
                        estatus: document.querySelector(`#estatus${id}`).value, // Value from select
                        confirmado: document.querySelector(`#confirmado${id}`).value // Value from select
                    };
                    console.log(usuario);
                    //await subirActualizacionUsuario(usuario);  // Envía los datos para actualización
                }

        } catch(e){
            console.log(e);
        }
    }

})();