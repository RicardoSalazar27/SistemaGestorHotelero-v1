<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <div class="d-flex align-items-center">
                    <i class="nav-icon fas fa-users mr-2"></i>
                    <h1 class="h4 mb-0"><?php echo $titulo; ?></h1>
                </div>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active">DataTables</li>
                </ol>
            </div>
        </div>
    </div>
</section>

<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex justify-content-between">
                            <h1 class="h4 mb-0">Catalogo de Clientes</h1>
                            <button id="btnAgregarUsuario" class="btn btn-primary" data-toggle="modal" data-target="#clientesModal">Agregar Nuevo</button>
                        </div>
                    </div>
                    <div class="card-body">
                        <table id="datatable_clients" class="table table-striped">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Correo</th>
                                <th>Telefono</th>
                                <th>DNI</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody_clients"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Modal -->
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
        <form action="clientes/crear" method="POST">
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
                <button type="submit" class="btn btn-primary">Guardar</button>
            </div>
        </form>
      </div>
    </div>
  </div>
</div>
