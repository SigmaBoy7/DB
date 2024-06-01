import { React, useState, useEffect } from 'react';

import FilmsList from '../FilmsList';
import filmsClient from '../../utils/FilmsClient';
import './App.css';

function App() {
  const [filmsData, setfilmsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFilms() {
      const filmsData = await filmsClient.getFilms();
      setfilmsData(filmsData);
      setIsLoading(false);
    }
    fetchFilms();
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="wrapper">
      <main className="main-container">
        <FilmsList filmsData={filmsData.results} />
      </main>
    </div>
  );
}

export default App;
