<?php

namespace Controllers;

use Model\Habitacion;

class APIHabitaciones {
    public static function listar(){
        $habitaciones = Habitacion::all();
        echo json_encode($habitaciones);
    }

    public static function actualizar(){

        if($_SERVER['REQUEST_METHOD'] === 'POST'){

            $habitacion = Habitacion::where('id', $_POST['id']);
            if(!$habitacion){
                $respuesta = [
                    'tipo' => 'error',
                    'titulo' => 'Ooops...',
                    'mensaje' => 'Hubo un error al actualizar la habitacion'
                ];
                echo json_encode($respuesta);
                return;
            } 

            // Todo bien actualizar el habitacion
            $habitacion->sincronizar($_POST);
            $resultado = $habitacion->guardar();            
            $respuesta = [
                'tipo' => 'success',
                'titulo' => 'Actualizado',
                'mensaje' => 'Actualizado Correctamente'
            ];
            echo json_encode($respuesta);
        }
    }
}

?>