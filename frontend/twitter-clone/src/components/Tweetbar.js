import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { axiosWithAuth } from "../axiosAuth";

const Tweetbar = ({ setTweeted }) => {
  const handleTweet = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      message: data.get("tweet"),
    });
    const res = await axiosWithAuth().post(
      "http://localhost:9000/api/tweets/",
      {
        message: data.get("tweet"),
      }
    );
    console.log("reshere>>", res);
    setTweeted((prev) => [...prev, res.data]);
    console.log(e);
    e.target[0].value = "";
  };
  return (
    <Box
      component="form"
      onSubmit={handleTweet}
      sx={{
        width: 500,
        maxWidth: "100%",
      }}
    >
      <TextField fullWidth name="tweet" label="Ne dusunuyorsun" id="tweet" />
      <Button type="submit">Tweet</Button>
    </Box>
  );
};

export default Tweetbar;
