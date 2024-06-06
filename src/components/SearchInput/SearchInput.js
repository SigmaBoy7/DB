import { React, useState, useEffect, useCallback } from 'react';
import { Input } from 'antd';

export default function SearchInput({ setIsLoading, debouncedInputValue, setDebouncedInputValue, fetchFilms }) {
  const [inputValue, setInputValue] = useState('');

  const debounceInput = useCallback((fn) => {
    let timer;

    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, 2000);
    };
  });

  const debouncedSetDebouncedInputValue = useCallback(
    debounceInput((value) => {
      setDebouncedInputValue(value);
    }, 2000),
    []
  );

  useEffect(() => {
    async function fetchData() {
      setIsLoading(() => true);
      fetchFilms(debouncedInputValue.trim());
    }
    fetchData();
  }, [debouncedInputValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() !== debouncedInputValue) {
      debouncedSetDebouncedInputValue(value);
    }
  };

  return <Input onChange={handleChange} value={inputValue} placeholder="Type to search..." />;
}
