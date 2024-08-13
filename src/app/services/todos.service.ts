import { Injectable } from '@angular/core';
import { TODOS } from '../model/mock-data';
import { Todo } from '../model/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  async getTodos() {
    await sleep(1000);
    return TODOS;
  }

  async addTodo(todo: Partial<Todo>): Promise<Todo> {
    await sleep(1000);
    return {
      id: (Math.floor(Math.random() * 51) + 10).toString(),
      ...todo
    } as Todo;
  }

  async deleteTodo(id: string) {
    await sleep(300);
  }

  async updateTodo(id: string, completed: boolean) {
    await sleep(300);
  }


}

async function sleep(ms: number) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  )
}
