import { Link } from "react-router-dom";
import { Button } from "@mui/material";

function NotFoundPage() {
  return (
    <center>
      <div style={{ margin: "15rem" }}>
        <h1>404 Error, Not Found</h1>
        <p>Click here, to go back home</p>
        <Link to={`/`}>
          <Button>
            <svg
              width="50px"
              height="50px"
              viewBox="0 0 24 24"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Home</title>
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g id="Home">
                  <rect
                    id="Rectangle"
                    fill-rule="nonzero"
                    x="0"
                    y="0"
                    width="10"
                    height="10"
                  ></rect>
                  <path
                    d="M5,10 L5,19 C5,19.5523 5.44772,20 6,20 L18,20 C18.5523,20 19,19.5523 19,19 L19,10"
                    id="Path"
                    stroke="#0C0310"
                    stroke-width="2"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M21,11 L12.307,4.23875 C12.1264,4.09832 11.8736,4.09832 11.693,4.23875 L3,11"
                    id="Path"
                    stroke="#0C0310"
                    stroke-width="2"
                    stroke-linecap="round"
                  ></path>
                </g>
              </g>
            </svg>
          </Button>
        </Link>
      </div>
    </center>
  );
}

export default NotFoundPage;
