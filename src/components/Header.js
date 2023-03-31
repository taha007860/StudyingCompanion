import React from 'react';
import '../styles/Header.css';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import Cookies from 'js-cookie';

function Header() {
    return (
            <header className='d-flex flex-row'>
                    <div>
                        <Link className='logoStyle' to='/Timer'>
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
                        <Link to='/Login'>
                            <Button class='btn-lg' variant='secondary' onClick={Cookies.set('login', false)}>
                                Logout ←
                            </Button>
                        </Link>
                    </div>
            </header>
    );
}

export default Header;