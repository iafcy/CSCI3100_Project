import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import CategoryHome from "./pages/CategoryHome";
import Thread from "./pages/Thread";
import './App.css';
import { CategoriesProvider } from "./contexts/CategoriesContext";
import { ThreadProvider } from "./contexts/ThreadContext";
import { AuthProvider } from "./contexts/AuthContext";
import { NavProvider } from "./contexts/NavContext";
import { UserProvider } from "./contexts/UserContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import UserThreadLayout from "./pages/UserThreadLayout";
import FollowingThreadLayout from "./pages/FollowingThreadLayout";

function App() {
  return (
    <SettingsProvider>
      <AuthProvider>
        <CategoriesProvider>
          <ThreadProvider>
            <NavProvider>
              <UserProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<Navigate to="/category/1" replace />} />
                    <Route path="/category/:categoryId" element={<MainLayout />}>
                      <Route index element={<CategoryHome />} />
                      <Route path="thread/:threadId" element={<Thread />} />
                    </Route>
                    <Route path="/user/:userId" element={<UserThreadLayout />}>
                      <Route path="thread/:threadId" element={<Thread />} />
                    </Route>
                    <Route path="/following" element={<FollowingThreadLayout />}>
                      <Route path="thread/:threadId" element={<Thread />} />
                    </Route>
                  </Routes>
                </Router>
              </UserProvider>
            </NavProvider>
          </ThreadProvider>
        </CategoriesProvider>
      </AuthProvider>
    </SettingsProvider>
  )
}

export default App;
