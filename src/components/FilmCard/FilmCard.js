import { React, useEffect, useState } from 'react';
import { Card, Col, Row, Tag } from 'antd';

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
      ? { backgroundColor: '#E90000' }
      : filmRate < 5
        ? { backgroundColor: '#E97E00' }
        : filmRate < 7
          ? { backgroundColor: '#E9D100' }
          : { backgroundColor: '#66E900' };

  return (
    <div className="film-rate" style={style}>
      <div className="film-rate_color">{filmRate}</div>
    </div>
  );
}

function FilmCard({ data, filmTags }) {
  const [filmRate, setFilmRate] = useState(null);

  useEffect(() => {
    async function fetchMoveDetail(moveId) {
      const detail = await getFilmDetails(moveId);
      const rate = detail.vote_average.toFixed(1);
      setFilmRate(() => rate);
    }
    fetchMoveDetail(data.id);
  }, []);

  const tags = filmTags.map((tag) => {
    return (
      <Tag
        key={tag.id}
        style={{
          boxSizing: 'border-box',
          minWidth: '46px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '5px',
          opacity: '65%',
        }}
      >
        {tag.name}
      </Tag>
    );
  });

  return (
    <Card
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        height: '281px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      }}
      styles={{
        body: { padding: '0px' },
      }}
      className="film-card"
    >
      <Row ы style={{ height: '100%', overflow: 'hidden' }}>
        <Col className="film-left" span={10} style={{ height: '100%' }}>
          <div style={{ height: '100%', width: '100%' }}>
            <img
              src={data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : noFilmImage}
              alt="Cover"
              style={{ height: '100%', width: '100%', objectFit: 'fill' }}
            />
          </div>
        </Col>
        <Col
          style={{ fontFamily: ['Inter', 'sans-serif'] }}
          className="film-right"
          span={window.innerWidth < 768 ? 24 : 12}
        >
          <div className="film-info">
            <div className="film-card-header">
              <div className="film-img" style={{ maxWidth: '60px', maxHeight: '91px' }}>
                <img
                  src={data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : noFilmImage}
                  alt="Cover"
                  style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                />
              </div>
              <FilmRateBlock filmRate={filmRate} />
              <div className="film-header-info">
                <h1 className="film-title">{data.original_title}</h1>
                <div className="film-release_date">{formateDate(data.release_date)}</div>
                <ul className="film-tag_list">
                  <li style={{ display: 'flex', flexWrap: 'wrap' }}>{tags}</li>
                </ul>
              </div>
            </div>
            <div className="film-card-bottom">
              <div className="film-overview">{shortenDescription(data.overview)}</div>
              <div className="film-stars">
                <FilmRate moveId={data.id} rating={data.rating} />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default FilmCard;
