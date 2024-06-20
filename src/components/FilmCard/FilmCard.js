/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import { Tag } from 'antd';

import formateDate from '../../utils/Time';
import shortenDescription from '../../utils/formatText';
import { getFilmDetails } from '../../utils/FilmsClient';
import FilmRate from '../FilmRate';
import './FilmCard.css';
import noFilmImage from '../../assets/images/noFilmImage.png';

function FilmRateBlock({ filmRate }) {
  if (filmRate === undefined || filmRate === null) {
    return null;
  }

  const style =
    filmRate < 3
      ? { boxShadow: '0 0 0 2px #E90000' }
      : filmRate < 5
        ? { boxShadow: '0 0 0 2px #E97E00' }
        : filmRate < 7
          ? { boxShadow: '0 0 0 2px #E9D100' }
          : { boxShadow: '0 0 0 2px #66E900' };

  return (
    <div className="film-rate" style={style}>
      <div className="film-rate_color">{filmRate}</div>
    </div>
  );
}

function FilmCard({ data, filmTags }) {
  // const [filmRate, setFilmRate] = useState(null);
  // useEffect(() => {
  //   async function fetchMoveDetail(moveId) {
  //     const detail = await getFilmDetails(moveId);
  //     const rate = detail.vote_average.toFixed(1);
  //     setFilmRate(() => rate);
  //   }
  //   fetchMoveDetail(data.id);
  // }, []);

  const tags = filmTags.map((tag) => {
    return <Tag key={tag.id}>{tag.name}</Tag>;
  });

  return (
    <div className="film-card card">
      <img
        className="card-img-left"
        src={data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : noFilmImage}
      />
      <div className="card-left">
        <header className="card-header">
          <img
            className="card-img"
            src={data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : noFilmImage}
          />
          <div className="card-info">
            <div className="card-title">
              <div>{data.title}</div>
              <FilmRateBlock filmRate={data.vote_average.toFixed(1)} />
            </div>
            <div className="card-date">{formateDate(data.release_date)}</div>
            <div className="card-tags">{tags.length ? tags : 'У этого фильма нету тегов'}</div>
          </div>
        </header>
        <footer className="card-bottom">
          <div className="card-text">{shortenDescription(data.overview)}</div>
        </footer>
        <div className="card-stars">
          <FilmRate moveId={data.id} rating={data.rating} />
        </div>
      </div>
    </div>
  );
}

export default FilmCard;
