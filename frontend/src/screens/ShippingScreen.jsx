import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../slices/cartSlice';
import axios from 'axios';
import { BASE_URL } from '../constants';

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { shippingAddress } = cart;

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');
  const [phone, setPhone] = useState(shippingAddress.phone || '');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/address/${userInfo._id}/address`,
          {
            withCredentials: true,
          }
        );
        setSavedAddresses(data);
      } catch (error) {
        console.error('Failed to load addresses:', error);
      }
    };

    if (userInfo && userInfo._id) {
      fetchAddresses();
    }
  }, [userInfo]);

  const handleSelectChange = (e) => {
    const addressId = e.target.value;
    setSelectedAddressId(addressId);

    const selected = savedAddresses.find((addr) => addr._id === addressId);
    if (selected) {
      setAddress(selected.address);
      setCity(selected.city);
      setPostalCode(selected.postalCode);
      setCountry(selected.country);
      setPhone(selected.phone);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, postalCode, country, phone })
    );
    navigate('/payment');
  };

  const saveAddressToProfile = async () => {
    try {
      setSaving(true);
      await axios.post(
        `${BASE_URL}/api/address/${userInfo._id}/address`,
        {
          fullName: userInfo.name,
          address,
          city,
          postalCode,
          country,
          phone,
        },
        { withCredentials: true }
      );
      setSaveMessage('Address saved!');
      setSaving(false);
    } catch (error) {
      console.error('Error saving address:', error);
      setSaveMessage('Failed to save address.');
      setSaving(false);
    }
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>

      {savedAddresses.length > 0 && (
        <>
          <h5 className='mt-3 mb-2'>Saved Addresses</h5>
          {savedAddresses.map((addr) => (
            <div
              key={addr._id}
              className={`p-3 mb-2 border rounded ${
                selectedAddressId === addr._id ? 'border-primary bg-light' : ''
              }`}
            >
              <Form.Check
                type='radio'
                id={addr._id}
                name='addressSelect'
                value={addr._id}
                checked={selectedAddressId === addr._id}
                onChange={handleSelectChange}
                label={
                  <>
                    <strong>{addr.fullName}</strong>
                    <br />
                    {addr.address}, {addr.city}, {addr.postalCode},{' '}
                    {addr.country}
                    <br />
                    Phone: {addr.phone}
                  </>
                }
              />
            </div>
          ))}
        </>
      )}

      {selectedAddressId && (
        <p className='text-success fw-semibold'>
          Using selected address for shipping
        </p>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='my-2' controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='my-2' controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='my-2' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='my-2' controlId='phone'>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter phone number'
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>

        <div className='d-flex gap-3 my-3'>
          <Button type='submit' variant='primary'>
            Continue
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={saveAddressToProfile}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save this address to profile'}
          </Button>
        </div>

        {saveMessage && (
          <p style={{ color: saveMessage.includes('saved') ? 'green' : 'red' }}>
            {saveMessage}
          </p>
        )}
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
