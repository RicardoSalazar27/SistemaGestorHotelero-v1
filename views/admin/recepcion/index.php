<?php

use Model\Categoria;
use Model\EstadoHabitacion; ?>;
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
                    <li class="breadcrumb-item active">Recepcion</li>
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
                            <li class="nav-item">
                                <a class="nav-link active" id="custom-tabs-one-todos-tab" data-toggle="pill" href="#custom-tabs-one-todos" role="tab" aria-controls="custom-tabs-one-todos" aria-selected="true">Todos</a>
                            </li>
                            <?php
                            foreach ($niveles as $nivel) {
                            ?>
                                <li class="nav-item">
                                    <a class="nav-link" id="custom-tabs-one-<?php echo $nivel->numero; ?>-tab" data-toggle="pill" href="#custom-tabs-one-<?php echo $nivel->numero; ?>" role="tab" aria-controls="custom-tabs-one-settings" aria-selected="false"><?php echo $nivel->nombre; ?></a>
                                </li>
                            <?php
                            }
                            ?>
                        </ul>
                    </div><!-- AQUI ACABA LAS PESTAÑAS DE LOS NIVELES-->

                    <div class="card-body">
                        <div class="tab-content" id="custom-tabs-one-tabContent">
                            <div class="tab-pane fade show active" id="custom-tabs-one-todos" role="tabpanel" aria-labelledby="custom-tabs-one-todos-tab">
                                <div class="row">
                                <?php
                                foreach ($habitaciones as $habitacion) {
                                    $estado = EstadoHabitacion::find($habitacion->estado_id);
                                    $categoria = Categoria::find($habitacion->categoria_id);
                                    if ($estado) { // Verificamos si el objeto fue encontrado
                                        ?>
                                        <div class="col-lg-3 col-6">
                                            <div class="small-box bg-<?php echo $estado->color;?>">
                                                <div class="inner">
                                                    <h3><?php echo $habitacion->nombre; ?></h3>
                                                    <p><?php echo $categoria->nombre; ?></p> <!-- Accedemos a la propiedad del objeto -->
                                                </div>
                                                <div class="icon">
                                                    <i class="fas fa-shopping-cart"></i>
                                                </div>
                                                <a href="#" class="small-box-footer">
                                                    <?php echo $estado->descripcion; ?><i class="fas fa-arrow-circle-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                    <?php
                                    } else {
                                        echo "<p>Error: Estado de habitación no encontrado.</p>";
                                    }
                                }
                                ?>
                                </div>
                            </div>

                            <div class="tab-pane fade show" id="custom-tabs-one-1" role="tabpanel" aria-labelledby="custom-tabs-one-1-tab">
                                <div class="row">
                                    <?php
                                    foreach ($habitaciones as $habitacion) {
                                        if ($habitacion->nivel_id == "1") {
                                            $habitacion->estado_id = EstadoHabitacion::find($habitacion->estado_id);
                                    ?>
                                            <div class="col-lg-3 col-6">
                                                <!-- small card -->
                                                <div class="small-box bg-success">
                                                    <div class="inner">
                                                        <h3><?php echo $habitacion->nombre; ?></h3>
                                                        <p><?php echo $habitacion->estado_id->nombre_estado; ?></p>
                                                    </div>
                                                    <div class="icon">
                                                        <i class="fas fa-shopping-cart"></i>
                                                    </div>
                                                    <a href="#" class="small-box-footer">
                                                        <?php echo $habitacion->estado_id->descripcion; ?><i class="fas fa-arrow-circle-right"></i>
                                                    </a>
                                                </div>
                                            </div>
                                    <?php
                                        }
                                    }
                                    ?>
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="custom-tabs-one-2" role="tabpanel" aria-labelledby="custom-tabs-one-2-tab">
                                <div class="row">
                                    <?php
                                    foreach ($habitaciones as $habitacion) {
                                        if ($habitacion->nivel_id == "2") {
                                            $habitacion->estado_id = EstadoHabitacion::find($habitacion->estado_id);
                                    ?>
                                            <div class="col-lg-3 col-6">
                                                <!-- small card -->
                                                <div class="small-box bg-success">
                                                    <div class="inner">
                                                        <h3><?php echo $habitacion->nombre; ?></h3>
                                                        <p><?php echo $habitacion->estado_id->nombre_estado; ?></p>
                                                    </div>
                                                    <div class="icon">
                                                        <i class="fas fa-shopping-cart"></i>
                                                    </div>
                                                    <a href="#" class="small-box-footer">
                                                        <?php echo $habitacion->estado_id->descripcion; ?><i class="fas fa-arrow-circle-right"></i>
                                                    </a>
                                                </div>
                                            </div>
                                    <?php
                                        }
                                    }
                                    ?>
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="custom-tabs-one-3" role="tabpanel" aria-labelledby="custom-tabs-one-3-tab">
                                <div class="row">
                                    <?php
                                    foreach ($habitaciones as $habitacion) {
                                        if ($habitacion->nivel_id == "3") {
                                            $habitacion->estado_id = EstadoHabitacion::find($habitacion->estado_id);
                                    ?>
                                            <div class="col-lg-3 col-6">
                                                <!-- small card -->
                                                <div class="small-box bg-success">
                                                    <div class="inner">
                                                        <h3><?php echo $habitacion->nombre; ?></h3>
                                                        <p><?php echo $habitacion->estado_id->nombre_estado; ?></p>
                                                    </div>
                                                    <div class="icon">
                                                        <i class="fas fa-shopping-cart"></i>
                                                    </div>
                                                    <a href="#" class="small-box-footer">
                                                        <?php echo $habitacion->estado_id->descripcion; ?><i class="fas fa-arrow-circle-right"></i>
                                                    </a>
                                                </div>
                                            </div>
                                    <?php
                                        }
                                    }
                                    ?>
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="custom-tabs-one-4" role="tabpanel" aria-labelledby="custom-tabs-one-4-tab">
                                <div class="row">
                                    <?php
                                    foreach ($habitaciones as $habitacion) {
                                        if ($habitacion->nivel_id == "4") {
                                            $habitacion->estado_id = EstadoHabitacion::find($habitacion->estado_id);
                                    ?>
                                            <div class="col-lg-3 col-6">
                                                <!-- small card -->
                                                <div class="small-box bg-success">
                                                    <div class="inner">
                                                        <h3><?php echo $habitacion->nombre; ?></h3>
                                                        <p><?php echo $habitacion->estado_id->nombre_estado; ?></p>
                                                    </div>
                                                    <div class="icon">
                                                        <i class="fas fa-shopping-cart"></i>
                                                    </div>
                                                    <a href="#" class="small-box-footer">
                                                        <?php echo $habitacion->estado_id->descripcion; ?><i class="fas fa-arrow-circle-right"></i>
                                                    </a>
                                                </div>
                                            </div>
                                    <?php
                                        }
                                    }
                                    ?>
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="custom-tabs-one-5" role="tabpanel" aria-labelledby="custom-tabs-one-5-tab">
                                <div class="row">
                                    <?php
                                    foreach ($habitaciones as $habitacion) {
                                        if ($habitacion->nivel_id == "5") {
                                            $habitacion->estado_id = EstadoHabitacion::find($habitacion->estado_id);
                                    ?>
                                            <div class="col-lg-3 col-6">
                                                <!-- small card -->
                                                <div class="small-box bg-success">
                                                    <div class="inner">
                                                        <h3><?php echo $habitacion->nombre; ?></h3>
                                                        <p><?php echo $habitacion->estado_id->nombre_estado; ?></p>
                                                    </div>
                                                    <div class="icon">
                                                        <i class="fas fa-shopping-cart"></i>
                                                    </div>
                                                    <a href="#" class="small-box-footer">
                                                        <?php echo $habitacion->estado_id->descripcion; ?><i class="fas fa-arrow-circle-right"></i>
                                                    </a>
                                                </div>
                                            </div>
                                    <?php
                                        }
                                    }
                                    ?>
                                </div>
                            </div>
                            <div class="tab-pane fade show" id="custom-tabs-one-6" role="tabpanel" aria-labelledby="custom-tabs-one-6-tab">
                                <div class="row">
                                    <?php
                                    foreach ($habitaciones as $habitacion) {
                                        if ($habitacion->nivel_id == "8") {
                                            $habitacion->estado_id = EstadoHabitacion::find($habitacion->estado_id);
                                    ?>
                                            <div class="col-lg-3 col-6">
                                                <!-- small card -->
                                                <div class="small-box bg-success">
                                                    <div class="inner">
                                                        <h3><?php echo $habitacion->nombre; ?></h3>
                                                        <p><?php echo $habitacion->estado_id->nombre_estado; ?></p>
                                                    </div>
                                                    <div class="icon">
                                                        <i class="fas fa-shopping-cart"></i>
                                                    </div>
                                                    <a href="#" class="small-box-footer">
                                                        <?php echo $habitacion->estado_id->descripcion; ?><i class="fas fa-arrow-circle-right"></i>
                                                    </a>
                                                </div>
                                            </div>
                                    <?php
                                        }
                                    }
                                    ?>
                                </div>
                            </div>

                        </div>
                    </div><!--aCABA EL CUERPO DE LAS TARJETAS DE LAS PESTAÑAS DE LOS NIVELES-->
                </div>
            </div>
        </div>
</section>