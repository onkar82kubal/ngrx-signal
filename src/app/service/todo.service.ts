import { Injectable } from '@angular/core';
import { TODOS } from '../modal/mock-data';
import { Todo } from '../modal/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  async getTodos() {
    await sleep(1000);
    return TODOS;
  }

  async addTodo(todo: Partial<Todo>) {
    await sleep(1000);
    return {
      id: Math.floor(Math.random() * 10000),
      ...todo,
    } as Todo;
  }
  async deleteTodo(id: string) {
    await sleep(1000);
  }

  async updateTodo(id: string, completed: boolean) {
    await sleep(1000);
  }
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
