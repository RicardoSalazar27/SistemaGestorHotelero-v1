<?php

namespace Controllers;

use Model\InformacionHotel;
use Model\Usuario;
use MVC\Router;

class UsuariosController {
    public static function index(Router $router) {

        is_auth();
        //tiene_rol('1');

        $usuario = Usuario::where('email', $_SESSION['email']);
        //debuguear($usuario);

        $alertas = [];

        $informacion_hotel = InformacionHotel::get(1);
        $nombre_hotel = $informacion_hotel->nombre;

        // Render a la vista 
        $router->render('admin/usuarios/index', [
            'titulo' => 'Usuarios',
            'alertas' => $alertas,
            'usuario' => $usuario,
            'informacion' => $informacion_hotel,
            'nombre_hotel' => $nombre_hotel
        ]);
    }
}