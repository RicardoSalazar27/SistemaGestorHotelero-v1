(function () {
    let dataTable;
    let dataTableInit = false;

    // Configuración inicial de DataTable con opciones y botones personalizados
    const dataTableOptions = {
        destroy: true,
        language: {
            url: 'https://cdn.datatables.net/plug-ins/2.1.8/i18n/es-MX.json',
        },
        dom: '<"row mb-2"<"d-flex justify-content-start col-sm-6"f><"d-flex justify-content-end col-sm-6"B>>' +
             '<"row"<"col-sm-12"tr>>' +
             '<"row d-flex justify-content-between"<"col d-flex justify-content-start"l><"col d-flex justify-content-center"i><"col d-flex justify-content-end"p>>',
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
            { orderable: false, targets: [3, 4, 7] }  // Desactiva la ordenación en las columnas especificadas
        ]
    };

    // Inicializa la DataTable al cargar el documento
    initDataTable();

    /**
     * Inicializa la DataTable y la carga con datos.
     */
    async function initDataTable() {
        if (dataTableInit) {
            dataTable.destroy();  // Si ya existe una instancia de DataTable, la destruye para evitar duplicados
        }
        
        await listarClientes();  // Carga los datos de clientes

        dataTable = $("#datatable_clients").DataTable(dataTableOptions);
        dataTableInit = true;
    }

    /**
     * Recupera y muestra la lista de clientes en la tabla.
     */
    async function listarClientes() {
        try {
            const url = 'http://localhost:3000/api/clientes/listar';
            const response = await fetch(url);
            const clientes = await response.json();

            renderClientes(clientes);  // Llama a la función para mostrar los clientes en la tabla
        } catch (error) {
            console.error('Error al listar clientes:', error);
        }
    }

    /**
     * Rinde la lista de clientes en el cuerpo de la tabla.
     * @param {Array} clientes - Lista de clientes obtenida del servidor.
     */
    function renderClientes(clientes) {
        const tableBody = document.getElementById('tableBody_clients');
        tableBody.innerHTML = '';  // Limpia el contenido previo

        clientes.forEach((cliente, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td> 
                <td>${cliente.nombre}</td>
                <td>${cliente.apellidos}</td>
                <td>${cliente.correo}</td>
                <td>${cliente.telefono}</td>
                <td>${cliente.documento_identidad}</td>
                <td>${cliente.fecha_nacimiento}</td>
                <td>
                    <button class="btn btn-sm btn-primary" data-toggle="modal" data-target="#editarClienteModal${cliente.id}">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn btn-sm btn-danger btn-eliminarCliente" data-id="${cliente.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Agrega eventos para los botones de actualización y eliminación
        tableBody.addEventListener('click', handleClientActions);
    }

    /**
     * Maneja las acciones de edición y eliminación de clientes.
     * @param {Event} e - Evento de clic.
     */
    function handleClientActions(e) {
        const target = e.target;
        if (target.classList.contains('btn-actualizarCliente')) {
            const clienteId = target.getAttribute('data-id');
            actualizarCliente(clienteId);
        } else if (target.classList.contains('btn-eliminarCliente')) {
            const clienteId = target.getAttribute('data-id');
            confirmarEliminacion(clienteId);
        }
    }

    /**
     * Confirma y elimina un cliente de la lista.
     * @param {number} id - ID del cliente a eliminar.
     */
    function confirmarEliminacion(id) {
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
            if (result.isConfirmed) {
                await eliminarCliente(id);
                await initDataTable();  // Refresca la tabla tras la eliminación
            }
        });
    }

    /**
     * Envía una solicitud para eliminar un cliente.
     * @param {number} id - ID del cliente a eliminar.
     */
    async function eliminarCliente(id) {
        try {
            const datos = new FormData();
            datos.append('id', id);
            const url = 'http://localhost:3000/api/clientes/eliminar';
            const response = await fetch(url, { method: 'POST', body: datos });
            const resultado = await response.json();
            mostrarAlerta(resultado.titulo, resultado.mensaje, resultado.tipo);
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
        }
    }

    /**
     * Muestra una alerta utilizando SweetAlert.
     * @param {string} titulo - Título de la alerta.
     * @param {string} mensaje - Mensaje de la alerta.
     * @param {string} tipo - Tipo de alerta (success, error, etc.).
     */
    function mostrarAlerta(titulo, mensaje, tipo) {
        Swal.fire({
            icon: tipo,
            title: titulo,
            text: mensaje
        });
    }

    // Agregar cliente - Evento de botón de añadir cliente
    document.querySelector('.btnAgregarCliente').addEventListener('click', agregarCliente);

    /**
     * Agrega un nuevo cliente a la lista.
     */
    async function agregarCliente() {
        const nuevoCliente = {
            nombre: document.getElementById('nombre').value.trim(),
            apellidos: document.getElementById('apellidos').value.trim(),
            correo: document.getElementById('correo').value.trim(),
            telefono: document.getElementById('telefono').value.trim(),
            documento_identidad: document.getElementById('documento_identidad').value.trim(),
            fecha_nacimiento: document.getElementById('fecha_nacimiento').value
        };

        if (!nuevoCliente.nombre || !nuevoCliente.apellidos || !nuevoCliente.correo) {
            mostrarAlerta('Error', 'Todos los campos son obligatorios', 'error');
            return;
        }

        try {
            const datos = new FormData();
            Object.entries(nuevoCliente).forEach(([key, value]) => datos.append(key, value));
            const url = 'http://localhost:3000/api/clientes/crear';
            const response = await fetch(url, { method: 'POST', body: datos });
            const resultado = await response.json();
            mostrarAlerta(resultado.titulo, resultado.mensaje, resultado.tipo);
            $('#clientesModal').modal('hide');
            await initDataTable();
        } catch (error) {
            console.error('Error al agregar cliente:', error);
        }
    }

})();
