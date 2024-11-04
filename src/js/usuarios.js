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
        try{

            const url = 'http://localhost:3000/api/usuarios/listar';
            const resultado = await fetch(url);
            const usuarios = await resultado.json();
            console.log(usuarios);

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
                    <td>${usuario.rol_id}</td>
                    <td>${usuario.estatus}</td>
                    <td>${usuario.fecha_creacion}</td>
                    <td>${usuario.ultimo_acceso}</td>
                    <td>${usuario.confirmado}</td>
                    <td>${usuario.password_actual}</td>
                    <td>${usuario.password_nuevo}</td>
                    <td>
                    <!-- Botón de editar que abre el modal -->
                        <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editarClienteModal${usuario.id}">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                    
                    <!-- Botón de eliminar -->
                        <button class="btn btn-sm btn-danger btn-eliminarCliente" data-id="${usuario.id}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;

                tableBody.appendChild(row);

            });

        } catch(e){
            console.log(e);
        }
    }

})();