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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Link } from "react-router-dom";
import TaskDetails from "./TaskDetails";

function TaskList() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [editing, setEditing] = useState(false);
	const tasks = [
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
	]; // Dummy data, will be changed
	const handleClick = (event, task) => {
		setAnchorEl(event.currentTarget);
	};
	const handleTaskDetails = (task) => {
		alert(`Task Details for '${task.name}'`);
		handleClose();
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleShare = (task) => {
		alert(`Share task '${task.name}' with someone`);
		handleClose();
	};
	const handleEdit = (task) => {
		setEditing(true);
		handleClose();
	};
	const handleDelete = (task) => {
		alert(`Delete task '${task.name}'`);
		handleClose();
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
					<h6>3 tasks active</h6>
				</div>
				<IconButton>
					<AddIcon /> Add task
				</IconButton>
			</Box>
			<List sx={{ width: "100%", maxWidth: 560, bgcolor: "background.paper" }}>
				<Stack
					direction="column"
					divider={<Divider orientation="vertical" />}
					spacing={2}
				>
					{tasks.map((task, index) => (
						<ListItemButton>
							<ListItem>
								<ListItemAvatar>
									<Avatar>{task.name.charAt(0)}</Avatar>
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
											<Box sx={{ mb: 1, ml: -10 }}>shared with</Box>
											<Box
												sx={{ display: "flex", alignItems: "center", ml: -10 }}
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
								<Box width={200} ml={6} mr={4}>
									<LinearProgress variant="determinate" value={task.progress} />
								</Box>
								<IconButton onClick={(event) => handleClick(event, task)}>
									<MoreVertIcon />
								</IconButton>
								<Menu anchorEl={anchorEl} onClose={handleClose}>
									<MenuItem onClick={() => handleShare(task)}>Share</MenuItem>
									<MenuItem onClick={() => handleEdit(task)}>Edit</MenuItem>
									<MenuItem onClick={() => handleDelete(task)}>Delete</MenuItem>
									<MenuItem onClick={() => handleTaskDetails(task)}>
										Task Details
									</MenuItem>
								</Menu>
							</ListItem>
						</ListItemButton>
					))}
				</Stack>
			</List>
		</Container>
	);
}

export default TaskList;
