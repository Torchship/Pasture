import React, { useState } from 'react';
import ModalDialog from '../../elements/ModalDialog';

type LoginDialogProps = {
    isOpen?: boolean;
    onLogin?: (username: string, password: string) => void; // callback for login action
    onClose?: () => void;
};

const LoginDialog: React.FC<LoginDialogProps> = ({isOpen = false, onLogin, onClose}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (onLogin) {
            onLogin(username, password);
        }
    };

    return (
        <ModalDialog style={{height: '20em', width: '25em'}} isOpen={isOpen} buttons={['Login']} title="Login" onClose={onClose}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                <div style={{marginBottom: '2em'}}>
                    <label htmlFor="username" style={{marginRight: '1em'}}>Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div>
                    <label htmlFor="password" style={{marginRight: '1em'}}>Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
            </div>
        </ModalDialog>
    );
};

export default LoginDialog;
