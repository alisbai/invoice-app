import UserBar from "./components/UserBar";
import { useSelector, useDispatch } from "react-redux";
import "./styles/app.scss";
import Drawer from "./components/Drawer";
import { useEffect } from "react";
import { updateDimensions } from "./redux/screenDimensions";
import { Outlet, useLocation } from "react-router-dom";
import Modal from "./components/Modal";
import Popup from "./components/Popup";

function App() {
  const lightSwitch = useSelector((state) => state.lightSwitch.value);
  const screenDimensions = useSelector((state) => state.screenDimensions.value);
  const modal = useSelector((state) => state.modal.value);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const update = () => dispatch(updateDimensions());
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
    };
  }, [screenDimensions]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.title = "Invoice App";
  }, []);

  return (
    <div className={`app ${lightSwitch ? "app-bright-mode" : "app-dark-mode"}`}>
      <Modal>
        <Popup />
      </Modal>
      <Drawer />
      <UserBar />
      <div
        className={`main-content-wrapper ${
          modal ? "main-content-height-for-modal" : ""
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default App;
