import React from 'react';
import { Nav, Navbar, NavItem} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const TopNav = (props) => {
  return (
    <div>
      <Navbar inverse collapseOnSelect>
        <nav class="navbar navbar-dark bg-primary">
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/">
            <a href="/"> Top Secret Professor Comments </a>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to="/professors">
          <NavItem eventKey={2}>
            Professors
          </NavItem>
        </LinkContainer>
    </Nav>
  </Navbar.Collapse>
</nav>
</Navbar>
</div>
);
}
export default TopNav;
