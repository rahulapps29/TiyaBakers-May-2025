import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer-bakery mt-5'>
      <Container className='py-4'>
        <Row>
          <Col md={4} className='mb-3'>
            <h5>Tiya Bakers</h5>
            <p>
              Freshly baked happiness!
              <br />
              Delicious cakes, cookies, and more.
            </p>
          </Col>

          <Col md={4} className='mb-3'>
            <h5>Quick Links</h5>
            <ul className='list-unstyled'>
              <li>
                <Link to='/about'>About Us</Link>
              </li>
              {/* <li>
                <Link to='/menu'>Our Menu</Link>
              </li> */}
              <li>
                <Link to='/contact'>Contact</Link>
              </li>
              <li>
                <Link to='/order'>Order Online</Link>
              </li>
            </ul>
          </Col>

          <Col md={4} className='mb-3'>
            <h5>Contact Us</h5>
            <p>
              📍 123 Baker Street, Delhi
              <br />
              📞 +91 98765 43210
              <br />
              📧 support@tiyabakers.com
            </p>
          </Col>
        </Row>

        <Row className='border-top pt-3'>
          <Col className='text-center'>
            <small>
              &copy; {currentYear} Tiya Bakers. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
