import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import MainLayout from '../../layout/MainLayout';
import { fetchProducts } from '../../api/products';
import { Card, Form, Row, Col, Alert } from 'react-bootstrap';
import ProductSkeleton from '../../components/Products/ProductSkeleton';
import type { Product } from '../../types';
import './ProductsPage.scss';

const AddProductForm = lazy(() => import('../../components/Products/AddProductForm'));

const ProductsPage = () => {
  const PAGE_SIZE = 6;
  const [products, setProducts] = useState<Product[]>([]);
  const currentPage = useRef(1);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedFilter = localStorage.getItem('productFilter');
    if (savedFilter) setFilter(savedFilter);
  }, []);

  useEffect(() => {
    localStorage.setItem('productFilter', filter);
  }, [filter]);

  const loadProducts = () => {
    if (loading) return;

    setLoading(true);
    fetchProducts(currentPage.current, PAGE_SIZE)
      .then(({ items, hasMore }) => {
        if (!Array.isArray(items)) throw new Error('Invalid response structure');
        setProducts(prev => {
          const newItems = items.filter(
            item => !prev.some(existing => existing.id === item.id)
          );
          return [...prev, ...newItems];
        });
        setHasMore(hasMore);
        currentPage.current += 1;
      })
      .catch((err) => setError(err.message || 'Unknown error'))
      .finally(() => {
        setLoading(false);
        setInitialLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading && hasMore) {
        loadProducts();
      }
    });

    const el = observerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore, loading]);

  const productTypes = ['All', ...Array.from(new Set(products.map(p => p.type)))];
  const filteredProducts = filter === 'All' ? products : products.filter(p => p.type === filter);

  return (
      <MainLayout>
        <div className="container-fluid py-4 ms-4">
          <h1>Products</h1>

          {initialLoading && (
            <Row xs={1} md={2} lg={3} className="g-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Col key={i}><ProductSkeleton /></Col>
              ))}
            </Row>
          )}

          {error && (
            <Alert variant="danger" className="my-3">{error}</Alert>
          )}

          {!initialLoading && !error && (
            <>
              <Form.Group as={Row} className="mb-3" controlId="productFilter">
                <Form.Label column sm="2">Filter by type:</Form.Label>
                <Col sm="4">
                  <Form.Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                    {productTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Form.Group>

              <Row xs={1} md={2} lg={3} className="g-3">
                {filteredProducts.map((product) => (
                  <Col key={product.id}>
                    <Card>
                      <div className="product-card__image-wrapper">
                        <Card.Img
                          variant="top"
                          src={product.photo || '/images/placeholder.webp'}
                          className="product-card__image"
                          alt={product.title}
                        />
                      </div>
                      <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>
                          <strong>Type:</strong> {product.type}<br />
                          <strong>Specification:</strong> {product.specification}<br />
                          <strong>Guarantee:</strong>{' '}
                          {new Date(product.guarantee.start).toLocaleDateString()} -{' '}
                          {new Date(product.guarantee.end).toLocaleDateString()}<br />
                          <strong>Price:</strong>{' '}
                          {product.price.map(p => (
                            <span key={p.symbol}>{p.value} {p.symbol} </span>
                          ))}<br />
                          <strong>Order:</strong> {product.order}<br />
                          <strong>Date:</strong> {new Date(product.date).toLocaleDateString()}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              <div ref={observerRef} className="my-4">
                {loading && (
                  <Row xs={1} md={2} lg={3} className="g-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Col key={i}><ProductSkeleton /></Col>
                    ))}
                  </Row>
                )}
                {!loading && !hasMore && (
                  <p className="text-muted text-center mt-3">No more products</p>
                )}

                <Suspense fallback={<p>Loading form...</p>}>
                  <AddProductForm />
                </Suspense>
              </div>
            </>
          )}
        </div>
      </MainLayout>
  );
};

export default ProductsPage;
