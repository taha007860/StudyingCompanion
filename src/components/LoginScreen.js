import {Button} from "react-bootstrap";

import '../styles/App.css';
import {useState} from "react";

const LoginScreen = () => {
    const [token, SetToken] = useState(undefined);


    return (
        <div className"flex-wrap-reverse">
            <text className='text-center'>Welcome!</text>
            <Button className='btn-lg'>
                Test
            </Button>
        </div>
    );
}

export default LoginScreen;