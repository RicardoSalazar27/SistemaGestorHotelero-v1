<?php

namespace Model;

class Nivel extends ActiveRecord{

    public static $tabla = 'niveles';
    public static $columnasDB = ['id', 'numero', 'nombre', 'estatus'];

    public $id;
    public $numero;
    public $nombre;
    public $estatus;

    public function __construct($args = []) {
        $this->id = $args['id'] ?? null;
        $this->numero = $args['numero'] ?? '';
        $this->nombre = $args['nombre'] ?? '';
        $this->estatus = $args['estatus'] ?? 1;
    }

    public function validarDatos(){
        
        if(!$this->nombre) {
            self::$alertas['error'][] = 'El Nombre del Nivel es Obligatorio';
        }
    
        if(!$this->numero) {
            self::$alertas['error'][] = 'El Numero del Nivel es Obligatorio';
        }

        return self::$alertas;
    }

}