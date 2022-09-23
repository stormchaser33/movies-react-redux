import React, { useState } from "react";
import "./MovieDashboard.css";
import { useParams } from "react-router-dom";
import { useGetByIdQuery } from "../../features/Api";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import LanguageIcon from "@mui/icons-material/Language";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
const base_url = "https://image.tmdb.org/t/p/original";

function MovieDashboard() {
  const [icon, setIcon] = React.useState(<FavoriteBorderIcon />);
  const [string, setString] = useState(150);
  const [show, setShow] = useState("More");
  const navigate = useNavigate();
  const { id, type } = useParams();
  const info = {
    id: id,
    type: type,
  };
  const { data } = useGetByIdQuery(info);

  const truncate = (string, num) => {
    return string?.length > num ? string.substr(0, num - 1) + "..." : string;
  };

  const stringHandler = () => {
    setString(1500);
    setShow("");
  };

  const backHandler = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/", { replace: true }); // the current entry in the history stack will be replaced with the new one with { replace: true }
    }
  };

  const favHandler = () => {
    setIcon(<FavoriteIcon />)
  }

  return (
    <>
      <div
        className="movieDashboard"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${base_url}${data?.backdrop_path})`,
          backgroundPosition: "center center",
        }}
      >
     
      </div>
      <div className="layer"></div>
      <div className="back__icon" onClick={() => backHandler()}>
        <span>Back</span>
      </div>



      <div className="movie__content">
        <div className="vote">
          <span>{data?.vote_average * 10}%</span>
        </div>
        <div className="name">
          <h3>{data?.name || data?.original_name || data?.original_title}</h3>
          <p>
            {truncate(data?.overview, string)}{" "}
            <span onClick={() => stringHandler()}>{show}</span>
          </p>
        </div>
        <div className="button__box">
          <button>
            <PlayArrowIcon /> Play
          </button>
          <button>
            <LanguageIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export default MovieDashboard;
