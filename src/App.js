
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';import WidgetPage from "./pages/WidgetPage";
import WidgetEditPage from "./pages/WidgetEditPage";

import './css/main.css';
import './css/common.css';
import './css/widget.css';
import Header from "./component/layout/Header";


function App() {
  return (
    <>
      <Header></Header>

      <Routes>
        <Route path="/" element={<WidgetPage />} />
        <Route path="/edit" element={<WidgetEditPage />} />
      </Routes>
    </>
  )
}
export default App;