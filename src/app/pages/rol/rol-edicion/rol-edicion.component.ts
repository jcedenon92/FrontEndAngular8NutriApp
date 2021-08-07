import { RolService } from 'src/app/_service/rol.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Rol } from 'src/app/_model/rol';

@Component({
  selector: 'app-rol-edicion',
  templateUrl: './rol-edicion.component.html',
  styleUrls: ['./rol-edicion.component.css']
})
export class RolEdicionComponent implements OnInit {

form: FormGroup;
id: number;
edicion: boolean;

//ActivatedRoute permite manipular la url activa de _service
//Se inyecta el RolService en el constructor
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rolService: RolService
    ) { }

  //Inicializacion de campos en html a Typescript
  ngOnInit() {
    this.form = new FormGroup({
      'id' : new FormControl(0),
      'nombre' : new FormControl(''),
      'descripcion' : new FormControl('')
    });

    //subscribe para recuperar informacion de un tipo Observable -> data
    //Params es la misma url de AngularRouter para el manejo de navegaciones
    //se recupera el dato "id" que anteriormente se declaro en el routing-module (edicion/:id)
    this.route.params.subscribe((params: Params)  =>{
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });
  }

  // se accede a listarPorId de tipo Observable, se subscribe para acceder y utilizar la "data"
  // luego que se obtuvo los datos de RolService se instancia el formulario declarado arriba y se le asigna los
  // los parametros que viene desde el servicio ♪♫
  initForm(){
    if(this.edicion)
      this.rolService.listarPorId(this.id).subscribe(data =>{
        this.form = new FormGroup({
          'id': new FormControl(data.idRol),
          'nombre': new FormControl(data.nombre),
          'descripcion': new FormControl(data.descripcion)
        });
      });
  }

  operar(){
    let rol = new Rol();
    rol.idRol = this.form.value['id'];
    rol.nombre = this.form.value['nombre'];
    rol.descripcion = this.form.value['descripcion'];

    if(this.edicion){
      //se llama al servicio de edicion
      //con next llenamos la data, del arreglo declarado y usando prog. reactiva en rolCambio de Service.ts
      //cada vez que se realice el metodo next, los subscriptores en el metodo init escucharán el evento
      this.rolService.modificar(rol).subscribe( () => {
        this.rolService.listar().subscribe(data =>{
          this.rolService.rolCambio.next(data);
          this.rolService.mensajeCambio.next('SE MODIFICO');
        });
      });
    }else {
      //se llama al servicio de registro
      this.rolService.registrar(rol).subscribe( () => {
        this.rolService.listar().subscribe(data =>{
          this.rolService.rolCambio.next(data);
          this.rolService.mensajeCambio.next('SE REGISTRO');
        });
      });
    }

    this.router.navigate(['rol']);
  }

}
