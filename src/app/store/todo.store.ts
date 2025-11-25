import { computed, inject } from '@angular/core';
import { signalStore, withState, patchState, withMethods, withComputed } from '@ngrx/signals';
import { Todo } from '../modal/todo.model';
import { TodosService } from '../service/todo.service';

export type TodosFilter = 'ALL' | 'COMPLETED' | 'PENDING';

type TodosState = {
  todos: Todo[];
  loading: boolean;
  filter: TodosFilter;
};

const initialState: TodosState = {
  todos: [],
  loading: false,
  filter: 'ALL',
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, todosService = inject(TodosService)) => ({
    async loadall() {
      patchState(store, { loading: true });
      const todos = await todosService.getTodos();
      patchState(store, { todos, loading: false });
    },
    async addTodo(todo: Partial<Todo>) {
      const newTodo = await todosService.addTodo(todo);
      patchState(store, (state) => ({
        todos: [...state.todos, newTodo],
      }));
    },
    async deleteTodo(id: string) {
      await todosService.deleteTodo(id);
      patchState(store, (state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    },
    async updateTodo(id: string, completed: boolean) {
      await todosService.updateTodo(id, completed);
      patchState(store, (state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo)),
      }));
    },
    updateFilter(filter: TodosFilter) {
      patchState(store, { filter });
    },
  })),
  withComputed((state) => ({
    filteredTodos: computed(() => {
      const todos = state.todos();
      console.log(state.filter());
      console.log(todos);
      switch (state.filter()) {
        case 'ALL':
          console.log('ALL todos');
          return todos;
        case 'COMPLETED':
          return todos.filter((todo) => todo.completed);
        case 'PENDING':
          return todos.filter((todo) => !todo.completed);
      }
    }),
  }))
);
