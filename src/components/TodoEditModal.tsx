import React, { useState, ChangeEvent, KeyboardEvent } from "react";

//Generic
import { Modal } from "./generic/Modal";
import Checkbox from "./generic/Checkbox";
import DatePicker from "./generic/DatePicker";
//Styling
import styled from "styled-components";
import { CheckboxChecked } from "styled-icons/icomoon/CheckboxChecked";
import { CheckboxUnchecked } from "styled-icons/icomoon/CheckboxUnchecked";

//Contracts
enum TodoEditModalItemClassNames {
  title = "todo-title",
  description = "todo-description",
  complete = "todo-complete",
  details = "todo-details",
  labels = "todo-labels",
  deadline = "todo-deadline"
}
interface TodoEditModalProps {
  addTodo?: AddTodo;
  onClose: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent
  ) => void;
  todoToEdit?: Todo;
}

const initialNewTodo: Todo = {
  title: "",
  description: "",
  complete: false,
  details: "",
  labels: "",
  deadline: new Date()
};

//Component
const TodoEditModal: React.FC<TodoEditModalProps> = ({
  addTodo,
  onClose,
  todoToEdit
}) => {
  const [newTodo, setNewTodo] = useState(
    todoToEdit ? todoToEdit : initialNewTodo
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.className) {
      case TodoEditModalItemClassNames.title:
        setNewTodo({ ...newTodo, title: e.target.value });
        break;
      case TodoEditModalItemClassNames.description:
        setNewTodo({ ...newTodo, description: e.target.value });
        break;
      case TodoEditModalItemClassNames.complete:
        setNewTodo({ ...newTodo, complete: e.target.checked });
        break;
      case TodoEditModalItemClassNames.details:
        setNewTodo({ ...newTodo, details: e.target.value });
        break;
      case TodoEditModalItemClassNames.labels:
        setNewTodo({ ...newTodo, labels: e.target.value });
        break;
      default:
        break;
    }
  };
  const handleDateChange = (date: Date) => {
    date && setNewTodo({ ...newTodo, deadline: date });
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent<Element>
  ) => {
    e.preventDefault();
    onClose(e);
    if (addTodo) addTodo(newTodo);
    setNewTodo(initialNewTodo);
  };

  return (
    <Modal buttonName={"Save"} onClose={handleSubmit}>
      <TodoEditModalContainer>
        <input
          type="text"
          className={TodoEditModalItemClassNames.title}
          placeholder="Title"
          value={newTodo.title}
          onChange={handleInputChange}
        />

        <input
          type="text"
          className={TodoEditModalItemClassNames.description}
          placeholder="Description"
          value={newTodo.description}
          onChange={handleInputChange}
        />

        <div className={"checkbox-label"}>
          <label>{newTodo.complete ? "Completed!" : "Not complete."}</label>
        </div>
        <Checkbox
          className={TodoEditModalItemClassNames.complete}
          StyledIcons={{
            checked: StyledCheckboxChecked,
            unchecked: StyledCheckboxUnchecked
          }}
          checked={newTodo.complete || false}
          onChange={handleInputChange}
        />
        <input
          type="text"
          className={TodoEditModalItemClassNames.details}
          placeholder="details"
          value={newTodo.details}
          onChange={handleInputChange}
        />
        <input
          type="text"
          className={TodoEditModalItemClassNames.labels}
          placeholder="labels"
          value={newTodo.labels}
          onChange={handleInputChange}
        />
        <DatePicker
          className={TodoEditModalItemClassNames.deadline}
          selected={newTodo.deadline}
          onChange={handleDateChange}
        >
          <span>Deadline:</span>
        </DatePicker>
      </TodoEditModalContainer>
    </Modal>
  );
};

const iconSize = `4rem`;
//Styling
const TodoEditModalContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(12, minmax(2rem, 1fr));
  grid-auto-rows: minmax(5rem, 1fr);
  grid-template-areas:
    "t t t t t t t t ct ct c c"
    "d d d d d d d d d d d d"
    "e e e e l l l l a a a a";
  margin-bottom: 1em;

  input {
    padding-left: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: auto;
  }

  input:focus {
    outline: none;
    background-color: #eee;
  }
  .${TodoEditModalItemClassNames.title} {
    grid-area: t;
  }
  .${TodoEditModalItemClassNames.description} {
    grid-area: d;
  }
  .checkbox-label {
    grid-area: ct;
    display: flex;
    align-items: center;
  }
  .${TodoEditModalItemClassNames.complete} {
    grid-area: c;
  }
  .${TodoEditModalItemClassNames.details} {
    grid-area: e;
  }
  .${TodoEditModalItemClassNames.labels} {
    grid-area: l;
  }
  .${TodoEditModalItemClassNames.deadline} {
    grid-area: a;
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
export default TodoEditModal;
