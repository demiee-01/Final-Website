"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      console.log("🔍 Fetching customers...");
      const response = await fetch("/api/customers");
      const result = await response.json();
      
      console.log("📊 Customers API response:", result);
      
      if (!response.ok) {
        throw new Error(result.message || "Failed to load customers");
      }
      
      console.log("✅ Customers loaded:", result.data);
      setCustomers(result.data || []);
    } catch (err) {
      console.error("❌ Customers error:", err);
      setError(err.message || "Failed to load customers. Please try again later.");
      setCustomers([]);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleViewCustomer(customer) {
    setSelectedCustomer(customer);
    
    // Fetch customer's orders
    try {
      const response = await fetch(`/api/orders?email=${customer.email}`);
      const result = await response.json();
      if (result.success) {
        setCustomerOrders(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch customer orders:", err);
    }
  }

  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0);
  const totalOrders = customers.reduce((sum, c) => sum + c.orders, 0);
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-16 animate-pulse rounded-xl bg-gray-200" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <a href="/admin" className="text-gray-500 hover:text-blue-600 transition-colors">
            Dashboard
          </a>
          <span className="text-gray-400">/</span>
          <span className="font-semibold text-gray-900">Customers</span>
        </nav>

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Customer Management</h1>
            <p className="mt-2 text-gray-600">
              {totalCustomers} customer{totalCustomers !== 1 ? "s" : ""} registered
            </p>
          </div>
          <button
            onClick={fetchCustomers}
            disabled={isLoading}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {isLoading ? "Refreshing..." : " Refresh"}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Customers</p>
            <p className="mt-2 text-4xl font-extrabold text-gray-900">{totalCustomers}</p>
            <p className="mt-1 text-xs text-gray-400">Registered users</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Revenue</p>
            <p className="mt-2 text-4xl font-extrabold text-gray-900">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-gray-400">All-time sales</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <p className="mt-2 text-4xl font-extrabold text-gray-900">{totalOrders}</p>
            <p className="mt-1 text-xs text-gray-400">Completed orders</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Avg Order Value</p>
            <p className="mt-2 text-4xl font-extrabold text-gray-900">
              ${avgOrderValue.toFixed(0)}
            </p>
            <p className="mt-1 text-xs text-gray-400">Per order</p>
          </div>
        </div>

        {/* Customers Table */}
        {customers.length === 0 ? (
          <div className="mt-12 rounded-2xl bg-white p-16 text-center shadow-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <svg
                className="h-10 w-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900">No customers yet</h3>
            <p className="mt-2 text-gray-600">
              Customers will appear here once they register
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Orders
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Total Spent
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Joined Date
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customers.map((customer, index) => (
                    <tr key={`${customer.email}-${index}`} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold">
                            {customer.name.charAt(0)}
                          </div>
                          <p className="font-semibold text-gray-900">{customer.name}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-600">{customer.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                          {customer.orders} orders
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-lg font-bold text-gray-900">
                          ${customer.totalSpent.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-600">
                          {new Date(customer.joinedDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => handleViewCustomer(customer)}
                            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 backdrop-blur-sm pt-20 pb-8" onClick={() => setSelectedCustomer(null)}>
        <div className="w-full max-w-4xl transform rounded-2xl bg-white shadow-2xl transition-all max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          {/* Modal Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 text-purple-600 text-2xl font-bold">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedCustomer.name}</h2>
                  <p className="text-gray-600">{selectedCustomer.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-8">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="rounded-xl bg-blue-50 p-4 text-center">
                <p className="text-sm font-medium text-blue-600">Total Orders</p>
                <p className="mt-2 text-3xl font-bold text-blue-900">{selectedCustomer.orders}</p>
              </div>
              <div className="rounded-xl bg-green-50 p-4 text-center">
                <p className="text-sm font-medium text-green-600">Total Spent</p>
                <p className="mt-2 text-3xl font-bold text-green-900">${selectedCustomer.totalSpent.toLocaleString()}</p>
              </div>
              <div className="rounded-xl bg-purple-50 p-4 text-center">
                <p className="text-sm font-medium text-purple-600">Member Since</p>
                <p className="mt-2 text-lg font-bold text-purple-900">
                  {new Date(selectedCustomer.joinedDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Order History */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order History</h3>
              {customerOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Loading orders...</p>
              ) : (
                <div className="space-y-4">
                  {customerOrders.map((order, index) => (
                    <div key={index} className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500">Order Date</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="text-2xl font-bold text-gray-900">${order.totalAmount.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Shipping Address */}
                      {order.shippingAddress && (
                        <div className="mb-4 rounded-lg bg-white p-4">
                          <p className="text-sm font-semibold text-gray-700 mb-2">📍 Shipping Address</p>
                          <p className="text-sm text-gray-600">{order.shippingAddress.address}</p>
                          <p className="text-sm text-gray-600">
                            {order.shippingAddress.city}
                            {order.shippingAddress.state && `, ${order.shippingAddress.state}`} {order.shippingAddress.zipCode}
                          </p>
                          <p className="text-sm text-gray-600">{order.shippingAddress.country}</p>
                          {order.customerPhone && (
                            <p className="text-sm text-gray-600 mt-1">📞 {order.customerPhone}</p>
                          )}
                        </div>
                      )}

                      {/* Items */}
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Items Ordered</p>
                        <div className="space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 rounded-lg bg-white p-4 border border-gray-200">
                              <div className="h-20 w-20 shrink-0 rounded-lg bg-gray-50 p-2 flex items-center justify-center">
                                <img src={item.image} alt={item.name} className="h-full w-full object-contain" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-900 text-base leading-tight mb-1">{item.name}</p>
                                <p className="text-sm text-gray-600 mb-2">Brand: {item.brand}</p>
                                <div className="flex items-center gap-4 text-sm">
                                  <span className="text-gray-600">Quantity: <span className="font-semibold text-gray-900">{item.quantity}</span></span>
                                  <span className="text-gray-600">Price: <span className="font-semibold text-gray-900">${item.price.toLocaleString()}</span></span>
                                </div>
                              </div>
                              <div className="text-right shrink-0 pl-4">
                                <p className="text-sm text-gray-500 mb-1">Subtotal</p>
                                <p className="text-xl font-bold text-blue-600">
                                  ${(item.price * item.quantity).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
