import { useSelector } from "react-redux";
import Layout from "./Layout";
import MyRoutes from "./routes/Routes";
import AuthModal from "./components/AuthModal/AuthModal";

import "./App.scss";

function App() {
  const authModal = useSelector((state) => state.authModal.state);

  return (
    <div className="app">
      {authModal ? <AuthModal /> : ""}
      <Layout>
        <MyRoutes />
      </Layout>
    </div>
  );
}

export default App;
