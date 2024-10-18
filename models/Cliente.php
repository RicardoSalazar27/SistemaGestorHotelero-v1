<?php

namespace Model;

class Cliente extends ActiveRecord{

    public static $tabla = 'clientes';
    public static $columnasDB = ['id', 'nombre', 'apellido', 'correo', 'telefono', 'documento_identidad', 'fecha_nacimiento'];

    public $id;
    public $nombre;
    public $apellidos;
    public $correo;
    public $telefono;
    public $documento_identidad;
    public $fecha_nacimiento;

    public function __construct($args = []) {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellidos = $args['apellidos'] ?? '';
        $this->correo = $args['correo'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->documento_identidad = $args['documento_identidad'] ?? '';
        $this->fecha_nacimiento = $args['fecha_nacimiento'] ?? '';
    }

    public function validarDatos(){
        
        if(!$this->nombre) {
            self::$alertas['error'][] = 'El Nombre del Cliente es Obligatorio';
        }
    
        if(!$this->apellido) {
            self::$alertas['error'][] = 'El Apellido del Cliente es Obligatorio';
        }

        return self::$alertas;
    }

}