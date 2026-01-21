/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import {
  Package,
  MapPin,
  Calendar,
  Truck,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { format } from "date-fns";

export default function TrackOrder() {
  const router = useRouter();
  const { trackingNumber } = router.query;

  const [shipment, setShipment] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;

    if (!trackingNumber) {
      setLoading(false);
      return;
    }

    fetchTrackingInfo(trackingNumber);
  }, [router.isReady, trackingNumber]);

  const fetchTrackingInfo = async (tNumber) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch Shipment
      const { data: shipmentData, error: shipmentError } = await supabase
        .from("shipments")
        .select("*")
        .eq("tracking_number", tNumber)
        .single();

      if (shipmentError) {
        if (shipmentError.code === "PGRST116") {
          // No rows found
          throw new Error(
            "Tracking number not found. Please verify the number.",
          );
        }
        throw shipmentError;
      }

      if (!shipmentData) {
        throw new Error("Tracking number not found.");
      }

      setShipment(shipmentData);

      // 2. Fetch Events
      const { data: eventsData, error: eventsError } = await supabase
        .from("tracking_events")
        .select("*")
        .eq("shipment_id", shipmentData.id)
        .order("created_at", { ascending: true });

      if (eventsError) throw eventsError;

      setEvents(eventsData || []);
    } catch (err) {
      console.error("Error fetching tracking:", err);
      // Nice user friendly message
      if (err.message.includes("not found")) {
        setError(err.message);
      } else {
        setError(
          "Unable to retrieve tracking details. Please try again later.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("delivered"))
      return "bg-green-100 text-green-700 border-green-200";
    if (s.includes("transit") || s.includes("shipped") || s.includes("way"))
      return "bg-blue-100 text-blue-700 border-blue-200";
    if (s.includes("pending") || s.includes("processing"))
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    if (s.includes("exception") || s.includes("hold") || s.includes("fail"))
      return "bg-red-100 text-red-700 border-red-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getStatusIcon = (status) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("delivered")) return <CheckCircle className="w-5 h-5" />;
    if (s.includes("transit") || s.includes("shipped") || s.includes("way"))
      return <Truck className="w-5 h-5" />;
    if (s.includes("pending") || s.includes("processing"))
      return <Clock className="w-5 h-5" />;
    if (s.includes("exception")) return <AlertCircle className="w-5 h-5" />;
    return <Package className="w-5 h-5" />;
  };

  return (
    <>
      <Head>
        <title>{`Tracking ${trackingNumber ? `#${trackingNumber}` : ""} - Delite Logistics`}</title>
      </Head>

      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />

        <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <button
              onClick={() => router.back()}
              className="mb-6 flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </button>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Track Your Shipment
              </h1>
              <p className="mt-2 text-gray-600">
                Real-time status updates for your delivery.
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary border-blue-600"></div>
                <p className="mt-4 text-gray-500">
                  Retrieving shipment details...
                </p>
              </div>
            ) : error ? (
              <div className="bg-white rounded-xl shadow-sm border border-red-100 p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Unavailable
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
                <button
                  onClick={() => router.push("/")}
                  className="inline-flex items-center px-6 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
                >
                  Back to Home
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Summary Card */}
                {shipment && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                            Tracking Number
                          </p>
                          <h2 className="text-2xl font-bold text-gray-900 break-all">
                            {shipment.tracking_number}
                          </h2>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full border flex items-center gap-2 text-sm font-medium ${getStatusColor(shipment.current_status)}`}
                        >
                          {getStatusIcon(shipment.current_status)}
                          <span>{shipment.current_status}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 border-t border-gray-100 pt-6">
                        <div className="space-y-1 relative">
                          <div className="absolute left-2.5 top-2.5 bottom-0 w-0.5 bg-gray-100 h-[calc(100%-20px)]"></div>

                          <div className="flex items-start gap-4 relative z-10">
                            <div className="mt-1 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 mb-0.5">
                                Origin
                              </p>
                              <p className="font-semibold text-gray-900">
                                {shipment.origin}
                              </p>
                              <p className="text-sm text-gray-600">
                                {shipment.sender_name}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-4 relative z-10 pt-4">
                            <div className="mt-1 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center border border-blue-200">
                              <MapPin className="w-3 h-3 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500 mb-0.5">
                                Destination
                              </p>
                              <p className="font-semibold text-gray-900">
                                {shipment.destination}
                              </p>
                              <p className="text-sm text-gray-600">
                                {shipment.receiver_name}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg self-start">
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">
                                Shipped Date
                              </span>
                              <span className="font-medium text-gray-900">
                                {shipment.created_at
                                  ? format(
                                      new Date(shipment.created_at),
                                      "MMM d, yyyy",
                                    )
                                  : "N/A"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    Tracking History
                  </h3>

                  {events.length === 0 ? (
                    <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">
                      No detailed tracking updates available yet.
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {/* Using flex-col-reverse relative to data simply by iterating backwards or just CSS if we wanted latest first top, 
                                        but typically vertical timelines go Top (latest) to Bottom (oldest) or Top (start) to Bottom (end).
                                        User said "Sort tracking events by created_at ascending" (oldest top, latest bottom).
                                        Wait, logically, timelines usually show latest at the TOP. 
                                        However, the user requirement is "Latest event visually emphasized".
                                        Usually you read a story from top to bottom. Order start -> end.
                                        So ascending (oldest first) makes sense for "Journey". 
                                        I will stick to user request: "Sort tracking events by created_at ascending".
                                    */}
                      <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pb-2">
                        {events.map((event, index) => {
                          const isLatest = index === events.length - 1;
                          return (
                            <div
                              key={event.id}
                              className="relative pl-8 fade-in"
                            >
                              {/* Dot */}
                              <div
                                className={`absolute -left-[9px] top-1.5 h-[18px] w-[18px] rounded-full border-2 bg-white flex items-center justify-center
                                                        ${isLatest ? "border-blue-600 ring-4 ring-blue-50 z-10" : "border-gray-300"}`}
                              >
                                {isLatest && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                )}
                              </div>

                              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                <div>
                                  <p
                                    className={`font-semibold ${isLatest ? "text-gray-900 text-lg" : "text-gray-700"}`}
                                  >
                                    {event.status}
                                  </p>
                                  <p className="text-gray-600">
                                    {event.location}
                                  </p>
                                  {event.note && (
                                    <p className="text-sm text-gray-500 mt-2 p-2 bg-yellow-50 text-yellow-800 border-yellow-100 border rounded inline-block max-w-xs">
                                      Note: {event.note}
                                    </p>
                                  )}
                                </div>
                                <div className="text-sm text-gray-400 whitespace-nowrap text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {event.created_at &&
                                      format(
                                        new Date(event.created_at),
                                        "MMM d",
                                      )}
                                  </div>
                                  <div className="flex items-center justify-end gap-1.5 mt-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {event.created_at &&
                                      format(
                                        new Date(event.created_at),
                                        "h:mm a",
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
