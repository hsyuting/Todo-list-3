import React, { useState } from "react";
//Generic components
import { ModalProvider, Modal } from "./components/generic/Modal";

//App components
import TodoList from "./components/TodoList";
import TodoEditModal from "./components/TodoEditModal";

//Styling
import styled from "styled-components";
import { ListPlus } from "styled-icons/boxicons-regular/ListPlus";
import { Settings } from "styled-icons/material/Settings";

const initialTodos: Array<Todo> = [
  {
    id: "1",
    title:
      "Make a todo list app Make a todo list app Make a todo list app Make a todo list app Make a todo list app Make a todo list app ",
    description:
      "finish the app today and look at tools to make it native app. Make a todo list app Make a todo list app Make a todo list app Make a todo list app",
    complete: false,
    details:
      "use typescript react with styled components Make a todo list app Make a todo list app Make a todo list app Make a todo list app",
    labels:
      "Important Make a todo list app Make a todo list app Make a todo list app Make a todo list app Make a todo list app Make a todo list app",
    deadline: new Date()
  },
  {
    id: "2",
    title: "Make a todo list app # 2",
    description:
      "finish the app today and look at tools to make it native app.",
    complete: false,
    details: "use typescript react with styled components",
    labels: "Important",
    deadline: new Date()
  },
  {
    id: "3",
    title:
      "Make a todo list app Make a todo list app Make a todo list app Make a todo list app Make a todo list app Make a todo list app ",
    description:
      "finish the app today and look at tools to make it native app. Make a todo list app Make a todo list app Make a todo list app Make a todo list app",
    complete: false,
    details:
      "use typescript react with styled components Make a todo list app Make a todo list app Make a todo list app Make a todo list app",
    labels:
      "Important Make a todo list app Make a todo list app Make a todo list app Make a todo list app Make a todo list app Make a todo list app",
    deadline: new Date()
  },
  {
    id: "4",
    title: "Make a todo list app # 2",
    description:
      "finish the app today and look at tools to make it native app.",
    complete: false,
    details: "use typescript react with styled components",
    labels: "Important",
    deadline: new Date()
  }
];

const App: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [todos, setTodos] = useState(initialTodos);

  const addTodo: AddTodo = newTodo => {
    let t = newTodo.title.trim();
    let d = newTodo.description.trim();
    if (t !== "" && d !== "") setTodos([...todos, newTodo]);
  };

  const removeTodo: RemoveTodo = selected => {
    setTodos(todos.filter(todo => todo !== selected));
  };

  const editTodo: EditTodo = selectedTodo => {
    setTodos(
      todos.map(todo => (todo.id === selectedTodo.id ? selectedTodo : todo))
    );
  };

  const toggleTodo: ToggleTodo = selectedTodo => {
    const newTodos = todos.map(todo =>
      todo.id === selectedTodo.id ? { ...todo, complete: !todo.complete } : todo
    );
    setTodos(newTodos);
  };

  return (
    <AppContainer>
      <ModalProvider>
        <h1>Todo list app</h1>
        <ToolBar>
          <AddButton onClick={() => setIsEditModalOpen(true)}>
            <CustomAddBox />
          </AddButton>
          <AddButton onClick={() => setIsSettingsModalOpen(true)}>
            <SettingsButton />
          </AddButton>
        </ToolBar>

        <TodoList
          todos={todos}
          removeTodo={removeTodo}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
        />
        {isEditModalOpen && (
          <TodoEditModal
            addTodo={addTodo}
            onClose={() => setIsEditModalOpen(false)}
          ></TodoEditModal>
        )}
        {isSettingsModalOpen && (
          <Modal onClose={() => setIsSettingsModalOpen(false)}>
            Settings Modal!
          </Modal>
        )}
      </ModalProvider>
    </AppContainer>
  );
};

const iconSize = `3rem`;

const AppContainer = styled.section`
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const ToolBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CustomAddBox = styled(ListPlus)`
  color: black;
  width: ${iconSize};
  height: auto;
  &:hover {
    background-color: #eee;
  }
`;

const AddButton = styled.button`
  background: transparent;
  border: 0px;
  border-radius: 10px;
  padding: 0px;
  overflow: hidden;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const SettingsButton = styled(Settings)`
  color: black;
  width: calc(${iconSize} * 0.8);
  height: auto;
  &:hover {
    background-color: #eee;
  }
`;

export default App;
