import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../store/slices/productsSlice';
import type { Product } from '../../types';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  type: yup.string().required('Type is required'),
  specification: yup.string().required('Specification is required'),
  priceUAH: yup.number().typeError('Price must be a number').positive().required(),
  guaranteeStart: yup.date().required('Start date is required'),
  guaranteeEnd: yup.date().required('End date is required'),
  photo: yup.string().required()
});

type FormData = yup.InferType<typeof schema>;

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const newProduct: Product = {
      id: Date.now(),
      serialNumber: Date.now(),
      isNew: true,
      title: data.title,
      type: data.type,
      specification: data.specification,
      date: new Date().toISOString(),
      photo: data.photo || '/images/placeholder.webp',
      guarantee: {
        start: data.guaranteeStart.toString(),
        end: data.guaranteeEnd.toString(),
      },
      order: 0,
      price: [
        { value: data.priceUAH, symbol: 'UAH', isDefault: true },
      ],
    };

    dispatch(addProduct(newProduct));
    setSubmitted(true);
    reset();
  };

  const successAlert = useMemo(() => (
    submitted && (
      <Alert variant="success" dismissible onClose={() => setSubmitted(false)}>
        Product successfully added!
      </Alert>
    )
  ), [submitted]);

  return (
    <Card className="p-4 shadow-sm mb-4">
      <h4 className="mb-3">Add New Product</h4>
      {successAlert}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control {...register('title')} isInvalid={!!errors.title} />
              <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control {...register('type')} isInvalid={!!errors.type} />
              <Form.Control.Feedback type="invalid">{errors.type?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Specification</Form.Label>
          <Form.Control as="textarea" rows={2} {...register('specification')} isInvalid={!!errors.specification} />
          <Form.Control.Feedback type="invalid">{errors.specification?.message}</Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Price (UAH)</Form.Label>
              <Form.Control type="number" {...register('priceUAH')} isInvalid={!!errors.priceUAH} />
              <Form.Control.Feedback type="invalid">{errors.priceUAH?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Guarantee Start</Form.Label>
              <Form.Control type="date" {...register('guaranteeStart')} isInvalid={!!errors.guaranteeStart} />
              <Form.Control.Feedback type="invalid">{errors.guaranteeStart?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Guarantee End</Form.Label>
              <Form.Control type="date" {...register('guaranteeEnd')} isInvalid={!!errors.guaranteeEnd} />
              <Form.Control.Feedback type="invalid">{errors.guaranteeEnd?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Photo URL</Form.Label>
          <Form.Control {...register('photo')} isInvalid={!!errors.photo} />
          <Form.Control.Feedback type="invalid">{errors.photo?.message}</Form.Control.Feedback>
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add Product'}
          </Button>
        </div>
      </Form>
    </Card>
  );
}
