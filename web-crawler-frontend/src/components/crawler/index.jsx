import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { crawlUrl, askQuery } from '../../utils/networkUtils';
import ErrorModal from '../../shared/ErrorModal';

const CrawlerAndQuerierContainer = styled.div`
  background-color: floralwhite;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const CrawlerAndQuerierTabs = styled.div`
  display: flex;
`;

const Tab = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #ddd;
  color: black;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
  }
  &.active {
    background-color: #4caf50;
    color: white;
  }
`;

const TabContent = styled.div`
  flex: 1;
  padding: 10px;
`;

const TextArea = styled.textarea`
  width: 100%; /* Inherit full width from parent */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
  margin-bottom: 10px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: cornsilk;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
`;
const ResponseBox = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
`;

const CrawlerAndQuerier = () => {
  const [activeKey, setActiveKey] = useState('crawlUrl'); // Initial active tab key
  const [url, setUrl] = useState(''); // State to store the URL
  const [error, setError] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [crawlResult, setCrawlResult] = useState('');

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  const handleCrawlUrl = (event) => {
    setUrl(event.target.value);
  };
  const closeErrorModal = () => {
    setError('');
  };

  // Implement functions for crawling the URL based on your requirements (replace with your logic)
  const crawlThisUrl = async () => {
    console.log('Crawling URL:', url);
    if (url !== '') {
      try {
        const res = await crawlUrl({ url });
        if (res && res.data && res.data.ok) {
          setCrawlResult(res.data.data);
        } else {
          setError(res.data.err);
        }
      } catch (err) {
        console.error('Failed Crawling', err);
        setError('Something went wrong');
      }
    }
  };

  const handleQueryText = (event) => {
    setQuestion(event.target.value);
  };

  const queryOnQuestion = async () => {
    if (question !== '') {
      try {
        const res = await askQuery({ question });
        if (res && res.data && res.data.ok) {
          setResponse(res.data.data);
        } else {
          setError(res.data.err);
        }
      } catch (err) {
        console.error('No response to query', err);
        setError('Something went wrong');
      }
    }
  };

  return (
    <MainContainer>
      <CrawlerAndQuerierContainer>
        <Title>Web Crawler</Title>
        <CrawlerAndQuerierTabs>
          <Tab
            className={activeKey === 'crawlUrl' ? 'active' : ''}
            onClick={() => handleTabChange('crawlUrl')}
          >
            Crawl URL
          </Tab>
          <Tab
            className={activeKey === 'queryText' ? 'active' : ''}
            onClick={() => handleTabChange('queryText')}
          >
            Query Text
          </Tab>
        </CrawlerAndQuerierTabs>
        <TabContent>
          {activeKey === 'crawlUrl' && (
            <>
              <TextArea
                placeholder='Enter URL to Crawl'
                rows={4}
                value={url}
                onChange={handleCrawlUrl}
              />
              <Button onClick={crawlThisUrl}>Crawl URL</Button>
              {crawlResult && (
                <ResponseBox>
                  <p>{crawlResult}</p>
                </ResponseBox>
              )}
            </>
          )}
          {activeKey === 'queryText' && (
            <>
              <TextArea
                placeholder='Enter Query Text'
                rows={4}
                onChange={handleQueryText}
              />
              <Button onClick={queryOnQuestion}>Ask Question</Button>
              {response && (
                <ResponseBox>
                  <p>Answer:</p>
                  <p>{response}</p>
                </ResponseBox>
              )}
            </>
          )}
        </TabContent>

        {error && <ErrorModal text={error} customAction={closeErrorModal} />}
      </CrawlerAndQuerierContainer>
    </MainContainer>
  );
};

export default CrawlerAndQuerier;
