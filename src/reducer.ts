import { List } from 'immutable';
import { Todo } from './models';
import * as actions from './actions';
import { $call } from 'utility-types';
import { getType } from 'typesafe-actions';
import { combineReducers } from 'redux';

// これはImmutableなRecordにしなくてよいか？
export type RootState = {
  todos: List<Todo>;
}

const returnsOfActions = Object.values(actions).map($call);
export type TodosAction = typeof returnsOfActions[number];

export const todoReducer = combineReducers<RootState, TodosAction>({
  todos: (state = List<Todo>(), action) => {
    switch (action.type) {
      case getType(actions.addTodo):
        return state.push(Todo.create(action.payload));
      case getType(actions.toggleTodo):
        return state.map(t => {
          if (t.get('id', '') === action.payload) {
            return t.toggle();
          } else {
            return t;
          };
        });
      default:
        return state;
    }
  }
});

export default todoReducer;
