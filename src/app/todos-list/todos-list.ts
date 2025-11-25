import { Component, effect, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  MatButtonToggle,
  MatButtonToggleChange,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { TodoStore, TodosFilter } from '../store/todo.store';
import { NgStyle } from '@angular/common';
import { event } from '@ngrx/signals/events';

@Component({
  selector: 'todos-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatSelectionList,
    MatListOption,
    NgStyle,
  ],
  templateUrl: './todos-list.html',
  styleUrls: ['./todos-list.scss'],
})
export class TodosList {
  store = inject(TodoStore);

  // filter: TodosFilter = 'ALL';
  filter = viewChild(MatButtonToggleGroup);

  constructor() {
    // this.store.loadall();
    effect(() => {
      const filter = this.filter();
      if (filter) {
        filter.value = this.store.filter();
      }
    });
  }
  async onAddTodo(title: string) {
    if (title.trim()) {
      await this.store.addTodo({ title: title.trim() });
    }
  }
  async ondeleteTodo(id: string, event: Event) {
    event.stopPropagation();
    await this.store.deleteTodo(id);
  }
  async onTodoToggled(id: string, completed: boolean) {
    await this.store.updateTodo(id, completed);
  }
  onFilterTodos(event: MatButtonToggleChange) {
    const filter = event.value as TodosFilter;
    this.store.updateFilter(filter);
  }
}
