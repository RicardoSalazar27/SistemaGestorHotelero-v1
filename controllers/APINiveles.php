<?php

namespace Controllers;

use Model\Habitacion;
use Model\Nivel;

class APINiveles {
    public static function listar(){
        $niveles = Nivel::all('ASC');
        echo json_encode($niveles);
    }
    public static function actualizar(){

        if($_SERVER['REQUEST_METHOD'] === 'POST'){

            $nivel = Nivel::where('nombre', $_POST['nombre']);
            if(!$nivel){
                $respuesta = [
                    'tipo' => 'error',
                    'titulo' => 'Ooops...',
                    'mensaje' => 'Hubo un error al actualizar el nivel'
                ];
                echo json_encode($respuesta);
                return;
            } 

            // Todo bien actualizar el nivel
            $nivel->sincronizar($_POST);
            
            if($nivel->estatus == '0') {
                // Seleccionar las habitaciones correspondientes al nivel
                $habitaciones = Habitacion::whereAll('nivel_id', $nivel->id);
            
                // Cambiar el estatus de cada habitación a '0' (desactivado)
                foreach($habitaciones as $habitacion) {
                    $habitacion->estatus = '0';
                    $habitacion->guardar(); // Método para actualizar en la base de datos
                }
            } else if($nivel->estatus == '1') {
                // Seleccionar las habitaciones correspondientes al nivel
                $habitaciones = Habitacion::whereAll('nivel_id', $nivel->id);
            
                // Cambiar el estatus de cada habitación a '1' (activado)
                foreach($habitaciones as $habitacion) {
                    $habitacion->estatus = '1';
                    $habitacion->guardar(); // Método para actualizar en la base de datos
                }
            }
            
            $resultado = $nivel->guardar();            
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
    
            $nivelExistente = Nivel::where('nombre', $_POST['nombre']); 
            $nivelExistente2 = Nivel::where('numero', $_POST['numero']); 
            
            if($nivelExistente || $nivelExistente2) {
                $respuesta = [
                    'tipo' => 'error',
                    'titulo' => 'Ooops...',
                    'mensaje' => 'El Nivel ya existe'
                ];
                echo json_encode($respuesta);
                return;
            } 
    
            // Crear un nuevo cliente
            $nivel = new Nivel();
            $nivel->sincronizar($_POST);
            $resultado = $nivel->guardar();
    
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
                    'mensaje' => 'Hubo un problema al crear el nivel'
                ];
            }
            
            echo json_encode($respuesta);
        }
    }

    public static function eliminar(){
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $nivel = Nivel::where('id', $_POST['id']);
            if(!$nivel){
                $respuesta = [
                    'tipo' => 'error',
                    'titulo' => 'Ooops...',
                    'mensaje' => 'Hubo un error al eliminar la nivel'
                ];
                echo json_encode($respuesta);
                return;
            }
            $nivel->eliminar();
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