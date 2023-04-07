import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

function TaskForm({ open, onClose, onSubmit, initialValues }) {
  const [name, setName] = useState(initialValues.name);
  const [sharedWith, setSharedWith] = useState(initialValues.sharedWith);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, sharedWith });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Update the task name and shared with list.
        </DialogContentText>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            label="Task Name"
            fullWidth
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            margin="dense"
            label="Shared With"
            fullWidth
            value={sharedWith.join(",")}
            onChange={(event) =>
              setSharedWith(event.target.value.split(","))
            }
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
export default TaskForm;