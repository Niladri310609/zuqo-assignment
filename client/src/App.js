// App.js
import React, { useState } from "react";

import "./App.css"; // Import the CSS file
import { useDispatch, useSelector } from "react-redux";
import { login } from "./redux/action";
import infinityinsidelogo from "./assets/22ca07d8-f666-4252-a330-3d9d473a9cb5.jpeg";




function App() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("niladri@determinantstudios.com");

  const dispatch = useDispatch();
  // const loginError = useSelector((state) => state.loginError);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(login(email, password));
      console.log(response);
  
      if (response && response.status === 200) {
        const userName = response.data?.data?.userId.firstName;
  
        // Show welcome message and navigate to the dashboard
        window.alert(`Welcome, ${userName}!`);
      } else {
        // Show error message
        window.alert(`Error: ${response.data?.message}`);
      }
    } catch (error) {
      // Handle any other errors that might occur
      console.error("An error occurred during login:", error);
      window.alert("An error occurred during login. Please try again.");
    }
  };
  
  

  const togglePassword = async () => {
    var passwordInput = document.getElementById("password");
    var showPasswordCheckbox = document.getElementById("showPassword");

    passwordInput.type = showPasswordCheckbox.checked ? "text" : "password";
  };

  return (
    <div className="container">
      {" "}
      {}
      <nav>
        <a href="#"> Home </a>
        <a href="#">Support</a>
        <a href="#">Docs</a>
      </nav>
      <div className="middle-text">
        <h2> Welcome to Zuqo's </h2>
        <p>
          <h1>CallHub Connect</h1>
        </p>
        <p>
          <h5>Empowering Seamless Connections:Elevate your customer</h5>
        </p>
        <p>
          <h5>interactions with Callhub Connect.....</h5>
        </p>
      </div>
      <div className="infinity">
        <img src={infinityinsidelogo} alt="My Image" class="infinity-image" />
      </div>
      <div class="SeContainer">
        <span class="first-word">ZUQO</span>&nbsp; CALL HUB CONNECT
      </div>
      <div class="FormContainer">
        <h4> Login </h4>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="Enter your Email" 
          value ={email}
           onChange={(e)=> setEmail(e.target.value)} 
           />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"     
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label
            htmlFor="showPassword"
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginTop: "5px",
              marginRight: "5px",
              fontSize: "small",
              fontFamily:
                "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
              color: "#333",
              fontWeight: "bold",
            }}
          >
            <input
              type="checkbox"
              id="showPassword"
              style={{ marginRight: "10px" }}
              onClick={togglePassword}
            />
            Show Password
          </label>

          <button type="submit">Sign in</button>
        </form>
      </div>
      
    </div>
  );
}

export default App;
