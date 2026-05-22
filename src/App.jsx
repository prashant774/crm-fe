import { useSelector } from "react-redux";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import AskAI from "./components/askAI/AskAI";

export default function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) return <Login />;

  return (
    <>
      <Dashboard />
      <AskAI />
    </>
  );
}
