import { createContext, FlowProps, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

type DrawingContextValue = {
  canvasSize: { width: number; height: number };
  /** Updates the canvas size with optionality (update only what you need to change). */
  setCanvasSize: (size: { width?: number; height?: number }) => void;
};

const DrawingContext = createContext({
  canvasSize: { width: 600, height: 300 },
  setCanvasSize: () => {},
} as DrawingContextValue);

export const useDrawingContext = () => useContext(DrawingContext);

export const DrawingContextProvider = (props: FlowProps) => {
  const [canvasSize, _setCanvasSize] = createStore({ width: 600, height: 300 });

  function setCanvasSize(size: { width?: number; height?: number }) {
    if (size.width) _setCanvasSize('width', size.width);
    if (size.height) _setCanvasSize('height', size.height);
  }

  return (
    <DrawingContext.Provider
      value={{
        canvasSize,
        setCanvasSize,
      }}
    >
      {props.children}
    </DrawingContext.Provider>
  );
};
