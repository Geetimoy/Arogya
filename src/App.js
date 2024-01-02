import './App.css';
import AlertState from './context/alert/AlertState';
import LoginState from './context/login/LoginState';
import Core from './components/Core';


function App() {
  return (
    <LoginState>
      <AlertState>
        <Core/>
      </AlertState>
    </LoginState>
  );
}

export default App;
