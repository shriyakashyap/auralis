# auralis (demo) 🎧✨

Auralis is an ambient, audio-reactive web app that samples your surrounding room audio, classifies environmental acoustics using an Audio Spectrogram Transformer (AST), and serves curated music recommendations to match your space.

---

## Features

* **Real-time Environmental Classification:** Runs an AST fine-tuned on Google's AudioSet (527 hierarchical sound ontology classes) via Hugging Face.
* **Context-Aware Scene Mapping:** Distinguishes between subtle indoor and outdoor atmospheres using a weighted trigger heuristic across scenes like **Cozy Café**, **Open Outdoors**, and **Quiet Work**.
* **Streamlined Developer Experience:** Single-command startup from the repository root via `concurrently`—no need to manage separate terminal tabs for frontend and backend servers.
* **Responsive UI:** Built with React, Vite, and Framer Motion for clean visual feedback.

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
git clone [https://github.com/shriyakashyap/auralis.git](https://github.com/shriyakashyap/auralis.git)
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
