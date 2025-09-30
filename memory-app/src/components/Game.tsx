import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { genPairs, formatTime, clearTimer, startTimer } from "../utils/general";
export default function Game() {
  const settings = useAppSelector((state) => state.settings);

  const gridCount = useMemo(() => {
    const g = Number(settings.gridSize) || 4;
    return g * g;
  }, [settings.gridSize]);

  const [numbersOfGrid, setNumbersOfGrid] = useState<number[]>([]);
  const [selected, setSelected] = useState<number[]>([]); // trenutno otvorene (max 2)
  const [matched, setMatched] = useState<Set<number>>(new Set()); // trajno rešene
  const [moves, setMoves] = useState<number>(0);
  // --- TIMER ---
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const refMenu = createRef<HTMLDivElement>();
  const refGameSection = createRef<HTMLDivElement>();

  const navigate = useNavigate();

  //Timer start/stop
  useEffect(() => {
    if (isRunning) startTimer(intervalRef, setSeconds);

    return () => clearTimer(intervalRef);
  }, [isRunning]);

  // Stop timer if all cards are matched
  useEffect(() => {
    if (matched.size === numbersOfGrid.length) setIsRunning(false);
  }, [matched, numbersOfGrid.length]);

  // reset game on grid size change
  useEffect(() => {
    setNumbersOfGrid(genPairs(gridCount));
    setSelected([]);
    setMatched(new Set());
    setSeconds(0);
    setIsRunning(false);
  }, [gridCount]);

  // --- KLIK LOGIKA ---
  function handleClick(i: number) {
    if (selected.includes(i) || matched.has(i)) return;

    // start tajmera na prvi klik u rundi
    if (!isRunning) setIsRunning(true);

    if (selected.length === 0) setSelected([i]);
    else if (selected.length === 1) {
      const first = selected[0];
      const second = i;
      setSelected([first, second]);
      setMoves(moves + 1);
      if (numbersOfGrid[first] === numbersOfGrid[second]) {
        // if matched -> stays open
        setTimeout(() => {
          setMatched((prev) => new Set([...prev, first, second]));
          setSelected([]);
        }, 300);
      } else {
        // close after a short time
        setTimeout(() => setSelected([]), 700);
      }
    } else {
      setSelected([i]);
    }
  }

  return (
    <>
      <div className="game-section" ref={refGameSection}>
        <header className="flex w-full justify-between px-8 pt-10">
          <div className="title text-blue-950 font-bold">
            <h1 className="text-2xl">memory</h1>
          </div>
          <div className="menu relative">
            <button
              className="cursor-pointer bg-orange-400 px-4 pb-2 pt-1 rounded-2xl"
              onClick={() => {
                if (refMenu && refGameSection) {
                  refMenu.current?.classList.remove("hidden");
                  refGameSection.current?.classList.add("opacity-50");
                  refGameSection.current?.classList.add("pointer-events-none");
                  if (intervalRef.current) clearInterval(intervalRef.current);
                }
              }}
            >
              Menu
            </button>
          </div>
        </header>

        {/* GAME */}
        <main>
          <div
            className={`game grid ${
              Number(settings.gridSize) === 4 ? "grid-cols-4" : "grid-cols-6"
            } place-items-center gap-3 px-8 py-40`}
          >
            {Array.from({ length: gridCount }).map((_, i) => {
              const isOpen = selected.includes(i) || matched.has(i);
              return (
                <div
                  key={i}
                  onClick={() => handleClick(i)}
                  className={`rounded-full ${
                    Number(settings.gridSize) === 4
                      ? "w-20 h-20 text-4xl"
                      : "w-12 h-12 text-2xl"
                  } flex justify-center items-center cursor-pointer transition
                   ${isOpen ? "bg-blue-500" : "bg-blue-800"}`}
                >
                  <p className="pb-2">{isOpen ? numbersOfGrid[i] : ""}</p>
                </div>
              );
            })}
          </div>
        </main>

        <footer>
          <div className="info flex justify-around px-8 gap-6 font-bold">
            <div className="time bg-blue-100 w-40 py-2 text-center rounded-xl">
              <p className="text-blue-400">Time</p>
              <p className="text-2xl text-blue-800">{formatTime(seconds)}</p>
            </div>
            <div className="moves bg-blue-100 w-40 py-2 text-center rounded-xl">
              <p className="text-blue-400">Moves</p>
              <p className="text-2xl text-blue-800">
                {/* svaki pokušaj = 2 klika */}
                {moves}
              </p>
            </div>
          </div>
        </footer>
      </div>

      <div
        className="options w-80 absolute px-10 bg-gray-50 flex flex-col gap-3 shadow rounded-xl py-5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-11/12  hidden"
        ref={refMenu}
      >
        <button
          className="cursor-pointer bg-orange-400 text-white font-bold w-full pb-3 pt-2 rounded-3xl"
          onClick={() => {
            // Restart
            setNumbersOfGrid(genPairs(gridCount));
            setSelected([]);
            setMatched(new Set());
            setSeconds(0);
            setIsRunning(false);
          }}
        >
          Restart
        </button>
        <button
          className="cursor-pointer bg-blue-100 text-blue-800 font-bold w-full pb-3 pt-2 rounded-3xl"
          onClick={() => {
            navigate("/");
          }}
        >
          New Game
        </button>
        <button
          className="cursor-pointer  bg-blue-100 text-blue-800 font-bold w-full pb-3 pt-2 rounded-3xl"
          onClick={() => {
            refGameSection.current?.classList.remove("opacity-50");
            refMenu.current?.classList.add("hidden");
            refGameSection.current?.classList.remove("pointer-events-none");
            intervalRef.current = window.setInterval(() => {
              setSeconds((t) => t + 1);
            }, 1000);
          }}
        >
          Resume Game
        </button>
      </div>
    </>
  );
}
