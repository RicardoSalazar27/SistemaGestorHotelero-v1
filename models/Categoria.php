<?php

namespace Model;

class Categoria extends ActiveRecord{

    public static $tabla = 'categoria';
    public static $columnasDB = ['id', 'nombre', 'capacidad_maxima', 'estatus'];

    public $id;
    public $nombre;
    public $capacidad_maxima;
    public $estatus;

    public function __construct($args = []) {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->capacidad_maxima = $args['capacidad_maxima'] ?? 1;
        $this->estatus = $args['estatus'] ?? 1;
    }

    public function validarDatos(){
        
        if(!$this->nombre) {
            self::$alertas['error'][] = 'El Nombre de la Categoria es Obligatorio';
        }
    
        if(!$this->capacidad_maxima) {
            self::$alertas['error'][] = 'Es Obligatorio señalar la capacidad de la Categoria';
        }

        return self::$alertas;
    }

}