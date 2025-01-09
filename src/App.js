import React, {Component} from 'react';
import Login from "./pages/Login";
import UserAvatar from "./components/UserAvatar";
import UserList from "./components/UserList";
import UserHome from "./pages/Home";
class App extends Component {
    render() {
        return (
            // <Login/>
            // <UserAvatar/>
            // <UserList/>
            <UserHome/>
        );
    }
}

export default App;