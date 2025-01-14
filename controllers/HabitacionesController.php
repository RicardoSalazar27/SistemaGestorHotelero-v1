<?php

namespace Controllers;

use Model\Categoria;
use Model\InformacionHotel;
use Model\Nivel;
use Model\Usuario;
use MVC\Router;

class HabitacionesController {
    public static function index(Router $router) {

        is_auth();

        $usuario = Usuario::where('email', $_SESSION['email']);

        $alertas = [];

        $informacion_hotel = InformacionHotel::get(1);
        $nombre_hotel = $informacion_hotel->nombre;

        $niveles = Nivel::all('ASC');
        $categorias = Categoria::all('ASC');

        // Render a la vista 
        $router->render('admin/configuracion/habitaciones/index', [
            'titulo' => 'Habitaciones del Hotel',
            'alertas' => $alertas,
            'usuario' => $usuario,
            'informacion' => $informacion_hotel,
            'nombre_hotel' => $nombre_hotel,
            'niveles' => $niveles,
            'categorias' => $categorias
        ]);
    }
}