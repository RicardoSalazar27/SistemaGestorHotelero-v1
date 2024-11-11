<?php

namespace Controllers;

use Model\Cliente;
use Model\InformacionHotel;
use Model\Usuario;
use MVC\Router;

class CategoriasController {
    public static function index(Router $router) {

        is_auth();

        $usuario = Usuario::where('email', $_SESSION['email']);

        $alertas = [];

        $informacion_hotel = InformacionHotel::get(1);
        $nombre_hotel = $informacion_hotel->nombre;

        // Render a la vista 
        $router->render('admin/configuracion/categorias/index', [
            'titulo' => 'Categorias',
            'alertas' => $alertas,
            'usuario' => $usuario,
            'nombre_hotel' => $nombre_hotel
        ]);
    }
}