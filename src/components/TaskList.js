import { AlignHorizontalCenter } from '@mui/icons-material';
import { Avatar, Box, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Container, Stack, Divider } from '@mui/material';

function TaskList({ tasks }) {
  return (
    <Container maxWidth="sm" sx={{ backgroundColor: '#e3f2fd', border: '1px solid primary.main', borderRadius: 4, boxShadow: 2 }}>
    <h4>In Progress</h4>
    <h6>3 tasks active</h6>
    <List sx={{ width: '100%', maxWidth: 560, bgcolor: 'background.paper' }}>
    <Stack
    direction="column"
    divider={<Divider orientation="vertical"/>}
    spacing={2}>  
      {tasks.map((task, index) => (
        <ListItem key={index}>
          <ListItemAvatar>
            <Avatar>{task.name.charAt(0)}</Avatar>
          </ListItemAvatar>
          <ListItemText primary={task.name} secondary={
            <Box sx={{ display: 'flex', alignItems: 'center'}}>
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
      </Stack>
    </List>
    </Container>
  );
}

export default TaskList;
  