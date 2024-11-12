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

        await listarNiveles();  // Llama a la función para listar categorias

        // Inicializa la DataTable
        dataTable = $("#datatable_niveles").DataTable(dataTableOption);

        dataTableInit = true;  // Marca que la DataTable fue inicializada
    }

    async function listarNiveles(){
        try {
            const url = 'http://localhost:3000/api/niveles/listar';
            const resultado = await fetch(url);
            const niveles = await resultado.json();

            const estatusDictionary = {
                0: 'Inactivo',
                1: 'Activo'
            };

            // Selecciona el cuerpo de la tabla
            const tableBody = document.getElementById('tableBody_niveles');
    
            // Limpia el contenido del tbody antes de agregar nuevas filas
            tableBody.innerHTML = '';

            niveles.forEach((nivel, index) => {
                // Crea una nueva fila
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${nivel.numero}</td> 
                    <td>${nivel.nombre}</td>
                    <td>${estatusDictionary[nivel.estatus]}</td>
                    <td>
                        <!-- Botón de editar que abre el modal -->
                        <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editarNivelModal${nivel.id}">
                            <i class="fa-solid fa-pen"></i>
                        </button>

                        <!-- Modal Editar Categoria -->
                        <div class="modal fade modal-editarNivel" id="editarNivelModal${nivel.id}" tabindex="-1" role="dialog" aria-labelledby="nivelesModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="nivelesModalLabel">Editar Nivel</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <form method="POST">
                                            <div class="form-group">
                                                <label for="nombre">Numero</label>
                                                <input type="number" class="form-control" id="numero${nivel.id}" name="numero" value="${nivel.numero}" />
                                            </div>
                                            <div class="form-group">
                                                <label for="capacidad_maxima">Nombre</label>
                                                <input type="text" class="form-control" id="nombre${nivel.id}" name="nombre" value="${nivel.nombre}" />
                                            </div>
                                            <div class="form-group">
                                                <label for="estatus">Estatus</label>
                                                <select class="form-control" id="estatus${nivel.id}" name="estatus">
                                                    <option value="1" ${nivel.estatus == 1 ? 'selected' : ''}>Activo</option>
                                                    <option value="0" ${nivel.estatus == 0 ? 'selected' : ''}>Inactivo</option>
                                                </select>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                                <button type="button" class="btn btn-primary btn-actualizarNivel" data-id="${nivel.id}">Guardar</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Botón de eliminar -->
                        <button class="btn btn-sm btn-danger btn-eliminarNivel" data-id="${nivel.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;

                tableBody.appendChild(row);

            });

            // Delegación para actualizar categoria
            tableBody.addEventListener('click', function(e) {
                if (e.target.classList.contains('btn-actualizarNivel')) {
                    const nivelId = e.target.getAttribute('data-id');
                    actualizarNivel(nivelId);
                }
            // Delegación para eliminar categoria
                if (e.target.classList.contains('btn-eliminarNivel')) {
                    const nivelId = e.target.getAttribute('data-id');
                    confirmarEliminacion(nivelId);
                }
            });

            // Subir actualización del cliente
            async function actualizarNivel(id) {
                const nivel = {
                    id,
                    numero: document.querySelector(`#numero${id}`).value,
                    nombre: document.querySelector(`#nombre${id}`).value.trim(),
                    estatus: document.querySelector(`#estatus${id}`).value
                };
                await subirActualizacionNivel(nivel);  // Envía los datos para actualización
            }

            async function subirActualizacionNivel(nivel){

                const datos = new FormData();
                Object.entries(nivel).forEach(([key, value]) => datos.append(key, value));

                try {
                    const url = 'http://localhost:3000/api/niveles/actualizar';
                    const respuesta = await fetch(url, {
                        method: 'POST',
                        body: datos
                    });

                    const resultado = await respuesta.json();
                    mostrarAlerta(resultado.titulo, resultado.mensaje, resultado.tipo);
            
                    // Cerrar el modal inmediatamente
                    const modal = document.querySelector(`#editarNivelModal${nivel.id}`);
                    if (modal) {
                        $(modal).modal('hide');
                    }
            
                    // Llama a listarNiveles para actualizar los datos sin destruir DataTable
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

                        const url = `http://localhost:3000/api/niveles/eliminar`;
                        const respuesta = await fetch(url, {
                            method: 'POST',
                            body: datos
                        });
                        
                        const resultado = await respuesta.json();
                        mostrarAlerta(resultado.titulo, resultado.mensaje, resultado.tipo);
                        
                        if (resultado.tipo === 'success') { //El servidor indica que la eliminación fue exitosa
                            await initDataTable();
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            });
        }
    }

    // Crear Nueva Categoria
    const botonSubirNivel = document.querySelector('.btnSubirNivel');
    if(botonSubirNivel){
        botonSubirNivel.addEventListener('click', async function(){
            //Crear objeto categoria con los valores de los campos del modal
            const nuevoNivel = {
                numero : document.getElementById('numero').value.trim(),
                nombre : document.getElementById('nombre').value.trim(),
                estatus : document.getElementById('estatus').value.trim()
            };

            // Verificar que los campos no esten vacios
            if(!nuevoNivel.numero || !nuevoNivel.nombre){
                mostrarAlerta('Error', 'Todos los campos son oblighatorios', 'error');
                return;
            }

            // Si no hay errores, enviar DATOS AL SERVIDOR
            try {
                
                const datos = new FormData();
                Object.entries(nuevoNivel).forEach(([key, value]) => datos.append(key, value));

                // Enviar peticion para agregar la categoria
                const url = 'http://localhost:3000/api/niveles/crear';
                const respuesta = await fetch(url, {
                    method: 'POST',
                    body: datos
                });

                const resultado = await respuesta.json();
                mostrarAlerta(resultado.titulo, resultado.mensaje, resultado.tipo);

                // Cierra el modal al guardar
                $('#nivelesModal').modal('hide');
            
                // Vuelve a cargar los datos para reflejar el nuevo usuario en la tabla
                await initDataTable();

            } catch (error) {
                console.log(error);
            }
        });
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