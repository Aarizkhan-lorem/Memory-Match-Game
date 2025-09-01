# 🧠 Memory Match Game

A modern, responsive memory card matching game built with React and Tailwind CSS. Test your memory skills across multiple difficulty levels while tracking your progress with an advanced scoring system.

![Game Preview](https://img.shields.io/badge/React-18+-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-teal) ![Status](https://img.shields.io/badge/Status-Complete-green)

## 🎮 Features

### Core Gameplay
- **Memory Challenge**: Flip cards to find matching pairs of adorable animal emojis
- **Progressive Difficulty**: Three levels with increasing grid sizes
- **Smart Scoring**: Time bonus rewards and move efficiency tracking
- **Pause/Resume**: Full game state management for interruption-free play

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Card flip transitions, hover effects, and match celebrations
- **Visual Feedback**: Color-coded states, glow effects, and intuitive UI
- **Sound Simulation**: Console-logged audio cues for enhanced experience

### Data & Progress
- **Best Score Tracking**: Persistent high scores for each difficulty level
- **Detailed Statistics**: Move count, completion time, and performance metrics
- **Mock Leaderboard**: Top player rankings with comprehensive stats
- **Local Storage Ready**: Built-in save system (localStorage implementation included)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aarizkhan-lorem/memory-match-game.git
   cd memory-match-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | Frontend framework | 18+ |
| **Tailwind CSS** | Styling and responsive design | 3+ |
| **Lucide React** | Icon library | Latest |
| **Vite/Next.js** | Build tool (compatible) | Latest |

## 🎯 Game Mechanics

### Difficulty Levels

| Level | Grid Size | Cards | Time Bonus | Challenge |
|-------|-----------|-------|------------|-----------|
| **Easy** | 4×2 | 8 pairs | 200 pts | Perfect for beginners |
| **Medium** | 4×3 | 12 pairs | 300 pts | Balanced challenge |
| **Hard** | 4×4 | 16 pairs | 400 pts | Memory expert mode |

### Scoring System

```
Final Score = (Matches × 100) + Time Bonus - Move Penalty

Time Bonus = max(0, Base Bonus - Seconds Elapsed)
Move Penalty = max(0, (Moves - 5) × 10)
```

**Example Calculation:**
- 8 matches × 100 = 800 base points
- Time bonus: max(0, 200 - 45) = 155 points  
- Move penalty: max(0, (12 - 5) × 10) = 70 points
- **Final Score: 800 + 155 - 70 = 885 points**

## 📱 Responsive Design

The game automatically adapts to different screen sizes:

- **Desktop**: Full-featured layout with side-by-side controls
- **Tablet**: Optimized grid spacing and touch-friendly buttons  
- **Mobile**: Stacked layout with larger touch targets

## 🏗️ Project Structure

```
src/
├── components/
│   └── MemoryMatchGame.jsx    # Main game component
├── styles/
│   └── globals.css            # Tailwind imports
├── utils/
│   └── gameLogic.js           # Game utility functions (optional)
└── App.js                     # Root component
```

## 🔧 Key Components Breakdown

### State Management
```javascript
// Core game state
const [cards, setCards] = useState([]);           // Card grid data
const [flippedCards, setFlippedCards] = useState([]); // Currently revealed cards
const [matchedCards, setMatchedCards] = useState([]); // Successfully matched pairs
const [gameState, setGameState] = useState('menu');   // Game flow control

// Scoring and progress
const [moves, setMoves] = useState(0);            // Player move count
const [time, setTime] = useState(0);              // Elapsed time in seconds
const [score, setScore] = useState(0);            // Current score
const [bestScores, setBestScores] = useState({}); // High scores per difficulty
```

### Game Logic Flow
1. **Initialization**: Shuffle card pairs and reset game state
2. **Card Selection**: Handle player clicks with validation
3. **Match Detection**: Compare flipped cards and update state
4. **Win Condition**: Check for complete matches and calculate final score
5. **Score Persistence**: Save high scores to localStorage

## 🎨 Customization

### Adding New Themes
```javascript
const themes = {
  animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'],
  fruits: ['🍎', '🍌', '🍇', '🍓', '🍑', '🍊', '🥝', '🍍'],
  space: ['🌟', '🌙', '☀️', '🪐', '🚀', '👽', '🛸', '🌍']
};
```

### Modifying Difficulty
```javascript
const customDifficulty = {
  expert: { 
    symbols: [...symbols16], // 16 unique symbols
    timeBonus: 500,
    name: 'Expert (4x8)' 
  }
};
```

### Styling Customization
The game uses Tailwind utility classes for easy theme modifications:
- **Colors**: Change gradient combinations in className strings
- **Animations**: Modify transition durations and transform effects
- **Layout**: Adjust grid columns and spacing values

## 🔊 Audio Integration

To add real sound effects, integrate with Web Audio API:

```javascript
// Example sound implementation
const playSound = (type) => {
  const audio = new Audio(`/sounds/${type}.mp3`);
  audio.play().catch(e => console.log('Sound play failed:', e));
};

// Usage in game logic
const handleCardClick = (cardId) => {
  playSound('flip');
  // ... rest of click logic
};
```

## 📊 Performance Considerations

- **React.memo**: Consider memoizing card components for large grids
- **useCallback**: Optimize event handlers to prevent unnecessary re-renders
- **Lazy Loading**: Implement for additional themes or card sets
- **Animation Performance**: Uses CSS transforms for smooth 60fps animations

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
npx vercel --prod
```

### Netlify
```bash
npm run build
# Drag and drop 'dist' folder to Netlify
```

### GitHub Pages
```bash
npm run build
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React functional component patterns
- Use Tailwind utility classes for styling
- Maintain responsive design principles
- Add console.log statements for sound cues
- Test across different devices and browsers

## 📝 Future Enhancements

### Planned Features
- [ ] Real audio integration with Web Audio API
- [ ] Multiplayer mode with WebSocket support
- [ ] Additional card themes (numbers, letters, flags)
- [ ] Achievement system with unlock conditions
- [ ] Animated background effects
- [ ] Accessibility improvements (keyboard navigation, screen reader support)
- [ ] Progressive Web App (PWA) capabilities
- [ ] Online leaderboard with user accounts

### Advanced Features
- [ ] AI difficulty adjustment based on player performance
- [ ] Custom card upload functionality
- [ ] Tournament mode with bracket system
- [ ] Social sharing integration
- [ ] Analytics dashboard for performance tracking

## 🐛 Known Issues

- Sound effects are currently simulated via console logs
- localStorage is disabled in some environments (Claude.ai artifacts)
- Large grids (6x6+) may impact performance on older devices

## 📄 License

MIT License - feel free to use this project for learning, personal projects, or commercial applications.

## 🙏 Acknowledgments

- **Lucide React** for beautiful icons
- **Tailwind CSS** for utility-first styling
- **React Team** for the amazing framework
- **Emoji Contributors** for expressive card symbols

---

**Built with ❤️ for memory game enthusiasts**

*Happy matching! 🎯*