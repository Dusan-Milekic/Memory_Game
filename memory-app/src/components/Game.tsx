import { createRef, useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import {
  genPairs,
  formatTime,
  useTimer,
  clearTimer,
  genPairsIcons,
} from "../utils/general";

export default function Game() {
  const settings = useAppSelector((state) => state.settings);

  const gridCount = useMemo(() => {
    const g = Number(settings.gridSize) || 4;
    return g * g;
  }, [settings.gridSize]);

  const [numbersOfGrid, setNumbersOfGrid] = useState<number[]>([]);
  const [iconsOfGrid, setIconsOfGrid] = useState<string[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [matchedIcons, setMatchedIcons] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState<number>(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const refMenu = createRef<HTMLDivElement>();
  const refGameSection = createRef<HTMLDivElement>();
  const refReview = createRef<HTMLDivElement>();
  const navigate = useNavigate();

  // Timer start/stop
  useTimer(intervalRef, setSeconds, isRunning);

  // Stop timer if all cards are matched
  useEffect(() => {
    if (
      (settings.theme === "numbers" && matched.size === numbersOfGrid.length) ||
      (settings.theme === "icons" && matchedIcons.size === iconsOfGrid.length)
    ) {
      clearTimer(intervalRef);
    }
  }, [
    matched,
    matchedIcons,
    numbersOfGrid.length,
    iconsOfGrid.length,
    settings.theme,
  ]);

  // Reset game on theme or grid size change
  useEffect(() => {
    if (settings.theme === "numbers") {
      setNumbersOfGrid(genPairs(gridCount));
      setSelected([]);
      setMatched(new Set());
    } else {
      setIconsOfGrid(genPairsIcons(gridCount));
      setSelectedIcon([]);
      setMatchedIcons(new Set());
    }
    setSeconds(0);
    setIsRunning(false);
    setMoves(0);
  }, [settings.theme, gridCount]);

  // --- CLICK LOGIC ---
  function handleClick(i: number) {
    const isNumbersTheme = settings.theme === "numbers";
    const iStr = i.toString();

    // Prevent clicking already matched or selected cards
    const isAlreadySelected = isNumbersTheme
      ? selected.includes(i) || matched.has(i)
      : selectedIcon.includes(iStr) || matchedIcons.has(iStr);
    if (isAlreadySelected) return;

    if (!isRunning) setIsRunning(true);

    // --- Numbers Theme Logic ---
    if (isNumbersTheme) {
      if (selected.length === 0) {
        setSelected([i]);
        return;
      }
      if (selected.length === 1) {
        const firstIndex = selected[0];
        const secondIndex = i;
        setSelected([firstIndex, secondIndex]);
        setMoves(moves + 1);

        const isMatch =
          numbersOfGrid[firstIndex] === numbersOfGrid[secondIndex];
        setTimeout(
          () => {
            if (isMatch) {
              setMatched((prev) => new Set([...prev, firstIndex, secondIndex]));
            }
            setSelected([]);
          },
          isMatch ? 300 : 700
        );
      }
      return;
    }

    // --- Icons Theme Logic ---
    if (selectedIcon.length === 0) {
      setSelectedIcon([iStr]);
      return;
    }
    if (selectedIcon.length === 1) {
      const firstIndex = selectedIcon[0];
      const secondIndex = iStr;
      setSelectedIcon([firstIndex, secondIndex]);
      setMoves(moves + 1);

      const isMatch =
        iconsOfGrid[parseInt(firstIndex)] ===
        iconsOfGrid[parseInt(secondIndex)];
      setTimeout(
        () => {
          if (isMatch) {
            setMatchedIcons(
              (prev) => new Set([...prev, firstIndex, secondIndex])
            );
          }
          setSelectedIcon([]);
        },
        isMatch ? 300 : 700
      );
    }
  }

  return (
    <>
      <div className="game-section w-[450px] mx-auto" ref={refGameSection}>
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
                  if (intervalRef.current) clearTimer(intervalRef);
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
            className={`game grid  ${
              Number(settings.gridSize) === 4 ? "grid-cols-4" : "grid-cols-6"
            } place-items-center gap-3 px-8 py-40`}
          >
            {Array.from({ length: gridCount }).map((_, i) => {
              const isOpen =
                settings.theme === "numbers"
                  ? selected.includes(i) || matched.has(i)
                  : selectedIcon.includes(i.toString()) ||
                    matchedIcons.has(i.toString());
              const cellValue =
                settings.theme === "numbers"
                  ? numbersOfGrid[i]
                  : iconsOfGrid[i];
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
                  <p className="pb-2">{isOpen ? cellValue : ""}</p>
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
              <p className="text-2xl text-blue-800">{moves}</p>
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
            if (settings.theme === "numbers") {
              setNumbersOfGrid(genPairs(gridCount));
              setSelected([]);
              setMatched(new Set());
            } else {
              setIconsOfGrid(genPairsIcons(gridCount));
              setSelectedIcon([]);
              setMatchedIcons(new Set());
            }
            setSeconds(0);
            setIsRunning(false);
            refGameSection.current?.classList.remove("opacity-50");
            refMenu.current?.classList.add("hidden");
            refGameSection.current?.classList.remove("pointer-events-none");
            clearTimer(intervalRef);
            setMoves(0);
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

      {/* Display game review */}
      <div
        className="bg-gray-50 rounded-2xl px-5 w-80 py-4 absolute left-1/2 -translate-x-1/2 -translate-y-11/12 bottom-10 text-center shadow hidden"
        ref={refReview}
      >
        <h2 className="text-lg font-bold text-black">Game Review</h2>
        <p className="text-black">Lorem ipsum, dolor sit</p>
        <div className="py-2.5 bg-blue-100 rounded-xl mt-2 mb-4 flex justify-between px-4">
          <p className="text-blue-400">Time Elapsed</p>
          <p className="text-blue-800">{formatTime(seconds)}</p>
        </div>
        <div className="py-2.5 bg-blue-100 rounded-xl flex justify-between px-4">
          <p className="text-blue-400">Moves taken</p>
          <p className="text-blue-800">{moves}</p>
        </div>
        <button
          className="cursor-pointer bg-orange-400 text-white font-bold w-full pb-3 pt-2 rounded-3xl mt-5"
          onClick={() => {
            if (settings.theme === "numbers") {
              setNumbersOfGrid(genPairs(gridCount));
              setSelected([]);
              setMatched(new Set());
            } else {
              setIconsOfGrid(genPairsIcons(gridCount));
              setSelectedIcon([]);
              setMatchedIcons(new Set());
            }
            setSeconds(0);
            setIsRunning(false);
            refGameSection.current?.classList.remove("opacity-50");
            refReview.current?.classList.add("hidden");
            refGameSection.current?.classList.remove("pointer-events-none");
            setMoves(0);
            clearTimer(intervalRef);
          }}
        >
          Restart
        </button>
        <button
          className="cursor-pointer bg-blue-100 text-blue-800 font-bold w-full pb-3 pt-2 rounded-3xl mt-3"
          onClick={() => {
            navigate("/");
          }}
        >
          New Game
        </button>
      </div>
    </>
  );
}
