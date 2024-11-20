import { useSelector } from "react-redux";
import Layout from "./Layout";
import MyRoutes from "./routes/Routes";
import AuthModal from "./components/AuthModal/AuthModal";

import "./App.css";

function App() {
  const authModal = useSelector((state) => state.authModal.state);

  return (
    <div className="App">
      {authModal ? <AuthModal /> : ""}
      <Layout>
        <MyRoutes />
      </Layout>
    </div>
  );
}

export default App;
