import React from "react";

//Generic
import Card from "./generic/Card";

//app related
import Todo from "./Todo";

//styling
import styled from "styled-components";

interface TodoListProps {
  todos: Array<Todo>;
  toggleTodo?: ToggleTodo;
  removeTodo: RemoveTodo;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  removeTodo
}) => {
  const generateTodoKey = () => Math.random().toString(36);

  return (
    <TodoListContiner>
      {todos.map(todo => (
        <Card>
          {toggleTodo && (
            <Todo
              key={generateTodoKey()}
              todo={todo}
              toggleTodo={toggleTodo}
              removeTodo={removeTodo}
            />
          )}
          {!toggleTodo && (
            <Todo key={generateTodoKey()} todo={todo} removeTodo={removeTodo} />
          )}
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
