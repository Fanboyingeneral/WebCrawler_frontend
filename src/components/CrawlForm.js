import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Checkbox, Button, Typography, FormControlLabel, Box, Container, Paper, Collapse } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';


function CrawlForm() {
  const [url, setUrl] = useState('');
  const [maxUrls, setMaxUrls] = useState(5);
  const [respectRobotFlag, setRespectRobotFlag] = useState(false);
  const [message, setMessage] = useState('');
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduledTime, setScheduledTime] = useState(new Date());
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isScheduling ? 'http://localhost:5000/api/crawl/scheduled' : 'http://localhost:5000/api/crawl';
      const payload = {
        url,
        maxUrls,
        respectRobotFlag,
        ...(isScheduling && { scheduledTime }),
      };
      console.log('Payload:', payload);
      const response = await axios.post(endpoint, payload);
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
      <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate('/register-spot-instance')}
          fullWidth
          style={{ marginBottom: '1rem' }}
        >
          Register your machine as a spot instance?
        </Button>
        
        
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

          <Button
            variant="text"
            color="primary"
            onClick={() => setIsScheduling(!isScheduling)}
            fullWidth
            style={{ marginBottom: '1rem' }}
          >
            Want to schedule a crawl? Click here
          </Button>

          <Collapse in={isScheduling}>
            <Box mb={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Select Date & Time for Crawl"
                value={scheduledTime}
                onChange={(newValue) => setScheduledTime(newValue)}
                renderInput={(props) => <TextField {...props} fullWidth />}
              />
            </LocalizationProvider>
            </Box>
          </Collapse>

          {!isScheduling ? (
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Start Crawl
            </Button>
          ) : (
            <Button variant="contained" color="secondary" type="submit" fullWidth>
              Schedule Crawl
            </Button>
          )}
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