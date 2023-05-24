import React from 'react';

const Peticion_api = () => {
  const [personajes, setPersonajes] = React.useState([]);
  const [paginacion, setPaginacion] = React.useState(0);

  const TraerPersonajes = async (page) => {
    try {
      const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
      const { results } = await res.json();

      // Actualizar la URL de la imagen para cada personaje
      const personajesConImagen = results.map((personaje) => ({
        ...personaje,
        image: `https://starwars-visualguide.com/assets/img/characters/${extractIdFromUrl(personaje.url)}.jpg`,
      }));

      setPersonajes(personajesConImagen);
      console.log(personajesConImagen);
    } catch (error) {
      console.log(error);
    }
  };

  const siguiente = () => {
    setPaginacion(paginacion + 1);
    TraerPersonajes(paginacion + 1);
  };

  const atras = () => {
    if (paginacion > 1) {
      setPaginacion(paginacion - 1);
      TraerPersonajes(paginacion - 1);
    }
  };

  const extractIdFromUrl = (url) => {
    const urlParts = url.split('/');
    return urlParts[urlParts.length - 2];
  };

  return (
    <div>
      <h1>Petición al Api de Star Wars</h1>
      <button onClick={atras}>atrás</button>
      <button onClick={siguiente}>siguiente</button>
      {
        personajes.map(({ name, image, eye_color }) => (
        <div >
          <h4>Nombre: {name}</h4>
          <h4>Color de ojos: {eye_color}</h4>
          <img src={image} alt={name} />
        </div>
       ))
      }
    </div>
  );
};

export default Peticion_api
