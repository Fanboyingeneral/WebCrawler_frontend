import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Checkbox, Button, Typography, FormControlLabel, Box, Container, Paper } from '@mui/material';

function CrawlForm() {
  const [url, setUrl] = useState('');
  const [maxUrls, setMaxUrls] = useState(5);
  const [respectRobotFlag, setRespectRobotFlag] = useState(false);
  const [message, setMessage] = useState('');
  const [scrapedUrls, setScrapedUrls] = useState({});
  const [externalUrls, setExternalUrls] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/crawl', {
        url,
        maxUrls,
        respectRobotFlag,
      });

      const { message, scraped_urls, external_urls } = response.data;

      setMessage(message);
      setScrapedUrls(scraped_urls);
      setExternalUrls(external_urls);
    } catch (error) {
      console.error('Error crawling URL:', error);
      setMessage('Failed to crawl the URL');
      setScrapedUrls({});
      setExternalUrls([]);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Web Crawler
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="URL"
              variant="outlined"
              fullWidth
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Max URLs to Crawl"
              type="number"
              variant="outlined"
              fullWidth
              value={maxUrls}
              onChange={(e) => setMaxUrls(e.target.value)}
              inputProps={{ min: 1 }}
            />
          </Box>
          <Box mb={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={respectRobotFlag}
                  onChange={(e) => setRespectRobotFlag(e.target.checked)}
                />
              }
              label="Respect robots.txt"
            />
          </Box>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Start Crawl
          </Button>
        </form>

        {message && (
          <Typography variant="h6" style={{ marginTop: '2rem' }}>
            {message}
          </Typography>
        )}

        {Object.keys(scrapedUrls).length > 0 && (
          <Box mt={2}>
            <Typography variant="h5" gutterBottom>
              Scraped URLs and Content
            </Typography>
            {Object.entries(scrapedUrls).map(([url, content], index) => (
              <Box key={index} mb={2}>
                <Typography variant="h6">{url}</Typography>
                <Paper style={{ padding: '1rem', backgroundColor: '#f5f5f5' }}>
                  <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                    {content}
                  </pre>
                </Paper>
              </Box>
            ))}
          </Box>
        )}

        {externalUrls.length > 0 && (
          <Box mt={2}>
            <Typography variant="h5" gutterBottom>
              External URLs
            </Typography>
            <ul>
              {externalUrls.map((url, index) => (
                <li key={index}>{url}</li>
              ))}
            </ul>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default CrawlForm;
