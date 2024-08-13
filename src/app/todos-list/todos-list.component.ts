import { Component, effect, inject, viewChild } from '@angular/core';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleGroup, MatButtonToggle, MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodosFilter, TodosStore } from '../store/todos.store';
import { NgStyle } from '@angular/common';


@Component({
  selector: 'app-todos-list',
  standalone: true,
  imports: [MatFormField, MatInput, MatIcon, MatSuffix, MatLabel, MatButtonToggleGroup, MatButtonToggle, MatListModule, NgStyle, MatCheckboxModule],
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss'
})
export class TodosListComponent {

  store = inject(TodosStore);

  filter = viewChild.required(MatButtonToggleGroup);

  constructor() {
    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    })
  }

  async onAddTodo(input: HTMLInputElement) {
    const title = input.value;
    input.value = ''
    await this.store.addTodo(title);
  }

  async onDeleteTodo(id: string, event: MouseEvent) {
    event.stopPropagation();
    await this.store.deleteTodo(id);
  }

  async onTodoToggled(id: string, completed: boolean) {
    await this.store.updateTodo(id, completed);
  }

  onFilterTodo(event: MatButtonToggleChange) {
    const filter = event.value as TodosFilter;
    this.store.updateFilter(filter);
  }

}
