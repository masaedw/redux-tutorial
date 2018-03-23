import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

export function Todo (props) {
  const { todo } = props;
  if (todo.isDone) {
    return <strike>{todo.text}</strike>;
  } else {
    return <span>{todo.text}</span>;
  }
}

export class TodoList extends React.Component {
  static propTypes = {
    todos: PropTypes.arrayOf(Map).isRequired,
    toggleTodo: PropTypes.func.isRequired,
    addTodo: PropTypes.func.isRequired
  };

  render () {
    const { todos, toggleTodo, addTodo } = this.props;

    const onSubmit = (event) => {
      const input = event.target;
      const text = input.value;
      const isEnterKey = (event.which === 13);
      const isLongEnough = text.length > 0;

      if (isEnterKey && isLongEnough) {
        input.value = '';
        addTodo(text);
      }
    };

    const toggleClick = id => event => toggleTodo(id);

    return (
      <div className='todo'>
        <input type='text'
          className='todo__entry'
          placeholder='Add todo'
          onKeyDown={onSubmit} />
        <ul className='todo__list'>
          {todos.map(t => (
            <li key={t.id}
              className='todo__item'
              onClick={toggleClick(t.get('id'))}>
              <Todo todo={t.toJS()} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
