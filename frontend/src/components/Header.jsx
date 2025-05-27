import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/TB.png';
import { resetCart } from '../slices/cartSlice';
import './Header.css';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar
        className='custom-blue-navbar'
        variant='dark'
        expand='lg'
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand as={Link} to='/' className='d-flex align-items-center'>
            <img
              src={logo}
              alt='Tiya Bakers'
              width='40'
              height='40'
              className='d-inline-block align-top me-2'
            />
            <span className='fw-bold fs-5'>Tiya Bakers</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto align-items-center'>
              <SearchBox />

              <Nav.Link
                as={Link}
                to='/cart'
                className='d-flex align-items-center'
              >
                <FaShoppingCart className='me-1' /> Cart
                {cartItems.length > 0 && (
                  <Badge pill bg='light' text='dark' className='ms-2'>
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item as={Link} to='/profile'>
                    My Account
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <FaUser className='me-1' /> Sign In
                </Nav.Link>
              )}
              <Nav.Link as={Link} to='/menu'>
                <FaUser className='me-1' />
                Menu
              </Nav.Link>
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin Panel' id='adminmenu'>
                  <NavDropdown.Item as={Link} to='/admin/productlist'>
                    Manage Products
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/orderlist'>
                    Manage Orders
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/userlist'>
                    Manage Users
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
