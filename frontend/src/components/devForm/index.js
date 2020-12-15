import React, {useState, useEffect } from 'react';

function DevFrom({onSubmit}) {
    const [github_username, setGithub_username] = useState("");
    const [techs, setTechs] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (err) => {
            console.log(err)
          },
          {
            timeout: 30000,
          }
        );
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setGithub_username("");
        setTechs("");
    }

    return(

        <form onSubmit={handleSubmit}>

          <div className="input-block">
            <label htmlFor="github-username">Usuário do Github</label>
            <input
            name="github-username" 
            id="github-username" 
            required
            value={github_username}
            onChange={event => (setGithub_username(event.target.value))}  
          />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
            name="techs"
            id="techs"
            required
            value={techs}
            onChange={event => (setTechs(event.target.value))}  
          />
          </div>

          <div className="input-group">

            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input 
              name="latitude"
              type="number" 
              id="latitude" 
              required 
              value={latitude}
              onChange={event => (
                setLatitude(event.target.value)
              )}  
            />
            </div>
            
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input 
              name="longitude"
              type="number" 
              id="longitude" 
              required 
              value={longitude} 
              onChange={event => (
                setLongitude(event.target.value)
              )}  
            />
            </div>

          </div>

          <button type="submit">Salvar</button>

        </form>
        
    );
}

export default DevFrom;