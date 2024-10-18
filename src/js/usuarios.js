(function () {
    let dataTable;
    let dataTableInit = false;

    // Opciones de DataTables
const dataTableOption = {
    destroy: true,
    language: {
        url: 'https://cdn.datatables.net/plug-ins/2.1.8/i18n/es-MX.json',
    },
    columnDefs: [
        { orderable: false, targets: [3, 4, 8] }  // Desactiva la ordenación en la columna 8 (índice 7)
    ]
};


    // Diccionarios para roles y estatus
    const roles = {
        1: 'Administrador',
        2: 'Empleado General',
        3: 'Limpieza'
    };

    const estatus = {
        1: 'Activo',
        0: 'Inactivo'
    };

    // Función para inicializar la DataTable
    async function initDataTable() {
        if (dataTableInit) {
            dataTable.destroy();  // Destruye la DataTable si ya existe
        }

        await listarUsers();  // Llama a la función para listar usuarios

        // Inicializa la DataTable
        dataTable = $("#datatable_users").DataTable(dataTableOption);

        dataTableInit = true;  // Marca que la DataTable fue inicializada
    }

    // Función para listar los usuarios
    async function listarUsers() {
        try {
            const url = 'http://localhost:3000/api/usuarios/listar';
            const resultado = await fetch(url);
            const usuarios = await resultado.json();

            // Selecciona el cuerpo de la tabla
            const tableBody = document.getElementById('tableBody_users');

            // Limpia el contenido del tbody antes de agregar nuevas filas
            tableBody.innerHTML = '';

            // Recorre los usuarios y genera las filas de la tabla
            usuarios.forEach((usuario, index) => {
                // Crea una nueva fila
                const row = document.createElement('tr');

                // Agrega celdas (td) a la fila con la información que quieres mostrar
                row.innerHTML = `
                    <td>${index + 1}</td> 
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.direccion}</td>
                    <td>${usuario.email}</td>
                    <td>${roles[usuario.rol_id]}</td> <!-- Muestra el rol legible -->
                    <td>${estatus[usuario.estatus]}</td> <!-- Muestra el estatus legible -->
                    <td>${usuario.fecha_creacion}</td>
                    <td>
                        <!-- Botón de editar -->
                        <button class="btn btn-sm btn-primary">
                            <i class="fa-solid fa-pen"></i>
                        </button>

                        <!-- Formulario para eliminar -->
                        <form method="POST" action="/admin/usuarios/eliminar" class="d-inline">
                            <input type="hidden" name="id" value="${usuario.id}">
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
