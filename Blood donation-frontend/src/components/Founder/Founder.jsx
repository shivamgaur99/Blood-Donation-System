import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Badge from '@material-ui/core/Badge'; 
import Loader from "../util/Loader";
import "./founder-card.css"; 
import { useToast } from "../../services/toastService";
import { SimpleToast } from "../util/Toast/Toast"; 

const uses = makeStyles(() => ({
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
}));

const Founder = (props) => {
  const dark = props.theme;
  const [team, setTeam] = useState([]);
  const [image, setImage] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const { toast, showToast, hideToast } = useToast();
  const classes = uses();

  return (
    <div className={dark ? "dark" : "light"}>
      <div className="team">
        <Typography
          variant="h4"
          className={dark ? "heading-dark" : "heading-light"}
        >
          Founder and Co-Founders
        </Typography>
        <div className={dark ? "dash dash-dark" : "dash dash-light"}></div>
        <div className="row1">
          <div className={dark ? "card1 card1-dark" : "card1 card1-light"}>
            <div className="photo">
              <img
                alt="profile"
                className="cover"
                src="/images/profile.jpg"
              />
              <div className="team-social">
                <i
                  onClick={() => window.open("https://www.linkedin.com/in/shivam1gaur/", "_blank")}
                  className={dark ? "card-footer fab fa-linkedin fa-2x in in-dark" : "card-footer fab fa-linkedin fa-2x in in-light"}
                ></i>
                <i
                  onClick={() => window.open("https://x.com/shivam1gaur", "_blank")}
                  className={dark ? "card-footer fab fa-twitter-square fa-2x fa-twitter-square-dark" : "card-footer fab fa-twitter-square fa-2x fa-twitter-square-light"}
                ></i>
                <i
                  onClick={() => window.open("https://github.com/shivamgaur99", "_blank")}
                  className={dark ? "card-footer fab fa-github-square fa-2x fa-github-square-dark" : "card-footer fab fa-github-square fa-2x fa-github-square-light"}
                ></i>
              </div>
            </div>
            <div className={classes.details}>
              <CardContent className={classes.content} id="content">
                <Typography component="h6" variant="h6" id="Mui-h6">
                  Shivam Gaur
                </Typography>
                <Badge pill className="info badge text-dark">
                  {"founder".toUpperCase()}
                </Badge>
                <div>
                  <p className="intro">I am a Software Developer who ❤ contributing to open source</p>
                </div>
                <br />
              </CardContent>
            </div>
          </div>
        </div>

        <Typography
          variant="h4"
          className={dark ? "heading-dark" : "heading-light"}
        >
          Board Members
        </Typography>
        <div className={dark ? "dash dash-dark" : "dash dash-light"}></div>
        <div className="row2">
          {isLoaded ? <Loader /> : team.map((roleObject, index) => {
            return (
              <div key={index} className={dark ? "card1 card1-dark" : "card1 card1-light"}>
                <div className="photo">
                  <img
                    alt="profile"
                    className="cover"
                    src={(image[index]?.id === roleObject?._id && image[index]?.image) || "./images/defaultUser.png"}
                  />
                  <div className="team-social">
                    <i
                      onClick={() => window.open(roleObject.linkedin_url, "_blank")}
                      className={dark ? "card-footer fab fa-linkedin fa-2x in in-dark" : "card-footer fab fa-linkedin fa-2x in in-light"}
                    ></i>
                    <i
                      onClick={() => window.open(roleObject.twitter_url, "_blank")}
                      className={dark ? "card-footer fab fa-twitter-square fa-2x fa-twitter-square-dark" : "card-footer fab fa-twitter-square fa-2x fa-twitter-square-light"}
                    ></i>
                    <i
                      onClick={() => window.open(roleObject.github_url, "_blank")}
                      className={dark ? "card-footer fab fa-github-square fa-2x fa-github-square-dark" : "card-footer fab fa-github-square fa-2x fa-github-square-light"}
                    ></i>
                  </div>
                </div>
                <div className={classes.details}>
                  <CardContent className={classes.content} id="content">
                    <Typography component="h6" variant="h6" id="Mui-h6">
                      {roleObject?.full_name}
                    </Typography>
                    <div>
                      <p id="intro">{roleObject?.description}</p>
                    </div>
                    <div className="badge-container">
                      {roleObject?.teams?.map((badge) => {
                        return (
                          <Badge
                            key={badge}
                            badgeContent={badge}
                            color={
                              badge === "open-source" ? "primary" :
                              badge === "social" ? "default" :
                              badge === "broadcast" ? "secondary" :
                              badge === "design" ? "info" :
                              badge === "resource-sharing" ? "info" :
                              "default"
                            }
                            overlap="rectangular" 
                          >
                            <span></span> 
                          </Badge>
                        );
                      })}
                    </div>
                    <br />
                  </CardContent>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <SimpleToast
        open={toast.open}
        severity={toast.severity}
        message={toast.message}
        handleCloseToast={hideToast}
      />
    </div>
  );
};

export default Founder;
