// App.js
import React, { useState,useRef,useEffect } from 'react';

import './App.css'; // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { signup, login } from './redux/action';
import infinityinsidelogo  from './assets/22ca07d8-f666-4252-a330-3d9d473a9cb5.jpeg'
function App() {
  const [firstName, setfirstName] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setemail] = useState('');

  const dispatch = useDispatch();
  const signupError = useSelector((state) => state.signupError);
  const loginError = useSelector((state) => state.loginError);

  const handleSignup = () => {
    dispatch(signup(firstName, lastName, email, password));
  };

  const handleLogin = () => {
    dispatch(login(email, password));
  };
  const videoRef = useRef(null);


    const video = videoRef.current;

    // const fetchVideoAndPlay = async () => {
    //   try {
    //     const response = await fetch('zuqo-assignment/client/src/assets/pexels-joshua-woroniecki-19181145 (2160p).mp4');
    
    //     if (!response.ok) {
    //       throw new Error(`Failed to fetch video. Status: ${response.status}`);
    //     }
    
    //     const blob = await response.blob();
    
    //     if (blob.type.startsWith('video')) {
    //       const videoUrl = URL.createObjectURL(blob);
    
    //       if (videoRef.current) {
    //         videoRef.current.src = videoUrl;
    //         videoRef.current.load();
    //         videoRef.current.play();
    //       }
    //     } else {
    //       throw new Error('Invalid video format');
    //     }
    //   } catch (error) {
    //     console.error('Error fetching or playing video:', error.message);
    //   }
    // };
    
    

    // const playVideo = () => {
    //   if (video) {
    //     video.load();
    //     fetchVideoAndPlay();
    //   }
    // };

    // const pauseVideo = () => {
    //   if (video) {
    //     video.pause();
    //   }
    // };



  return (
    <div className="container"> {}
  <nav>
        <a href="#"> Home </a>
        <a href="#">Support</a>
        <a href="#">Docs</a>
      </nav>
      <div className="middle-text">
        <h2> Welcome to Zuqo's </h2>
        <p><h1>CallHub Connect</h1></p>
        <p><h5>Empowering Seamless Connections:Elevate your customer</h5></p>
        <p><h5>interactions with Callhub Connect.....</h5></p>
      </div>
      <div className="infinity">
  <img src={infinityinsidelogo} alt="My Image" class="infinity-image" />
</div>

      {/* <div>
        <h2>Signup</h2>
        <input type="text" placeholder="FirstName" onChange={(e) => setfirstName(e.target.value)} />
        <input type="text" placeholder="LastName" onChange={(e) => setlastName(e.target.value)} />
        <input type="text" placeholder="Email" onChange={(e) => setemail(e.target.value)} />
        <input type="Password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignup}>Signup</button>
        {signupError && <p>{signupError}</p>
        }
      </div> */}
      {/* <div>
        <h2>Login</h2>
        <input type="text" placeholder="Email" onChange={(e) => setemail(e.target.value)} />
        <input type="Password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        {loginError && <p>{loginError}</p>}
      </div> */}
    </div>
  );
}

export default App;
