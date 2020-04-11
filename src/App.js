import React, {useEffect, useState} from "react";

import "./styles.css";
import api from './services/api'

function App() {

  const [repos, setRepos] = useState([])

  useEffect(()=>{
    async function loadRepos(){
      const response = await api.get('/repositories')

      setRepos(response.data)
    }

    loadRepos()
  },[])


  async function handleAddRepository() {
    const repository = {
      title: `data ${Date.now()}`,
      url:'jdjdde',
      techs:['ajd']
    }
    const response = await api.post('/repositories', repository)
    setRepos([...repos, response.data])
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`)
      
      setRepos(repos.filter(value => value.id !== id))

    } catch (error) {
      
    }
    
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repos.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
