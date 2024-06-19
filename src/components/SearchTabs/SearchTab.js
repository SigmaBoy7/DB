import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';

import AppAlert from '../AppAlert';
import FilmsList from '../FilmsList';
import './SearchTab.css';

function SearchTabs({ filmsData, fetchFilms }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetchFailed, setIsFetchFailed] = useState(false);
  useEffect(() => {
    if (!filmsData.total_results) {
      setIsFetchFailed(() => true);
    } else {
      setIsFetchFailed(() => false);
    }
  }, [filmsData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchFilms(undefined, page);
  };
  const content = !isFetchFailed ? <FilmsList filmsData={filmsData.results} /> : null;
  const alert = isFetchFailed ? <AppAlert errorDescription="Скорее всего проблемы с сервером" /> : null;

  return (
    <div className="films">
      {alert}
      <div className="films-content">{content}</div>
      <footer className="films-footer">
        <Pagination
          disabled={filmsData.total_results === 0}
          onChange={handlePageChange}
          current={currentPage}
          total={filmsData.total_results}
          defaultPageSize={20}
          showSizeChanger={false}
          size="small"
        />
      </footer>
    </div>
  );
}

export default SearchTabs;
