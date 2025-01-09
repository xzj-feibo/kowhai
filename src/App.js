import React, {Component} from 'react';
import UserList from "./components/UserList";
import Login from "./pages/Login";
import Login3 from "./pages/Login3"
import UserAvatar from "./components/UserAvatar";
class App extends Component {
    render() {
        return (
            // <Login/>
            // <Login3/>
            // <UserAvatar/>
            <UserList/>
        );
    }
}

export default App;