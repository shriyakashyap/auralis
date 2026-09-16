# classifier.py
import av
import numpy as np
from transformers import pipeline

classifier = pipeline(
    "audio-classification", 
    model="MIT/ast-finetuned-audioset-10-10-0.4593"
)

def analyze_ambient_audio(file_path: str):
    container = av.open(file_path)
    audio_stream = next(s for s in container.streams if s.type == 'audio')
    
    resampler = av.AudioResampler(format='fltp', layout='mono', rate=16000)
    
    frames = []
    for frame in container.decode(audio_stream):
        for resampled in resampler.resample(frame):
            frames.append(resampled.to_ndarray())

    if not frames:
        return []

    audio_data = np.concatenate(frames, axis=1).squeeze().astype(np.float32)

    predictions = classifier({"sampling_rate": 16000, "raw": audio_data}, top_k=10)
    
    print("\n--- MODEL PREDICTIONS ---")
    for p in predictions:
        print(f"{p['label']}: {round(p['score'], 3)}")
    print("-------------------------\n")

    # Return label AND score
    return [{"label": p["label"].lower(), "score": p["score"]} for p in predictions]