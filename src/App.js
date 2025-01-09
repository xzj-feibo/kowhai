import React, {Component} from 'react';
import UserList from "./components/UserList";
import Login from "./pages/Login";
import Login3 from "./pages/Login3"
import UserAvatar from "./components/UserAvatar";
import UserList from "./components/UserList";
import UserHome from "./pages/Home";

class App extends Component {
    render() {
        return (
            // <Login/>
            // <Login3/>
            // <UserAvatar/>
            // <UserList/>
            <UserHome/>
        );
    }
}

export default App;