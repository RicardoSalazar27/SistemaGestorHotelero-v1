<?php
use Model\Categoria;
use Model\EstadoHabitacion;
?>

<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <div class="d-flex align-items-center">
                    <i class="nav-icon fas fa-concierge-bell mr-2"></i>
                    <h1 class="h4 mb-0"><?php echo $titulo; ?></h1>
                </div>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="/admin/index">Inicio</a></li>
                    <li class="breadcrumb-item active">Recepción</li>
                </ol>
            </div>
        </div>
    </div>
</section>

<!--Section Content-->
<section class="content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card card-primary card-tabs">
                    <div class="card-header p-0 pt-1">
                        <ul class="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                            <!-- Pestaña 'Todos' -->
                            <li class="nav-item">
                                <a class="nav-link active" id="custom-tabs-one-todos-tab" data-toggle="pill" href="#custom-tabs-one-todos" role="tab" aria-controls="custom-tabs-one-todos" aria-selected="true">Todos</a>
                            </li>
                            <!-- Pestañas dinámicas por nivel -->
                            <?php foreach ($niveles as $nivel): ?>
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-one-<?php echo $nivel->numero; ?>-tab" data-toggle="pill" href="#custom-tabs-one-<?php echo $nivel->numero; ?>" role="tab" aria-controls="custom-tabs-one-<?php echo $nivel->numero; ?>" aria-selected="false">
                                        <?php echo $nivel->nombre; ?>
                                    </a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>

                    <div class="card-body">
                        <div class="tab-content" id="custom-tabs-one-tabContent">
                            <!-- Contenido para 'Todos' -->
                            <div class="tab-pane fade show active" id="custom-tabs-one-todos" role="tabpanel" aria-labelledby="custom-tabs-one-todos-tab">
                                <div class="row">
                                    <?php foreach ($habitaciones as $habitacion):
                                        $estado = EstadoHabitacion::find($habitacion->estado_id);
                                        $categoria = Categoria::find($habitacion->categoria_id); ?>
                                        <div class="col-xxl-3 col-xl-3 col-lg-4 col-md-4 col-12">
                                            <div class="small-box bg-<?php echo $estado->color; ?>" 
                                                 data-id="<?php echo $habitacion->id; ?>" 
                                                 data-nombre="<?php echo $habitacion->nombre; ?>"
                                                 data-categoria="<?php echo $categoria->nombre; ?>"
                                                 data-estado="<?php echo $estado->nombre_estado;?>">
                                                <div class="inner">
                                                    <h3><?php echo $habitacion->nombre; ?></h3>
                                                    <h4><?php echo $categoria->nombre; ?></h4>
                                                    <p><?php echo $estado->nombre_estado; ?></p>
                                                </div>
                                                <div class="icon">
                                                    <i class="fas fa-<?php echo $estado->icono;?>"></i>
                                                </div>
                                                <a href="#" class="small-box-footer" data-id="<?php echo $habitacion->id;?>">
                                                    <?php echo $estado->descripcion; ?> <i class="fas fa-arrow-circle-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                            </div>

                            <!-- Contenido para cada nivel -->
                            <?php foreach ($niveles as $nivel): ?>
                                <div class="tab-pane fade" id="custom-tabs-one-<?php echo $nivel->numero; ?>" role="tabpanel" aria-labelledby="custom-tabs-one-<?php echo $nivel->numero; ?>-tab">
                                    <div class="row">
                                        <?php foreach ($habitaciones as $habitacion):
                                            if ($habitacion->nivel_id == $nivel->id):
                                                $estado = EstadoHabitacion::find($habitacion->estado_id);
                                                $categoria = Categoria::find($habitacion->categoria_id); ?>
                                                <div class="col-lg-3 col-6">
                                                    <div class="small-box bg-<?php echo $estado->color; ?>" 
                                                         data-id="<?php echo $habitacion->id; ?>" 
                                                         data-nombre="<?php echo $habitacion->nombre; ?>" 
                                                         data-estado="<?php echo $estado->descripcion; ?>" 
                                                         data-categoria="<?php echo $categoria->nombre; ?>">
                                                        <div class="inner">
                                                            <h3><?php echo $habitacion->nombre; ?></h3>
                                                            <h4><?php echo $categoria->nombre; ?></h4>
                                                            <p><?php echo $estado->nombre_estado; ?></p>
                                                        </div>
                                                        <div class="icon">
                                                            <i class="fas fa-shopping-cart"></i>
                                                        </div>
                                                        <a href="#" class="small-box-footer" data-id="<?php echo $habitacion->id;?>">
                                                            <?php echo $estado->descripcion; ?> <i class="fas fa-arrow-circle-right"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            <?php endif; ?>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
