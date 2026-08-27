import { useState } from 'react';
import './App.css';

// 1. Welcome Screen
function WelcomeView({ onStart }) {
  return (
    <main className="view-container">
      <h1 className="logo-title">auralis.</h1>
      <p className="tagline">Your surroundings shape how you focus.</p>
      <p className="tagline">Let's find music that fits this moment.</p>
      
      <div className='listen-btn-container'>
        <button className="listen-btn" onClick={onStart}>
            <img src="/ear.png" alt="" className="btn-icon" />
            Listen
        </button>
      </div>

      <span className="subtext">(takes about 15 seconds)</span>
    </main>
  );
}

// 2. Waveform Listening Screen
function ListeningView() {
  return (
    <section className="view-container">
      <h2 className="listening-title">Listening to your surroundings...</h2>
      <div className="waveform">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </section>
  );
}

// 3. Analysis Space Card
function AnalysisView({ onNext }) {
  return (
    <section className="view-container">
      <div className="analysis-card">
        <span className="card-subtitle">This space feels like...</span>
        <h2 className="card-title">cozy café</h2>
        <p className="card-description">
          Soft conversation and a gentle ambience create a comfortable place for focused work today.
        </p>
        <div className="tags-container">
          <span className="tag">voices</span>
          <span className="tag">background music</span>
          <span className="tag">relaxed</span>
        </div>
        <button className="action-btn" onClick={onNext}>
          <img src="/arrow.png" alt="" className="btn-icon" />
          See recommendations
        </button>
      </div>
    </section>
  );
}

// 4. Recommendation Results Card
function ResultsView({ onReset, tracks }) {
  return (
    <section className="view-container">
      <div className="results-card">
        <h2 className="result-title">Here’s what I suggest:</h2>
        <p className="result-subtitle">
          Warm, mellow tracks that blend naturally into a relaxed café atmosphere.
        </p>
        <div className="divider"></div>

        <div className="track-list">
          {tracks.map((track, i) => (
            <div className="track-item" key={i}>
              <img src={track.cover} alt={track.title} className="track-cover" />
              <div className="track-info">
                <span className="track-name">{track.title}</span>
                <span className="track-artist">{track.artist}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="listen-again-btn" onClick={onReset}>
          <img src="/ear.png" alt="" className="btn-icon" />
          Listen again
        </button>
      </div>
    </section>
  );
}

// Main App Orchestrator
export default function App() {
  const [currentView, setCurrentView] = useState('welcome');

  const dummyTracks = [
    { 
      title: 'Slow Dancing', 
      artist: 'V', 
      cover: 'https://upload.wikimedia.org/wikipedia/en/1/11/V_-_Layover.png' 
    },
    { 
      title: 'Dreams', 
      artist: 'RUBII', 
      cover: 'https://i.scdn.co/image/ab67616d0000b273e9211a624b3f1105af1aaaee' 
    },
    { 
      title: 'Valentine', 
      artist: 'Laufey', 
      cover: 'https://i.scdn.co/image/ab67616d0000b27348341e864d4b4881f56f01b4' 
    }
  ];

  const handleStartListening = () => {
    setCurrentView('listening');
    // Simulates a 3-second audio recording step
    setTimeout(() => {
      setCurrentView('analysis');
    }, 3000);
  };

  return (
    <div className="app-shell">
      {currentView === 'welcome' && (
        <WelcomeView onStart={handleStartListening} />
      )}
      {currentView === 'listening' && (
        <ListeningView />
      )}
      {currentView === 'analysis' && (
        <AnalysisView onNext={() => setCurrentView('results')} />
      )}
      {currentView === 'results' && (
        <ResultsView 
          onReset={() => setCurrentView('welcome')} 
          tracks={dummyTracks} 
        />
      )}
    </div>
  );
}