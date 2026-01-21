# 🎡 Decision Wheel

A fun and interactive decision wheel app to help you make choices when you just can't decide!

## ✨ Features

- **Add 2-10 Options**: Enter your choices and let the wheel decide for you
- **Smooth Spin Animation**: Beautiful, smooth spinning animation with realistic physics
- **Sound Effects**: Engaging audio feedback with spin sounds, ticking, and victory fanfare
- **Clear Winner Display**: Large, celebratory winner announcement after each spin
- **Save Favorite Wheels**: Save your decision templates like "Restaurants", "Movies", "Weekend Activities"
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Local Storage**: All saved wheels persist in your browser

## 🚀 Getting Started

### Option 1: Open Directly
Simply open `index.html` in your web browser. No build process or server required!

### Option 2: Using a Local Server
If you prefer using a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## 🎮 How to Use

### Making a Decision

1. **Add Your Options**
   - Type an option in the input field (e.g., "Pizza", "Burger", "Sushi")
   - Press Enter or click the "Add" button
   - Add between 2-10 options

2. **Spin the Wheel**
   - Click the "SPIN!" button in the center of the wheel
   - Watch the wheel spin with smooth animation
   - Listen to the satisfying sound effects

3. **See Your Winner**
   - After the wheel stops, the winner appears in a big celebration popup
   - Click "Close" to dismiss and spin again

### Saving Wheels

1. **Save a Wheel Template**
   - Add your options to the current wheel
   - Enter a name in the "Name your wheel" field (e.g., "Lunch Places")
   - Click "Save Current Wheel"

2. **Load a Saved Wheel**
   - Scroll to the "Saved Wheels" section
   - Click "Load" on any saved wheel
   - The options will populate automatically

3. **Delete a Saved Wheel**
   - Click "Delete" on the wheel you want to remove
   - Confirm the deletion

## 🎨 Customization

### Colors
The wheel uses a beautiful gradient color palette. To customize colors, edit the `colors` array in `app.js`:

```javascript
const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#F8B739', '#52BE80'
];
```

### Sounds
Sound effects are generated using the Web Audio API. To modify sounds, edit the functions in `app.js`:
- `playSpinSound()` - Initial spin sound
- `playTickSound()` - Segment crossing tick
- `playWinSound()` - Victory melody

### Styling
All visual styles are in `styles.css`. Easily customize:
- Wheel size and appearance
- Colors and gradients
- Animation speeds
- Button styles
- Layout and spacing

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Structure and canvas element
- **CSS3** - Styling, animations, and responsive design
- **Vanilla JavaScript** - Logic and interactivity
- **Canvas API** - Wheel rendering
- **Web Audio API** - Sound effects
- **LocalStorage API** - Persistent data

### Browser Compatibility
Works on all modern browsers:
- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Opera 74+

### File Structure
```
decision-wheel/
├── index.html       # Main HTML structure
├── styles.css       # All styling and animations
├── app.js          # Application logic
└── README.md       # This file
```

## 💡 Use Cases

- **Food Decisions**: Can't decide where to eat? Let the wheel choose!
- **Movie Night**: Add movie options and let fate decide
- **Weekend Activities**: What to do this weekend? Spin the wheel!
- **Team Decisions**: Fair way to make group choices
- **Games**: Use for random selection in games
- **Daily Choices**: Any decision where you need a fun tie-breaker

## 🎯 Features in Detail

### Wheel Mechanics
- Dynamic segment sizing based on number of options
- Smooth rotation with ease-out animation
- Random spin duration (5-8 full rotations)
- Accurate winner selection based on final position

### Audio Experience
- Spinning sound when wheel starts
- Tick sounds as wheel crosses segments
- Victory melody when winner is selected
- All generated programmatically (no audio files needed)

### Data Persistence
- Saved wheels stored in browser's LocalStorage
- Survives browser restarts
- Can save unlimited wheels (within browser limits)
- Easy import/export functionality

## 🔒 Privacy

- No data is sent to any server
- All data stays in your browser's LocalStorage
- No cookies or tracking
- Works completely offline

## 🐛 Troubleshooting

**Wheel won't spin**
- Make sure you have at least 2 options added
- Check browser console for errors

**Sound not playing**
- Some browsers require user interaction before audio
- Click the page first, then spin

**Saved wheels disappeared**
- Check if you cleared browser data/cache
- LocalStorage is domain-specific

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork, modify, and enhance this project! Some ideas:
- Add custom colors for each segment
- Import/export wheel configurations
- Share wheels via URL
- Add confetti animation for winners
- Multiple wheel modes (elimination, weighted probabilities)

## ❤️ Made With Love

For the indecisive people who just need a little help making choices!

---

**Enjoy letting fate decide!** 🎲
