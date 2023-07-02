"use client";

import { useState, useEffect } from 'react';

function validateUrl(value: string) {
  try {
    const url = new URL(value);
    console.log(url, 'url')
    return url.hostname.includes('rightmove.co.uk');
  } catch (_) {
    return false;  
  }
}

export default function CustomInput({ onInputChange }: any) {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    if (touched) {
      setValid(validateUrl(value));
    }
  }, [value, touched]);

  const handleBlur = () => {
    setTouched(true);
    setValid(validateUrl(value));
  };

  const handleChange = (event: any) => {
    setValue(event.target.value);
    // onInputChange(event.target.value);
  };

  return (
    <input
      type="url"
      className={`input input-bordered w-full ${valid ? 'input-accent' : 'input-error'}`}
      placeholder="Rightmove URL"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

