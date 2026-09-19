# auralis (demo) 🎧✨

Auralis is an ambient, audio-reactive web app that samples your surrounding room audio, classifies environmental acoustics using an Audio Spectrogram Transformer (AST), and serves curated music recommendations to match your space.

> **Note:** This project is currently a standalone proof-of-concept (PoC) focused on real-time environmental sound classification and contextual acoustic mapping.

## Demo

🎬 **[demo video](https://drive.google.com/file/d/15EBtt1vtatnkqE1OqMcF7aijavkaMIhJ/view?usp=sharing)**

---

## How It Works

Auralis turns your room's physical audio environment into curated musical recommendations through a four-stage classification pipeline:

```

[ Browser Mic ] ──> [ Audio Normalization ] ──> [ AST Transformer ] ──> [ Heuristic Vibe Mapper ] ──> [ Music Recommendation ]

```

1. **Ambient Audio Capture:**
   The frontend records a short sample of environmental room sound using the Web Audio API (`MediaRecorder`) and sends the raw audio payload to the FastAPI backend.

2. **Spectrogram Preprocessing:**
   The backend normalizes the audio stream to a 16 kHz mono format via PyAV. It converts the waveform into a log-mel spectrogram, the frequency-over-time visual representation that audio transformers process.

3. **Inference with AST (Audio Spectrogram Transformer):**
   The spectrogram is passed into an AST model pre-trained and fine-tuned on Google's AudioSet ontology (527 distinct acoustic sound classes). The model evaluates patterns in the spectrogram to output probabilistic confidence scores across potential sound events (e.g., *whispering*, *keyboard typing*, *cutlery clatter*, *wind noise*, *background music*).

4. **Context-Aware Heuristic Mapping:**
   Raw audio predictions are matched against a weighted trigger matrix in `mapper.py`:
   * **Cozy Café:** Demands indoor dining cues (silverware, porcelain, coffee preparation) or ambient music.
   * **Open Outdoors:** Responds to organic wind buffeting, foliage rustle, water elements, and distant wildlife.
   * **Quiet Work:** Prioritizes subtle indoor keyboard clicks, writing, and low room tone—falling back to this mode whenever room acoustic energy sits below active environment thresholds.

5. **Curated Track Delivery:**
   Once a target vibe is resolved, Auralis samples tailored tracks and thematic metadata matched to the mood, returning them to the React client alongside active confidence metrics.

---

## Tech Stack

* **Frontend:** React 19, Vite, Framer Motion
* **Backend:** FastAPI, Uvicorn, PyAV
* **Machine Learning:** Audio Spectrogram Transformer (`MIT/ast-finetuned-audioset-10-10-0.4593`), PyTorch, Hugging Face Transformers
* **Audio Ontology:** Google AudioSet

---

## Project Structure

```text
auralis/
├── auralis-backend/
│   ├── main.py              # FastAPI endpoints & audio processing pipeline
│   ├── classifier.py        # AST model loader & spectrogram inference
│   ├── mapper.py            # Vibe mapping, trigger dictionaries & track sets
│   └── requirements.txt     # Python dependencies
├── auralis-frontend/
│   ├── src/                 # React UI, hooks & audio capture logic
│   ├── public/              # Static assets
│   └── package.json         # Frontend build scripts
├── package.json             # Root runner orchestrating concurrent execution
└── README.md
```

---

## Setup

1. Clone the repository:

```bash
git clone https://github.com/shriyakashyap/auralis.git auralis
cd auralis
```

2. Set up backend

Ensure Python 3.10+ is installed.

```bash
cd auralis-backend
python3 -m venv venv
source venv/bin/activate       # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
```
3. Install dependencies

```bash
npm install
npm --prefix auralis-frontend install
```

4. Launch the app

```bash
npm run dev
```

**Client**: (http://localhost:5173)

**API Docs**: (http://localhost:8000/docs)

*First Run Note: When you trigger your first recording, PyTorch and Hugging Face will download the ~350 MB AST model weights. Subsequent runs load directly from your local cache.*

---

## Troubleshooting

Microphone Access: Ensure your browser is granted permission to access your audio input device at http://localhost:5173.

PyAV / FFmpeg Compilation: If building PyAV on macOS fails during dependency resolution, ensure FFmpeg headers are available via Homebrew:

```bash
brew install ffmpeg
```

## Current Limitations

* **Curated Track Pool (Static):** Rather than generating algorithmic recommendations tailored to an individual user's listening history (like Spotify or Apple Music), songs are sampled from static, hand-curated track pools mapped to each vibe in `mapper.py`.
* **Limited Environment Profiles:** The system currently recognizes only three primary acoustic settings: **Quiet Work**, **Cozy Café**, and **Open Outdoors**.
* **Acoustic Edge Cases & Misclassifications:** Microphone sensitivity, background noise leakage, and hardware gain can lead to occasional false positives—for example, distant cars driving past an open window generating a "whoosh" sound that tricks the model into detecting an indoor room as the outdoors.
* **Platform Architecture:** The project is currently deployed as a local web app rather than a native mobile application, meaning it relies on browser-level microphone access rather than native mobile background listening.

## Future Roadmap

* **Expanded Environment Profiles:** Adding granular spaces such as libraries, bustling transit/commutes, gyms, and rainy interiors.
* **Spotify Web API Integration:** Authenticating user accounts via OAuth to generate dynamic playlists based on personal listening tastes rather than hardcoded lists.
* **Native Mobile App:** Transitioning to React Native or Swift to allow seamless, low-power background listening on mobile devices.
* **Acoustic Calibration:** Letting users tune threshold sensitivity to adapt to their specific room and microphone setup.
