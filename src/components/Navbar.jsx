import * as React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div>
      <ul>
        <li
          style={{
            fontSize: "32px",
          }}
        >
          School System
        </li>
        <div
          className="flex"
          style={{
            color: "purple",
            marginLeft: "15%",
            marginTop: "6px",
            paddingTop: "6px",
          }}
        >
          <div>{new Date().toJSON().slice(0, 16)}</div>
          <div
            style={{
              color: "green",
              marginTop: "6px",
              paddingTop: "6px",
              marginLeft: "2%",
            }}
          >
            Ngô Thế Hiếu
          </div>
        </div>
        <div className="flex">
          <img
            src="./profileImage.jpg"
            style={{ width: "50px", height: "50px",marginLeft: "75%" }}
          />
          <div>
            <div style={{fontWeight: "bold"}}>
              admin
            </div>
            <div style={{backgroundColor: "orange",padding: "9px",borderRadius: "15%",color:"white"}}>
              admin
            </div>
          </div>
        </div>
      </ul>
      <div style={{ marginLeft: "auto" }}>
        <input />
      </div>
    </div>
  );
}
