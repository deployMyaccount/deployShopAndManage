
import { Link } from 'react-router-dom';
import { Card, OrderHeader, OrderId, OrderStatus, OrderContent, TotalPrice, CreatedAt, ViewDetailsButton } from '../assets/wrappers/OrderCard';
import formatPrice from '../utils/formatPrice';

const OrderCard = ({ order }) => {
  return (
    <Card>
      <OrderHeader>
        <OrderId>ID: {order.order_id}</OrderId>
        <OrderStatus>Status: {order.status}</OrderStatus>
      </OrderHeader>
      <OrderContent>
        <TotalPrice>Total Price: ₽ {formatPrice(order.total_price)}</TotalPrice>
        <CreatedAt>Created At: {new Date(order.created_at).toLocaleDateString()}</CreatedAt>
        <Link to={`/dashboard/user/orders/${order.order_id}`}>
          <ViewDetailsButton>View Details</ViewDetailsButton>
        </Link>
      </OrderContent>
    </Card>
  );
};

export default OrderCard;