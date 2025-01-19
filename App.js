import React, { useState } from 'react';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import TaskList from './components/Todo/TaskList';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div>
            {!isAuthenticated ? (
                <>
                    <Login setIsAuthenticated={setIsAuthenticated} />
                    <Signup />
                </>
            ) : (
                <TaskList setIsAuthenticated={setIsAuthenticated} />
            )}
        </div>
    );
};

export default App;
