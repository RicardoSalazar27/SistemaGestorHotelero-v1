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

    public static function crear() {

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
    
            $habitacionExistente = Habitacion::where('nombre', $_POST['nombre']); 
            
            if($habitacionExistente) {
                $respuesta = [
                    'tipo' => 'error',
                    'titulo' => 'Ooops...',
                    'mensaje' => 'La habitacion ya existe'
                ];
                echo json_encode($respuesta);
                return;
            } 
    
            // Crear un nuevo cliente
            $habitacion = new Habitacion();
            $habitacion->sincronizar($_POST);
            $resultado = $habitacion->guardar();
    
            if ($resultado) {
                $respuesta = [
                    'tipo' => 'success',
                    'titulo' => 'Creado',
                    'mensaje' => 'Creado Correctamente'
                ];
            } else {
                $respuesta = [
                    'tipo' => 'error',
                    'titulo' => 'Error',
                    'mensaje' => 'Hubo un problema al crear la habitacion'
                ];
            }
            
            echo json_encode($respuesta);
        }
    }

    public static function eliminar(){
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $habitacion = Habitacion::where('id', $_POST['id']);
            if(!$habitacion){
                $respuesta = [
                    'tipo' => 'error',
                    'titulo' => 'Ooops...',
                    'mensaje' => 'Hubo un error al eliminar la habitacion'
                ];
                echo json_encode($respuesta);
                return;
            }
            $habitacion->eliminar();
            $respuesta = [
                'tipo' => 'success',
                'titulo' => 'Eliminado',
                'mensaje' => 'Eliminado Correctamente'
            ];
            echo json_encode($respuesta);
        }
    }
}

?>