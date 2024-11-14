<?php

namespace Model;

class Habitacion extends ActiveRecord{

    public static $tabla = 'habitaciones';
    public static $columnasDB = ['id', 'nombre', 'nivel_id', 'categoria_id', 'precio', 'tarifa', 'detalles', 'estatus', 'estado_id'];

    public $id;
    public $nombre;
    public $nivel_id;
    public $categoria_id;
    public $precio;
    public $tarifa;
    public $detalles;
    public $estatus;

    public function __construct($args = []) {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->nivel_id = $args['nivel_id'] ?? '';
        $this->categoria_id = $args['categoria_id'] ?? '';
        $this->precio = $args['precio'] ?? '';
        $this->tarifa = $args['tarifa'] ?? '';
        $this->detalles = $args['detalles'] ?? '';
        $this->estatus = $args['estatus'] ?? 1;
        $this->estado_id = $args['estado_id'] ?? 1;
    }

    public function validarDatos(){
        
        if(!$this->nombre) {
            self::$alertas['error'][] = 'El Nombre de la Habitacion es Obligatorio';
        }
    
        if(!$this->nivel_id) {
            self::$alertas['error'][] = 'Debe seleccionar a que nivel corresponde la habitacion';
        }

        if(!$this->nivel_id) {
            self::$alertas['error'][] = 'Debe seleccionar la catgeoria de la habitacion';
        }

        if(!$this->precio) {
            self::$alertas['error'][] = 'El Precio de la Habitacion es Obligatorio';
        }

        if(!$this->detalles) {
            self::$alertas['error'][] = 'La descripcion de la Habitacion es Obligatorio';
        }

        return self::$alertas;
    }

}