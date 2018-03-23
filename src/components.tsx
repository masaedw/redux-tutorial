import * as React from 'react';
import * as Models from './models';
import * as Immutable from 'immutable';

type TodoProps = {
  todo: Models.Todo;
}

export const Todo: React.StatelessComponent<TodoProps> = (props) => {
  const { todo } = props;
  if (todo.isDone) {
    return <del>{todo.text}</del>;
  } else {
    return <span>{todo.text}</span>;
  }
}

export interface TodoListState {
  todos: Immutable.List<Models.Todo>;
}

export interface TodoListActions {
  toggleTodo: (text:string) => any;
  addTodo: (id:string) => any;
}

export type TodoListProps = TodoListState & TodoListActions;

export const TodoList: React.StatelessComponent<TodoListProps> = (props) => {
  const { todos, toggleTodo, addTodo } = props;

  const onSubmit = (event: any) => {
    const input = event.target;
    const text = input.value;
    const isEnterKey = (event.which === 13);
    const isLongEnough = text.length > 0;

    if (isEnterKey && isLongEnough) {
      input.value = '';
      addTodo(text);
    }
  };

  const toggleClick = (id: string) => (event: any) => toggleTodo(id);

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
            onClick={toggleClick(t.id)}>
            <Todo todo={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}
