// Orders.jsx
import OrdersTable from "./OrdersTables";
import Cards from "./Cards";
const Orders = () => {
  return (
    <>
      <Cards />
      <div className="container my-3">
        <h1 className="fs-3 text-center py-2">Orders Table</h1>
        <OrdersTable />
      </div>
    </>
  );
};

export default Orders;
