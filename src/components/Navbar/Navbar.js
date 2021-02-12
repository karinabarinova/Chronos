import React, {useState, useEffect} from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Button } from '../../globalStyles';
import { 
    Nav, 
    NavbarContainer, 
    NavLogo, 
    NavIcon, 
    MobileIcon,
    NavMenu,
    NavItem,
    NavLink,
    NavItemBtn,
    NavBtnLink,
    NavBtnContainer
} from './Navbar.elements';

const Navbar = ({isAuthenticated}) => {
    const [click, setClick] = useState(false)
    const [button, setButton] = useState(true)

    const handleClick = () => setClick(!click)

    const closeMobileMenu = () => setClick(false)

    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    }

    useEffect(() => {
        showButton()
    }, [])
    window.addEventListener('resize', showButton)
    return (
        <>
            <IconContext.Provider value={{color: '#fff'}}>
                <Nav>
                    <NavbarContainer>
                        <NavLogo to="/" onClick={closeMobileMenu}>
                            <NavIcon />
                            chronos
                        </NavLogo>
                        <MobileIcon onClick={handleClick}>
                            {click ? <FaTimes /> : <FaBars />}
                        </MobileIcon>
                        <NavMenu onClick={handleClick} click={click}>
                            <NavItem>
                                <NavLink to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/services">Services</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/products">Products</NavLink>
                            </NavItem>
                            {isAuthenticated ? (
                                <>
                            <NavItem>
                            <NavLink to="/logout">Log out</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/account">Account</NavLink>
                            </NavItem></>) : (
                            <NavItemBtn>
                                {button ? (
                                    <NavBtnContainer>
                                        <NavBtnLink to="/sign-up">
                                            <Button>SIGN UP</Button>
                                        </NavBtnLink>
                                        <NavBtnLink to="/sign-in">
                                            <Button>SIGN IN</Button>
                                        </NavBtnLink>
                                    </NavBtnContainer>
                                ) : (
                                    <NavBtnContainer>
                                        <NavBtnLink to="/sign-up">
                                            <Button fontBig primary>SIGN UP</Button>
                                        </NavBtnLink>
                                        <NavBtnLink to="/sign-in">
                                            <Button fontBig primary>SIGN IN</Button>
                                        </NavBtnLink>
                                    </NavBtnContainer>
                                )}
                            </NavItemBtn>
                            )}
                            
                        </NavMenu>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar
