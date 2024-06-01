import { React, useState, useEffect } from 'react';
import { Col, Row } from 'antd';

import FilmCard from '../FilmCard';

function FilmsList({ filmsData }) {
  const [filmsList, setfilmsList] = useState([]);

  useEffect(() => {
    setfilmsList(() => {
      return filmsData;
    });
  }, [filmsData]);

  return (
    <Row gutter={[36, 36]} className="films-list">
      {filmsList.map((filmData) => (
        <Col key={filmData.id} xs={24} sm={{ span: 12 }}>
          <FilmCard data={filmData} />
        </Col>
      ))}
    </Row>
  );
}

export default FilmsList;
