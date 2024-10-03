'use client';

import React, { useEffect, useState } from 'react';

function PythonOutput() {
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the Python script output
    fetch('/api/run-python')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setOutput(data.output);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Python Script Output:</h1>
      <pre>{output}</pre>
    </div>
  );
}

export default PythonOutput;