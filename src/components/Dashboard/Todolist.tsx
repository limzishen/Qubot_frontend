import {
  TextField,
  Button,
  Typography,
  Checkbox,
  List,
  ListItem,
  Box
} from "@mui/material";
import { useState } from "react";

type Todo = {
  id: number;
  val: string;
  isDone: boolean;
};

function Todolist() {
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState<number | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  const handleClick = () => {
    if (inputVal.trim() === "") return;

    if (isEdited && editedId !== null) {
      setTodos([
        ...todos,
        { val: inputVal, isDone: false, id: editedId }
      ]);
    } else {
      setTodos([
        ...todos,
        { val: inputVal, isDone: false, id: Date.now() }
      ]);
    }

    setInputVal("");
    setIsEdited(false);
    setEditedId(null);
  };

  const onDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleEdit = (id: number) => {
    const item = todos.find((todo) => todo.id === id);
    if (!item) return;
    setEditedId(item.id);
    setInputVal(item.val);
    setTodos(todos.filter((todo) => todo.id !== id));
    setIsEdited(true);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          variant="outlined"
          label="Task"
          value={inputVal}
          onChange={onChange}
          size="small"
          sx={{ flexGrow: 1 }}
        />
        <Button
          variant={isEdited ? "outlined" : "contained"}
          onClick={handleClick}
          disabled={!inputVal}
        >
          {isEdited ? "Edit" : "Add"}
        </Button>
      </Box>

      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1,
              border: '1px solid #ccc',
              borderRadius: 1,
              p: 1
            }}
          >
            <Checkbox
              checked={todo.isDone}
              onChange={() => handleDone(todo.id)}
            />
            <Typography
              sx={{
                flexGrow: 1,
                color: todo.isDone ? 'green' : 'text.primary',
                textDecoration: todo.isDone ? 'line-through' : 'none',
                px: 1
              }}
            >
              {todo.val}
            </Typography>
            <Box>
              <Button
                variant="contained"
                size="small"
                onClick={() => handleEdit(todo.id)}
                sx={{ mr: 1 }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={() => onDelete(todo.id)}
              >
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Todolist;
