import { Container, Nav, Navbar } from "react-bootstrap";

export const TopNavBar: React.FC = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">שיעורי מכון מאיר</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/rabbifireman">הרב ראובן פיירמן</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
