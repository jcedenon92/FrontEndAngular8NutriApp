import { Rol } from 'src/app/_model/rol';
export class Usuario {
  idUsuario:	number;
  nombres:	string;
  apellidos:	string;
  fechaNacimiento: string;
  username:	string;
  password:	string;
  email:	string;
  direccion:	string;
  telefono:	string;
  estado:	boolean;
  fotoUrl:	string;
  Rol: Rol;
}
