import React from 'react'

const PeticionApi = () => {
    const[personajes, setPersonajes] = React.useState([])
    const [paginacion, SetPaginacion] = React.useState(0)
    const traerPersonajes= async() =>{
        try{
        const res= await fetch (`https://rickandmortyapi.com/api/character/?page=${paginacion}`)
        const {results}= await res.json()
        setPersonajes(results)
        }catch(error){
            console.log(error)
        }
    }

    const siguiente = async()=>{

        SetPaginacion(paginacion+1)
        traerPersonajes()
    }

  return (
    <div>
        <h1>PETICION AL API DE RICK AND MORTY</h1>
        <button onClick={traerPersonajes()}>Traer personajes</button>
        <button>Atras</button>
        <button onClick={siguiente}>Siguiente</button>
       
        
         {
             personajes.map(({id, name, image}) => (
                 <div key={id}>
                     <h4>{id} - {name}</h4>
                     <img src={image} alt={name} />
                 </div>
             ))
        }      
    </div>
  )
}

export default PeticionApi
