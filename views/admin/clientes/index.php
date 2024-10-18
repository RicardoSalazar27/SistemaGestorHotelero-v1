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
            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
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
        </div><!-- /.row -->
    </div><!-- /.container-fluid -->
</div>