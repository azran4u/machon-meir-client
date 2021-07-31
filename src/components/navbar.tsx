import { Container, Nav, Navbar } from "react-bootstrap";

export const TopNavBar: React.FC = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">My App</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/users">Users</Nav.Link>
            <Nav.Link href="/counter">Counter</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
