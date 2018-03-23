// succinct hack for generating passable unique ids
const uid = () => Math.random().toString(34).slice(2);

// actionの型付けは後で。

export function addTodo (text: string) {
  return {
    type: 'ADD_TODO',
    payload: {
      id: uid(),
      isDone: false,
      text: text
    }
  };
}

export function toggleTodo (id: string) {
  return {
    type: 'TOGGLE_TODO',
    payload: id
  };
}
