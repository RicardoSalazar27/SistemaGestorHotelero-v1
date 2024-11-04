<?php

namespace Controllers;

use Model\InformacionHotel;
use Model\Usuario;
use MVC\Router;

class DashboardController {
    public static function index(Router $router) {

        is_auth();

        $usuario = Usuario::where('email', $_SESSION['email']);
        $informacion_hotel = InformacionHotel::get(1);
        $nombre_hotel = $informacion_hotel->nombre;

        $alertas = [];

        // Render a la vista 
        $router->render('admin/dashboard/index', [
            'titulo' => 'Panel de Administracion',
            'alertas' => $alertas,
            'usuario' => $usuario,
            'nombre_hotel' => $nombre_hotel
        ]);
    }
}