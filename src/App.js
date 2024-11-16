import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CrawlForm from './components/CrawlForm';
import CrawlRecords from './components/CrawlRecords';
import CrawlDetails from './components/CrawlDetails';
import PageContent from './components/PageContent';
import DownloadScriptButton from './components/DownloadScriptButton';
import LocalInstance from './components/LocalInstance';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <CrawlForm />
            <DownloadScriptButton />
            <CrawlRecords />
          </>
        } />
        <Route path="/crawl/:crawlId" element={<CrawlDetails />} />
        <Route path="/crawl/:crawlId/page/:pageId" element={<PageContent />} />
        <Route path="/register-spot-instance" element={<LocalInstance />} />  {/* New Route */}
      </Routes>
    </Router>
  );
}

export default App;
