import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import WordPage from "./pages/WordPage.jsx";
import ParagraphPage from "./pages/ParagraphPage.jsx";
import DictationPage from "./pages/DictationPage.jsx";
import RankingPage from "./pages/RankingPage.jsx";
import WordOverPage from "./pages/WordOverPage.jsx";
import ParagraphOverPage from "./pages/ParagraphOverPage.jsx";
import { GameProvider } from './components/GameContext.jsx';
import ParagraphListPage from "./pages/ParagraphListPage.jsx";
import VoiceTranslatePage from './pages/VoiceTranslatePage.jsx';


function App() {
    return (
        <GameProvider>
        <BrowserRouter>
            <div className='container'>
                <Routes>
                    <Route path="/" element={<LandingPage/>}></Route>
                    <Route path="/main" element={<MainPage/>}></Route>
                    <Route path="/word" element={<WordPage/>}></Route>
                    <Route path="/word/over" element={<WordOverPage/>}></Route>
                    <Route path="/paragraphList" element={<ParagraphListPage/>}></Route>
                    <Route path="/paragraph/:id" element={<ParagraphPage/>}></Route>
                    <Route path="/paragraph/over" element={<ParagraphOverPage/>}></Route>
                    <Route path="/dictation" element={<DictationPage/>}></Route>
                    <Route path="/ranking" element={<RankingPage/>}></Route>
                    <Route path="/voice" element={<VoiceTranslatePage/>}></Route>

        </Routes>
            </div>
</BrowserRouter>
</GameProvider>
)
}

export default App
