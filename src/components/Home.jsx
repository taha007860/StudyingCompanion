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
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GitHubIcon from "@mui/icons-material/GitHub";
import joe from "../../assets/Joe.jpg";
import adam from "../../assets/Adam.jpg";
import zaatar from "../../assets/Zaatar.jpg";
import animation from "../../assets/animation.gif";

const Home = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    navigate("/auth");
  };
  const [quote, setQuote] = useState([]);
  const fetchData = () => {
    return fetch(
      "https://api.api-ninjas.com/v1/quotes?limit=1category=knowledge",
      {
        headers: {
          "X-Api-Key": "3p67WCRBW/amdiPOIQWKAg==wPzN4v1uZF34uOzG",
        },
      }
    );
  };

  useEffect(() => {
    fetchData()
      .then((response) => response.json())
      .then((data) => setQuote(data))
      .catch((error) => console.log("Error", error.message));
  }, []);

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          ml: 3,
          fontFamily: "Open Sans",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: "bold", color: "black" }}
          >
            Studying made easy.
          </Typography>
          <Typography variant="h5" sx={{ mt: 3, color: "black" }}>
            StudyingCompanion helps you organize your study resources,
            collaborate with peers, and stay on top of your coursework.
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#fff", color: "#000", mt: 3 }}
            onClick={handleLogin}
          >
            Get Started
          </Button>
        </Box>

        <Box sx={{ ml: "auto", mr: "auto", textAlign: "center" }}>
          <Box
            component="img"
            src={animation}
            alt="Animation"
            width={"100%"}
            height={"auto"}
          />
        </Box>
      </Box>

      <Box
        sx={{
          mt: 10,
          ml: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                borderRadius: 10,
                fontFamily: "Open Sans",
                mx: "1rem",
                marginBottom: "30px",
                padding: "20px",
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
                <AccordionDetails>
                  <Typography>
                    Boost your productivity with shareable to-do lists that
                    seamlessly integrate with priority settings. With these
                    tools, you can easily organize and prioritize your tasks and
                    share them with others to collaborate and stay on track.
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
                Using the Pomodoro technique utilized by many around the world,
                we aim to improve the average students focus on his daily tasks
                on various levels.
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
                Music can be a great way to unwind and relax after a challenging
                study session. Listening to calming melodies can help reduce
                stress levels, improve mood, and promote better sleep.
              </Typography>
            </AccordionDetails>
          </Accordion>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
  <Box
    sx={{
      borderRadius: "10px",
      padding: "20px",
      mt: { xs: 3, md: 0 }, // Adjust the margin for smaller screens
    }}
  >
    <Typography
      variant="h4"
      sx={{ fontWeight: "bold", color: "black" }}
    >
      Meet the Team
    </Typography>
    <Grid container spacing={2} sx={{ mt: 3 }}>
      <Grid item xs={6} sm={4}>
        <Avatar
          alt="Joe"
          src={joe}
          sx={{ width: 100, height: 100, mx: "-15px" }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          Joe
        </Typography>
        <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
          Frontend Developer
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
      <Grid item xs={6} sm={4}>
        <Avatar
          alt="Adam"
          src={adam}
          sx={{ width: 100, height: 100, mx: "-15px" }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
          Adam
        </Typography>
        <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
          Backend Developer
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
      <Grid item xs={6} sm={4}>
        <Avatar
          alt="Zaatari"
          src={zaatar}
          sx={{ width: 100, height: 100, mx: "-15px" }}
        />
        <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
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
</Grid>

        </Grid>
      </Box>

      <Box sx={{ ml: 3, mr: 3 }}>
        <Box sx={{ borderRadius: "10px", mt: 3, padding: "20px" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#000" }}
          >
            Frequently Asked Questions
          </Typography>
          <Box sx={{ borderRadius: "10px", mt: 3 }}>
          <Accordion sx={{ mt: 3 }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h5">
                        What is StudyingCompanion?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1">
                        StudyingCompanion is a web application designed to help
                        students organize their study resources, collaborate
                        with peers, and stay on top of their coursework.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h5">How do I sign up?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1">
                        To sign up for StudyingCompanion, click on the "Get
                        Started" button and follow the instructions to create an
                        account.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h5">
                        What if I forget my password?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1">
                        If you forget your password, click on the "Forgot
                        Password" button on the login page and follow the
                        instructions to reset your password.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h5">
                        Can I collaborate with my classmates?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1">
                        Yes! StudyingCompanion allows you to create study groups
                        with your classmates, share resources, and communicate
                        through chat.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h5">
                        Is StudyingCompanion free?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1">
                        Yes! StudyingCompanion is completely free to use.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>

                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h5">
                        Can I access StudyingCompanion on my mobile device?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography variant="body1">
                        Yes! StudyingCompanion is designed to be responsive and
                        can be accessed on any device with an internet
                        connection.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
          </Box>
        </Box>
      </Box>

      <Footer />
    </div>
  );
};

export default Home;
