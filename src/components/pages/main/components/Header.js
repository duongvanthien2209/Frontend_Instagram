import React, { useContext, useState, useEffect } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import { UserContext } from '../../../contexts/UserContext';


export default function Header(props) {
    let { user } = useContext(UserContext);

    if (!user) {
        return (<div></div>);
    } else {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    {/* <NavbarBrand href="/">

                    </NavbarBrand> */}
                    <Link to="/" className="navbar-brand">Instagram</Link>
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                { user.name }
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link to={`/person/${user._id}`}>Trang cá nhân</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    Cài đặt
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Đăng xuất
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}