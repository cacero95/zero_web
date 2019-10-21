import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { DbaService } from '../../services/dba.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {


  user:Usuario

  constructor(private modal:ModalController,
    private dba:DbaService,
    private toast:ToastController) { }

  ngOnInit() {}


  signIn(name:string, email:string, password:string){
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
  }
}
