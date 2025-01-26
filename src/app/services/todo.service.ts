import { Injectable } from '@angular/core';
// Our data structure for a todo item (Model)

export interface Todo {
  id:number;
  title:string;
  description:string;
  place:string;
  done:boolean;
}

@Injectable({
  providedIn: 'root'
})


export class TodoService {

  // This is where the list of todos will be stored so we can access throughout the app
  private todos: Todo[] = [];

  // This is a counter to generate unique ids for each todo item
  private id:number = 1;

  constructor() { }


  create(todo: Omit<Todo,'id'>): Todo{
    // Spread operator to create a new object with the new todo item
    const newTodo = {
      id: this.id++,
      ...todo
    }; 
    // Add the new todo item to the list of todos
    this.todos.push(newTodo);
    return newTodo;
  }

  // return all the todos (arrow notation)
  getAll: () => Todo[] = () => this.todos;

  // : Todo is the return type
  getById(id:number):Todo {
    // to relate with our notes
   // return this.todos.find(val => val.id === id); // return object
    return this.todos.filter(val => val.id === id)[0]; // return array 
  }
}
