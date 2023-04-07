import { AlignHorizontalCenter } from "@mui/icons-material";
import {
	Avatar,
	Box,
	LinearProgress,
	List,
	ListItem,
	ListItemButton,
	ListItemAvatar,
	ListItemText,
	Container,
	Stack,
	Divider,
	IconButton,
	Menu,
	MenuItem,
	Typography
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { useState} from "react";
import { Link } from "react-router-dom";
import TaskDetails from "./TaskDetails";

function TaskList() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [editing, setEditing] = useState(false);
	const [counter, setCounter] = useState(4);
	const [name, setName] = useState("");
	const [sharedWith, setSharedWith] = useState([]);
	const [tasks, setTasks] = useState([
		{
			name: "Task 1",
			progress: 50,
			status: "Not completed",
			date: "4/6/2023",
			description: "Lorem ipstum",
			sharedWith: ["User 1", "User 2"],
		},
		{
			name: "Task 2",
			progress: 25,
			status: "Not completed",
			date: "4/6/2023",
			description: "Lorem ipstum",
			sharedWith: ["User 3", "User 4"],
		},
		{
			name: "Task 3",
			progress: 75,
			status: "Not completed",
			date: "4/6/2023",
			description: "Lorem ipstum",
			sharedWith: ["User 1", "User 4"],
		},
	]);

	const handleClick = (event, task) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleTaskDetails = (task) => {
		alert(`Task Details for '${task.name}'`);
		handleClose();
	};

	const handleShare = (task) => {
		alert(`Share task '${task.name}' with someone`);
		handleClose();
	};

	const handleEdit = (task) => {
		setEditing(true);
		setName(task.name);
		setSharedWith(task.sharedWith);
		handleClose();
	};

	const handleDelete = (task) => {
		alert(`Delete task '${task.name}'`);
		handleClose();
	};  
	const handleAddTask = () => {
		const newTask = {
			name: `Task ${counter}`,
			progress: 25,
			status: "Not completed",
			date: "4/7/2023",
			description: "",
			sharedWith: ["User 1", "User 4"],
		};
		setTasks([...tasks, newTask]);
		setCounter(counter + 1);
	};

	return (
		<Container
			maxWidth="sm"
			sx={{
				backgroundColor: "#e3f2fd",
				border: "1px solid primary.main",
				borderRadius: 4,
				boxShadow: 2,
				marginTop: "2.5rem",
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					py: 2,
					px: 3,
				}}
			>
				<div>
					<h4>In Progress</h4>
					<p>3 tasks</p>
				</div>
				<IconButton
					size="large"
					aria-label="add task"
					onClick={handleAddTask}
				>
					<AddIcon />
				</IconButton>
			</Box>
			<Divider />
			<List
				sx={{
					width: "100%",
					maxWidth: 560,
					bgcolor: "background.paper",
				}}
			>
				{tasks.map((task) => (
					<>
						<ListItem
							key={task.name}
							secondaryAction={
								<IconButton
									edge="end"
									aria-label="options"
									onClick={(e) => handleClick(e, task)}
								>
									<MoreVertIcon />
								</IconButton>
							}
						>
							<ListItemButton
							>
						     
								<ListItemAvatar>
									<Avatar
										sx={{
											bgcolor: "primary.main",
											color: "primary.contrastText",
										}}
									>
										{task.name[0]}
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={task.name}
									secondary={
										<Box
											sx={{
												display: "flex",
												alignItems: "center",
												flexDirection: "column",
											}}
										>
											<Box sx={{ mb: 1, ml: -18 }}>shared with</Box>
											<Box
												sx={{ display: "flex", alignItems: "center", ml: -17 }}
											>
												{task.sharedWith.map((user, index) => (
													<Avatar
														key={index}
														sx={{ ml: 1 }}
														alt={user}
														src={`https://i.pravatar.cc/32?u=${user}`}
													/>
												))}
											</Box>
										</Box>
										}
										sx={{ ml: 2, mt: 1 }}
									/>
										<Stack
											direction="row"
											alignItems="center"
											spacing={1}
										>
											<LinearProgress
												variant="determinate"
												value={task.progress}
												sx={{ width: 100 }}
											/>
											<Typography variant="body2" color="text.secondary">
												{`${task.progress}%`}
											</Typography>
											</Stack>
							</ListItemButton>
						</ListItem>
						<Divider />
					</>
				))}
			</List>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={() => handleTaskDetails()}>Task Details</MenuItem>
				<MenuItem onClick={() => handleShare()}>Share</MenuItem>
				<MenuItem onClick={() => handleEdit()}>Edit</MenuItem>
				<MenuItem onClick={() => handleDelete()}>Delete</MenuItem>
			</Menu>
		</Container>
	);
}
export default TaskList;												

