import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.location.href = "/map.html";
  }, []);

  return null;
}

export default App;
