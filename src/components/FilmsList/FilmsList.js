import { React, useState, useEffect, useContext } from 'react';
import { Col, Row } from 'antd';

import FilmCard from '../FilmCard';
import TagsContext from '../FilmsContext';

function FilmsList({ filmsData }) {
  const [filmsList, setfilmsList] = useState([]);
  const tag = useContext(TagsContext);
  useEffect(() => {
    setfilmsList(() => {
      return filmsData;
    });
  }, [filmsData]);

  return filmsList ? (
    <Row gutter={[36, 36]} className="films-list">
      {filmsList.map((filmData) => {
        const filmTags = tag.genres.filter((item) => filmData.genre_ids.includes(item.id));

        return (
          <Col key={filmData.id} xs={24} sm={{ span: 12 }}>
            <FilmCard data={filmData} filmTags={filmTags} />
          </Col>
        );
      })}
    </Row>
  ) : null;
}

export default FilmsList;
