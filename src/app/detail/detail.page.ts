import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton,IonLabel, IonButtons, IonCard,IonItem, IonButton, IonIcon } from '@ionic/angular/standalone';
import { TodoService,Todo } from '../services/todo.service';
import { ActivatedRoute } from '@angular/router';

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
    private activatedRoute:ActivatedRoute) { 

      addIcons({trashOutline,checkmarkOutline});
    }

  ngOnInit() {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id')!, 10);
    this.todo = this.todoService.getById(id);
  }

}
