import { React, useState, useCallback, useEffect } from 'react';
import { Input } from 'antd';

export default function SearchInput({ debouncedInputValue, setDebouncedInputValue }) {
  const [inputValue, setInputValue] = useState('');

  const debounceInput = useCallback((fn) => {
    let timer;

    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, 2500);
    };
  });

  useEffect(() => {
    const savedSearch = localStorage.getItem('search');
    setInputValue(() => savedSearch);
  }, []);

  const debouncedSetDebouncedInputValue = useCallback(
    debounceInput((value) => {
      setDebouncedInputValue(value);
      localStorage.setItem('search', value);
    }, 2000),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() !== debouncedInputValue) {
      debouncedSetDebouncedInputValue(value);
    }
  };

  return <Input onChange={handleChange} value={inputValue} placeholder="Type to search..." />;
}
