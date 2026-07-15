import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import confetti from 'canvas-confetti';
import { Magic8BallScene } from './components/Magic8BallScene';

const responses = {
  affirmative: [
    "IT IS CERTAIN",
    "IT IS DECIDEDLY SO",
    "WITHOUT A DOUBT",
    "YES DEFINITELY",
    "YOU MAY RELY ON IT",
    "AS I SEE IT, YES",
    "MOST LIKELY",
    "OUTLOOK GOOD",
    "YES",
    "SIGNS POINT TO YES"
  ],
  neutral: [
    "REPLY HAZY, TRY AGAIN",
    "ASK AGAIN LATER",
    "BETTER NOT TELL YOU NOW",
    "CANNOT PREDICT NOW",
    "CONCENTRATE AND ASK AGAIN"
  ],
  negative: [
    "DON'T COUNT ON IT",
    "MY REPLY IS NO",
    "MY SOURCES SAY NO",
    "OUTLOOK NOT SO GOOD",
    "VERY DOUBTFUL"
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

      // Confetti for positive answers
      if (category < 0.45) {
        confetti({ particleCount: 180, spread: 70, origin: { y: 0.6 } });
      }

      setIsScanning(false);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 text-white overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-8 bg-black/90 backdrop-blur-xl">
        <div className="text-4xl font-bold tracking-tighter text-indigo-400">MYSTIC 8</div>
        <a href="#" className="text-sm hover:text-indigo-400 transition-colors">Get the App</a>
      </header>

      <section className="relative h-screen flex flex-col items-center justify-center">
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <h1 className="text-7xl md:text-8xl font-bold tracking-[-3px] mb-6">
            MAGIC 8 BALL
          </h1>
          <p className="text-xl text-zinc-400 mb-12">Ask a yes/no question...<br />then shake the ball</p>

          <button
            onClick={handleScan}
            disabled={isScanning}
            className="px-20 py-8 text-3xl font-semibold bg-white hover:bg-zinc-100 active:bg-zinc-200 text-black rounded-3xl shadow-2xl transition-all disabled:opacity-70"
          >
            {isScanning ? "SHAKING THE BALL..." : "SHAKE THE BALL"}
          </button>

          {result && (
            <div className="mt-20 text-5xl md:text-6xl font-bold text-white tracking-widest leading-tight min-h-[180px] flex items-center justify-center">
              {result}
            </div>
          )}
        </div>

        {/* 3D Magic 8 Ball */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto">
          <div className="w-[560px] h-[560px]">
            <Canvas camera={{ position: [0, 1, 9], fov: 42 }}>
              <Suspense fallback={null}>
                <Magic8BallScene isShaking={isScanning} />
                <ambientLight intensity={0.7} />
                <pointLight position={[6, 8, 6]} intensity={2} color="#c4d0ff" />
                <Environment preset="night" />
                <OrbitControls enablePan={false} enableZoom={true} minDistance={6} maxDistance={14} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </section>

      <footer className="absolute bottom-6 w-full text-center text-xs text-zinc-500">
        Classic Magic 8-Ball • Entertainment Only
      </footer>
    </div>
  );
}

export default App;