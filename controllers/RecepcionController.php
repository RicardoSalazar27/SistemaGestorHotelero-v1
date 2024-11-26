<?php

namespace Controllers;

use Model\Cliente;
use Model\EstadoHabitacion;
use Model\Habitacion;
use Model\InformacionHotel;
use Model\Nivel;
use Model\Usuario;
use MVC\Router;

class RecepcionController
{
    public static function index(Router $router)
    {

        is_auth();

        $usuario = Usuario::where('email', $_SESSION['email']);

        $alertas = [];

        $informacion_hotel = InformacionHotel::get(1);
        $nombre_hotel = $informacion_hotel->nombre;

        //Obtener niveles para la vista
        $niveles = Nivel::all('ASC');
        $habitaciones = Habitacion::all('ASC');


        // Render a la vista 
        $router->render('admin/recepcion/index', [
            'titulo' => 'Recepcion',
            'alertas' => $alertas,
            'usuario' => $usuario,
            'nombre_hotel' => $nombre_hotel,
            'niveles' => $niveles,
            'habitaciones' => $habitaciones
        ]);
    }
}
