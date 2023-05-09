import { Component } from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Portafolio';
  forma!:FormGroup;

  constructor(private fb:FormBuilder){
    this.crearFormulario();
  }

  crearFormulario(){
    this.forma = this.fb.group({

      nombre:['', Validators.required],
      apellido:['', Validators.required],
      correo:['', Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],
      contraseña:['', Validators.required, Validators.minLength(5), Validators.maxLength( 12)]
    },{
      Validators:this.passwordIguales('password', 'password2')
    })
  }
  
get nombreNoValido(){
  return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched;
}  

get apellidoNoValido(){
  return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched;
}

get correoNoValido(){
  return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched;
}

get passwordNoValido(){
  return this.forma.get('password')?.invalid && this.forma.get('password')?.touched;
}

get passwordNoValido2(){
  return this.forma.get('password2')?.invalid && this.forma.get('password2')?.touched;
}
  

  passNovalido(passName:string, passName2:string){
    const pass1 = this.forma.get('password')?.value;
    const pass2= this.forma.get('password2')?.value;
  if (pass1 !== pass2 ) {
    return true;
  }else{
    return false;
  }  
  }

  guardar(){
    console.log(this.forma);

    this.passNovalido;

     if (this.forma.invalid){
       
      return Object.values(this.forma.controls).forEach(control =>{

        control.markAllAsTouched();

      })
     }
  }

  limpiar(){
    this.forma.reset(); 
  }
  
  passwordIguales(passName:string, passName2:string){
    return (formGroup:FormGroup) => {
      const passControl = formGroup.get(passName);
      const pass2Control = formGroup.get(passName2);

    if (passControl?.value === pass2Control?.value){
      pass2Control?.setErrors(null);
    }else{
      pass2Control?.setErrors({noEsIgual:true})
    }  
    }
  }

}
