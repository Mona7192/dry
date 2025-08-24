import React from 'react';
import { Check, Package, Clock, MapPin, Phone, Mail, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface OrderData {
    orderNumber?: string;
    total?: number;
    estimatedDelivery?: string;
    customerEmail?: string;
    customerPhone?: string;
}

interface OrderSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderData?: OrderData | null;
}

const DEFAULT_ORDER_DATA: Required<OrderData> = {
    orderNumber: "ORD-2024-001",
    total: 45.50,
    estimatedDelivery: "3-5 business days",
    customerEmail: "customer@example.com",
    customerPhone: "+44 123 456 789"
};

export default function OrderSuccessModal({
    isOpen,
    onClose,
    orderData
}: OrderSuccessModalProps) {
    const router = useRouter();

    if (!isOpen) return null;

    // Safely extract data with fallbacks
    const getData = (key: keyof OrderData) => {
        if (orderData && orderData[key] !== undefined && orderData[key] !== null) {
            return orderData[key];
        }
        return DEFAULT_ORDER_DATA[key];
    };

    const orderNumber = getData('orderNumber');
    const total = getData('total');
    const estimatedDelivery = getData('estimatedDelivery');
    const customerEmail = getData('customerEmail');
    const customerPhone = getData('customerPhone');

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Header with success icon */}
                <div className="text-center pt-8 pb-6 px-6">
                    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                        <Check className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Order Confirmed! 🎉
                    </h2>
                    <p className="text-gray-600">
                        Thank you for your order. We've received your request and will process it shortly.
                    </p>
                </div>

                {/* Order details */}
                <div className="px-6 pb-6 space-y-6">
                    {/* Order number and total */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-gray-600">Order Number</span>
                            <span className="font-semibold text-gray-900">#{orderNumber}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Total Amount</span>
                            <span className="text-xl font-bold text-green-600">
                                £{typeof total === 'number' ? total.toFixed(2) : '0.00'}
                            </span>
                        </div>
                    </div>

                    {/* Status cards */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                            <Package className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-blue-900">Order Processing</h4>
                                <p className="text-sm text-blue-700">
                                    We're preparing your order and will notify you once it's ready for pickup.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                            <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-purple-900">Estimated Timeline</h4>
                                <p className="text-sm text-purple-700">{estimatedDelivery}</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                            <MapPin className="w-5 h-5 text-orange-600 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-orange-900">Pickup & Delivery</h4>
                                <p className="text-sm text-orange-700">
                                    We'll contact you to confirm pickup and delivery details.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact info */}
                    <div className="border-t pt-4">
                        <h4 className="font-semibold text-gray-900 mb-3">We'll keep you updated via:</h4>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Mail className="w-4 h-4" />
                                <span>{customerEmail}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Phone className="w-4 h-4" />
                                <span>{customerPhone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                            onClick={() => {
                                router.push('/');
                                onClose();
                            }}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                            <Home className="w-4 h-4" />
                            Continue Shopping
                        </button>
                        <button
                            onClick={() => {
                                console.log('Track order:', orderNumber);
                            }}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors"
                        >
                            Track Order
                        </button>
                    </div>

                    {/* Footer note */}
                    <div className="text-center text-xs text-gray-500 pt-2">
                        <p>
                            Need help? Contact our support team or check your email for order details.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}