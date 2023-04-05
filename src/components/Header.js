import React from 'react';
import '../styles/Header.css';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import {auth} from '../config/firebase';
import {signOut} from 'firebase/auth';

function Header() {
    return (
        <header className='d-flex flex-row'>
            <div>
                <Link className='logoStyle' to='/Home'>
                    <p>Studying Companion </p>
                </Link>
            </div>
            <div className='justify-content-center mx-0'>

                <Link to='/Timer'>
                    <Button class='btn-lg'>
                        Timer
                    </Button>
                    <Link to='/TaskList'>
                        <Button class='btn-lg'>
                            Task List
                        </Button>
                    </Link>
                </Link>
            </div>
            <div>
                <Link to='/auth'>
                    <Button class='btn-lg' variant='secondary' onClick={ (e) => {
                        signOut(auth).then(r => console.log("Signed out successfully."));
                    }}>
                        Logout ←
                    </Button>
                </Link>
            </div>
        </header>
    );
}

export default Header;