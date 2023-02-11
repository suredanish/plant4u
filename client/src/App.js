import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/header/header";
import MainBody from './components/main/main-body'
function App() {
  return (
    <div>
        <Header />
        <MainBody />
    </div>
)
}

export default App;
