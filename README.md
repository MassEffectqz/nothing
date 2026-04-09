# Portfolio — Nothing Style

React + Vite portfolio site inspired by Nothing design language.

## Project Structure

```
public/
├── favicon.svg
├── fonts/
│   ├── DOTMATRI.TTF          # Nothing dot font (regular)
│   └── DOTMBold.TTF           # Nothing dot font (bold)
├── hero-bg.mp4                # Hero section background video
├── icons.svg                  # Sprite icons
├── media/
│   ├── accessories/           # Nothing accessories (headphones, earbuds, bulb)
│   │   ├── nothing-bulb-white.png
│   │   ├── nothing-ear-3-white.png
│   │   ├── nothing-headphone-1-white.png
│   │   └── nothing-headphone-a-white.png
│   ├── devices/               # Nothing phones (product shots)
│   │   ├── nothing-phone-3-white.png
│   │   ├── nothing-phone-4a-pro-white.png
│   │   └── nothing-phone-4a-white.png
│   └── wallpapers/            # Lifestyle and collection wallpapers
│       ├── nothing-phone-lifestyle-{1-6}.jpg
│       └── nothing-phones-collection.jpg
└── phones/                    # Color variant phones for showcase section
    ├── black.webp
    ├── blue.webp
    ├── pink.webp
    └── white.webp

src/
├── components/
│   ├── ColorsSection.jsx      # Phones showcase with color indicators
│   ├── Header.jsx             # Corner pill navigation
│   ├── Hero.jsx               # Hero section with video background
│   ├── RecIndicator.jsx       # REC recording indicator
│   └── WorkSection.jsx        # Project list
├── App.jsx
├── index.css                  # All styles (Nothing design system)
└── main.jsx
```

## Media Naming Convention

| Folder | Content | Naming Pattern |
|--------|---------|---------------|
| `media/devices/` | Phone product shots | `nothing-phone-{model}-{color}.{ext}` |
| `media/accessories/` | Headphones, earbuds, bulb | `nothing-{product}-{model}-{color}.{ext}` |
| `media/wallpapers/` | Lifestyle/promo images | `nothing-{type}-{sequence}.{ext}` |
| `phones/` | Color variant phones | `{color}.webp` |

## Deploy to Netlify

1. Push this repo to GitHub
2. Connect to Netlify
3. Build settings auto-detected from `netlify.toml`

Or deploy manually:
```
npm run build
# Upload dist/ folder
```
