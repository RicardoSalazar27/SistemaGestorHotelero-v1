<!-- Modal Crear-->
<div class="modal fade" id="habitacionesModal" tabindex="-1" role="dialog" aria-labelledby="habitacionesModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="habitacionesModalLabel">Agregar Nuevo</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <div class="form-group">
                <label for="nombre">Nombre</label>
                <input 
                    type="text"
                    class="form-control"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre De Habitacion Ej. 101"
                />
            </div>
            <div class="form-group">
                <label for="nivel_id">Nivel</label>
                <select class="form-control" id="nivel_id" name="nivel_id">
                    <?php 
                        foreach($niveles as $nivel){
                            ?>
                                <option value="<?php echo $nivel->id?>"><?php echo $nivel->nombre;?></option>
                            <?php
                        }
                    ?>
                 </select>
            </div>
            <div class="form-group">
                <label for="categoria_id">Categoria</label>
                <select class="form-control" id="categoria_id" name="categoria_id">
                    <?php 
                        foreach($categorias as $categoria){
                            ?>
                                <option value="<?php echo $categoria->id?>"><?php echo $categoria->nombre;?></option>
                            <?php
                        }
                    ?>
                 </select>
            </div>
            <div class="form-group">
                <label for="precio">Precio</label>
                <input 
                    type="number"
                    class="form-control"
                    id="precio"
                    name="precio"
                    min="0"
                    placeholder="Costo de la habitacion"
                />
            </div>
            <div class="form-group">
                <label for="tarifa">Tarifa</label>
                <input 
                    type="number"
                    class="form-control"
                    id="tarifa"
                    name="tarifa"
                    min="0"
                    placeholder="Tarifa"
                />
            </div>
            <div class="form-group">
                <label for="detalles">Descripcion De La Habitación</label>
                <input 
                    type="text"
                    class="form-control"
                    id="detalles"
                    name="detalles"
                    placeholder="Ej. Cama para 3 personas con balcon..."
                />
            </div>
            <div class="form-group">
                <label for="estatus">Estatus</label>
                <select class="form-control" id="estatus" name="estatus">
                    <option value="1">Activo</option>
                    <option value="0">Desactivado</option>
                 </select>
            </div>

            <!-- Botones en el formulario -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button type="submit" class="btn btn-primary btnSubirHabitacion">Guardar</button>
            </div>
      </div>
    </div>
  </div>
</div>