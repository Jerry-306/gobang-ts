import { Link } from "react-router-dom";
import "./index.css";

export default function Welcome() {
  return (
    <div className="welcome-root">
      <h1>W E L C O M E</h1>
      <div id="container">
        <div className="ghost">
          <div className="body">
            <div className="face">
              <div className="eyes"> </div>
              <div className="dimples"> </div>
              <div className="mouth"> </div>
            </div>
            <div className="bottom">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="wave"></div>
            </div>
          </div>
          <div className="shadow"></div>
        </div>
      </div>
      <Link to="/home" className="play-game">
        PLAY
      </Link>
    </div>
  );
}
