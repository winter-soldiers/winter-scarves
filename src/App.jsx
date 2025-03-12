import { useState } from 'react'
import { Link } from 'react-router-dom';
import './index.css';

const App = () => {
  const [scarves, setScarves] = useState([]);

  return (
    <>
      <div>
        <h1>Winter Scarves</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/scarves">Scarves Details</Link>
        </nav>
      </div>
    </>
  );
};

export default App