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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Box>
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
            </Box>
          </Box>
          <Box sx={{ ml: "300px", mr: "100px" }}>
            <Box
              component="img"
              src={animation}
              alt="Animation"
              width={"px"}
              height={"350px"}
            />
          </Box>
        </Box>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#fff", color: "#000" }}
          onClick={handleLogin}
        >
          Get Started
        </Button>
      </Box>
      <Box
        sx={{
          mt: 10,
          ml: 3,
        }}
      >
        <Box
          sx={{
            borderRadius: 10,
            fontFamily: "Open Sans",
            mx: "1rem",
            marginBottom: "60px",
            marginLeft: "-20px",
            marginTop: "-20px",
            width: 1 / 2,
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={6}>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "black" }}
              >
                Meet the Team
              </Typography>
              <Grid container spacing={0} sx={{ mt: 3 }}>
                <Grid item sm={4}>
                  <Avatar
                    alt="Joe"
                    src={joe}
                    sx={{ width: 100, height: 100, mx: "auto" }}
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
                <Grid item xs={3} sm={4}>
                  <Avatar
                    alt="Adam"
                    src={adam}
                    sx={{ width: 100, height: 100, mx: "auto" }}
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
                <Grid item sm={4}>
                  <Avatar
                    alt="Zaatari"
                    src={zaatar}
                    sx={{ width: 100, height: 100, mx: "auto" }}
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
            </Grid>
            <Grid item xs={5}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: "bold", color: "#000" }}
                >
                  Frequently Asked Questions
                </Typography>
                <Box sx={{ borderRadius: "100px" }}>
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
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default Home;
