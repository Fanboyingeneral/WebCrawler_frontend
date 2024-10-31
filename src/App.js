import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CrawlForm from './components/CrawlForm';
import CrawlRecords from './components/CrawlRecords';
import CrawlDetails from './components/CrawlDetails';
import PageContent from './components/PageContent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <CrawlForm />        
            <CrawlRecords />    
          </>
        } />
        <Route path="/crawl/:crawlId" element={<CrawlDetails />} />
        <Route path="/crawl/:crawlId/page/:pageId" element={<PageContent />} />
      </Routes>
    </Router>
  );
}

export default App;
