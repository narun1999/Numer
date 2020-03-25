import React, { useState } from 'react';
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

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><font color="black">Home</font></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <font color="blue">Root Of Equation</font>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <a href="/bisection">Bisection</a>
                </DropdownItem>
                <DropdownItem>
                  <a href="/false_position">False_Position</a>
                </DropdownItem>
                <DropdownItem>
                  <a href="/one_point">One_Point</a>
                </DropdownItem>
                <DropdownItem>
                  <a href="/newton_raphson">Newton_Raphson</a>
                </DropdownItem>
                <DropdownItem>
                  <a href="/secant">Secant</a>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <font color="blue">Liner Algebra</font>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <a href="/cramer">Cramer</a>
                </DropdownItem>
                <DropdownItem>
                  <a href="/gauss">Gauss</a>
                </DropdownItem>
                <DropdownItem>
                  <a href="/jordan">Jordan</a>
                </DropdownItem>
                <DropdownItem>
                  <a href="/lu">LU</a>
                </DropdownItem>
                <DropdownItem>
                  <a href="/cholesky">Cholesky</a>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <font color="blue">Interpolation</font>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <a href="/newton">Newton</a>
                </DropdownItem>
                <DropdownItem>
                  <a href="/langrange">Langrange</a>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <font color="blue">Intergration</font>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <a href="/trape">Trapezoidal</a>
                </DropdownItem>
                <DropdownItem>
                  <a href="/comptrape">CompositeTrapezoidal</a>
                </DropdownItem>
                <DropdownItem>
                  <a href="/simpson">Simpson Rule</a>
                </DropdownItem>
                <DropdownItem>
                  <a href="/compsimp">CompositeSimpson Rule</a>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;