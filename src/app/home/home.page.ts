import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonList,IonItem,IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { TodoService, Todo } from '../services/todo.service';
import { OnInit
 } from '@angular/core';
 import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton,
     IonIcon, RouterModule,IonList,IonItem,IonLabel,CommonModule],
})
export class HomePage implements OnInit {

  todos:Todo[] = [];

  constructor(private todoService: TodoService) {
 
    addIcons({ addOutline });
  }
// When the app is loaded (onCreate), retrieve the list of todos
  ngOnInit(): void {
    this.todos = this.todoService.getAll();
    
  }
  // onResume
  ionViewWillEnter(){
    this.todos = this.todoService.getAll();
    console.log(this.todos);
  }
}
