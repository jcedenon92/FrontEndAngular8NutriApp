import { Alimento } from "./alimento";
import { Dias } from "./dias";
import { Plan } from "./plan";
import { TurnoComida } from "./turnocomida";

export class DetallePlan {
  idDetalle: number;
	plan: Plan;
	alimento: Alimento;
	turnocomida: TurnoComida;
	dias: Dias;
}
