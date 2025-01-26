// import { useState } from 'react'
import s from "./App.module.css";

import Header from "./components/Header/Header";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className={s.flexContainer}>
      <Header />
    </div>
  );
}

export default App;
