import Navbar from "../../component/Navbar";

const EmployerDashboard = () => {
  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-4 h-full">
      <div className="row-span-5">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold mb-4">VRISTO</h1>
          <ul className="space-y-2">
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-700">
                Subscriptions
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-700">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-700">
                Orders
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-700">
                Invoices
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-700">
                History
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-700">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 px-4 hover:bg-gray-700">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-span-4 row-span-5">
        <Navbar />
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Employer Dashboard</h1>
          <p>Welcome to your employer dashboard.</p>
        </div>
      </div>
    </div>
  );
};
export default EmployerDashboard;
