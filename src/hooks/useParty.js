import { createContext, useContext, useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useDimensions } from "./useDimensions";

const ConfettiContext = createContext();

export function useParty() {
  return useContext(ConfettiContext);
}
export function ConfettiProvider({ children }) {
  const [recycle, setRecycle] = useState(false);
  const [run, setRun] = useState(false);

  const { clientWidth, clientHeight } = useDimensions();

  const startParty = () => {
    setRun(true);
    setRecycle(true);
    setTimeout(() => setRecycle(false), 800);
    setTimeout(() => setRun(false), 8000);
  };

  window.startParty = startParty;

  return (
    <ConfettiContext.Provider value={startParty}>
      <Confetti
        width={clientWidth}
        height={clientHeight}
        numberOfPieces={200}
        run={run}
        recycle={recycle}
        gravity={0.1}
      />
      {children}
    </ConfettiContext.Provider>
  );
}
