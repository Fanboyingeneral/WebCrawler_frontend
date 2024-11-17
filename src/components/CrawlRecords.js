import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const BACKEND_PORT = process.env.BACKEND_PORT || 7100;

function CrawlRecords() {
  const [completedCrawls, setCompletedCrawls] = useState([]);
  const [scheduledCrawls, setScheduledCrawls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to fetch completed crawls
    const fetchCompletedCrawls = async () => {
      try {
        console.log(`http://localhost:${BACKEND_PORT}/api/crawl/records`);
        const response = await axios.get(`http://localhost:${BACKEND_PORT}/api/crawl/records`);
        setCompletedCrawls(response.data);
      } catch (error) {
        console.error('Error fetching completed crawl records:', error);
      }
    };

    // Function to fetch scheduled crawls
    const fetchScheduledCrawls = async () => {
      try {
        const response = await axios.get(`http://localhost:${BACKEND_PORT}/api/crawl/getScheduledCrawls`);
        setScheduledCrawls(response.data);
      } catch (error) {
        console.error('Error fetching scheduled crawl records:', error);
      }
    };

    // Initial fetch on mount
    fetchCompletedCrawls();
    fetchScheduledCrawls();

    // Set interval to update every 60 seconds
    const intervalId = setInterval(() => {
      fetchCompletedCrawls();
      fetchScheduledCrawls();
    }, 10000); // 10 second

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Delete function for Scheduled Crawls
  const deleteScheduledCrawl = async (id) => {
    try {
      await axios.delete(`http://localhost:${BACKEND_PORT}/api/crawl/deleteScheduledCrawl/${id}`);
      setScheduledCrawls(scheduledCrawls.filter(crawl => crawl._id !== id));
    } catch (error) {
      console.error('Error deleting scheduled crawl:', error);
    }
  };

  // Delete function for Completed Crawls
  const deleteCompletedCrawl = async (id) => {
    try {
      await axios.delete(`http://localhost:${BACKEND_PORT}/api/crawl/deleteCompletedCrawl/${id}`);
      setCompletedCrawls(completedCrawls.filter(crawl => crawl.crawl_id !== id));
    } catch (error) {
      console.error('Error deleting completed crawl:', error);
    }
  };

  // Navigate to details page on row click
  const handleRowClick = (crawlId) => {
    navigate(`/crawl/${crawlId}`);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* Scheduled Crawls Table */}
      <TableContainer component={Paper} style={{ marginBottom: '2rem' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Scheduled Crawls
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Crawl ID</TableCell>
              <TableCell>Root URL</TableCell>
              <TableCell>Scheduled Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduledCrawls.map((record) => (
              <TableRow key={record._id} hover style={{ cursor: 'pointer' }}>
                <TableCell>{record._id}</TableCell>
                <TableCell>{record.url}</TableCell>
                <TableCell>{new Date(record.scheduledTime).toLocaleString()}</TableCell>
                <TableCell>{record.status}</TableCell>
                <TableCell>
                  <Button color="secondary" onClick={() => deleteScheduledCrawl(record._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Completed Crawls Table */}
      <TableContainer component={Paper}>
        <Typography variant="h4" align="center" gutterBottom>
          Completed Crawls
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Crawl ID</TableCell>
              <TableCell>Root URL</TableCell>
              <TableCell>External URLs</TableCell>
              <TableCell>Scraped URLs Count</TableCell>
              <TableCell>Status Report</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {completedCrawls.map((record) => (
              <TableRow key={record.crawl_id} hover onClick={() => handleRowClick(record.crawl_id)} style={{ cursor: 'pointer' }}>
                <TableCell>{record.crawl_id}</TableCell>
                <TableCell>{record.root_url}</TableCell>
                <TableCell>{record.external_urls.length}</TableCell>
                <TableCell>{record.scraped_urls.length}</TableCell>
                <TableCell>{record.message}</TableCell>
                <TableCell>
                  <Button color="secondary" onClick={(e) => { e.stopPropagation(); deleteCompletedCrawl(record.crawl_id); }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CrawlRecords;
