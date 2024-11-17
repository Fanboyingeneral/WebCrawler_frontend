import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Paper, Container } from '@mui/material';

const BACKEND_PORT = process.env.BACKEND_PORT || 7100;

function CrawlDetails() {
  const { crawlId } = useParams();
  const [crawlDetails, setCrawlDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:${BACKEND_PORT}/api/crawl/records/${crawlId}`);
        setCrawlDetails(response.data);
      } catch (error) {
        console.error('Error fetching crawl details:', error);
      }
    };
    fetchDetails();
  }, [crawlId]);

  if (!crawlDetails) return <Typography>Loading...</Typography>;

  const handlePageClick = (pageId) => {
    navigate(`/crawl/${crawlId}/page/${pageId}`);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          Crawl Details for ID: {crawlDetails.crawl_id}
        </Typography>
        <Typography variant="h6">Root URL: {crawlDetails.root_url}</Typography>
        <Typography variant="h6">Crawl Limit: {crawlDetails.crawl_limit}</Typography>

        <Typography variant="h6" gutterBottom style={{ marginTop: '1rem' }}>Scraped URLs:</Typography>
        <List>
          {crawlDetails.scraped_urls.map((item) => (
            <ListItem key={item._id} button onClick={() => handlePageClick(item._id)}>
              <ListItemText primary={`URL: ${item.url}`} secondary={`Status: ${item.status}`} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h6" gutterBottom style={{ marginTop: '1rem' }}>External URLs:</Typography>
        <List>
          {crawlDetails.external_urls.map((url, index) => (
            <ListItem key={index}>
              <ListItemText primary={url} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default CrawlDetails;
