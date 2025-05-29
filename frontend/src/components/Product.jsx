import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  // Pick primary image from images array or fallback
  const primaryImage = product.images?.find((img) => img.primary) ||
    product.images?.[0] || { url: product.image };

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={primaryImage.url}
          variant='top'
          style={{
            height: 'auto',
            objectFit: 'cover',
            objectPosition: 'top center',
            borderRadius: '6px',
          }}
        />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>₹{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
