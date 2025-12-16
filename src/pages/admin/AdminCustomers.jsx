import { useAdmin } from '../../context/AdminContext';
import AdminLayout from '../../components/admin/AdminLayout';

function AdminCustomers() {
  const { customers, orders } = useAdmin();

  const getCustomerOrders = (customerId) => {
    return orders.filter(order => order.customerId === customerId);
  };

  const getCustomerTotalSpent = (customerId) => {
    return getCustomerOrders(customerId).reduce((sum, order) => sum + order.total, 0);
  };

  return (
    <AdminLayout>
      <div className="admin-customers">
        <h1>Customers Management</h1>
        
        <div className="customers-stats">
          <div className="stat-card">
            <h3>Total Customers</h3>
            <p>{customers.length}</p>
          </div>
          <div className="stat-card">
            <h3>Active This Month</h3>
            <p>{customers.filter(c => c.lastActive && new Date(c.lastActive) > new Date(Date.now() - 30*24*60*60*1000)).length}</p>
          </div>
        </div>

        <div className="customers-table">
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Total Orders</th>
                <th>Total Spent</th>
                <th>Last Active</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => {
                const customerOrders = getCustomerOrders(customer.id);
                const totalSpent = getCustomerTotalSpent(customer.id);
                
                return (
                  <tr key={customer.id}>
                    <td>#{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone || 'N/A'}</td>
                    <td>{customerOrders.length}</td>
                    <td>₹{totalSpent.toLocaleString()}</td>
                    <td>{customer.lastActive ? new Date(customer.lastActive).toLocaleDateString() : 'N/A'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {customers.length === 0 && (
          <div className="empty-state">
            <p>No customers found. Customers will appear here when they register or place orders.</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminCustomers;