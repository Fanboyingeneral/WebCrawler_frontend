// components/LocalInstance.js
import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import DownloadScriptButton from './DownloadScriptButton';
import ClientCrawlForm from './ClientCrawlForm';

function LocalInstance() {



  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <DownloadScriptButton/>
      <ClientCrawlForm/>
    </Container>
  );
}

export default LocalInstance;
