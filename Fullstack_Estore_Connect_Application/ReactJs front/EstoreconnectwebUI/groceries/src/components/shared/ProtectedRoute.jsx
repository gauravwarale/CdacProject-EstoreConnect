import Login from "../Login/Login";

function ProtectedRoute(props){

    var loggedin = window.sessionStorage.getItem("isUserLoggedIn");

    if(loggedin === "true"){
        return (props.element)
    }
    else{
        return (<Login></Login>)
    }
}

export default ProtectedRoute;