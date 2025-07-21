import { useState, useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Button, Card } from 'react-bootstrap';
import dayjs from 'dayjs';
import MainLayout from '../../layout/MainLayout';
import DeleteConfirmModal from '../../components/UI/DeleteConfirmModal';
import type { Order } from '../../types';
import { deleteOrder, selectOrder } from '../../store/slices/ordersSlice';

const UAH = 'UAH';
const USD = 'USD';

const OrdersPage = () => {
  const orders = useAppSelector((state) => state.orders.items);
  const selectedOrder = useAppSelector((state) => state.orders.selectedOrder);
  const dispatch = useAppDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrderId = localStorage.getItem('selectedOrderId');
    if (savedOrderId) {
      dispatch(selectOrder(Number(savedOrderId)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedOrder) {
      localStorage.setItem('selectedOrderId', String(selectedOrder.id));
    } else {
      localStorage.removeItem('selectedOrderId');
    }
  }, [selectedOrder]);

  const handleDeleteClick = (order: Order) => {
    setOrderToDelete(order);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (orderToDelete) {
      dispatch(deleteOrder(orderToDelete.id));
      setShowDeleteModal(false);
      setOrderToDelete(null);
    }
  };

  const totalUAH = useMemo(() => {
    if (!selectedOrder) return '0.00';
    return selectedOrder.products
      .reduce((sum, p) => sum + (p.price.find(pr => pr.symbol === UAH)?.value || 0), 0)
      .toFixed(2);
  }, [selectedOrder]);

  const totalUSD = useMemo(() => {
    if (!selectedOrder) return '0.00';
    return selectedOrder.products
      .reduce((sum, p) => sum + (p.price.find(pr => pr.symbol === USD)?.value || 0), 0)
      .toFixed(2);
  }, [selectedOrder]);

  return (
    <MainLayout>
      <div className="container-fluid py-4 ms-4">
        <div className="row">
          <div className="col-md-6">
            {orders.map((order) => (
              <Card key={order.id} className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title>{order.title}</Card.Title>
                  <Card.Text>{order.date}</Card.Text>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => dispatch(selectOrder(order.id))}
                    className="me-2"
                  >
                    Open
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteClick(order)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>

          {selectedOrder && (
            <div className="col-md-6">
              <Card className="shadow">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <Card.Title>{selectedOrder.title}</Card.Title>

                      <Card.Text>
                        <strong>Created date:</strong><br />
                        - {dayjs(selectedOrder.date).format('YYYY-MM-DD')}<br />
                        - {dayjs(selectedOrder.date).format('DD.MM.YYYY')}
                      </Card.Text>

                      <Card.Text>
                        <strong>Number of products:</strong> {selectedOrder.products.length}
                      </Card.Text>

                      <Card.Text>
                        <strong>Total amount:</strong><br />
                        - {totalUAH} UAH<br />
                        - {totalUSD} USD
                      </Card.Text>

                      <ul>
                        {selectedOrder.products.map((p) => (
                          <li key={p.id}>{p.title}</li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => dispatch(selectOrder(0))}
                    >
                      Close
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          )}
        </div>

        <DeleteConfirmModal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          orderTitle={orderToDelete?.title || ''}
        />
      </div>
    </MainLayout>
  );
};

export default OrdersPage;
