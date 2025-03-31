import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import theme, { lightScrollbar, darkScrollbar } from './theme';
import MainLayout from "./pages/MainLayout";
import CategoryHome from "./pages/CategoryHome";
import Thread from "./pages/Thread";
import './App.css';
import { CategoriesProvider } from "./contexts/CategoriesContext";
import { ThreadProvider } from "./contexts/ThreadContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <ThemeProvider theme={theme} defaultMode="system">
      <CssBaseline />
      <GlobalStyles
        styles={(theme) => theme.palette.mode == 'dark' ? darkScrollbar : lightScrollbar}
      />
      <AuthProvider>
        <CategoriesProvider>
          <ThreadProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Navigate to="/category/1" replace />} />
                <Route path="/category/:categoryId" element={<MainLayout />}>
                  <Route index element={<CategoryHome />} />
                  <Route path="thread/:threadId" element={<Thread />} />
                </Route>
              </Routes>
            </Router>
          </ThreadProvider>
        </CategoriesProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App;
