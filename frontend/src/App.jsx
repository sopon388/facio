import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login/Login";

import Register from "./pages/Register/Register";

import Home from "./pages/Home/Home";

import Friends from "./pages/friends/Friends";

import Messages from "./pages/Message/Messages";

import Profile from "./pages/Profile/Profile";

import NotFound from "./pages/NotFound/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";
import ChatPage from "./pages/chat/ChatPage";
import "./App.css";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <Friends />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
  path="/chat/:id"
  element={
    <ProtectedRoute>
      <ChatPage />
    </ProtectedRoute>
  }
/>

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;