<?php

namespace Controllers;

use Model\Usuario;

class APIUsuarios {
    public static function listar(){
        $usuarios = Usuario::all();
        echo json_encode($usuarios);
    }

    public static function crear() {

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
    
            $usuarioExistente = Usuario::where('email', $_POST['email']);
            
            if($usuarioExistente) {
                $respuesta = [
                    'tipo' => 'error',
                    'titulo' => 'Ooops...',
                    'mensaje' => 'El Usuario ya existe'
                ];
                echo json_encode($respuesta);
                return;
            }
    
            // Crear un nuevo cliente
            $usuario = new Usuario();
            $usuario->sincronizar($_POST);
            date_default_timezone_set("America/Mexico_City");
            $fecha_actual = date("Y-m-d H:i:s");
            $usuario->fecha_creacion = $fecha_actual;
            $usuario->ultimo_acceso = $fecha_actual;
            $usuario->hashPassword();
            $resultado = $usuario->guardar();
    
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
                    'mensaje' => 'Hubo un problema al crear el usuario'
                ];
            }
            
            echo json_encode($respuesta);
        }
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