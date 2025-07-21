import { Card, Placeholder } from 'react-bootstrap';

const ProductSkeleton = () => {
  return (
    <Card className="mb-3">
      <div className="ratio ratio-16x9 bg-secondary bg-opacity-25">
        <img
          src="/placeholder.png"
          alt="placeholder"
          className="w-100 h-100 object-fit-cover"
        />
      </div>
      <Card.Body>
        <Placeholder as={Card.Title} animation="wave">
          <Placeholder xs={6} />
        </Placeholder>

        <Placeholder as={Card.Text} animation="wave">
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={6} />
        </Placeholder>
      </Card.Body>
    </Card>
  );
};

export default ProductSkeleton;
