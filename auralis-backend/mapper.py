# mapper.py
import random

SCENE_PROFILES = {
    "cozy café": {
    "strong_triggers": [
            # In-store & ambient music cues
            "background music", "music", "ambient music", "easy listening", 
            "acoustic guitar", "piano", "jazz",
            
            # Dining & coffee prep
            "cutlery, silverware", "dishes, pots, and pans", "cupboard open or close",
            "coffee", "espresso machine", "cup", "tableware", 
            "chatter", "babble", "laughter", "restaurant"
        ],
        "weak_triggers": [
            "whispering", "indoor"
        ],
        "description": "Soft conversation and a gentle ambience create a comfortable place for focused work today.",
        "track_description": "Soft acoustic strums and warm jazzy grooves that tuck into background chatter and ceramic clatter.",
        "tags": ["voices", "background music", "relaxed"],
        "spotify_seed_genres": ["acoustic", "chill", "indie"],
        "tracks": [ 
            {
                "title": "Slow Dancing",
                "artist": "V",
                "cover": "https://upload.wikimedia.org/wikipedia/en/1/11/V_-_Layover.png"
            },
            {
                "title": "Dreams",
                "artist": "RUBII",
                "cover": "https://i.scdn.co/image/ab67616d0000b273e9211a624b3f1105af1aaaee"
            },
            {
                "title": "Valentine",
                "artist": "Laufey",
                "cover": "https://i.scdn.co/image/ab67616d0000b27348341e864d4b4881f56f01b4"
            },
            {
                "title": "How?",
                "artist": "Dhruv",
                "cover": "https://i.scdn.co/image/ab67616d0000b2739ac09ca117549a7e0dc19528"
            },
            {
                "title": "always",
                "artist": "grentperez",
                "cover": "https://i.scdn.co/image/ab67616d0000b27383ec8468d5c5543af92fd6d7"
            }
        ]
    },
    "quiet work": {
        "strong_triggers": [
            "silence", "typing", "computer keyboard", "whispering", "clock", "tick", "page turn"
        ],
        "weak_triggers": [
            "breathing", "rustle"
        ],
        "description": "Minimal distraction and gentle stillness designed for deep immersion.",
        "tags": ["silent", "low-energy", "minimal"],
        "spotify_seed_genres": ["lo-fi", "jazz", "stillness"],
        "tracks": [
            {
                "title": "Eons",
                "artist": "Kupla",
                "cover": "https://i1.sndcdn.com/artworks-VryKiP8ENk1B3nBY-R66GYw-t500x500.jpg"
            },
            {
                "title": "Lost and Found",
                "artist": "Mondo Loops",
                "cover": "https://f4.bcbits.com/img/a1050922976_16.jpg"
            },
            {
                "title": "No Mud No Lotus",
                "artist": "harp beat, CoryaYo, Hippo Dreams",
                "cover": "https://i.scdn.co/image/ab67616d0000b273ecda425b72e7b1d550a23bfa"
            },
            {
                "title": "Tea Time",
                "artist": "Hippo Dreams",
                "cover": "https://i.scdn.co/image/ab67616d0000b27331eba48b9e4224ea9e018870"
            },
            {
                "title": "Calmer Days",
                "artist": "Tonion, xander.",
                "cover": "https://i.scdn.co/image/ab67616d0000b273920b21c7f2846e8c9ce5864f"
            }
        ]
    },
    "open outdoors": {
    "strong_triggers": [
            # AudioSet's labels for wind pressure and mic buffet
            "wind", "wind noise (microphone)", "howl", "rustling leaves", 
            "whoosh, swoosh, swish", "explosion", "burst, pop", "thump",
            
            # Nature & life
            "bird", "bird vocalization, bird call, bird song", "chirp, tweet",
            "crow", "pigeon, dove", "animal", "insect", "cricket", "frog",
            "cat", "meow", "dog", "bark",
            
            # Weather & atmosphere
            "rain", "raindrop", "stream", "water", "waterfall", 
            "footsteps", "cheering", "children playing", "child speech, kid speaking"
        ],
        "weak_triggers": [
            # Speech is fine outdoors, but only as a low-weight background cue
            "speech", "conversation", "whispering", "noise", "white noise"
        ],
        "description": "Natural elements, fresh air, and organic sounds that connect you to open green space.",
        "track_description": "Sun-drenched indie folk, fingerpicked guitars, and gentle organic rhythms to accompany the open air.",
        "tags": ["nature", "breeze", "grounded"],
        "tracks": [
            {
                "title": "Chemtrails Over The Country Club", 
                "artist": "Lana del Rey", 
                "cover": "https://media.pitchfork.com/photos/5ffde6ad50609aa314ba30ec/1:1/w_3000,h_3000,c_limit/Lana-Del-Rey-Chemtrails-Over-the-Country-Club.jpg"
            },
            {
                "title": "double take", 
                "artist": "Dhruv", 
                "cover": "https://i.scdn.co/image/ab67616d0000b2736f04e53cb5309f8e88286842"
            },
            {
                "title": "Falling Behind", 
                "artist": "Laufey", 
                "cover": "https://i.scdn.co/image/ab67616d0000b273c474a859ad74962ed14459d0"
            },
            {
                "title": "Dandelion",
                "artist": "grentperez, Ruel",
                "cover": "https://i.scdn.co/image/ab67616d0000b27359c0131c987363e309c35ecb"
            }
        ]
    },
}

def map_audio_to_vibe(predictions: list):
    scores = {scene: 0.0 for scene in SCENE_PROFILES}

    for item in predictions:
        label = item["label"].lower()
        prob = float(item["score"])

        for scene, data in SCENE_PROFILES.items():
            # Check strong triggers
            if any(t in label for t in data.get("strong_triggers", [])):
                weight = 6.0 if scene == "open outdoors" else 2.5
                scores[scene] += prob * weight

            # Check weak triggers
            elif any(t in label for t in data.get("weak_triggers", [])):
                # If outdoor, let speech count toward the outdoor ambiance
                weight = 1.5 if scene == "open outdoors" else 0.5
                scores[scene] += prob * weight

    print("\n--- WEIGHTED SCENE SCORES ---")
    for s, score in scores.items():
        print(f"{s}: {round(score, 4)}")
    print("-----------------------------\n")

    best_scene = max(scores, key=scores.get)

    # Only fall back to quiet work if literally nothing was detected
    if scores[best_scene] < 0.01:
        best_scene = "quiet work"

    selected_profile = SCENE_PROFILES[best_scene]
    selected_tracks = random.sample(selected_profile["tracks"], min(len(selected_profile["tracks"]), 3))
    return best_scene, selected_profile, selected_tracks