/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
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
      return "bg-primary/10 text-primary border-primary/20";
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium animate-pulse">
              Locating your shipment...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Shipment Not Found
            </h2>
            <p className="text-gray-500 mb-8">
              {error === "Tracking number not found"
                ? `We couldn't find any shipment with tracking number "${trackingNumber}". Please check the number and try again.`
                : "An error occurred while fetching tracking details. Please try again later."}
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary hover:bg-primary/90 transition transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Return to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Head>
        <title>Track Shipment | Delite Logistics</title>
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-10 max-w-5xl">
        <Link
          href="/"
          className="mb-6 flex items-center text-sm text-gray-500 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-primary p-6 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-2xl"></div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-primary-foreground/80 text-sm font-medium mb-1">
                  Tracking Number
                </p>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                  {shipment.tracking_number}
                </h1>
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                <p className="text-primary-foreground/80 lowercase uppercase tracking-wider font-semibold opacity-80 text-xs">
                  Current Status
                </p>
                <p className="text-lg font-bold text-white">
                  {shipment.current_status}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Shipment Info - Sidebar on desktop */}
            <div className="p-6 md:p-8 bg-gray-50/50 border-b lg:border-b-0 lg:border-r border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Package className="w-4 h-4 text-primary" />
                Shipment Details
              </h3>

              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-gray-200 pb-6 last:pb-0 last:border-0">
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    Origin
                  </p>
                  <p className="text-gray-900 font-medium text-lg leading-tight">
                    {shipment.origin}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Sender: {shipment.sender_name}
                  </p>
                </div>

                <div className="relative pl-6 border-l-2 border-gray-200">
                  <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/10"></div>
                  <p className="text-xs text-gray-500 uppercase font-semibold mb-1">
                    Destination
                  </p>
                  <p className="text-gray-900 font-medium text-lg leading-tight">
                    {shipment.destination}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Receiver: {shipment.receiver_name}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Service</p>
                    <p className="text-sm font-bold text-gray-900">
                      Standard Delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="lg:col-span-2 p-6 md:p-8">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-8 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Tracking History
              </h3>

              <div className="relative space-y-8 pl-2 md:pl-4">
                {events.length === 0 ? (
                  <p className="text-gray-500 italic">
                    No tracking events available yet.
                  </p>
                ) : (
                  events.map((event, index) => {
                    const isLatest = index === events.length - 1;
                    return (
                      <div key={event.id} className="relative flex gap-6 group">
                        {/* Line */}
                        {index !== 0 && (
                          <div
                            className="absolute left-[11px] -top-8 w-0.5 h-8 bg-gray-200 group-hover:bg-primary/30 transition-colors"
                            aria-hidden="true"
                          ></div>
                        )}

                        {/* Dot */}
                        <div className="relative flex-none">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center bg-white 
                                                        ${isLatest ? "border-primary ring-4 ring-primary/10 z-10" : "border-gray-300"}`}
                          >
                            {isLatest && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div
                          className={`flex-grow pb-8 ${index !== 0 ? "border-b border-gray-100" : ""}`}
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-2">
                            <h4
                              className={`text-base font-bold ${isLatest ? "text-primary" : "text-gray-900"}`}
                            >
                              {event.status}
                            </h4>
                            <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
                              {/* Format date: Jan 24, 2024, 10:30 AM */}
                              {new Date(event.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                              <span className="mx-2 text-gray-300">|</span>
                              {new Date(event.created_at).toLocaleTimeString(
                                "en-US",
                                {
                                  hour: "numeric",
                                  minute: "numeric",
                                },
                              )}
                            </span>
                          </div>
                          <div className="flex items-start gap-2 text-gray-600 mb-2">
                            <div className="mt-1 w-5 h-5 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                              <MapPin className="w-3 h-3 text-gray-400" />
                            </div>
                            <span className="text-sm">{event.location}</span>
                          </div>
                          {event.note && (
                            <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100 inline-block mt-1">
                              {event.note}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
