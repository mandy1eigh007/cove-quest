import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.location.href = "/hub.html";
  }, []);

  return null;
}

export default App;
