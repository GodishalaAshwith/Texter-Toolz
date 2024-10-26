import { useState, useEffect } from "react";
import "./Texter.css";

interface IState {
  text: string;
  lines: string[];
  currentLineIndex: number;
  wordsPerLine: number;
  autoNextSpeed: number;
}

type DisplayMode = "wordToWord" | "newLineSeparated";

const Texter = () => {
  const [state, setState] = useState<IState>({
    text: "",
    lines: [],
    currentLineIndex: 0,
    wordsPerLine: 5,
    autoNextSpeed: 15000,
  });
  const [isAutoNext, setIsAutoNext] = useState(false);
  const [displayMode, setDisplayMode] = useState<DisplayMode>("wordToWord");
  const [popOutWindow, setPopOutWindow] = useState<Window | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
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

  useEffect(() => {
    // Update content in pop-out window when currentLineIndex changes
    if (popOutWindow) {
      popOutWindow.document.body.innerHTML =
        state.lines[state.currentLineIndex] || "No text available";
    }
  }, [state.currentLineIndex, popOutWindow, state.lines]);

  useEffect(() => {
    // Re-split text each time displayMode changes
    splitTextIntoLines(state.text, state.wordsPerLine);
  }, [displayMode]);

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
    const newSpeed = Math.max(parseInt(event.target.value) || 1000, 100);
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
      state.autoNextSpeed + (event.deltaY < 0 ? 1000 : -1000),
      100
    );
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
    );
    setState((prevState) => ({
      ...prevState,
      wordsPerLine: newWordsPerLine,
    }));
    splitTextIntoLines(state.text, newWordsPerLine);
  };

  const splitTextIntoLines = (text: string, wordsPerLine: number) => {
    let newLines: string[];
    if (displayMode === "wordToWord") {
      const words = text.split(/\s+/);
      newLines = [];
      for (let i = 0; i < words.length; i += wordsPerLine) {
        newLines.push(words.slice(i, i + wordsPerLine).join(" "));
      }
    } else {
      newLines = text.split("\n");
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

  const toggleDisplayMode = () => {
    setDisplayMode((prevMode) =>
      prevMode === "wordToWord" ? "newLineSeparated" : "wordToWord"
    );
  };

  const openPopOut = () => {
    if (!popOutWindow || popOutWindow.closed) {
      const newWindow = window.open("", "_blank", "width=800,height=100");
      if (newWindow) {
        newWindow.document.body.innerHTML =
          state.lines[state.currentLineIndex] || "No text available";
        setPopOutWindow(newWindow);
      }
    } else {
      popOutWindow.focus();
    }
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
            type="button"
            aria-label="Next Line"
            onClick={handlePrevious}
            disabled={state.currentLineIndex === 0}
          >
            <i className="bi bi-arrow-left"></i>
          </button>
          <button
            type="button"
            aria-label="Next Line"
            onClick={toggleDisplayMode}
          >
            {displayMode === "wordToWord" ? "Switch to Line" : "Switch to Word"}
          </button>
          <button type="button" aria-label="Next Line" onClick={toggleAutoNext}>
            {isAutoNext ? "Stop Auto Next" : "Auto Next"}
          </button>
          <button type="button" aria-label="Next Line" onClick={openPopOut}>
            <i className="bi bi-box-arrow-up-right"></i>
          </button>
          <button
            type="button"
            aria-label="Next Line"
            onClick={handleNext}
            disabled={state.currentLineIndex === state.lines.length - 1}
          >
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </main>
    </>
  );
};

export default Texter;
