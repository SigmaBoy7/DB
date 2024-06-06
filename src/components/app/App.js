import { React, useState, useEffect } from 'react';
import { Spin, Alert, Space, Pagination } from 'antd';

import FilmsList from '../FilmsList';
import SearchInput from '../SearchInput';
import filmsClient from '../../utils/FilmsClient';
import OfflineMesage from '../OflineMessage';
import './App.css';

function App() {
  const [filmsData, setFilmsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchFaild, setIsFetchFaild] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [debouncedInputValue, setDebouncedInputValue] = useState('');
  const [noFilmAlert, setNoFilmAlert] = useState(true);

  async function fetchFilms(search = 'return') {
    let filmsData = null;
    setNoFilmAlert(() => true);
    try {
      filmsData = await filmsClient.getFilms(search, currentPage);

      if (!filmsData.total_results) {
        console.log(filmsData.total_results);
        setNoFilmAlert(() => false);
      }

      setFilmsData(filmsData);
      setIsLoading(false);
    } catch {
      setIsFetchFaild(true);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchFilms();
  }, []);

  useEffect(() => {
    fetchFilms(debouncedInputValue, currentPage);
  }, [currentPage]);

  const hasData = !(isLoading || isFetchFaild);
  const errorMessage = isFetchFaild ? (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert message="Что-то пошло не так" description="Вероятно проблемы с серверами" type="error" />
    </Space>
  ) : null;
  const spinner = isLoading ? <Spin style={{ margin: '0 auto' }} size="big" /> : null;
  const content = hasData ? <FilmsList filmsData={filmsData.results} /> : null;
  const noFilmAlertBlock = !noFilmAlert ? (
    <Alert message="Что-то пошло не так" description="Вероятно по вашему запросу ничего не найдено" type="error" />
  ) : null;

  return (
    <div className="wrapper">
      <main className="main-container">
        <header className="main-header">
          <SearchInput
            fetchFilms={fetchFilms}
            debouncedInputValue={debouncedInputValue}
            setDebouncedInputValue={setDebouncedInputValue}
            setIsLoading={setIsLoading}
            className="main-search"
            setfilmsData={setFilmsData}
          />
        </header>
        <div className="main-content">
          {spinner}
          {noFilmAlertBlock}
          {content}
        </div>
        {errorMessage}
        <footer className="main-footer">
          <Pagination
            disabled={isLoading || filmsData.length === 0}
            onChange={(value) => {
              setCurrentPage(() => value);
            }}
            defaultCurrent={1}
            total={50}
          />
        </footer>
      </main>
      <OfflineMesage />
    </div>
  );
}

export default App;
