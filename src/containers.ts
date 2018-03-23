import { connect } from 'react-redux';
import * as components from './components';
import { addTodo, toggleTodo } from './actions';
import { RootState } from './models';
import { bindActionCreators, Dispatch } from 'redux';

const mapStateToProps = (state: RootState) => ({
  todos: state
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => bindActionCreators({
  addTodo,
  toggleTodo,
}, dispatch);

export const TodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(components.TodoList);
