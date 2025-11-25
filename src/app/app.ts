import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoStore } from './store/todo.store';
import { JsonPipe } from '@angular/common';
import { TodosList } from './todos-list/todos-list';
import { MatSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodosList, MatSpinner],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('ngrx-signal');

  store = inject(TodoStore);

  ngOnInit(): void {
    console.log('App initialized');

    this.loadTodos().then(
      () => {
        console.log('Todos loaded');
      },
      (error) => {
        console.error('Error loading todos:', error);
      }
    );
  }

  async loadTodos() {
    await this.store.loadall();
  }
}
