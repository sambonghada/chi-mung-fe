import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import WordPage from "./pages/WordPage.jsx";
import ParagraphPage from "./pages/ParagraphPage.jsx";
import DictationPage from "./pages/DictationPage.jsx";
import RankingPage from "./pages/RankingPage.jsx";


function App() {
    return (
        <BrowserRouter>
            <div className='container'>
                <Routes>

                    <Route path="/" element={<LandingPage/>}></Route>
                    <Route path="/main" element={<MainPage/>}></Route>
                    <Route path="/word" element={<WordPage/>}></Route>
                    <Route path="/paragraph" element={<ParagraphPage/>}></Route>
                    <Route path="/dictation" element={<DictationPage/>}></Route>
                    <Route path="/ranking" element={<RankingPage/>}></Route>

        </Routes>
            </div>
</BrowserRouter>
)
}

export default App
