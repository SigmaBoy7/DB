import React, { useState, useEffect } from 'react';

import TagsContext from '../FilmsContext';
import SearchTab from '../SearchTabs';
import RatedTab from '../RatedTabs';
import SearchInput from '../SearchInput';
import OfflineMessage from '../OflineMessage';
import FilmsTabs from '../FilmsTabs';
import AppSpiner from '../AppSpinner';
import './App.css';
import { getFilms, getRatedFilms, createGuestSession, getGenres } from '../../utils/FilmsClient';

function App() {
  const [filmsData, setFilmsData] = useState(null);
  const [ratedFilmsData, setRatedFilmsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageMode, setPageMode] = useState('Search');
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const [genres, setGenres] = useState(null);

  async function fetchRatedFilms(page) {
    setIsLoading(true);
    let ratedFilmsData = await getRatedFilms(page);
    setRatedFilmsData(ratedFilmsData);
    setIsLoading(false);
  }

  async function fetchFilms(search = 'return', page = 1) {
    setIsLoading(true);
    let filmsData = await getFilms(debouncedInputValue ? debouncedInputValue : search, page);
    setFilmsData(filmsData);

    setIsLoading(false);
  }

  async function fetchGenres() {
    const genres = await getGenres();
    setGenres(() => genres);
  }

  useEffect(() => {
    async function initializeSession() {
      await createGuestSession();
    }
    const savedSearch = localStorage.getItem('search');
    setDebouncedInputValue(() => savedSearch);
    initializeSession();
    fetchGenres();
  }, []);

  useEffect(() => {
    if (debouncedInputValue) {
      fetchFilms(debouncedInputValue);
    } else {
      fetchFilms();
    }
    fetchRatedFilms(1);
  }, [debouncedInputValue, pageMode]);

  function handleTabsChange(tabValue) {
    setPageMode(() => tabValue);
  }

  const content =
    pageMode === 'Search' ? (
      <SearchTab filmsData={filmsData} isLoading={isLoading} fetchFilms={fetchFilms} />
    ) : (
      <RatedTab ratedFilmsData={ratedFilmsData} isLoading={isLoading} fetchRatedFilms={fetchRatedFilms} />
    );

  return (
    <div className="wrapper">
      <TagsContext.Provider value={genres}>
        <main className="main-container">
          <header className="main-header">
            <FilmsTabs handleTabsChange={handleTabsChange} setPageMode={setPageMode} />
            {pageMode === 'Search' ? (
              <SearchInput
                className="main-search"
                debouncedInputValue={debouncedInputValue}
                setDebouncedInputValue={setDebouncedInputValue}
              />
            ) : null}
          </header>
          <AppSpiner isLoading={isLoading} />
          {filmsData ? content : null}
        </main>
        <OfflineMessage />
      </TagsContext.Provider>
    </div>
  );
}

export default App;
