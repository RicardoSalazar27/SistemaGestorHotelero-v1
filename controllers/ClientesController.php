<?php

namespace Controllers;

use Model\Cliente;
use Model\InformacionHotel;
use Model\Usuario;
use MVC\Router;

class ClientesController {
    public static function index(Router $router) {

        is_auth();

        $usuario = Usuario::where('email', $_SESSION['email']);

        $alertas = [];

        $informacion_hotel = InformacionHotel::get(1);
        $nombre_hotel = $informacion_hotel->nombre;

        // Render a la vista 
        $router->render('admin/clientes/index', [
            'titulo' => 'Clientes',
            'alertas' => $alertas,
            'usuario' => $usuario,
            'nombre_hotel' => $nombre_hotel
        ]);
    }

    public static function eliminar(){

        is_auth();

        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $usuario = Cliente::find($_POST['id']);
            $usuario->eliminar();

            header('Location: /admin/clientes');
        }
    }

    public static function crear(){
        is_auth();

        $cliente = new Cliente;

        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $existecliente = Cliente::where('correo', $_POST['correo']);
            if($existecliente){
                echo 'si existe cliente';
            } else{
                $cliente -> sincronizar($_POST);
                $resultado = $cliente->guardar();

                if($resultado){
                    header('Location: /admin/clientes');
                }
            }
        }
    }
}