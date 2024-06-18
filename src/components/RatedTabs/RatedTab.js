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
        />
      </footer>
    </div>
  );
}

export default RatedTab;

// import React, { useState, useEffect } from 'react';
// import { Spin, Alert, Space, Pagination } from 'antd';

// import FilmsList from '../FilmsList';
// import SearchInput from '../SearchInput';
// import OfflineMessage from '../OflineMessage';
// import FilmsTabs from '../FilmsTabs';
// import './SearchTab.css';
// import { getFilms, getRatedFilms, createGuestSession } from '../../utils/FilmsClient';

// function Rea() {
//   const [filmsData, setFilmsData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isFetchFailed, setIsFetchFailed] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [noFilmAlert, setNoFilmAlert] = useState(false);
//   const [pageMode, setPageMode] = useState('Search');
//   const [debouncedInputValue, setDebouncedInputValue] = useState('');

//   async function fetchFilms(search = 'return', page = currentPage) {
//     setIsLoading(true);
//     setIsFetchFailed(false);
//     setNoFilmAlert(false);
//     try {
//       let filmsData;
//       if (pageMode === 'Search') {
//         filmsData = await getFilms(search, page);
//       } else {
//         filmsData = await getRatedFilms();
//       }
//       if (!filmsData.total_results) {
//         setNoFilmAlert(true);
//       } else {
//         setFilmsData(filmsData);
//       }
//     } catch {
//       setIsFetchFailed(true);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     async function initializeSession() {
//       try {
//         await createGuestSession();
//       } catch (error) {
//         console.error('Ошибка инициализации сессии:', error);
//       }
//     }
//     initializeSession();
//     fetchFilms(debouncedInputValue);
//   }, [debouncedInputValue, pageMode, currentPage]);

//   const hasData = !(isLoading || isFetchFailed || noFilmAlert);
//   const errorMessage = isFetchFailed ? (
//     <Space direction="vertical" style={{ width: '100%' }}>
//       <Alert message="Что-то пошло не так" description="Вероятно проблемы с серверами" type="error" />
//     </Space>
//   ) : null;

//   const spinner = isLoading ? <Spin style={{ margin: '0 auto' }} size="large" /> : null;
//   const content = hasData ? <FilmsList filmsData={filmsData.results} /> : null;
//   const noFilmAlertBlock = noFilmAlert ? (
//     <Alert message="Что-то пошло не так" description="Вероятно по вашему запросу ничего не найдено" type="error" />
//   ) : null;

//   return (
//     <div className="wrapper">
//       <main className="main-container">
//         <header className="main-header">
//           <FilmsTabs setPageMode={setPageMode} />
//           <SearchInput
//             className="main-search"
//             debouncedInputValue={debouncedInputValue}
//             setDebouncedInputValue={setDebouncedInputValue}
//           />
//         </header>
//         <div className="main-content">
//           {spinner}
//           {noFilmAlertBlock}
//           {content}
//         </div>
//         {errorMessage}
//         <footer className="main-footer">
//           <Pagination
//             disabled={isLoading || filmsData.length === 0}
//             onChange={(value) => {
//               setCurrentPage(value);
//             }}
//             current={currentPage}
//             total={filmsData.total_results}
//           />
//         </footer>
//       </main>
//       <OfflineMessage />
//     </div>
//   );
// }

// export default SearchTab;
