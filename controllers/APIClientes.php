<?php

namespace Controllers;

use Model\Cliente;

class APIClientes {
    public static function listar(){
        $clientes = Cliente::all();
        echo json_encode($clientes);
    }

    public static function actualizar(){

        if($_SERVER['REQUEST_METHOD'] === 'POST'){

            $cliente = Cliente::where('id', $_POST['id']);
            if(!$cliente){
                $respuesta = [
                    'tipo' => 'error',
                    'titulo' => 'Ooops...',
                    'mensaje' => 'Hubo un error al actualizar el cliente'
                ];
                echo json_encode($respuesta);
                return;
            } 

            // Todo bien actualizar el cliente
            $cliente->sincronizar($_POST);
            $resultado = $cliente->guardar();            
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
            $cliente = Cliente::where('id', $_POST['id']);
            if(!$cliente){
                $respuesta = [
                    'tipo' => 'error',
                    'titulo' => 'Ooops...',
                    'mensaje' => 'Hubo un error al eliminar el cliente'
                ];
                echo json_encode($respuesta);
                return;
            }
            $cliente->eliminar();
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