import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import {
  Search,
  Plus,
  Save,
  Truck,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  Package,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";

export default function AdminShipment() {
  const [trackingInput, setTrackingInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [shipment, setShipment] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Form states for adding new event
  const [newEvent, setNewEvent] = useState({
    status: "",
    location: "",
    note: "",
  });
  const [addingEvent, setAddingEvent] = useState(false);
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    tracking_number: "",
    sender_name: "",
    sender_phone: "",
    receiver_name: "",
    receiver_phone: "",
    origin: "",
    destination: "",
    current_status: "Order Created",
  });

  // Form states for editing shipment details
  const [editShipment, setEditShipment] = useState(null);
  const [savingShipment, setSavingShipment] = useState(false);

  const fetchShipment = async (e) => {
    e?.preventDefault();
    if (!trackingInput.trim()) return;

    setLoading(true);
    setError("");
    setShipment(null);
    setEditShipment(null);
    setEvents([]);
    setSuccessMsg("");

    try {
      // Fetch shipment
      const { data: shipmentData, error: shipmentError } = await supabase
        .from("shipments")
        .select("*")
        .eq("tracking_number", trackingInput.trim())
        .single();

      if (shipmentError) {
        if (shipmentError.code === "PGRST116")
          throw new Error("Order not found");
        throw shipmentError;
      }

      setShipment(shipmentData);
      setEditShipment(shipmentData);

      // Fetch events
      fetchEvents(shipmentData.id);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error fetching order");
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async (shipmentId) => {
    const { data, error } = await supabase
      .from("tracking_events")
      .select("*")
      .eq("shipment_id", shipmentId)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching events:", error);
    } else {
      setEvents(data || []);
    }
  };

  const handleUpdateShipment = async (e) => {
    e.preventDefault();
    setSavingShipment(true);
    setError("");
    setSuccessMsg("");

    try {
      const { error } = await supabase
        .from("shipments")
        .update({
          sender_name: editShipment.sender_name,
          receiver_name: editShipment.receiver_name,
          origin: editShipment.origin,
          destination: editShipment.destination,
          current_status: editShipment.current_status,
          sender_phone: editShipment.sender_phone,
          receiver_phone: editShipment.receiver_phone,
        })
        .eq("id", shipment.id);

      if (error) throw error;

      setShipment({ ...editShipment });
      setSuccessMsg("Order details updated successfully!");

      // Clear success msg after 3s
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to update order: " + err.message);
    } finally {
      setSavingShipment(false);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.status || !newEvent.location) return;

    setAddingEvent(true);
    setError("");

    try {
      // 1. Add event
      const { error: eventError } = await supabase
        .from("tracking_events")
        .insert([
          {
            shipment_id: shipment.id,
            status: newEvent.status,
            location: newEvent.location,
            note: newEvent.note,
          },
        ]);

      if (eventError) throw eventError;

      // 2. Update shipment status automatically
      const { error: updateError } = await supabase
        .from("shipments")
        .update({ current_status: newEvent.status })
        .eq("id", shipment.id);

      if (updateError) throw updateError;

      // Refresh data
      await fetchEvents(shipment.id);

      // Update local shipment status to reflect change
      setShipment((prev) => ({ ...prev, current_status: newEvent.status }));
      setEditShipment((prev) => ({ ...prev, current_status: newEvent.status }));

      // Reset form
      setNewEvent({ status: "", location: "", note: "" });
      setSuccessMsg("Tracking event added successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to add event: " + err.message);
    } finally {
      setAddingEvent(false);
    }
  };

  const generateTrackingNumber = () => {
    const prefix = "TRK";
    const random = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}-${random}`;
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setCreatingOrder(true);
    setError("");

    try {
      const orderToCreate = {
        ...newOrder,
        tracking_number: newOrder.tracking_number || generateTrackingNumber(),
      };

      // 1. Create Shipment
      const { data: shipmentData, error: shipmentError } = await supabase
        .from("shipments")
        .insert([orderToCreate])
        .select()
        .single();

      if (shipmentError) throw shipmentError;

      // 2. Add Initial Event
      const { error: eventError } = await supabase
        .from("tracking_events")
        .insert([
          {
            shipment_id: shipmentData.id,
            status: "Order Created",
            location: orderToCreate.origin,
            note: "Shipment request initialized",
          },
        ]);

      if (eventError)
        console.error("Initial event creation failed", eventError);

      setSuccessMsg(
        `Order ${orderToCreate.tracking_number} created successfully!`,
      );
      setIsCreateModalOpen(false);
      setTrackingInput(orderToCreate.tracking_number);

      // Reset form
      setNewOrder({
        tracking_number: "",
        sender_name: "",
        sender_phone: "",
        receiver_name: "",
        receiver_phone: "",
        origin: "",
        destination: "",
        current_status: "Order Created",
      });

      // Auto-fetch the new shipment
      setLoading(true); // Manually trigger loading state since we are not calling fetchShipment via Event
      // Since we can't easily reusing fetchShipment without event object hack, let's just set state directly
      setShipment(shipmentData);
      setEditShipment(shipmentData);
      setEvents([
        {
          id: "temp-id", // Temp ID until refresh
          status: "Order Created",
          location: orderToCreate.origin,
          note: "Shipment request initialized",
          created_at: new Date().toISOString(),
        },
      ]);
      setLoading(false);
    } catch (err) {
      setError("Failed to create order: " + err.message);
    } finally {
      setCreatingOrder(false);
    }
  };

  return (
    <div className="min-h-screen mt-30 bg-gray-50 flex flex-col">
      <Head>
        <title>Admin - Manage Orders | Delite Logistics</title>
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <Package className="w-8 h-8 text-secondary" />
          Order Manager
        </h1>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-secondary text-white px-5 py-2.5 rounded-lg font-bold hover:bg-orange-600 transition flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Create New Order
          </button>
        </div>

        {/* Search Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <form onSubmit={fetchShipment} className="flex gap-4">
            <input
              type="text"
              placeholder="Enter Tracking Number (e.g. TRK-123456789)"
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent outline-none"
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition flex items-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              Search
            </button>
          </form>
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
            </div>
          )}
        </div>

        {/* Create Order Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl sticky top-0">
                <h2 className="text-xl font-bold text-gray-900">
                  Create New Order
                </h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleCreateOrder} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <label className="block text-sm font-medium text-blue-900 mb-1">
                      Tracking Number (Auto-generated if empty)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. TRK-..."
                        className="flex-grow p-2 border border-blue-200 rounded focus:ring-2 focus:ring-secondary focus:border-transparent outline-none bg-white"
                        value={newOrder.tracking_number}
                        onChange={(e) =>
                          setNewOrder({
                            ...newOrder,
                            tracking_number: e.target.value,
                          })
                        }
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setNewOrder({
                            ...newOrder,
                            tracking_number: generateTrackingNumber(),
                          })
                        }
                        className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded hover:bg-orange-200 transition"
                      >
                        Auto-Generate
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sender Name *
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newOrder.sender_name}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          sender_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Receiver Name *
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newOrder.receiver_name}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          receiver_name: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Origin *
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newOrder.origin}
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, origin: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Destination *
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newOrder.destination}
                      onChange={(e) =>
                        setNewOrder({
                          ...newOrder,
                          destination: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creatingOrder}
                    className="bg-secondary text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition flex items-center gap-2 disabled:opacity-70"
                  >
                    {creatingOrder ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                    Create Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {shipment && editShipment && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Details & Edit */}
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Order Details
                  </h2>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold">
                    {shipment.tracking_number}
                  </span>
                </div>

                <form onSubmit={handleUpdateShipment} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sender Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        value={editShipment.sender_name}
                        onChange={(e) =>
                          setEditShipment({
                            ...editShipment,
                            sender_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Receiver Name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        value={editShipment.receiver_name}
                        onChange={(e) =>
                          setEditShipment({
                            ...editShipment,
                            receiver_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Origin
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        value={editShipment.origin}
                        onChange={(e) =>
                          setEditShipment({
                            ...editShipment,
                            origin: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Destination
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        value={editShipment.destination}
                        onChange={(e) =>
                          setEditShipment({
                            ...editShipment,
                            destination: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        value={editShipment.current_status}
                        onChange={(e) =>
                          setEditShipment({
                            ...editShipment,
                            current_status: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    {successMsg && (
                      <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> {successMsg}
                      </span>
                    )}
                    <button
                      type="submit"
                      disabled={savingShipment}
                      className="ml-auto bg-gray-900 text-white px-5 py-2 rounded-lg font-medium hover:bg-black transition flex items-center gap-2 disabled:opacity-70"
                    >
                      {savingShipment ? (
                        <Loader2 className="animate-spin w-4 h-4" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              {/* Add Event Form */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Add Tracking Update
                </h2>
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      New Status
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newEvent.status}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, status: e.target.value })
                      }
                      required
                    >
                      <option value="">Select Status...</option>
                      <option value="Order Created">Order Created</option>
                      <option value="Picked Up">Picked Up</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Arrived at Facility">
                        Arrived at Facility
                      </option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Exception">Exception</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. London, UK"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newEvent.location}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, location: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Note (Optional)
                    </label>
                    <textarea
                      rows="2"
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                      value={newEvent.note}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, note: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={addingEvent}
                    className="w-full bg-secondary text-white px-5 py-2 rounded-lg font-bold hover:bg-orange-600 transition flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {addingEvent ? (
                      <Loader2 className="animate-spin w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                    Add Update
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Tracking History */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                Tracking History
              </h2>

              <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
                {events.length === 0 ? (
                  <p className="text-gray-500 italic pl-8">
                    No tracking events yet.
                  </p>
                ) : (
                  events.map((event, index) => {
                    const isLatest = index === events.length - 1;
                    return (
                      <div key={event.id} className="relative pl-8">
                        <div
                          className={`absolute -left-[9px] top-1 h-[16px] w-[16px] rounded-full border-2 bg-white ${isLatest ? "border-secondary" : "border-gray-300"}`}
                        ></div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {event.status}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {event.location}
                          </p>
                          {event.note && (
                            <p className="text-sm bg-yellow-50 text-yellow-800 p-2 mt-1 rounded border border-yellow-100">
                              {event.note}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            {format(
                              new Date(event.created_at),
                              "MMM d, yyyy h:mm a",
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
