import './styles/App.scss';
import TextField from './components/inputs/TextField';
import Label from './components/inputs/Label';
function App() {
  return (
    <div className="App">
      <Label content="this is a label" />
      <TextField />
    </div>
  );
}

export default App;
