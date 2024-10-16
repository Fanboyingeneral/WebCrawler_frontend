import React, { useState } from 'react';
import axios from 'axios';

function CrawlForm() {
  const [url, setUrl] = useState('');
  const [maxUrls, setMaxUrls] = useState(5);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/crawl', {
        url,
        maxUrls,
      });

      setResult(response.data);
    } catch (error) {
      console.error('Error crawling URL:', error);
      setResult({ error: 'Failed to crawl the URL' });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>URL:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Max URLs to Crawl:</label>
          <input
            type="number"
            value={maxUrls}
            onChange={(e) => setMaxUrls(e.target.value)}
            min="1"
          />
        </div>
        <button type="submit">Start Crawl</button>
      </form>

      {result && (
        <div>
          <h2>Crawl Results:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CrawlForm;
