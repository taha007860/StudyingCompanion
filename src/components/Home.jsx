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

export const Home = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    navigate("/auth");
  };
  return (
    <div>
      <Box sx={{ ml: 3, width: 1 / 2, mt: 6, fontFamily: "Open Sans" }}>
        <Typography variant="h6">Studying Companion</Typography>
        <Typography variant="h7" sx={{ ml: "0px" }}>
          An educational software that aims at aiding the average student to
          focus especially since seeing an increase in ADHD prevalence in
          children aged 4 to 17.
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Box
            sx={{
              width: 500,
              bgcolor: "#3C3535",
              borderRadius: "10px",
              mb: "20px",
              ml: "20px",
              mt: "40px",
            }}
          >
            <Typography
              sx={{ color: "white", padding: "10px", fontFamily: "Open Sans" }}
            >
              {" "}
              Why use StudyingCompanion? Well we offer a variety of features to
              help the average student with difficulty focusing on their
              education. These features are but not limited to:
            </Typography>
          </Box>
          <Box
            sx={{
              borderRadius: 10,
              width: 500,
              fontFamily: "Open Sans",
              mx: "1rem",
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
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            sx={{
              ml: "400px",
              mt: "130px",
              borderRadius: "10px",
              width: "170px",
            }}
            onClick={handleLogin}
          >
            Go To Login
          </Button>
          <br />
          <Button
            variant="contained"
            sx={{
              ml: "400px",
              mt: "16px",
              borderRadius: "10px",
              width: "170px",
              bgcolor: "#3C3535",
            }}
            href="https://github.com/AdamHarb/StudyingCompanion"
            target="_blank"
          >
            <GitHubIcon sx={{ ml: "-40px" }} />
            <Typography sx={{ ml: "25px" }}>Github</Typography>
          </Button>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "flex-end",
          height: "170px",
          mr: "20px",
        }}
      >
        <a
          href="https://www.linkedin.com/in/mohammad-al-zaatari-976347240/"
          target="_blank"
          rel="noreferrer"
        >
          <Avatar
            alt="Zaatar"
            src={zaatar}
            sx={{ width: "50px", height: "50px" }}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/adam-i-harb/"
          target="_blank"
          rel="noreferrer"
        >
          <Avatar
            alt="Adam"
            src={adam}
            sx={{ width: "50px", height: "50px" }}
          />
        </a>
        <a
          href="https://www.linkedin.com/in/joe-hage-72b3aa264/"
          target="_blank"
          rel="noreferrer"
        >
          <Avatar alt="Joe" src={joe} sx={{ width: "50px", height: "50px" }} />
        </a>
      </Box>
    </div>
  );
};
