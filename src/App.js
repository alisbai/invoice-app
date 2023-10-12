import UserBar from './components/UserBar';
import { useSelector } from 'react-redux';
import './styles/app.scss';
import Invoices from './components/Invoices';
function App() {
  const lightSwitch = useSelector(state => state.lightSwitch.value);
  return (
    <div className={`app ${lightSwitch ? "app-bright-mode" : "app-dark-mode"}`}>
      <UserBar />
      <div className='main-content-wrapper'>
      <Invoices />
      </div>
    </div>
  );
}

export default App;
