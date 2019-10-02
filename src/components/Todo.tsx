import React, { useState } from "react";

//Generic
import Checkbox from "./generic/Checkbox";

//App related
import TodoEditModal from "./TodoEditModal";

//styling
import styled from "styled-components";
import { CheckboxChecked } from "styled-icons/icomoon/CheckboxChecked";
import { CheckboxUnchecked } from "styled-icons/icomoon/CheckboxUnchecked";
import { RemoveCircleOutline } from "styled-icons/material/RemoveCircleOutline";
import { Edit } from "styled-icons/boxicons-regular/Edit";
interface TodoProps {
  todo: Todo;
  toggleTodo: ToggleTodo;
  editTodo: EditTodo;
  removeTodo: RemoveTodo;
}

function formatDate(date: Date | null) {
  if (!date) return null;
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();
  return day + " " + monthNames[monthIndex] + " " + year;
}

const Todo: React.FC<TodoProps> = ({
  todo,
  toggleTodo,
  editTodo,
  removeTodo
}) => {
  //For editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <TodoContainer>
      <h3 className="todo-title">{todo.title}</h3>
      <StyledButton
        className="todo-remove-button"
        onClick={() => removeTodo(todo)}
      >
        <StyledRemoveIcon />
      </StyledButton>
      <StyledButton
        className="todo-edit-button"
        onClick={() => setIsEditModalOpen(true)}
      >
        <StyledEditIcon />
      </StyledButton>
      <Checkbox
        className="todo-checkbox"
        StyledIcons={{
          checked: StyledCheckboxChecked,
          unchecked: StyledCheckboxUnchecked
        }}
        checked={todo.complete || false}
        onChange={() => {
          toggleTodo(todo);
        }}
      />
      <p className="todo-description">{todo.description}</p>
      {todo.deadline !== undefined && (
        <time className="todo-time">
          <b>Deadline: </b>
          {todo.deadline && formatDate(todo.deadline)}
        </time>
      )}
      {/* 
        TODO: ADD hover tooltip for details
      {todo.details !== undefined && <p>{todo.details}</p>}
      {todo.labels !== undefined && <p>{todo.labels}</p>}
      
      <input type="checkbox" checked={todo.complete} />
      <button onClick={() => setIsEditModalOpen(true)}>Edit</button>
      {/* <Checkbox
        StyledIcons={{
          checked: CheckboxChecked,
          unchecked: CheckboxUnchecked
        }}
        checked={complete}
        onChange={toggleComplete}
      /> */}

      {isEditModalOpen && (
        <TodoEditModal
          onClose={() => setIsEditModalOpen(false)}
          todoToEdit={todo}
          editTodo={editTodo}
        ></TodoEditModal>
      )}
    </TodoContainer>
  );
};

const iconSize = `3em`;

const TodoContainer = styled.li`
  display: grid;
  grid-template-columns: 1fr ${iconSize};
  grid-auto-rows: 1fr;
  grid-gap: 2rem;
  min-width: 5rem;
  padding: 2rem;
  max-width: 25rem;

  .todo-title {
    gird-row: 1;
    grid-column: 1/2;
  }
  .todo-remove-button {
    grid-row: 1;
    grid-column: 2/-1;
  }
  .todo-checkbox {
    grid-row: 3;
    grid-column: 2/-1;
  }
  .todo-description {
    grid-row: 2;
    grid-column: 1/2;
  }
  .todo-edit-button {
    grid-row: 2;
    grid-column: 2/-1;
  }

  .todo-time {
    grid-row: 3;
    grid-column: 1/2;
  }
  & > * {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const StyledButton = styled.button`
  background-color: transparent;
  border-color: transparent;
  color: transparent;
  outline: none;
  padding: 0px;
`;
const StyledRemoveIcon = styled(RemoveCircleOutline)`
  color: FireBrick;
  &:hover {
    color: Crimson;
  }
`;

const StyledEditIcon = styled(Edit)`
  color: grey;
  &:hover {
    color: black;
  }
`;

const StyledCheckboxChecked = styled(CheckboxChecked)`
  color: mediumseagreen;
  min-width: ${iconSize};
`;
const StyledCheckboxUnchecked = styled(CheckboxUnchecked)`
  min-width: ${iconSize};
  &:hover {
    color: mediumseagreen;
    background-color: white;
    border-color: mediumseagreen;
  }
`;
export default Todo;
