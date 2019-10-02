import React from "react";

//Generic
import Card from "./generic/Card";

//app related
import Todo from "./Todo";

//styling
import styled from "styled-components";

interface TodoListProps {
  todos: Array<Todo>;
  toggleTodo: ToggleTodo;
  editTodo: EditTodo;
  removeTodo: RemoveTodo;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  editTodo,
  removeTodo
}) => {
  return (
    <TodoListContiner>
      {todos.map(todo => (
        <Card key={todo.id}>
          <Todo
            todo={todo}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
          />
        </Card>
      ))}
    </TodoListContiner>
  );
};

const TodoListContiner = styled.ul`
  display: flex;
  flex-flow: column;
  list-style-type: none;
  padding-left: 0px;
`;
export default TodoList;
