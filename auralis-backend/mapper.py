# mapper.py
import random

SCENE_PROFILES = {
    "cozy café": {
    "strong_triggers": [
            "speech", "music", "babble", "conversation", "chatter",
            "dishes", "cutlery", "tableware", "cup", "coffee", 
            "espresso", "restaurant", "clatter", "laughter"
        ],
        "weak_triggers": [
            "crowd", "television", "acoustic guitar", "humming"
        ],
        "description": "Soft conversation and a gentle ambience create a comfortable place for focused work today.",
        "track_description": "Warm acoustic chords, buttery neo-soul vocal runs, and unhurried rhythms designed to blend seamlessly with ceramic clatter and quiet conversation.",
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
    "bustling commute": {
        "strong_triggers": [
            "traffic", "bus", "train", "subway", "rail transport", "rail", 
            "truck", "car", "horn", "siren", "road", "motor vehicle"
        ],
        "weak_triggers": [
            "rumble", "engine", "hum", "wind", "whoosh"
        ],
        "description": "Dynamic movement and rhythmic city noise to keep your momentum high.",
        "track_description": "Propulsive tempos, syncopated basslines, and uptempo electronic jazz to match the city's pulse.",
        "tags": ["motion", "urban", "energetic"],
        "spotify_seed_genres": ["electronic", "ambient", "techno"],
            "tracks": [
            {
                "title": "Serenade (KARINA & WINTER)",
                "artist": "aespa",
                "cover": "https://images.genius.com/e575050aa188fe7e11ea50ecaed82ef0.1000x1000x1.png"
            },
            {
                "title": "Take me home",
                "artist": "PinkPantheress",
                "cover": "https://i.scdn.co/image/ab67616d0000b27357d764a60898b1e4fa65e857"
            },
            {
                "title": "Super",
                "artist": "SEVENTEEN",
                "cover": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Seventeen_-_FML.png?utm_source=en.wikipedia.org&utm_campaign=index&utm_content=original"
            },
            {
                "title": "Dracula",
                "artist": "Tame Impala",
                "cover": "https://i.scdn.co/image/ab67616d0000b273208500450dcd0fd294d7bd3b"
            },
            {
                "title": "New Jeans",
                "artist": "NewJeans",
                "cover": "https://media.pitchfork.com/photos/64af1fe75185b039bca7cf77/1:1/w_1400,h_1400,c_limit/NewJeans%20-%20Get%20Up.jpeg"
            }
        ]
    },
    "quiet study": {
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
            # Birds & wildlife
            "bird", "bird vocalization", "chirp, tweet", "crow", "pigeon, dove",
            "animal", "insects", "cricket", "cicada",
            
            # Weather & organic elements
            "wind", "breeze", "rustling leaves", "rain", "raindrop", 
            "water", "stream", "trickle, dribble", "fountain",
            
            # Open-air human activity (without transit)
            "footsteps", "gravel", "lawn mower", "children playing", 
            "playground", "park", "skateboarding"
        ],
        "weak_triggers": [
            "dog", "bark", "pant", "distant", "splash", "cheering", "ambient"
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
        label = item["label"]
        prob = item["score"]

        for scene, data in SCENE_PROFILES.items():
            # Strong matches multiply the model's confidence by 3
            if any(t in label for t in data["strong_triggers"]):
                scores[scene] += prob * 3.0
            # Weak matches contribute directly
            elif any(t in label for t in data["weak_triggers"]):
                scores[scene] += prob * 1.0

    print("\n--- WEIGHTED SCENE SCORES ---")
    for s, score in scores.items():
        print(f"{s}: {round(score, 3)}")
    print("-----------------------------\n")

    best_scene = max(scores, key=scores.get)

    # Threshold barrier: if the highest active score isn't at least 0.25, it's genuinely quiet
    if scores[best_scene] < 0.02:
        best_scene = "quiet study"

    selected_profile = SCENE_PROFILES[best_scene]
    selected_tracks = random.sample(selected_profile["tracks"], min(len(selected_profile["tracks"]), 3))
    return best_scene, selected_profile, selected_tracks