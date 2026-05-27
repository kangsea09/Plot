import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import HistoryPage from "./pages/HistoryPage";
import RankingPage from "./pages/RankingPage";
import AiGuidePage from "./pages/AiGuidePage";

const App = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/history" element={<HistoryPage />} />
    <Route path="/ranking" element={<RankingPage />} />
    <Route path="/ai-guide" element={<AiGuidePage />} />
  </Routes>
);

export default App;
