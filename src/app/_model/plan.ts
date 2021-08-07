import { DetallePlan } from "./detalleplan";
import { Paciente } from "./paciente";

export class Plan {
  idPlan: number;
	fechaInicio: string;
	fechaFin: string;
	objetivo: string;
	activo: boolean;
	paciente: Paciente;
	detallePlan: DetallePlan;
}
