import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import MainLayout from "./pages/MainLayout";
import CategoryHome from "./pages/CategoryHome";
import UserHome from "./pages/UserHome";
import FollowingHome from "./pages/FollowingHome";
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
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Router>
      <SettingsProvider>
        <AuthProvider>
          <CategoriesProvider>
            <ThreadProvider>
              <NavProvider>
                <UserProvider>
                  <Routes>
                    <Route path="/" element={<Navigate to="/category/1" replace />} />
                    <Route path="/category/:categoryId" element={<MainLayout />}>
                      <Route index element={<CategoryHome />} />
                      <Route path="thread/:threadId" element={<Thread />} />
                    </Route>
                    <Route path="/user/:userId" element={<UserThreadLayout />}>
                      <Route index element={<UserHome />} />
                      <Route path="thread/:threadId" element={<Thread />} />
                    </Route>
                    <Route path="/following" element={<FollowingThreadLayout />}>
                      <Route index element={<FollowingHome />} />
                      <Route path="thread/:threadId" element={<Thread />} />
                    </Route>
                    
                    <Route path="/error" element={<ErrorPage />} />

                    <Route
                      path="*"
                      element={
                        <Navigate
                          to="/error"
                          replace
                          state={{
                            title: "Page Not Found",
                            message: "Oops! This page doesn't exist."
                          }}
                        />
                      }
                    />
                  </Routes>
                </UserProvider>
              </NavProvider>
            </ThreadProvider>
          </CategoriesProvider>
        </AuthProvider>
      </SettingsProvider>
    </Router>
  )
}

export default App;
