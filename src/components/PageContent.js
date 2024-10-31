import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Container } from '@mui/material';

function PageContent() {
  const { crawlId, pageId } = useParams();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/crawl/records/${crawlId}/page/${pageId}`);
        setPageData(response.data);
      } catch (error) {
        console.error('Error fetching page data:', error);
      }
    };
    fetchPageData();
  }, [crawlId, pageId]);

  if (!pageData) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Paper style={{ padding: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          URL Content for {pageData.url}
        </Typography>
        <Typography variant="body1" style={{ whiteSpace: 'pre-wrap' }}>
          {pageData.content}
        </Typography>
      </Paper>
    </Container>
  );
}

export default PageContent;
