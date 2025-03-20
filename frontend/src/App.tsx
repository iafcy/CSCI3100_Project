import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import MainLayout from "./pages/MainLayout";
import CategoryHome from "./pages/CategoryHome";
import Thread from "./pages/Thread";
import './App.css'

function App() {
  return (
    <ThemeProvider theme={theme} defaultMode="dark">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/category/1" replace />} />
          <Route path="/category/:categoryId" element={<MainLayout />}>
            <Route index element={<CategoryHome />} />
            <Route path="thread/:threadId" element={<Thread />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App;
