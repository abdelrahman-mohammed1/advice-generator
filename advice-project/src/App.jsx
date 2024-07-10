import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("");
  const [num, setNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchAdvice() {
      try {
        setLoading(true);
        const res = await fetch('https://api.adviceslip.com/advice');
        const data = await res.json();
        const { advice: fetchedAdvice } = data.slip;
        setAdvice(fetchedAdvice);
      } catch (error) {
        console.error("Error fetching advice:", error);
        setAdvice("Failed to fetch advice. Please try again.");
      }
      finally {
        setLoading(false);
      }
    }

    fetchAdvice();
  }, [num]);

  return (
    <div className="app">
      <div className="cart">
        <h1 className="heading">{advice}</h1>
        <button disabled={loading} className="button" onClick={() => setNumber(num => num + 1)}>
          <span>{loading ? 'loading...' : "GIVE ME ADVICE!"}</span>
        </button>
      </div>
    </div>
  );
}
