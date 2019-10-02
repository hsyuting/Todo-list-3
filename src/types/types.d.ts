type Todo = {
  title: string;
  description: string;
  complete?: boolean;
  details?: string;
  labels?: string;
  deadline?: Date | undefined | null;
};

type ToggleTodo = (selectedTodo: Todo) => void;
type AddTodo = (newTodo: Todo) => void;
type RemoveTodo = (selected: Todo) => void;
type AddTodoAction = (action: string) => void;
