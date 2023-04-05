import { AlignHorizontalCenter } from '@mui/icons-material';
import { Avatar, Box, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Container } from '@mui/material';

function TaskList({ tasks }) {
  return (
    <Container maxWidth="sm">
    <h4>In Progress</h4>
    <h6>3 tasks active</h6>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {tasks.map((task, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar>{task.name.charAt(0)}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={task.name} secondary={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
               <p>shared with</p> 
              {task.sharedWith.map((user, index) => (
                <Avatar key={index} sx={{ ml: 1 }} alt={user} src={`https://i.pravatar.cc/32?u=${user}`} />
              ))}
            </Box>
          } />
          <Box width={200} ml={6}>
            <LinearProgress variant="determinate" value={task.progress} />
          </Box>
        </ListItem>
      ))}
    </List>
    </Container>
  );
}

export default TaskList;
  