// Orders.jsx
import OrdersTable from "./OrdersTables";
import Cards from "./Cards";
const Invoices = () => {
  return (
    <>
      <Cards />
      <div className="container w-75 my-3">
        <h1 className="fs-3 text-center py-2">Invoices Table</h1>
        <OrdersTable />
      </div>
    </>
  );
};

export default Invoices;
