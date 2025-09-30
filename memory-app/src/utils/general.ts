export function shuffleNumbers(gridCount: number[]): number[] {
  // Shuffle the numbers array
  for (let i = gridCount.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [gridCount[i], gridCount[j]] = [gridCount[j], gridCount[i]];
  }
  return gridCount;
}
export function genPairs(count: number): number[] {
  const half = Math.floor(count / 2);
  const arr: number[] = [];
  for (let i = 1; i <= half; i++) arr.push(i, i);
  return shuffleNumbers(arr);
}

export function formatTime(s: number): string {
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export function startTimer(
  intervalRef: React.RefObject<number | null>,
  setSeconds: React.Dispatch<React.SetStateAction<number>>
) {
  if (intervalRef.current == null) {
    intervalRef.current = window.setInterval(() => {
      setSeconds((t) => t + 1);
    }, 1000);
  }
}

export function clearTimer(intervalRef: React.RefObject<number | null>) {
  if (intervalRef.current != null) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }
}
