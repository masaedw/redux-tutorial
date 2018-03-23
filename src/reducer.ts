import { List } from 'immutable';
import { Todo, RootState } from './models';

const init: RootState = List([]);

export default function (todos = init, action: any) {
  switch (action.type) {
    case 'ADD_TODO':
      return todos.push(new Todo(action.payload));
    case 'TOGGLE_TODO':
      return todos.map(t => {
        if (t.get('id', 0) === action.payload) {
          return t.update('isDone', isDone => !isDone);
        } else {
          return t;
        }
      });
    default:
      return todos;
  }
}
