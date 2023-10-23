import UserBar from './components/UserBar';
import { useSelector, useDispatch } from 'react-redux';
import './styles/app.scss';
import Invoices from './components/Invoices';
import Drawer from './components/Drawer';
import { useEffect } from 'react';
import { updateDimensions } from './redux/screenDimensions';

function App() {
  const lightSwitch = useSelector(state => state.lightSwitch.value);
  const screenDimensions = useSelector(state => state.screenDimensions.value);
  const dispatch = useDispatch();
  useEffect(() => {
    const update = () => dispatch(updateDimensions())
    window.addEventListener('resize', update);
    return(() => {
        window.removeEventListener('resize', update);
    })
  }, [screenDimensions])

  return (
    <div className={`app ${lightSwitch ? "app-bright-mode" : "app-dark-mode"}`}>
      <UserBar />
      <Drawer />
      <div className='main-content-wrapper'>
        <Invoices />
      </div>
    </div>
  );
}

export default App;
