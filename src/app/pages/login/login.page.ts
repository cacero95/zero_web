import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { DbaService } from '../../services/dba.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SigninComponent } from '../../components/signin/signin.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as Usuario;
  constructor(private dba:DbaService,
    private router:Router,
    private modal:ModalController) { }

  ngOnInit() {
  }
  entrar() {
    this.dba.login(this.user).then((respuesta)=>{
      if (respuesta == true){
        this.navegar('home');
      }
    })
  }
  navegar(url){
    this.router.navigate([`/${url}`]);
  }
  async registrar(){
    let modal = await this.modal.create({
      component:SigninComponent
    });
    modal.present();
  }
}
