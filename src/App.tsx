import React, { useState, useContext } from 'react';
import './App.css';
import { useSocket } from './SocketContext';
import LoginDialog from './components/dialogs/LoginDialog';
import SessionContext from './contexts/SessionContext';
import Dashboard from './views/Dashboard';

const App: React.FC = () => {
  const socket = useSocket();
  const {user, setUser} = useContext(SessionContext);
  const [loginOpen, setLoginOpen] = useState<boolean>(true);
  
  const handleLogin = (username: string, password: string) => {
    socket.emit('login', username, password, (msg) => {
      setLoginOpen(false);
      const response = JSON.parse(msg);
      setUser({
        id: response.dude,
        loggedIn: true,
      })
    });    
  };
  
  return (
    <div className="mainDiv">
      { !user.loggedIn 
        ? <LoginDialog isOpen={loginOpen} onLogin={handleLogin} />
        : <Dashboard />
      }      
    </div>
  );
};
export default App;
