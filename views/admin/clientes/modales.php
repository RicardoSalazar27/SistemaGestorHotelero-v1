<!-- Modal Crear-->
<div class="modal fade" id="clientesModal" tabindex="-1" role="dialog" aria-labelledby="clientesModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="clientesModalLabel">Agregar Nuevo</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!--<form action="clientes/crear" method="POST">-->
            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input 
                    type="text"
                    class="form-control"
                    id="nombre"
                    name="nombre"
                    placeholder="Tu Nombre"
                />
            </div>
            <div class="form-group">
                <label for="apellidos">Apellidos</label>
                <input 
                    type="text"
                    class="form-control"
                    id="apellidos"
                    name="apellidos"
                    placeholder="Tus Apellidos"
                />
            </div>
            <div class="form-group">
                <label for="correo">Correo</label>
                <input 
                    type="email"
                    class="form-control"
                    id="correo"
                    name="correo"
                    placeholder="Tu Correo"
                />
            </div>
            <div class="form-group">
                <label for="telefono">Telefono</label>
                <input 
                    type="text"
                    class="form-control"
                    id="telefono"
                    name="telefono"
                    placeholder="Tu Telefono"
                />
            </div>
            <div class="form-group">
                <label for="documento_identidad">DNI</label>
                <input 
                    type="text"
                    class="form-control"
                    id="documento_identidad"
                    name="documento_identidad"
                    placeholder="Tu DNI"
                />
            </div>
            <div class="form-group">
                <label for="fecha_nacimiento">Fecha de Nacimiento</label>
                <input 
                    type="date"
                    class="form-control"
                    id="fecha_nacimiento"
                    name="fecha_nacimiento"
                />
            </div>

            <!-- Botones en el formulario -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="submit" class="btn btn-primary btnAgregarCliente">Guardar</button>
            </div>
        <!--</form>-->
      </div>
    </div>
  </div>
</div>