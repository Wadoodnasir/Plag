import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import OrdersTable from '../../component/Employee/OrdersTables';
import HelpDeskTable from '../../component/AdminPanel/HelpDesk';
import TodayEarningTable from '../../component/AdminPanel/TodayEarning';
import RecentActivityTable from '../../component/AdminPanel/RecentActivity';
import InvoiceTable from '../../component/AdminPanel/InvoiceTable';
import RecentSignInTable from '../../component/AdminPanel/RecentSignInTable';
import RecentCustomerTable from '../../component/AdminPanel/RecentCustomerTable';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, color, route }) => (
    <div className={`col-12 col-md-6 col-lg-3 mb-4`}>
        <Link to={route} style={{ textDecoration: 'none' }}>
            <div className={`card stat-card bg-${color} text-white h-100`}>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <div className="card-text">
                        <div className="main-value">
                            {value}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </div>
);

const Home = () => {
    return (
        <>
            <div className="row">
                <StatCard
                    title="Total Users"
                    value={Math.floor(Math.random() * 1000)}
                    color="info"
                    route="/admin/total-users"
                />
                <StatCard
                    title="Online Users"
                    value={Math.floor(Math.random() * 1000)}
                    color="primary"
                    route="/admin/online-users"
                />
                <StatCard
                    title="Total Orders"
                    value={Math.floor(Math.random() * 1000)}
                    color="success"
                    route="/admin/total-orders"
                />
                <StatCard
                    title="New Orders"
                    value={Math.floor(Math.random() * 1000)}
                    color="danger"
                    route="/admin/new-orders"
                />
            </div>
            <div className="row">
                <StatCard
                    title="Processing Orders"
                    value={Math.floor(Math.random() * 1000)}
                    color="info"
                    route="/admin/processing-orders"
                />
                <StatCard
                    title="Total Files Checked"
                    value={Math.floor(Math.random() * 1000)}
                    color="primary"
                    route="/admin/total-files-checked"
                />
                <StatCard
                    title="Processing Files"
                    value={Math.floor(Math.random() * 1000)}
                    color="success"
                    route="/admin/processing-files"
                />
                <StatCard
                    title="Tickets"
                    value={Math.floor(Math.random() * 1000)}
                    color="danger"
                    route="/admin/tickets"
                />
            </div>
            <div className="row">
                <StatCard
                    title="Total Earning"
                    value={Math.floor(Math.random() * 1000)}
                    color="info"
                    route="/admin/total-earning"
                />
                <StatCard
                    title="Today Earning"
                    value={Math.floor(Math.random() * 1000)}
                    color="primary"
                    route="/admin/today-earning"
                />
            </div>
            <HelpDeskTable />

            <TodayEarningTable />

            <RecentActivityTable />

            <InvoiceTable />

            <RecentSignInTable />

            <RecentCustomerTable />


        </>

    );
};

export default Home;
