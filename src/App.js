import React, {Component} from 'react';
import Login from "./pages/Login";
import UserAvatar from "./components/UserAvatar";
import UserList from "./components/UserList";
class App extends Component {
    render() {
        return (
            // <Login/>
            // <UserAvatar/>
            <UserList/>
        );
    }
}

export default App;