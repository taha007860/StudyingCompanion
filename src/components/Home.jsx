import * as React from "react";
import {
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Button,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GitHubIcon from "@mui/icons-material/GitHub";
import joe from "../../assets/Joe.jpg";
import adam from "../../assets/Adam.jpg";
import zaatar from "../../assets/Zaatar.jpg";
import animation from "../../assets/animation.gif"
const Home = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    navigate("/auth");
  };
  return (
    <div
      style={{
        backgroundImage: "url('../assets/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          ml: 3,
          width: 1 / 2,
          mt: 6,
          fontFamily: "Open Sans",
          color: "#fff",
        }}
      > 
        <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "black" }}>
          Studying made easy.
        </Typography>
        <Typography variant="h5" sx={{ mt: 3, color: "black" }}>
          StudyingCompanion helps you organize your study resources, collaborate with peers, and stay on top of your coursework.
        </Typography>
      </Box>
      <Box sx={{ ml: "auto"}}>
        <img src={animation} alt="Animation" width={"250px"} height={"300px"} style={{ marginLeft: "100px" }} />
      </Box>
    </Box>
        <Button
          variant="contained"
          sx={{ mt: 4, backgroundColor: "#fff", color: "#000" }}
          onClick={handleLogin}
        >
          Get Started
        </Button>
      </Box>
      <Box
        sx={{
          mt: 10,
          ml: 3,
          width: 1 / 2,
        }}
      >
         <Box
            sx={{
              borderRadius: 10,
              width: 500,
              fontFamily: "Open Sans",
              mx: "1rem",
              marginBottom: "60px",
              marginLeft: "-20px",
              marginTop: "-20px"
            }}
          >
            <Accordion sx={{ ml: "20px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Shareable To-Do Lists</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ ml: "20px" }}>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ ml: "20px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Timers with integrated focus timings</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Using the Pomodoro technique utilized by many around the
                  world, we aim to improve the average students focus on his
                  daily tasks on various levels.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ ml: "20px" }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Music to wind down</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                  eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "black"}}>
          Meet the Team
        </Typography>
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={4}>
            <Avatar
              alt="Joe"
              src={joe}
              sx={{ width: 200, height: 200, mx: "auto" }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
              Joe
            </Typography>
            <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
              Backend Developer
            </Typography>
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              sx={{ mt: 2 }}
              href="https://github.com/DrunkEye"
              target="_blank"
            >
              GitHub
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Avatar
              alt="Adam"
              src={adam}
              sx={{ width: 200, height: 200, mx: "auto" }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
              Adam
            </Typography>
            <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
              Frontend Developer
            </Typography>
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              sx={{ mt: 2 }}
              href="https://github.com/AdamHarb"
              target="_blank"
            >
              GitHub
            </Button>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Avatar
              alt="Zaatari"
              src={zaatar}
              sx={{ width: 200, height: 200, mx: "auto" }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
              Zaatari
            </Typography>
            <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
              UI/UX Designer
            </Typography>
            <Button
              variant="outlined"
              startIcon={<GitHubIcon />}
              sx={{ mt: 2 }}
              href="https://github.com/taha007860"
              target="_blank"
            >
              GitHub
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          mt: 10,
          ml: 3,
          width: 1 / 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#fff" }}>
          Frequently Asked Questions
        </Typography>
        <Accordion sx={{ mt: 3 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">What is StudyingCompanion?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              StudyingCompanion is a web application designed to help students organize
              their study resources, collaborate with peers, and stay on top of
              their coursework.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">How do I sign up?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              To sign up for StudyingCompanion, click on the "Get Started" button and
              follow the instructions to create an account.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">What if I forget my password?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              If you forget your password, click on the "Forgot Password"
              button on the login page and follow the instructions to reset your
              password.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
};

export default Home;