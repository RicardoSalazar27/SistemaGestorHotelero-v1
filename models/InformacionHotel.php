<?php

namespace Model;

class InformacionHotel extends ActiveRecord{

    public static $tabla = 'informacion_hotel';
    public static $columnasDB = ['id', 'nombre', 'telefono', 'correo', 'ubicacion', 'moneda'];

    public $id;
    public $nombre;
    public $telefono;
    public $correo;
    public $ubicacion;
    public $moneda;

    public function __construct($args = []) {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->correo = $args['correo'] ?? '';
        $this->ubicacion = $args['ubicacion'] ?? '';
        $this->moneda = $args['moneda'] ?? 'mxn';
    }

    public function validarDatos(){
        
        if(!$this->nombre) {
            self::$alertas['error'][] = 'El Nombre del Hotel es Obligatorio';
        }
        if(!$this->correo) {
            self::$alertas['error'][] = 'El Correo es Obligatorio';
        }
        if(!filter_var($this->correo, FILTER_VALIDATE_EMAIL)) {
            self::$alertas['error'][] = 'Email no válido';
        }
        if(!$this->telefono) {
            self::$alertas['error'][] = 'El Telefono del Hotel es Obligatorio';
        }
        if(strlen($this->telefono) < 10) {
            self::$alertas['error'][] = 'El password debe contener al menos 6 caracteres';
        }
        if(!$this->ubicacion) {
            self::$alertas['error'][] = 'La Direccion del Hotel es Obligatorio';
        }

        return self::$alertas;
    }

}