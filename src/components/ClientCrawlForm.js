import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Checkbox, Button, Typography, FormControlLabel, Box, Container, Paper } from '@mui/material';

const BACKEND_PORT = process.env.BACKEND_PORT || 7100;

function ClientCrawlForm() {
  const [url, setUrl] = useState('');
  const [maxUrls, setMaxUrls] = useState(5);
  const [respectRobotFlag, setRespectRobotFlag] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = `http://localhost:${BACKEND_PORT}/api/session/queueCrawl`; // Client backend endpoint
      const payload = {
        session_id: sessionId,
        url,
        maxUrls,
        respectRobotFlag,
      };
      console.log('Payload:', payload);
      const response = await axios.post(endpoint, payload);
      const { message } = response.data;
      setMessage(message || 'Crawl request submitted successfully!');
    } catch (error) {
      console.error('Error submitting crawl request:', error);
      setMessage('Failed to submit the crawl request.');
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Client-Side Web Crawler
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Session ID"
              variant="outlined"
              fullWidth
              value={sessionId}
              onChange={(e) => setSessionId(e.target.value)}
              required
            />
          </Box>
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
              required
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
            Submit Crawl Request
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

export default ClientCrawlForm;
