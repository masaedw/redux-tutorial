import { Record } from 'immutable';

export interface ITodo {
  id: string;
  isDone: boolean;
  text: string;
}

const todo = Record<ITodo>({
  id: '',
  isDone: false,
  text: ''
});

// succinct hack for generating passable unique ids
const uid = () => Math.random().toString(34).slice(2);

export class Todo extends todo {
  static create (text: string) {
    return new Todo({
      id: uid(),
      text
    });
  }

  toggle (): Todo {
    return this.update('isDone', isDone => !isDone);
  }
}
