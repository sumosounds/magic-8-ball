import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import confetti from 'canvas-confetti';
import { Magic8BallScene } from './components/Magic8BallScene';

const responses = {
  affirmative: [
    "IT IS CERTAIN", "IT IS DECIDEDLY SO", "WITHOUT A DOUBT", "YES DEFINITELY",
    "YOU MAY RELY ON IT", "AS I SEE IT, YES", "MOST LIKELY", "OUTLOOK GOOD",
    "YES", "SIGNS POINT TO YES"
  ],
  neutral: [
    "REPLY HAZY, TRY AGAIN", "ASK AGAIN LATER", "BETTER NOT TELL YOU NOW",
    "CANNOT PREDICT NOW", "CONCENTRATE AND ASK AGAIN"
  ],
  negative: [
    "DON'T COUNT ON IT", "MY REPLY IS NO", "MY SOURCES SAY NO",
    "OUTLOOK NOT SO GOOD", "VERY DOUBTFUL"
  ]
};

function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setResult(null);

    setTimeout(() => {
      const category = Math.random();
      let answer: string;

      if (category < 0.45) {
        answer = responses.affirmative[Math.floor(Math.random() * responses.affirmative.length)];
      } else if (category < 0.75) {
        answer = responses.neutral[Math.floor(Math.random() * responses.neutral.length)];
      } else {
        answer = responses.negative[Math.floor(Math.random() * responses.negative.length)];
      }

      setResult(answer);

      if (category < 0.45) {
        confetti({ particleCount: 200, spread: 80 });
      }

      setIsScanning(false);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-black text-white overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-8 bg-black/80 backdrop-blur">
        <div className="text-5xl font-bold tracking-tighter text-indigo-300">MYSTIC 8</div>
      </header>

      <section className="relative h-screen flex flex-col items-center justify-center">
        <div className="text-center px-6 max-w-2xl z-20">
          <h1 className="text-7xl md:text-8xl font-bold tracking-tight mb-8">MAGIC 8 BALL</h1>
          <p className="text-2xl text-zinc-400 mb-12">Ask a yes/no question...<br />then shake the ball</p>

          <button
            onClick={handleScan}
            disabled={isScanning}
            className="px-20 py-8 text-3xl font-semibold bg-white text-black rounded-3xl shadow-2xl hover:bg-zinc-100 transition-all disabled:opacity-70 mb-12"
          >
            {isScanning ? "SHAKING..." : "SHAKE THE BALL"}
          </button>

          {result && (
            <div className="text-5xl md:text-6xl font-bold text-white tracking-widest drop-shadow-2xl min-h-[140px]">
              {result}
            </div>
          )}
        </div>

        {/* 3D Ball */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="w-[680px] h-[680px]">
            <Canvas camera={{ position: [0, 1, 8], fov: 45 }}>
              <Suspense fallback={null}>
                <Magic8BallScene isShaking={isScanning} />
                <ambientLight intensity={0.8} />
                <pointLight position={[5, 8, 5]} intensity={2} color="#c4d0ff" />
                <Environment preset="night" />
                <OrbitControls enablePan={false} enableZoom={true} minDistance={5} maxDistance={12} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </section>

      <footer className="absolute bottom-8 w-full text-center text-sm text-zinc-500 z-50">
        Classic Magic 8-Ball • Entertainment Only
      </footer>
    </div>
  );
}

export default App;