# HeartClot - Heart Disease Reversal Website

Evidence-based protocols for heart disease prevention and reversal through metabolic health. Based on 35 years of clinical cardiology experience by Dr. Pradip Jamnadas.

## About

HeartClot.com distills critical cardiovascular health information from Dr. Pradip Jamnadas' appearance on The Diary of a CEO podcast with Steven Bartlett. The site presents life-saving protocols in an accessible, actionable format.

## Key Topics

- **Insulin Resistance**: The hidden pre-diabetes epidemic
- **Fasting Protocols**: Hour-by-hour metabolic changes
- **Dangerous Foods**: What's really destroying your arteries
- **Gut-Heart Axis**: How 100 trillion bacteria control your fate
- **Vagus Nerve**: Activation techniques for healing
- **Exercise Truth**: Why marathoners get more heart disease
- **Testing Guide**: Tests that actually predict heart attacks
- **Supplement Stack**: Evidence-based recommendations

## 🏗️ Technology Stack

This website is built with:
- **11ty (Eleventy)** - Static site generator
- **Nunjucks** - Templating engine
- **Vanilla JavaScript** - No frameworks, optimized performance
- **Modern CSS** - CSS Grid, Flexbox, CSS Variables
- **WCAG 2.1 AA** - Accessibility compliant

## 📁 Project Structure

```
heartclot/
├── src/                      # Source files
│   ├── _layouts/            # Page layouts
│   │   ├── base.njk         # Base template with header/footer
│   │   └── content.njk      # Content page template with TOC
│   ├── _includes/           # Reusable components
│   ├── _data/               # Site data (navigation, config)
│   ├── styles/              # CSS files
│   │   └── main.css         # Main stylesheet
│   ├── scripts/             # JavaScript files
│   │   └── main.js          # Main JavaScript (debounced, optimized)
│   └── *.njk                # Page templates
├── images/                   # Image assets
├── _site/                    # Generated site (gitignored)
├── .eleventy.js             # 11ty configuration
└── package.json             # Dependencies and scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 14 or higher
- npm (comes with Node.js)

### Installation

```bash
# Install dependencies
npm install

# Start development server (with live reload)
npm run dev

# Build for production
npm run build

# Clean build directory
npm run clean
```

## 📝 Development

### Adding a New Page

1. Create a new `.njk` file in `src/`
2. Add front matter with layout and metadata
3. Write your content
4. The page will automatically be built to `_site/`

Example:

```njk
---
layout: content.njk
title: My New Page
description: Page description for SEO
---

<section id="intro">
    <h2>Introduction</h2>
    <p>Your content here...</p>
</section>
```

### Updating Navigation

Edit `src/_data/navigation.json` to add/remove navigation items.

### Modifying Styles

Edit `src/styles/main.css` - changes will be watched and updated automatically during development.

### Adding JavaScript

Edit `src/scripts/main.js` - includes debouncing, throttling, and accessibility improvements.

## ✨ Key Features

### Performance
- Zero external dependencies
- Lazy loading for images
- Debounced scroll handlers
- Optimized CSS/JS delivery

### Accessibility (WCAG 2.1 AA)
- Semantic HTML5
- ARIA labels and landmarks
- Keyboard navigation support
- Skip to main content link
- Proper heading hierarchy
- Focus indicators
- Screen reader friendly

### SEO
- Semantic meta tags
- Open Graph protocol
- Twitter Cards
- Schema.org structured data
- XML sitemap
- robots.txt
- Canonical URLs

## 🎨 Design System

### Colors
```css
--blood-red: #8B0000    /* Primary */
--deep-red: #DC143C     /* Accents */
--light-red: #FFE4E1    /* Backgrounds */
--dark: #1a1a1a         /* Text */
--grey: #f8f8f8         /* Subtle backgrounds */
```

### Typography
- System font stack (no web fonts for performance)
- Responsive font sizes using `clamp()`
- Line height: 1.6 (body), 1.8 (content)

## 📊 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### GitHub Pages
The site is configured for GitHub Pages deployment:
1. Push to the `main` branch
2. GitHub Actions will build and deploy automatically
3. Site will be available at your custom domain

### Other Platforms
Build and deploy to any static hosting:
```bash
npm run build
# Upload _site/ directory to your hosting provider
```

## Medical Disclaimer

This website contains educational information only, not medical advice. Always consult with qualified healthcare professionals before making changes to your health regimen.

## Credits

- **Medical Expertise**: Dr. Pradip Jamnadas, MD, MBBS, FACC, FSCAI
- **Original Interview**: The Diary of a CEO with Steven Bartlett
- **Video Source**: [YouTube Episode](https://www.youtube.com/watch?v=gryta3KZKU4)

## Future Enhancements

- Add research citations and bibliography sections
- Create printable PDF guides
- Add email course automation
- Implement progress tracking tools
- Translate to multiple languages

## License

Educational content based on publicly available interview. Please respect copyright and always cite sources appropriately.

---

*Saving lives through metabolic health education.*
