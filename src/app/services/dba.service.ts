import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Usuario } from '../models/usuario';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbaService {

  usuario:firebase.User;  
  constructor(private toast:ToastController) { }

  signInUp(user:Usuario):Promise<any>{
    return new Promise((resolve,reject)=>{
      firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
      .then((us)=>{
      this.usuario = us.user;
      this.usuario.updateProfile({
        displayName:user.name,
        photoURL:""
      }).then(()=>{
        this.setMensaje('Creacion Exitosa','success')
        resolve(true);
      })
      }).catch((err)=>{
        this.setMensaje(err.message,'danger');
        reject(false);
      })
    })
  }

  login(user:Usuario):Promise<any>{
    return new Promise((resolve,reject)=>{
      firebase.auth().signInWithEmailAndPassword(user.email,user.password)
      .then((us)=>{
        this.usuario = us.user;
        console.log(this.usuario);
        this.setMensaje(`Welcome ${this.usuario.displayName}`,'success');
        resolve(true);
      }).catch((err)=>{
        this.setMensaje(`:( ${err.message}`,'danger');
        reject(false);
      })
    })
  }

  async setMensaje(header,color){
    let toast = await this.toast.create({
      header,
      duration:2000,
      animated:true,
      color
    });
    toast.present();
  }
}
