import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton,IonLabel, IonButtons, IonCard,IonItem, IonButton, IonIcon } from '@ionic/angular/standalone';
import { TodoService,Todo } from '../services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ToastController} from '@ionic/angular';

import { addIcons } from 'ionicons';
import {trashOutline,checkmarkOutline} from 'ionicons/icons';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonCard, IonButtons, IonBackButton, IonContent, IonHeader, IonLabel,IonTitle, IonToolbar, IonItem,CommonModule, FormsModule]
})
export class DetailPage implements OnInit {

  todo:Todo | undefined;

  constructor(private todoService:TodoService, 
    private activatedRoute:ActivatedRoute, private router:Router, private toastController:ToastController) { 

      addIcons({trashOutline,checkmarkOutline});
    }

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!, 10);
    this.todo = this.todoService.getById(id);
  }

  async markPressed(){

    this.todoService.markAsComplete(this.todo!.id);
    const toast = await this.toastController.create({
      message: 'Todo item successfully marked as complete!',
      duration: 2000,
    })
  
    await toast.present();
    this.router.navigate(['/home']);
  }

  async deletePressed(){  
  this.todoService.deleteById(this.todo!.id);
  this.router.navigate(['/home']);
  // TODO add toast

  const toast = await this.toastController.create({
    message: 'Todo item successfully deleted!',
    duration: 2000,
  })

  await toast.present();
  }

}
