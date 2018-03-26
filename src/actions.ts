import { createAction } from 'typesafe-actions';

export const addTodo = createAction('ADD_TODO', (text: string) => ({
  type: 'ADD_TODO',
  payload: text
}));

export const toggleTodo = createAction('TOGGLE_TODO', (id: string) => ({
  type: 'TOGGLE_TODO',
  payload: id
}));
