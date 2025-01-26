import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonInput, IonItem, IonButton, IonLabel } from '@ionic/angular/standalone';
import { Todo,TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
  standalone: true,
  imports: [ IonButton, IonItem, IonInput, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AddPage implements OnInit {

  constructor(private todoService:TodoService, private router:Router, 
    private toastController:ToastController) { }
// Our new todo item (Model) to be linked to the form through ngModel
// Omit is to exclude id from the newTodo object
  newTodo: Omit<Todo,'id'> = {
    title: '',
    description: '',
    place: '',
    done: false
  };
  ngOnInit() {
  }

  async addItemPressed(){
    console.log(this.newTodo);
    // Call the function create in TodoService
    // TO add the new todo inside the array of todos
    this.todoService.create(this.newTodo);
    this.newTodo = {'title':'','description':'','place':'','done':false};

    // Go to the defined route
    this.router.navigate(['/home']);

    const toastCtrl = await this.toastController.create({
      message: 'New todo added!',
      duration: 2000,
      position: 'bottom'
    });
    await toastCtrl.present();
  }

}
