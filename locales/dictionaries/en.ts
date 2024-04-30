export default {
  "brand": {
    "main": {
      "const-components": {
        "header": {
          "main": "main",
          "about": "about",
          "start": "start",
        },
        "footer": {
          "not-real-project": "This project is not a real service.",
        },
      },
      "content": {
        "widgets": {
          "high-quality": {
            "title": "High sound quaility",
            "content":
              "Enjoy your music in high fidelity with our premium audio streaming service.",
          },
          "new-artists": {
            "title": "New artists",
            "content":
              "Discover fresh new talent and expand your musical horizons with our curated playlists of emerging artists.",
          },
          "new-genres": {
            "title": "New genres and feelings",
            "content":
              "Explore a diverse range of genres and moods, from upbeat dance tracks to chillout ambient soundscapes.",
          },
          "new-opportunities": {
            "title": "The opportunity to share your musical taste with friends.",
            "content":
              "Connect with friends and share your favorite music discoveries, creating a personalized listening experience.",
          },
          "uploaded-tracks": {
            "title": "Upload your tracks and listen to them on one platform!",
            "content":
              "Upload your own tracks and seamlessly integrate them into your streaming experience.",
          },
        },
        "intro": {
          "quote": "Enjoy the moment, rate the authors, share playlists - because you deserve it",
          "quote-author": "- Smotify Lead",
          "main-title": "What is Smotify?",
          "main-subtitle": "service for listening, adding, sharing tracks.",
        },
      },
    },
    "about": {
      "about-widgets": {
        "unleash": `Smotify empowers musicians of all levels to share their talent with the world.
          Upload your original tracks, create playlists, and build a following of dedicated
          fans. Our user-friendly platform makes it easy to showcase your music and connect with a 
          global audience.`,
        "explore": `Dive into Smotify's vast library of music, spanning genres and eras. Discover new artists, 
          explore hidden gems, and create personalized playlists that reflect your unique taste. Our intelligent recommendation 
          system helps you uncover music you'll love.`,
        "connect": `Smotify fosters a vibrant community of music lovers. Share your favorite tracks, discuss new releases, and connect with 
          fellow fans who share your passion for music. Engage in lively conversations and discover new music together.`,
      },
      "main-title": "Unleash Your Inner Musician",
    },
  },
  "main-service": {
    "main-part": {
      "config": {
        "log-out": "Logout",
        "log-in": "Login",
        "sign-up": "Sign-in",
        "prev-page": "Back",
        "next-page": "Next",
        "liked-tracks-widget": "Followed result",
        "add-liked-songs": "Add to favorites",
        "appearance": "Appearance",
        "account": "Account",
        "language": "Language",
        "theme": "Theme",

        "publishing": {
          "success": "Track published",
        },

        "toast": {
          "log-out": "Logout...",
          "add-liked-songs": "Added to followed tracks",
          "remove-liked-songs": "Removed from favorite tracks",
        },

        "error": {
          "current-pathname": "You are already here",
          "song-published-error": "An error has occurred. The track has not been published.",
          "song-image-error": "Failed to load image",
          "song-image-type-file": "Could not load file with this extension",
          "something-error": "Something went wrong, try again later",
          "is-not-available": "Current is not available.",
        },

        "player": {
          "mute": "Mute",
          "unmute": "Unmute",
        },

        "song-attributes": {
          "song-name": "Name",
          "song-author": "Artist",
          "song-playlist": "Playlist",
          "song-id": "ID",
          "song-file": "Audiofile",
          "song-image": "Track cover",
        },

        "modal": {
          "upload": {
            "title": "Publishing an audio recording",
            "note-title": "fields must be filled in",
          },
          "auth": {
            "title": "Sign in account",
          },
          "submit": "Publish"
        },
      
        "placeholder": {
          "fields": {
            "example": "ex."
          }
        }
      },
    },
    "sidebar": {
      "widgets": {
        "main-route": "Main",
        "search-route": "Search",
        "settings-route": "Settings",
        "media-library": "Your Library",
        "hover-add-song": "Add audio",
      },
    },
    "pages": {
      "main-content": {
        "navbar": {
          "welcome-message": "Good afternoon!",
          "recommended-message": "Listen to this while online",
          "no-available-tracks": "No tracks available...",
        },
      },
      "search-content": {
        "navbar": {
          "welcome-message": "Search",
          "input-message": "What is it this time?",
        },
      },
      "liked-content": {
        "navbar": {
          "welcome-message": "Playlist",
          "subtitle-message": "Followed tracks",
          "is-not-liked-songs": "There are no favorite tracks yet."
        },
      },
      "settings-content": {
        "navbar": {
          "welcome-message": "Settings",
          "": "",
        },
      },
    },
  },
  "language": {
    'ru': "RU",
    'en': "EN",
  }
} as const;
