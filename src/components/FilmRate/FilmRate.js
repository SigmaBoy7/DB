import React, { useState, useEffect } from 'react';
import { Rate } from 'antd';

import { addRate } from '../../utils/FilmsClient';

const FilmRate = function ({ moveId, rating }) {
  const [rate, setRate] = useState();

  async function postRate(rate) {
    await addRate(moveId, rate);
  }

  useState(() => {
    setRate(() => localStorage.getItem(moveId));
  }, []);

  useEffect(() => {
    if (rating) {
      setRate(() => rating);
    }
  }, [rating]);

  const rateEventHandler = function (e) {
    setRate(() => {
      postRate(e);
      console.log(localStorage);
      return e;
    });
  };

  return <Rate onChange={rateEventHandler} value={rate} count={10} />;
};

export default FilmRate;
