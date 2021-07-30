import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const TopNavBar: React.FC = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">My App</Navbar.Brand>
          <Nav className="ml-auto">
            <Link to="/users">
              <Nav.Link href="#users">Users</Nav.Link>
            </Link>
            <Link to="/counter">
              <Nav.Link href="#counter">Counter</Nav.Link>
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
