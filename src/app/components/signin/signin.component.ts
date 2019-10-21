import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DbaService } from '../../services/dba.service';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {


  user:Usuario

  constructor(private modal:ModalController,
    private dba:DbaService,
    private toast:ToastController,
    private router:Router) { }

  ngOnInit() {}


  async signIn(name:string, email:string, password:string){
    let tick = false;
    this.user = {
      name,
      email,
      password
    }
    for(let value in this.user){
      if (value == undefined){
        tick = true;
      }
    }
    if(tick){
      let toast = await this.toast.create({
        header:'Complete todos los campos',
        duration:3000,
        color:'danger'
      });
      toast.present();
    }
    else {
      this.dba.signInUp(this.user).then((respuesta)=>{
        if (respuesta == true){
          this.router.navigate(['home']);
        }
      })
    }
  }
  close(){
    this.modal.dismiss();
  }
}
