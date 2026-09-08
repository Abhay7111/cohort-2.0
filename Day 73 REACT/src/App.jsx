import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageWithFallback({ src, alt, className, onErrorHide }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ display: loaded ? 'block' : 'none', maxWidth: '100%', borderRadius: '8px' }}
      onLoad={() => setLoaded(true)}
      onError={onErrorHide}
    />
  );
}

// Safely retrieve deeply nested object properties (e.g., "primary_photo.href" or "location.address.line")
function getNestedValue(obj, path) {
  if (!obj || !path) return undefined;
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

function DataCard({ item, displayPath, showImage, onOpenJson }) {
  const [isBroken, setIsBroken] = useState(false);
  
  // Try custom path first, then fallback to common image/address keys
  const extractedValue = getNestedValue(item, displayPath);
  const valueToDisplay = extractedValue || item?.primary_photo?.href || item?.location?.address?.line || item?.download_url;

  if (showImage && (!valueToDisplay || isBroken)) {
    return null;
  }

  return (
    <div 
      className="wraper"
      style={{
        border: '1px solid #444',
        padding: '8px',
        borderRadius: '8px',
        minWidth: '220px',
        maxWidth: '350px',
        wordBreak: 'break-word',
        overflowWrap: 'anywhere'
      }}
    >
      <button 
        onClick={() => onOpenJson(item)}
        style={{ marginTop: '5px', cursor: 'pointer', padding: '0px', borderRadius: '8px', background: 'transparent', border: 'none', width: '100%' }}
      >
        {showImage ? (
          <ImageWithFallback 
            src={valueToDisplay} 
            alt="Fetched visual" 
            className="img"
            onErrorHide={() => setIsBroken(true)}
          />
        ) : (
          <div>
            <h3 className="title text-clip" style={{ margin: 0, wordBreak: 'break-word', fontSize: '0.85rem', color: '#fff' }}>
              {typeof valueToDisplay === 'object' ? JSON.stringify(valueToDisplay) : String(valueToDisplay || 'No Key Found')}
            </h3>
          </div>
        )}
      </button>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [selectedJson, setSelectedJson] = useState(null);

  // Response metadata controls
  const [statusCode, setStatusCode] = useState(null);
  const [responseTime, setResponseTime] = useState(null);

  // UI Visibility Toggles (Hide unused input groups)
  const [showAuthOptions, setShowAuthOptions] = useState(false);
  const [showPathOptions, setShowPathOptions] = useState(true);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Inputs
  const [url, setUrl] = useState(() => localStorage.getItem('url') || '');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('apiKey') || '');
  const [apiHost, setApiHost] = useState(() => localStorage.getItem('apiHost') || '');
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') || '');
  const [timeout, setTimeoutVal] = useState('5000');
  const [method, setMethod] = useState('POST');
  const [displayPath, setDisplayPath] = useState('');
  const [arrayPath, setArrayPath] = useState('');

  const [requestBody, setRequestBody] = useState(
    JSON.stringify({}, null, 2)
  );

  const [customHeaders, setCustomHeaders] = useState('');
  const [queryParams, setQueryParams] = useState('');

  useEffect(() => { localStorage.setItem('url', url); }, [url]);
  useEffect(() => { localStorage.setItem('apiKey', apiKey); }, [apiKey]);
  useEffect(() => { localStorage.setItem('apiHost', apiHost); }, [apiHost]);
  useEffect(() => { localStorage.setItem('authToken', authToken); }, [authToken]);

  const getData = async () => {
    if (!url) return;

    setLoading(true);
    setError(null);
    setStatusCode(null);
    setResponseTime(null);

    const startTime = performance.now();

    try {
      // Parse custom request body
      let parsedBody = null;
      if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && requestBody) {
        parsedBody = JSON.parse(requestBody);
      }

      // Parse custom headers
      let parsedHeaders = {};
      if (customHeaders) {
        parsedHeaders = JSON.parse(customHeaders);
      }

      // Merge auth tokens & RapidAPI keys
      if (apiKey) parsedHeaders['x-rapidapi-key'] = apiKey;
      if (apiHost) parsedHeaders['x-rapidapi-host'] = apiHost;
      if (authToken) parsedHeaders['Authorization'] = authToken.startsWith('Bearer ') ? authToken : `Bearer ${authToken}`;

      // Parse custom Query Params (e.g. limit=10&page=1)
      const params = new URLSearchParams(queryParams);

      const options = {
        method: method,
        url: url,
        headers: parsedHeaders,
        params: params,
        data: parsedBody,
        timeout: Number(timeout) || 5000
      };

      const response = await axios.request(options);
      
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      setStatusCode(response.status);

      // Unwrap nested array using arrayPath state or sensible fallbacks
      let extractedArray = getNestedValue(response.data, arrayPath);
      
      if (!extractedArray) {
        extractedArray = response.data?.data?.home_search?.results || 
                         (Array.isArray(response.data) ? response.data : [response.data]);
      }

      setData(Array.isArray(extractedArray) ? extractedArray : [extractedArray]);
    } catch (err) {
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      if (err.response) {
        setStatusCode(err.response.status);
      }
      setError(err.message || 'Error fetching data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    setCount((prev) => prev + 1);
    getData();
  }

  function handleFormatJson() {
    try {
      if (requestBody) {
        const parsed = JSON.parse(requestBody);
        setRequestBody(JSON.stringify(parsed, null, 2));
      }
    } catch {
      alert('Invalid JSON in Request Body!');
    }
  }

  function handleClearInputs() {
    setQueryParams('');
    setRequestBody('{}');
    setCustomHeaders('');
  }

  return (
    <div className="main-main-div" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px', maxWidth: '650px' }}>
        
        {/* Method & URL (Always Visible) */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ padding: '8px' }}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="PATCH">PATCH</option>
            <option value="DELETE">DELETE</option>
          </select>
          <input 
            required 
            type="text" 
            placeholder="API Endpoint URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)} 
            style={{ flex: 1, padding: '8px' }}
          />
        </div>

        {/* Input Category Toggle Bar */}
        <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem' }}>
          <label style={{ cursor: 'pointer', userSelect: 'none' }}>
            <input 
              type="checkbox" 
              checked={showAuthOptions} 
              onChange={(e) => setShowAuthOptions(e.target.checked)} 
            />
            Authentication Options
          </label>
          <label style={{ cursor: 'pointer', userSelect: 'none' }}>
            <input 
              type="checkbox" 
              checked={showPathOptions} 
              onChange={(e) => setShowPathOptions(e.target.checked)} 
            />
            Path Extractor
          </label>
          <label style={{ cursor: 'pointer', userSelect: 'none' }}>
            <input 
              type="checkbox" 
              checked={showAdvancedOptions} 
              onChange={(e) => setShowAdvancedOptions(e.target.checked)} 
            />
            Advanced (Headers/Query)
          </label>
        </div>

        {/* Auth Inputs (RapidAPI & Bearer Token) - Hidden when not needed */}
        {showAuthOptions && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#252525', padding: '10px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="password" 
                placeholder="x-rapidapi-key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)} 
                style={{ flex: 1, padding: '8px' }}
              />
              <input 
                type="text" 
                placeholder="x-rapidapi-host"
                value={apiHost}
                onChange={(e) => setApiHost(e.target.value)} 
                style={{ flex: 1, padding: '8px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="password" 
                placeholder="Bearer Token / Auth Key"
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)} 
                style={{ flex: 1, padding: '8px' }}
              />
              <input 
                type="number" 
                placeholder="Timeout (ms)"
                value={timeout}
                onChange={(e) => setTimeoutVal(e.target.value)} 
                style={{ width: '130px', padding: '8px' }}
              />
            </div>
          </div>
        )}

        {/* Dynamic Key Extractor Controls - Hidden when not needed */}
        {showPathOptions && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              placeholder="Nested Array Path (e.g. data.home_search.results)"
              value={arrayPath}
              onChange={(e) => setArrayPath(e.target.value)} 
              style={{ flex: 1, padding: '8px' }}
            />
            <input 
              type="text" 
              placeholder="Display Key Path (e.g. location.address.line)"
              value={displayPath}
              onChange={(e) => setDisplayPath(e.target.value)} 
              style={{ flex: 1, padding: '8px' }}
            />
          </div>
        )}

        {/* Advanced Headers & Query Params - Hidden when not needed */}
        {showAdvancedOptions && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#252525', padding: '10px', borderRadius: '6px' }}>
            <input 
              type="text" 
              placeholder="Query Params (e.g., page=2&limit=10)"
              value={queryParams}
              onChange={(e) => setQueryParams(e.target.value)} 
              style={{ padding: '8px' }}
            />
            <textarea
              rows="3"
              placeholder='Custom Headers JSON (e.g. {"Content-Type": "application/json"})'
              value={customHeaders}
              onChange={(e) => setCustomHeaders(e.target.value)}
              style={{ padding: '8px', fontFamily: 'monospace', fontSize: '0.8rem' }}
            />
          </div>
        )}

        {/* Request Body for POST/PUT/PATCH (Automatically hidden for GET/DELETE) */}
        {(method === 'POST' || method === 'PUT' || method === 'PATCH') && (
          <div>
            <textarea
              rows="5"
              placeholder="JSON Request Body"
              value={requestBody}
              onChange={(e) => setRequestBody(e.target.value)}
              style={{ width: '100%', padding: '8px', fontFamily: 'monospace', fontSize: '0.8rem', boxSizing: 'border-box' }}
            />
            <button 
              type="button" 
              onClick={handleFormatJson}
              style={{ marginTop: '5px', padding: '4px 10px', fontSize: '0.75rem', cursor: 'pointer' }}
            >
              Format JSON
            </button>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <label style={{ cursor: 'pointer', userSelect: 'none' }}>
              <input 
                type="checkbox" 
                checked={showImage} 
                onChange={(e) => setShowImage(e.target.checked)} 
              />
              Show Image
            </label>

            <button 
              type="button" 
              onClick={handleClearInputs}
              style={{ padding: '4px 10px', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              Clear Body & Query
            </button>
          </div>

          <button type="submit" style={{ padding: '8px 20px', cursor: 'pointer' }}>Submit Request</button>
        </div>
      </form>

      {/* Response Summary Bar */}
      <div style={{ fontSize: '0.85rem', marginBottom: '15px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <span><strong>Results:</strong> {data.length}</span>
        <span><strong>Submits:</strong> {count}</span>
        {statusCode && (
          <span style={{ color: statusCode >= 200 && statusCode < 300 ? '#4caf50' : '#f44336' }}>
            <strong>Status:</strong> {statusCode}
          </span>
        )}
        {responseTime && <span><strong>Time:</strong> {responseTime} ms</span>}
      </div>

      {/* Data Visualizer Grid */}
      <div className="main-wraper" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}

        {Array.isArray(data) && data.map((item, index) => (
          <DataCard 
            key={item.property_id || item.id || index}
            item={item}
            displayPath={displayPath}
            showImage={showImage}
            onOpenJson={setSelectedJson}
          />
        ))}
      </div>

      {/* JSON Viewer Modal */}
      {selectedJson && (
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
          }}
          onClick={() => setSelectedJson(null)}
        >
          <div 
            style={{
              backgroundColor: '#1e1e1e', color: '#fff', padding: '20px',
              borderRadius: '8px', maxWidth: '600px', maxHeight: '80vh',
              overflowY: 'auto', width: '90%'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>Raw Data (JSON)</h2>
              <button onClick={() => setSelectedJson(null)} style={{ cursor: 'pointer', padding: '5px 10px' }}>
                Close ✕
              </button>
            </div>
            <hr style={{ borderColor: '#444' }} />
            <pre 
              style={{ 
                textAlign: 'left', background: '#2d2d2d', padding: '10px', borderRadius: '5px',
                whiteSpace: 'pre-wrap', wordBreak: 'break-word', overflowWrap: 'anywhere'
              }}
            >
              {JSON.stringify(selectedJson, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;