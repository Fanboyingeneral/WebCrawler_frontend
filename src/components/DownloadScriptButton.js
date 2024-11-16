import React from 'react';
import { Button, Typography, Box } from '@mui/material';

const DownloadScriptButton = () => {
  // Function to create and download the PowerShell setup script
  const downloadSetupScript = () => {
    const scriptContent = `
# Check if Docker is installed
if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Docker is not installed. Please install Docker Desktop and try again."
    exit
}

# Pull the latest version of the crawler_engine image
Write-Host "Pulling the crawler_engine Docker image..."
docker pull fanboyingeneral/webcrawler-crawler_engine:latest

# Run the crawler_engine container
Write-Host "Starting the crawler engine..."
docker run -d -p 5000:5000 --name crawler_engine fanboyingeneral/webcrawler-crawler_engine:latest

Write-Host "Crawler engine is now running at http://localhost:5000"
    `;

    // Create a Blob with the PowerShell script content
    const blob = new Blob([scriptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = 'setup-crawler-agent.ps1';

    // Trigger the download
    link.click();

    // Clean up the URL
    URL.revokeObjectURL(url);
  };

  return (
    <Box textAlign="center" mt={3}>
      <Typography variant="body1" gutterBottom>
        To set up your local crawler agent, download and run the script below:
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={downloadSetupScript}
        style={{ marginTop: '1rem' }}
      >
        Download Windows Setup Script
      </Button>
    </Box>
  );
};

export default DownloadScriptButton;
