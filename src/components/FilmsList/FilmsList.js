import { React, useState, useEffect, useContext } from 'react';

import FilmCard from '../FilmCard';
import TagsContext from '../FilmsContext';

import './FilmsList.css';

function FilmsList({ filmsData }) {
  const [filmsList, setfilmsList] = useState([]);
  const tag = useContext(TagsContext);
  useEffect(() => {
    setfilmsList(() => {
      return filmsData;
    });
  }, [filmsData]);

  return filmsList ? (
    <div className="films-list">
      {filmsList.map((filmData) => {
        const filmTags = tag.genres.filter((item) => filmData.genre_ids.includes(item.id));

        return <FilmCard key={filmData.id} data={filmData} filmTags={filmTags} />;
      })}
    </div>
  ) : null;
}

export default FilmsList;
