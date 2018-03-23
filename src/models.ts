import { Record, List } from 'immutable';

export interface ITodo {
  id: string;
  isDone: boolean;
  text: string;
}

const todo = Record<ITodo>({
  id: '',
  isDone: false,
  text: '',
});

export class Todo extends todo {
}

export type RootState = List<Todo>;
