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
import { bufferToWave } from './audioUtils';

// 1. Welcome Screen
function WelcomeView({ onStart, animateIntro }) {
  return (
    <motion.main 
      className="welcome-container"
      variants={cardVariant}
      initial="hidden"
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
          whileHover={{ 
            scale: 1.04,
            transition: { type: "spring", stiffness: 400, damping: 17 }
          }}
          whileTap={{ 
            scale: 0.96 
          }}
        >
          <img src="/ear.png" alt="" className="btn-icon" />
          Listen
        </motion.button>

        <motion.span variants={slowItemFade} className="subtext">
          (takes about 5 seconds)
        </motion.span>
      </motion.div>
    </motion.main>
  )
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
function AnalysisView({ vibe, description, tags, onNext }) {
  return (
    <section className="view-container">
      <motion.div className="analysis-card" variants={cardVariant} initial = "hidden" animate="visible">

        <motion.span variants={setupVariant} animate="visible" className="card-subtitle">This space feels like...</motion.span>
        <motion.h2 variants={revealVariant} className="card-title">{vibe}</motion.h2>
        <motion.div variants={detailsStagger}>
          <motion.p variants={itemFade} className="card-description">
            {description}
          </motion.p>
          <div className="tags-container">
            {tags.map((tag, i) => (
            <motion.span key={i} variants={itemFade} className="tag">
              {tag}
            </motion.span>
           ))}
          </div>
          <motion.button 
          variants={itemFade}
          className="action-btn"
          onClick={onNext}
          whileHover={{ 
            backgroundColor: "#163042", 
            color: "#f1f6eb",
            transition: { duration: 0.2, ease: "easeInOut" }
          }}
          whileTap={{ scale: 0.96 }}
          >
            <img src="/arrow.png" alt="" className="btn-icon" />
            See recommendations
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

// 4. Recommendation Results Card
function ResultsView({ onReset, tracks, track_description }) {
  return (
    <section className="view-container">
      <motion.div variants={cardVariant} initial="hidden" animate="visible" className="results-card">
        <motion.h2 variants={setupVariant} animate="visible" className="result-title">Here’s what I suggest:</motion.h2>
        <motion.p variants={revealVariant} className="result-subtitle">
          {track_description}
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

        <motion.button 
        className="listen-again-btn"
        onClick={onReset}
        whileHover={{ 
          backgroundColor: "#163042", 
          color: "#f1f6eb",
          transition: { duration: 0.2, ease: "easeInOut" }
        }}
        >
          <img src="/ear.png" alt="" className="btn-icon" />
          Listen again
        </motion.button>
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

  const [analysisResult, setAnalysisResult] = useState({
    vibe: "quiet study",
    description: "",
    tags: [],
    tracks: []
  });

  const handleStartListening = async() => {
    setCurrentView('listening');

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
    const source = audioCtx.createMediaStreamSource(stream);
    
    // Create a processor node
    const processor = audioCtx.createScriptProcessor(4096, 1, 1);
    const audioBuffers = [];

    processor.onaudioprocess = (e) => {
      const channelData = e.inputBuffer.getChannelData(0);
      audioBuffers.push(new Float32Array(channelData));
    };

    source.connect(processor);
    processor.connect(audioCtx.destination);

    // Record for 5 seconds
    setTimeout(async () => {
      // Disconnect and release mic
      source.disconnect();
      processor.disconnect();
      stream.getTracks().forEach((track) => track.stop());

      // Merge collected Float32 buffers into an AudioBuffer
      const totalLength = audioBuffers.reduce((acc, b) => acc + b.length, 0);
      const audioBuffer = audioCtx.createBuffer(1, totalLength, audioCtx.sampleRate);
      const finalData = audioBuffer.getChannelData(0);
      
      let offset = 0;
      for (const chunk of audioBuffers) {
        finalData.set(chunk, offset);
        offset += chunk.length;
      }

      // Convert to legitimate WAV
      const wavBlob = bufferToWave(audioBuffer, totalLength);
      const formData = new FormData();
      formData.append("file", wavBlob, "recording.wav");

      try {
        const response = await fetch("http://localhost:8000/api/analyze", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        const data = await response.json();
        setAnalysisResult(data);
      } catch (err) {
        console.error("Backend error, falling back:", err);
      } finally {
        audioCtx.close();
        setCurrentView('analysis');
      }
    }, 5000);

  } catch (err) {
    console.error("Microphone initialization failed:", err);
    setCurrentView('welcome');
  }
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
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <WelcomeView 
              onStart={handleStartListening}
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

          <AnalysisView 
            vibe={analysisResult.vibe}
            description={analysisResult.description}
            tags={analysisResult.tags}
            onNext={() => setCurrentView('results')} 
          />
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
            track_description={analysisResult.track_description}
            tracks={analysisResult.tracks}
            onReset={() => setCurrentView('welcome')} 
          />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}