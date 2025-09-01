import React, { useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, Trophy, Clock, Target } from "lucide-react";

const MemoryMatchGame = () => {
  // Card symbols for different difficulty levels
  const difficultySettings = {
    easy: {
      symbols: ["🐶", "🐱", "🐭", "🐹"],
      timeBonus: 200,
      name: "Easy (4x2)",
    },
    medium: {
      symbols: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊"],
      timeBonus: 300,
      name: "Medium (4x3)",
    },
    hard: {
      symbols: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
      timeBonus: 400,
      name: "Hard (4x4)",
    },
  };

  // Game state
  const [difficulty, setDifficulty] = useState("easy");
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [gameState, setGameState] = useState("menu"); // 'menu', 'playing', 'paused', 'won', 'lost'
  const [score, setScore] = useState(0);
  const [bestScores, setBestScores] = useState({});

  // STEP 1: Load best scores from memory (simulating localStorage)
  useEffect(() => {
    // In a real app, you'd use: JSON.parse(localStorage.getItem('memoryGameScores') || '{}')
    setBestScores({
      easy: 1500,
      medium: 2100,
      hard: 2500,
    });
  }, []);

  // STEP 2: Timer logic
  useEffect(() => {
    let interval;
    if (gameState === "playing") {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  // STEP 3: Initialize game board
  const initializeGame = useCallback(() => {
    const symbols = difficultySettings[difficulty].symbols;
    const gameCards = [...symbols, ...symbols]
      .map((symbol, index) => ({
        id: index,
        symbol: symbol,
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setCards(gameCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setScore(0);
    setGameState("playing");
  }, [difficulty]);

  // STEP 4: Handle card clicks with sound simulation
  const handleCardClick = (cardId) => {
    if (gameState !== "playing") return;
    if (flippedCards.includes(cardId) || matchedCards.includes(cardId)) return;
    if (flippedCards.length === 2) return;

    // Simulate click sound
    console.log("🔊 Card flip sound");

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);
  };

  // STEP 5: Match detection and scoring
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      const firstCardData = cards.find((card) => card.id === firstCard);
      const secondCardData = cards.find((card) => card.id === secondCard);

      if (firstCardData.symbol === secondCardData.symbol) {
        // Match found!
        console.log("🔊 Match sound");
        setMatchedCards((prev) => [...prev, firstCard, secondCard]);
        setFlippedCards([]);
        setMoves((prev) => prev + 1);

        // Calculate score: base points + time bonus - move penalty
        const basePoints = 100;
        const timeBonus = Math.max(
          0,
          difficultySettings[difficulty].timeBonus - time
        );
        const movePenalty = Math.max(0, (moves - 5) * 10);
        setScore((prev) => prev + basePoints + timeBonus - movePenalty);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
        setMoves((prev) => prev + 1);
      }
    }
  }, [flippedCards, cards, time, moves, difficulty]);

  // STEP 6: Win condition check
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameState("won");
      console.log("🔊 Win sound");

      // Save best score (simulating localStorage)
      if (!bestScores[difficulty] || score > bestScores[difficulty]) {
        const newBestScores = { ...bestScores, [difficulty]: score };
        setBestScores(newBestScores);
        // In real app: localStorage.setItem('memoryGameScores', JSON.stringify(newBestScores));
      }
    }
  }, [matchedCards, cards, score, difficulty, bestScores]);

  // STEP 7: Game controls
  const pauseGame = () => setGameState("paused");
  const resumeGame = () => setGameState("playing");
  const restartGame = () => initializeGame();

  // STEP 8: Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // STEP 9: Render menu screen
  if (gameState === "menu") {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 min-h-screen">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8">
            🧠 Memory Match
          </h1>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Choose Difficulty
            </h2>

            {Object.entries(difficultySettings).map(([key, setting]) => (
              <button
                key={key}
                onClick={() => {
                  setDifficulty(key);
                  initializeGame();
                }}
                className={`
                  w-full p-4 mb-3 rounded-xl font-semibold transition-all duration-300
                  ${
                    difficulty === key
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-md"
                  }
                `}
              >
                {setting.name}
                {bestScores[key] && (
                  <div className="text-sm opacity-75">
                    Best: {bestScores[key]} pts
                  </div>
                )}
              </button>
            ))}

            
          </div>
        </div>
      </div>
    );
  }

  // STEP 10: Render leaderboard
  

  // STEP 11: Main game interface
  const gridCols = difficulty === "easy" ? "grid-cols-4" : "grid-cols-4";

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 min-h-screen">
      {/* Header with controls */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Memory Match
          </h1>

          {/* Stats */}
          <div className="flex items-center gap-6 text-lg">
            <div className="flex items-center gap-2 text-blue-600">
              <Target size={20} />
              <span className="font-semibold">{moves} moves</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <Clock size={20} />
              <span className="font-semibold">{formatTime(time)}</span>
            </div>
            <div className="text-purple-600 font-bold text-xl">
              Score: {score}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {gameState === "playing" && (
              <button
                onClick={pauseGame}
                className="p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-200 hover:scale-105"
              >
                <Pause size={20} />
              </button>
            )}
            {gameState === "paused" && (
              <button
                onClick={resumeGame}
                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 hover:scale-105"
              >
                <Play size={20} />
              </button>
            )}
            <button
              onClick={restartGame}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105"
            >
              <RotateCcw size={20} />
            </button>
            <button
              onClick={() => setGameState("menu")}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200"
            >
              Menu
            </button>
          </div>
        </div>

        {/* Difficulty and best score display */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <span className="text-gray-600">
            Difficulty:{" "}
            <span className="font-semibold text-purple-600">
              {difficultySettings[difficulty].name}
            </span>
          </span>
          {bestScores[difficulty] && (
            <span className="text-gray-600">
              Best Score:{" "}
              <span className="font-semibold text-green-600">
                {bestScores[difficulty]} pts
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Pause overlay */}
      {gameState === "paused" && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Game Paused
            </h2>
            <button
              onClick={resumeGame}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 font-semibold"
            >
              Resume Game
            </button>
          </div>
        </div>
      )}

      {/* Game board */}
      <div className={`grid ${gridCols} gap-3 max-w-lg mx-auto mb-6`}>
        {cards.map((card) => {
          const isFlipped =
            flippedCards.includes(card.id) || matchedCards.includes(card.id);
          const isMatched = matchedCards.includes(card.id);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                aspect-square flex items-center justify-center text-2xl sm:text-3xl font-bold
                rounded-xl cursor-pointer transition-all duration-500 transform
                ${
                  gameState === "playing"
                    ? "hover:scale-110"
                    : "cursor-not-allowed"
                }
                ${
                  isFlipped
                    ? "bg-white border-2 border-blue-300 scale-105 shadow-lg"
                    : "bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 hover:shadow-xl"
                }
                ${
                  isMatched
                    ? "ring-4 ring-green-400 bg-gradient-to-br from-green-200 to-green-300 animate-pulse"
                    : ""
                }
                ${gameState === "paused" ? "opacity-50" : ""}
              `}
              style={{
                transformStyle: "preserve-3d",
                animation: isFlipped ? "flipCard 0.6s ease-in-out" : "",
              }}
            >
              <div
                className={`
                transition-all duration-300
                ${isFlipped ? "opacity-100 scale-100" : "opacity-0 scale-75"}
              `}
              >
                {isFlipped ? card.symbol : ""}
              </div>
              {!isFlipped && <div className="text-white/80 text-xl">?</div>}
            </div>
          );
        })}
      </div>

      {/* Win/Loss messages */}
      {gameState === "won" && (
        <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-2xl p-6 text-center shadow-2xl mb-6 animate-bounce">
          <h2 className="text-3xl font-bold mb-2">🎉 Congratulations!</h2>
          <p className="text-xl mb-2">
            You won in {moves} moves and {formatTime(time)}!
          </p>
          <p className="text-lg mb-4">
            Final Score:{" "}
            <span className="font-bold text-2xl">{score} points</span>
          </p>
          {bestScores[difficulty] && score > bestScores[difficulty] && (
            <p className="text-yellow-200 font-bold animate-pulse">
              🏆 New Best Score!
            </p>
          )}
          <div className="flex gap-4 justify-center mt-4">
            <button
              onClick={restartGame}
              className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold"
            >
              Play Again
            </button>
            <button
              onClick={() => setGameState("menu")}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold"
            >
              Main Menu
            </button>
          </div>
        </div>
      )}

      {/* Game info panel */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-2">How to Play:</h3>
        <div className="grid md:grid-cols-2 gap-4 text-gray-600">
          <div>
            <p>• Click cards to flip them over</p>
            <p>• Find matching pairs of animals</p>
            <p>• Match all pairs to win</p>
          </div>
          <div>
            <p>• Fewer moves = higher score</p>
            <p>• Faster completion = time bonus</p>
            <p>• Use pause button if needed</p>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes flipCard {
          0% {
            transform: rotateY(0deg);
          }
          50% {
            transform: rotateY(90deg);
          }
          100% {
            transform: rotateY(0deg);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 5px rgba(139, 69, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(139, 69, 255, 0.8);
          }
        }

        .card-glow {
          animation: glow 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default MemoryMatchGame;
