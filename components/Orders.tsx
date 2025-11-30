import React from 'react';
import { MOCK_ORDERS } from '../constants';
import { Truck, CheckCircle, Clock, XCircle, Search, Eye } from 'lucide-react';

const Orders: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Recent Orders</h2>
        <div className="flex gap-2">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input type="text" placeholder="Search orders..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm" />
           </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Order ID</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Customer</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Total</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-indigo-600">{order.id}</td>
                <td className="px-6 py-4 text-sm text-slate-900">{order.customerName}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{order.date}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 
                      order.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                    {order.status === 'Delivered' && <CheckCircle className="w-3 h-3" />}
                    {order.status === 'Pending' && <Clock className="w-3 h-3" />}
                    {order.status === 'Shipped' && <Truck className="w-3 h-3" />}
                    {order.status === 'Returned' && <XCircle className="w-3 h-3" />}
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                    <button className="text-slate-400 hover:text-indigo-600">
                        <Eye className="w-4 h-4" />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;