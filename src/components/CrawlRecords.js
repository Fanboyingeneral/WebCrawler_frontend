import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CrawlRecords() {
  const [crawlData, setCrawlData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/crawl/records');
        setCrawlData(response.data);
        //console.log('Crawl records:', response.data);
      } catch (error) {
        console.error('Error fetching crawl records:', error);
      }
    };
    fetchData();





  }, []);

  // Navigate to details page on row click
  const handleRowClick = (crawlId) => {
    navigate(`/crawl/${crawlId}`);
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Crawl Records
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Crawl ID</TableCell>
            <TableCell>Root URL</TableCell>
            <TableCell>External URLs</TableCell>
            <TableCell>Scraped URLs Count</TableCell>
            <TableCell>Status Report</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {crawlData.map((record) => (
            <TableRow key={record.crawl_id} hover onClick={() => handleRowClick(record.crawl_id)} style={{ cursor: 'pointer' }}>
              <TableCell>{record.crawl_id}</TableCell>
              <TableCell>{record.root_url}</TableCell>
              <TableCell>{record.external_urls.length}</TableCell>
              <TableCell>{record.scraped_urls.length}</TableCell>
              <TableCell>{record.message}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CrawlRecords;
