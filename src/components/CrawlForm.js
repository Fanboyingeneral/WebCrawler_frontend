import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Checkbox, Button, Typography, FormControlLabel, Box, Container, Paper } from '@mui/material';

function CrawlForm() {
  const [url, setUrl] = useState('');
  const [maxUrls, setMaxUrls] = useState(5);
  const [respectRobotFlag, setRespectRobotFlag] = useState(false);
  const [message, setMessage] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      
      
      const response = await axios.post('http://localhost:5000/api/crawl', {
        url,
        maxUrls,
        respectRobotFlag,
      });

      const { message } = response.data;

      setMessage(message);
      
    } catch (error) {
      console.error('Error crawling URL:', error);
      setMessage('Failed to crawl the URL');
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

      </Paper>
    </Container>
  );
}

export default CrawlForm;
