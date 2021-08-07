import { Usuario } from "./usuario";

export class Paciente {
  idPaciente: number;
  nombres: string;
  fechaNacimiento: string;
  sexo: string;
  semanaGestacion: number;
  usuario: Usuario;
}
