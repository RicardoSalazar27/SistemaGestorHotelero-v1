<?php

namespace Model;

class Roles extends ActiveRecord{

    public static $tabla = 'roles';
    public static $columnasDB = ['id', 'nombre'];

    public $id;
    public $nombre;

}