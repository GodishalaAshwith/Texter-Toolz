import { useState, useEffect } from "react";
import "./Texter.css";

interface IState {
  text: string;
  lines: string[];
  currentLineIndex: number;
  wordsPerLine: number;
  autoNextSpeed: number;
}

const Texter = () => {
  const [state, setState] = useState<IState>({
    text: "",
    lines: [],
    currentLineIndex: 0,
    wordsPerLine: 5, // Default value
    autoNextSpeed: 5000, // Default speed in milliseconds
  });
  const [isAutoNext, setIsAutoNext] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null; // Updated type for interval
    if (isAutoNext) {
      interval = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          currentLineIndex: Math.min(
            prevState.currentLineIndex + 1,
            prevState.lines.length - 1
          ),
        }));
      }, state.autoNextSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoNext, state.autoNextSpeed, state.lines.length]);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const newText = event.target.value;
    splitTextIntoLines(newText, state.wordsPerLine);
  };

  const handleWordsPerLineChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newWordsPerLine = Math.max(parseInt(event.target.value) || 1, 1);
    setState((prevState) => ({
      ...prevState,
      wordsPerLine: newWordsPerLine,
    }));
    splitTextIntoLines(state.text, newWordsPerLine);
  };

  const handleAutoNextSpeedChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newSpeed = Math.max(parseInt(event.target.value) || 1000, 100); // Ensure minimum speed is 100
    setState((prevState) => ({
      ...prevState,
      autoNextSpeed: newSpeed,
    }));
  };

  const handleAutoNextSpeedWheel = (
    event: React.WheelEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    const newSpeed = Math.max(
      state.autoNextSpeed + (event.deltaY < 0 ? 100 : -100),
      100
    ); // Ensure a minimum speed of 100
    setState((prevState) => ({
      ...prevState,
      autoNextSpeed: newSpeed,
    }));
  };

  const handleWordsPerLineWheel = (
    event: React.WheelEvent<HTMLInputElement>
  ): void => {
    event.preventDefault();
    const newWordsPerLine = Math.max(
      state.wordsPerLine + (event.deltaY < 0 ? 1 : -1),
      1
    ); // Minimum of 1 word per line
    setState((prevState) => ({
      ...prevState,
      wordsPerLine: newWordsPerLine,
    }));
    splitTextIntoLines(state.text, newWordsPerLine);
  };

  const splitTextIntoLines = (text: string, wordsPerLine: number) => {
    const words = text.split(/\s+/);
    const newLines: string[] = []; // Explicitly typed as string array
    for (let i = 0; i < words.length; i += wordsPerLine) {
      newLines.push(words.slice(i, i + wordsPerLine).join(" "));
    }
    setState((prevState) => ({
      ...prevState,
      text,
      lines: newLines,
      currentLineIndex: 0,
    }));
  };

  const handleNext = (): void => {
    setState((prevState) => ({
      ...prevState,
      currentLineIndex: Math.min(
        prevState.currentLineIndex + 1,
        prevState.lines.length - 1
      ),
    }));
  };

  const handlePrevious = (): void => {
    setState((prevState) => ({
      ...prevState,
      currentLineIndex: Math.max(prevState.currentLineIndex - 1, 0),
    }));
  };

  const toggleAutoNext = (): void => {
    setIsAutoNext((prevState) => !prevState);
  };

  return (
    <>
      <header>
        <h1>Texter Tool</h1>
      </header>
      <main>
        <div className="input-field">
          <form>
            <label htmlFor="message">Enter your text:</label>
            <textarea
              id="message"
              name="message"
              value={state.text}
              onChange={handleChange}
              rows={10}
              cols={50}
            />
          </form>
        </div>

        <div className="settings">
          <label htmlFor="wordsPerLine">Words per line:</label>
          <input
            type="number"
            id="wordsPerLine"
            name="wordsPerLine"
            value={state.wordsPerLine}
            onChange={handleWordsPerLineChange}
            onWheel={handleWordsPerLineWheel}
            min="1"
          />
          <label htmlFor="autoNextSpeed">Auto Next Speed (ms):</label>
          <input
            type="number"
            id="autoNextSpeed"
            name="autoNextSpeed"
            value={state.autoNextSpeed}
            onChange={handleAutoNextSpeedChange}
            onWheel={handleAutoNextSpeedWheel}
            min="100"
          />
        </div>

        <div className="output">
          {state.lines[state.currentLineIndex] || "No text available"}
        </div>

        <div className="navigation-buttons">
          <button
            onClick={handlePrevious}
            disabled={state.currentLineIndex === 0}
          >
            Previous
          </button>
          <button onClick={toggleAutoNext}>
            {isAutoNext ? "Stop Auto Next" : "Auto Next"}
          </button>
          <button
            onClick={handleNext}
            disabled={state.currentLineIndex === state.lines.length - 1}
          >
            Next
          </button>
        </div>
      </main>
    </>
  );
};

export default Texter;
