import { Button, Container, Typography } from "@mui/material";
import { auth } from "../models/firebase";
import { deleteUser } from "firebase/auth";

export const Account = () => {
  const handleDelete = () => {
    deleteUser(auth.currentUser)
      .then(() => {
        auth.signOut().then((r) => console.log(r));
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <Container
      sx={{
        my: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h3" align="center">
        Account name: {auth.currentUser?.displayName}
      </Typography>
      <Typography variant="h3" align="center">
        Email:{" "}
        {auth.currentUser?.email === null
          ? "No email"
          : auth.currentUser?.email}
      </Typography>
      <Typography variant="h3" align="center">
        Created: {auth.currentUser?.metadata.creationTime}
      </Typography>
      <Typography variant="h3" align="center">
        UID: {auth.currentUser?.uid}
      </Typography>
      <Button
        variant="contained"
        onClick={handleDelete}
        sx={{
          my: "3rem",
        }}
      >
        Delete Account
      </Button>
    </Container>
  );
};
