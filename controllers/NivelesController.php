<?php

namespace Controllers;

use Model\Habitacion;
use Model\InformacionHotel;
use Model\Nivel;
use Model\Usuario;
use MVC\Router;

class NivelesController {
    public static function index(Router $router) {

        is_auth();

        $usuario = Usuario::where('email', $_SESSION['email']);

        $alertas = [];

        $informacion_hotel = InformacionHotel::get(1);
        $nombre_hotel = $informacion_hotel->nombre;

        // Render a la vista 
        $router->render('admin/configuracion/niveles/index', [
            'titulo' => 'Niveles',
            'alertas' => $alertas,
            'usuario' => $usuario,
            'nombre_hotel' => $nombre_hotel
        ]);
    }
}