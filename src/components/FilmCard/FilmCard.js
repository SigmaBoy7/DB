import { React } from 'react';
import { Card, Col, Row, Tag } from 'antd';

import formateDate from '../../utils/Time';
import shortenDescription from '../../utils/formatText';
import './FilmCard.css';
import noFilmImage from '../../assets/images/noFilmImage.png';

function FilmCard({ data }) {
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
      <Row gutter={(0, 20)} style={{ height: '100%', overflow: 'hidden' }}>
        <Col className="film-left" span={12} style={{ maxHeight: '100%' }}>
          <img
            src={data.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : noFilmImage}
            alt="Cover"
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          />
        </Col>
        <Col style={{ fontFamily: ['Inter', 'sans-serif'] }} className="film-right" span={12}>
          <div className="film-info">
            <h1 className="film-title">{data.original_title}</h1>
            <div className="film-release_date">{formateDate(data.release_date)}</div>
            <ul className="film-tag_list">
              <li style={{ display: 'flex' }}>
                <Tag
                  style={{
                    boxSizing: 'border-box',
                    width: '46px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: '65%',
                  }}
                >
                  Action
                </Tag>
                <Tag
                  style={{
                    boxSizing: 'border-box',
                    width: '46px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: '65%',
                  }}
                >
                  Action
                </Tag>
              </li>
            </ul>
            <div className="film-overview">{shortenDescription(data.overview)}</div>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default FilmCard;
