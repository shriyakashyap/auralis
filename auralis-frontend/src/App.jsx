import { useState } from 'react';
import { motion, AnimatePresence, delay } from 'framer-motion';
import { 
  cardVariant, 
  setupVariant, 
  revealVariant, 
  detailsStagger, 
  itemFade, 
  staggerContainer,
  slowTitleVariant,
  slowWelcomeStagger,
  slowItemFade
} from './animations';
import './App.css';

// 1. Welcome Screen
function WelcomeView({ onStart, animateIntro }) {
  return (
    <motion.main 
      className="welcome-container"
      variants={cardVariant}
      initial={animateIntro ? "hidden" : false} // Only animate from hidden on fresh load
      animate="visible"
    >
      <motion.h1 variants={slowTitleVariant} className="logo-title">
        auralis.
      </motion.h1>

      <motion.div variants={slowWelcomeStagger} className="about">
        <motion.p variants={slowItemFade} className="tagline">
          Your surroundings shape how you focus.
        </motion.p>
        <motion.p variants={slowItemFade} className="tagline">
          Let's find music that fits this moment.
        </motion.p>

        <motion.button 
          variants={slowItemFade} 
          className="listen-btn" 
          onClick={onStart}
        >
          <img src="/ear.png" alt="" className="btn-icon" />
          Listen
        </motion.button>

        <motion.span variants={slowItemFade} className="subtext">
          (takes about 15 seconds)
        </motion.span>
      </motion.div>
    </motion.main>
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
      <motion.div className="analysis-card" variants={cardVariant} initial = "hidden" animate="visible">

        <motion.span variants={setupVariant} animate="visible" className="card-subtitle">This space feels like...</motion.span>
        <motion.h2 variants={revealVariant} className="card-title">cozy café</motion.h2>
        <motion.div variants={detailsStagger}>
          <motion.p variants={itemFade} className="card-description">
            Soft conversation and a gentle ambience create a comfortable place for focused work today.
          </motion.p>
          <div className="tags-container">
            <motion.span className="tag" variants={itemFade}>voices</motion.span>
            <motion.span className="tag" variants={itemFade}>background music</motion.span>
            <motion.span className="tag" variants={itemFade}>relaxed</motion.span>
          </div>
          <motion.button variants={itemFade} className="action-btn" onClick={onNext}>
            <img src="/arrow.png" alt="" className="btn-icon" />
            See recommendations
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

// 4. Recommendation Results Card
function ResultsView({ onReset, tracks }) {
  return (
    <section className="view-container">
      <motion.div variants={cardVariant} initial="hidden" animate="visible" className="results-card">
        <motion.h2 variants={setupVariant} animate="visible" className="result-title">Here’s what I suggest:</motion.h2>
        <motion.p variants={revealVariant} className="result-subtitle">
          Warm, mellow tracks that blend naturally into a relaxed café atmosphere.
        </motion.p>
        <div className="divider"></div>

        <motion.div variants={detailsStagger} className="track-list">
          {tracks.map((track, i) => (
            <motion.div variants={itemFade} className="track-item" key={i}>
              <img src={track.cover} alt={track.title} className="track-cover" />
              <div className="track-info">
                <span className="track-name">{track.title}</span>
                <span className="track-artist">{track.artist}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <button className="listen-again-btn" onClick={onReset}>
          <img src="/ear.png" alt="" className="btn-icon" />
          Listen again
        </button>
      </motion.div>
    </section>
  );
}

const springTransition = {
  type: "spring",
  stiffness: 100,
  damping: 18,
  mass: 0.8
};

const pageVariants = {
  initial: { opacity: 0, y: 15, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -15, scale: 0.98, transition: { duration: 0.25 } }
};

// Main App Orchestrator
export default function App() {
  const [currentView, setCurrentView] = useState('welcome');
  const [isFirstLoad, setIsFirstLoad] = useState(true);

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
      {/* Enables orchestration of exit/entry */}
      <AnimatePresence mode="wait">
        
        {currentView === 'welcome' && (
          <motion.div
            key="welcome"
            className="view-wrapper"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <WelcomeView 
              onStart={handleStartListening} 
              animateIntro={isFirstLoad} 
            />
          </motion.div>
        )}

        {currentView === 'listening' && (
          <motion.div
            key="listening"
            className="view-wrapper"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={springTransition}
          >
            <ListeningView />
          </motion.div>
        )}

        {currentView === 'analysis' && (
          <motion.div
            key="analysis"
            className="view-wrapper"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={springTransition}
          >
            <AnalysisView onNext={() => setCurrentView('results')} />
          </motion.div>
        )}

        {currentView === 'results' && (
          <motion.div
            key="results"
            className="view-wrapper"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={springTransition}
          >
            <ResultsView 
              onReset={() => setCurrentView('welcome')} 
              tracks={dummyTracks} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}