<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="dashboard__heading"><?php echo $titulo; ?></h1>
            </div><!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active">Starter Page</li>
                </ol>
            </div><!-- /.col -->
            <div class="col-12">
            <div class="card card-primary">
                    <div class="card-header">
                        <h3 class="card-title">Información General</h3>
                    </div>

                    <form method="POST" action="/" enctype="multipart/form-data">
                        <div class="card-body">
                            <div class="form-group">
                                <label for="nombre">Nombre</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="nombre"
                                    name="nombre"
                                    placeholder="Tu Nombre"
                                    value="<?php echo $informacion->nombre ?? ''; ?>" />
                            </div>

                            <div class="form-group">
                                <label for="telefono">Teléfono</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="telefono"
                                    name="telefono"
                                    placeholder="Tu Teléfono"
                                    value="<?php echo $informacion->telefono ?? ''; ?>" />
                            </div>

                            <div class="form-group">
                                <label for="correo">Correo</label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="correo"
                                    name="correo"
                                    placeholder="Tu Correo"
                                    value="<?php echo $informacion->correo ?? ''; ?>" />
                            </div>

                            <div class="form-group">
                                <label for="ubicacion">Ubicación</label>
                                <textarea
                                    class="form-control"
                                    id="ubicacion"
                                    name="ubicacion"
                                    placeholder="Tu Ubicación"
                                    rows="4"><?php echo $informacion->ubicacion ?? ''; ?></textarea>
                            </div>
                        </div>

                        <div class="card-footer">
                            <button type="submit" class="btn btn-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>