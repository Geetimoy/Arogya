import './App.css';
import AlertState from './context/alert/AlertState';
import LoginState from './context/login/LoginState';
import SystemState from './context/system/SystemState';
import Core from './components/Core';

function App() {
  return (
    <SystemState>
      <LoginState>
        <AlertState>
          <Core/>
        </AlertState>
      </LoginState>
    </SystemState>
    
  );
}

export default App;
