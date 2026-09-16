# main.py
import os
import shutil
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from classifier import analyze_ambient_audio
from mapper import map_audio_to_vibe

app = FastAPI()

# Allow your Vite frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/analyze")
async def analyze_audio(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"
    
    # Save the incoming stream
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        raw_tags = analyze_ambient_audio(temp_path)
        scene_name, profile, tracks = map_audio_to_vibe(raw_tags)

        return {
            "vibe": scene_name,
            "description": profile.get("description", ""),
            "track_description": profile.get(
                "track_description", 
                "Mellow lo-fi beats, tape warmth, and soft jazz chords to keep you grounded."
            ),
            "tags": profile.get("tags", []),
            "tracks": tracks
        }

    except Exception as e:
        print("--- PYTHON CRASH TRACEBACK ---")
        import traceback
        traceback.print_exc()
        # Return fallback with valid headers instead of failing out
        default_profile = map_audio_to_vibe([])
        return {
            "vibe": "quiet study",
            "description": "Minimal distraction and gentle stillness.",
            "track_description": "Mellow lo-fi beats to keep you grounded.",
            "tags": ["lo-fi", "jazz"],
            "tracks": default_profile[2],
            "error": str(e)
        }
    
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)