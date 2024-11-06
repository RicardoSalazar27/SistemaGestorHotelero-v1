<?php

namespace Controllers;

use Model\Usuario;

class APIUsuarios {
    public static function listar(){
        $usuarios = Usuario::all();
        echo json_encode($usuarios);
    }

    public static function actualizar(){

        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            
            $usuario = Usuario::where('id', $_POST['id']);
            if(!$usuario){
                $respuesta = [
                    'tipo' => 'error',
                    'titulo' => 'Ooops...',
                    'mensaje' => 'Hubo un error al actualizar el usuario'
                ];
                echo json_encode($respuesta);
                return;
            } 

            // Todo bien actualizar el usuario
            $usuario->sincronizar($_POST);
            $resultado = $usuario->guardar();            
            $respuesta = [
                'tipo' => 'success',
                'titulo' => 'Actualizado',
                'mensaje' => 'Actualizado Correctamente'
            ];
            echo json_encode($respuesta);
        }
    }

    public static function eliminar(){
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $usuario = Usuario::where('id', $_POST['id']);
            if(!$usuario){
                $respuesta = [
                    'tipo' => 'error',
                    'titulo' => 'Ooops...',
                    'mensaje' => 'Hubo un error al eliminar  el usuario'
                ];
                echo json_encode($respuesta);
                return;
            }
            $usuario->eliminar();
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