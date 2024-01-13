import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red"
};

function App() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("");

  return (
    <div className="sweet-loading">
      <input value={color} onChange={(input) => setColor(input.target.value)} />

      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default App;