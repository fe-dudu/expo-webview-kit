import { useState } from 'react';
import { debounce } from '../debounce';

const useDebounceInput = (initialValue = '', delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  const handleInputChange = debounce((value: string) => {
    setDebouncedValue(value);
  }, delay);

  return { debouncedValue, handleInputChange };
};

export default useDebounceInput;
