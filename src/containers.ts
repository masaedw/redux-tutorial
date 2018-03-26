import { connect } from 'react-redux';
import * as components from './components';
import { addTodo, toggleTodo } from './actions';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState, TodosAction } from './reducer';

const mapStateToProps = (state: RootState) => state;

const mapDispatchToProps = (dispatch: Dispatch<TodosAction>) => bindActionCreators({
  addTodo,
  toggleTodo,
}, dispatch);

export const TodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(components.TodoList);
