<?php

namespace Model;

class EstadoHabitacion extends ActiveRecord
{

    public static $tabla = 'estado_habitacion';
    public static $columnasDB = ['id', 'nombre_estado', 'descripcion','color'];

    public $id;
    public $nombre_estado;
    public $descripcion;
    public $color;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre_estado = $args['nombre_estado'] ?? '';
        $this->descripcion = $args['descripcion'] ?? '';
        $this->color = $args['color'] ?? '';
    }

    public function validarDatos()
    {

        if (!$this->nombre) {
            self::$alertas['error'][] = 'El Nombre de la Categoria es Obligatorio';
        }

        if (!$this->capacidad_maxima) {
            self::$alertas['error'][] = 'Es Obligatorio señalar la capacidad de la Categoria';
        }

        return self::$alertas;
    }
}
