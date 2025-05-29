import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../assets/TB2.png';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer-bakery mt-5'>
      <Container className='py-4'>
        <Row>
          <Col md={4} className='mb-3'>
            <div className='d-flex align-items-center mb-2'>
              <img
                src={logo}
                alt='Tiya Bakers'
                width='auto'
                height='40'
                className='d-inline-block align-top me-2'
              />
              {/* <h5 className='mb-0'>Tiya Bakers</h5> */}
            </div>
            <p className='mt-1'>
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
              📍 2345, Sector-3, Faridabad
              <br />
              📞{' '}
              <a
                href='tel:+919560419736'
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                +91 95604 19736
              </a>
              <br />
              📧{' '}
              <a
                href='mailto:support@tiyabakers.com'
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                support@tiyabakers.com
              </a>
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
