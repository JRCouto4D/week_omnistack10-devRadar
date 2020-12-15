import React, {useState, useEffect } from 'react';
import api from './services/api';

import DevItem from './components/devItens';
import DevForm from './components/devForm';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {}, []); 

  useEffect(() => {
    async function loadDev() {
      const response = await api.get('/devs');

      setDevs(response.data);

    }
    loadDev();
  }, []);

  async function hendleAddDev(data) {

    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);

  }
  
  return (
    <div id='app'>
      <aside>
        <strong>Cadastrar</strong>
        
        <DevForm onSubmit={hendleAddDev} />

      </aside>
      <main>
        <ul>

          {devs.map((dev) => (

            <DevItem key={dev._id} dev={dev} />

          ))}
    
        </ul>

      </main>
    </div> 
  );
}

export default App;
