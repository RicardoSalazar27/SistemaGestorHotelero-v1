<?php

namespace Controllers;

use Model\Categoria;

class APICategorias {
    public static function listar(){
        $categorias = Categoria::all('ASC');
        echo json_encode($categorias);
    }

    public static function actualizar(){

        if($_SERVER['REQUEST_METHOD'] === 'POST'){

            $cliente = Categoria::where('id', $_POST['id']);
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

    public static function crear() {

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
    
            $categoriaExistente = Categoria::where('nombre', $_POST['nombre']); 
            
            if($categoriaExistente) {
                $respuesta = [
                    'tipo' => 'error',
                    'titulo' => 'Ooops...',
                    'mensaje' => 'La Categoria ya existe'
                ];
                echo json_encode($respuesta);
                return;
            } 
    
            // Crear un nuevo cliente
            $categoria = new Categoria();
            $categoria->sincronizar($_POST);
            $resultado = $categoria->guardar();
    
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
                    'mensaje' => 'Hubo un problema al crear la categoria'
                ];
            }
            
            echo json_encode($respuesta);
        }
    }

    public static function eliminar(){
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $categoria = Categoria::where('id', $_POST['id']);
            if(!$categoria){
                $respuesta = [
                    'tipo' => 'error',
                    'titulo' => 'Ooops...',
                    'mensaje' => 'Hubo un error al eliminar la categoria'
                ];
                echo json_encode($respuesta);
                return;
            }
            $categoria->eliminar();
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