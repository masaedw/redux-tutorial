import { connect } from 'react-redux';
import * as components from './components';
import { addTodo, toggleTodo } from './actions';
import { RootState } from './reducer';

const mapStateToProps = (state: RootState) => state;

export const TodoList = connect(
  mapStateToProps,
  (dispatch) => ({
    addTodo: (text: string) => dispatch(addTodo(text)),
    toggleTodo: (id: string) => dispatch(toggleTodo(id))
  })
)(components.TodoList);
