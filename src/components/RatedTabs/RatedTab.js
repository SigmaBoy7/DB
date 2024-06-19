import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';

import AppAlert from '../AppAlert';
import FilmsList from '../FilmsList';
import './RatedTab.css';

function RatedTab({ ratedFilmsData, fetchRatedFilms }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetchFailed, setIsFetchFailed] = useState(false);

  useEffect(() => {
    if (!ratedFilmsData.total_results) {
      setIsFetchFailed(() => true);
    }
  }, [ratedFilmsData]);

  const content =
    ratedFilmsData.results && !isFetchFailed ? (
      <FilmsList fetchRatedFilms={fetchRatedFilms} filmsData={ratedFilmsData.results} />
    ) : null;
  const alert = isFetchFailed ? <AppAlert errorDescription="Скорее всего у вас нет оцененых фильмов" /> : null;

  return (
    <div className="films">
      {alert}
      <div className="films-content">{content}</div>
      <footer className="films-footer">
        <Pagination
          disabled={ratedFilmsData.length === 0}
          onChange={(value) => {
            fetchRatedFilms(value);
            setCurrentPage(value);
          }}
          current={currentPage}
          defaultPageSize={20}
          total={ratedFilmsData.total_results}
          showSizeChanger={false}
          size="small"
        />
      </footer>
    </div>
  );
}

export default RatedTab;
