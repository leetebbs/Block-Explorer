import React from 'react';
import { useLocation } from "react-router-dom";

function AboutPage() {
    
const location = useLocation();
let userId = location.state.userId;
  return (
    <div>
      <h1>About Page</h1>
      <p>This is the About page.</p>
      <h1>{userId}</h1>
    </div>
  );
}

export default AboutPage;
