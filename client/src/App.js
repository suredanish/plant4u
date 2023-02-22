import { Route, Routes } from "react-router-dom";
import Header from "./components/header/header";
import MainBody from "./components/main/main-body";
import Blog from "./components/blog/Blog";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainBody />} />
        <Route path="/blog/1" element={<Blog />} />
      </Routes>
    </div>
  );
}

export default App;
