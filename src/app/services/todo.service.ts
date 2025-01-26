import { Injectable } from '@angular/core';
// Our data structure for a todo item (Model)
import { Storage } from '@ionic/storage-angular';

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
  storageIntialized = false;

  constructor(private storage:Storage) {
    /// Initialize the storage
    this.init()
   }

   async init(){
    await this.storage.create();
  
    this.storageIntialized = true;
    await this.loadTodos();
    console.log("todos in init",this.todos);
   }

   private async loadTodos(){
    // Retrieve from storage the stored todos
    const storedTodos = await this.storage.get('todos');
    console.log(storedTodos);
    if (storedTodos){
      // copy the stored todos to the service
      this.todos = storedTodos;
      // retrieve the last id, so that it will be used later
      this.id = this.todos.length > 0 ?this.todos[this.todos.length - 1].id + 1 : 1;
    }
  }

    private async saveTodos(){
      if (this.storageIntialized){
        await this.storage.set('todos',this.todos); // save the todos inside the storage
      }
   }


  create(todo: Omit<Todo,'id'>): Todo{
    // Spread operator to create a new object with the new todo item
    const newTodo = {
      id: this.id++,
      ...todo
    }; 
    // Add the new todo item to the list of todos
    this.todos.push(newTodo);
    this.saveTodos();
    return newTodo;
  }

  // return all the todos (arrow notation)
  async getAll() {
    await this.loadTodos();
    return this.todos;
  }

  // : Todo is the return type
  getById(id:number):Todo {
    // to relate with our notes
   // return this.todos.find(val => val.id === id); // return object
    return this.todos.filter(val => val.id === id)[0]; // return array 
  }

  deleteById(id:number){
    // Filter out the todo item with the given id
    this.todos = this.todos.filter(val => val.id !== id);
    this.saveTodos();

  }

  markAsComplete(id:number){
    const todo = this.getById(id); // get the reference to item in the array
    todo.done = true;
    this.saveTodos();
  }
}
