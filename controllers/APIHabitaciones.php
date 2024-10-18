<?php

namespace Controllers;

use Model\Habitacion;

class APIHabitaciones {
    public static function listar(){
        $habitaciones = Habitacion::all();
        echo json_encode($habitaciones);
    }
}

?>