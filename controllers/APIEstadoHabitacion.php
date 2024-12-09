<?php

namespace Controllers;

use Model\EstadoHabitacion;

class APIEstadoHabitacion {
    public static function listar(){
        $estado_habitaciones = EstadoHabitacion::all();
        echo json_encode($estado_habitaciones);
    }
}