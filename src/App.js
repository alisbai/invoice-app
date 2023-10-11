import UserBar from './components/UserBar';
import { useSelector } from 'react-redux';
import './styles/app.scss';
function App() {
  const lightSwitch = useSelector(state => state.lightSwitch.value);
  return (
    <div className={`app ${lightSwitch ? "app-bright-mode" : "app-dark-mode"}`}>
      <UserBar />
    </div>
  );
}

export default App;
