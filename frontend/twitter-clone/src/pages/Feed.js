import React, { useEffect, useState } from "react";
import { axiosWithAuth } from "../axiosAuth";
import Tweetbar from "../components/Tweetbar";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Feed = () => {
  const [tweets, setTweets] = useState([]);
  const [tweeted, setTweeted] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:9000/api/tweets/feed")
      .then((res) => setTweets(res.data))
      .catch((err) => console.log(err));
  }, [tweeted]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        justifyContent: "center",
        maxWidth: "600px",
      }}
    >
      <Tweetbar setTweeted={setTweeted} />
      {tweets.map((tweet) => {
        return (
          <Card key={tweet.tweet_id} sx={{ maxWidth: 500 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {tweet.tweet_id}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={tweet.name}
              subheader={tweet.createdAt}
            />
            {/* <CardMedia
              component="img"
              height="194"
              image="/static/images/cards/paella.jpg"
              alt="Paella dish"
            /> */}
            <CardContent>
              <Typography paragraph>{tweet.message}</Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                {tweet.favorite_cnt}
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
};

export default Feed;
