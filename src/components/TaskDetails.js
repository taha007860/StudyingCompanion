import { Typography } from '@mui/material';
function TaskDetails({ task }) {
  return (
    <div>
      <Typography variant="h5" component="h2">
        {task.name}
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Status: {task.status}
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Progress: {task.progress}%
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Date: {task.date}
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Description: {task.description}
      </Typography>
    </div>
  );
}

export default TaskDetails;
