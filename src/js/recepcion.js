(async function () {
  // Seleccionar todas las habitaciones
  const habitaciones = document.querySelectorAll('.small-box');

  // Iterar sobre cada habitación y asignar evento click
  habitaciones.forEach((habitacion) => {
    habitacion.addEventListener('click', () => {
      // Obtener los datos de la habitación
      const id = habitacion.dataset.id;
      const nombre = habitacion.dataset.nombre;
      const estadoActual = habitacion.dataset.estado;

      // Acciones según el estado actual de la habitación
      if (estadoActual === 'Ocupada') {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
          title: '¿Qué quieres hacer?',
          text: `Estás cambiando el estado de la habitación ${nombre}`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Finalizar Estadia',
          cancelButtonText: 'Limpieza Intermedia',
          reverseButtons: true
        }).then((result) => {
          let nuevoEstadoId;

          if (result.isConfirmed) {
            nuevoEstadoId = 7; // Estado: Finalizar Estadia
            enviarEstado(id, nuevoEstadoId, 'La estadía ha concluido, la habitación ahora necesita limpieza.');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            nuevoEstadoId = 3; // Estado: Limpieza Intermedia
            enviarEstado(id, nuevoEstadoId, 'La habitación ahora está en Limpieza Intermedia.');
          }
        });
      } else if (estadoActual === 'Cliente por Llegar') {
        Swal.fire({
          title: 'Confirmación',
          text: '¿El huésped ya ha llegado a la habitación?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, Confirmo'
        }).then((result) => {
          if (result.isConfirmed) {
            enviarEstado(id, 2, 'El huésped ha llegado. La habitación ahora está Ocupada.');
          }
        });
      }
    });
  });

  /**
   * Función para enviar el nuevo estado al backend y actualizar el DOM
   * @param {number} habitacionId - ID de la habitación a actualizar
   * @param {number} estadoId - Nuevo estado ID
   * @param {string} mensajeExito - Mensaje a mostrar al usuario en caso de éxito
   */
  async function enviarEstado(habitacionId, estadoId, mensajeExito) {
    const datos = new FormData();
    datos.append('id', habitacionId);
    datos.append('estado_id', estadoId);

    try {
      const url = 'http://localhost:3000/admin/recepcion/actualizarEstado'; // Ruta a tu API
      const respuesta = await fetch(url, {
        method: 'POST',
        body: datos
      });

      const resultado = await respuesta.json();

      if (resultado.tipo === 'success') {
        Swal.fire({
          title: 'Actualizado',
          text: mensajeExito,
          icon: 'success'
        });

        // Consultar la API de estados
        const url2 = 'http://localhost:3000/api/estadohabitaciones/listar';
        const respuesta2 = await fetch(url2);
        const estados = await respuesta2.json();

        // Buscar los detalles del nuevo estado
        const nuevoEstado = estados.find((estado) => estado.id === String(estadoId));
        if (!nuevoEstado) {
          console.error('Estado no encontrado en la API de estados');
          return;
        }

        // Actualizar el DOM según el nuevo estado
        const habitacion = document.querySelector(`.small-box[data-id='${habitacionId}']`);
        if (habitacion) {
          habitacion.dataset.estado = nuevoEstado.nombre_estado; // Actualiza el dataset
          const estadoLabel = habitacion.querySelector('p');
          if (estadoLabel) {
            estadoLabel.textContent = nuevoEstado.nombre_estado; // Actualiza el texto del estado
          }
          habitacion.className = `small-box bg-${nuevoEstado.color}`; // Actualiza el color de fondo

          // Actualizar la descripción en el enlace
          const estadoDescripcion = habitacion.querySelector('.small-box-footer');
          if (estadoDescripcion) {
            estadoDescripcion.textContent = nuevoEstado.descripcion; // Actualiza la descripción
            estadoDescripcion.innerHTML += ' <i class="fas fa-arrow-circle-right"></i>'; // Reagregar el ícono
          }

          // Actualizar Icono
          const iconElement = habitacion.querySelector('.icon i');
          if (iconElement) {
              iconElement.className = `fas fa-${nuevoEstado.icono}`;
          }

        }
      } else {
        Swal.fire({
          title: 'Error',
          text: resultado.mensaje || 'No se pudo actualizar el estado.',
          icon: 'error'
        });
      }
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      Swal.fire({
        title: 'Error',
        text: 'No se pudo conectar al servidor.',
        icon: 'error'
      });
    }
  }
})();
