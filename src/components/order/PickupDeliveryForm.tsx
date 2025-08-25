// src/components/order/PickupDeliveryForm.tsx
"use client"

import { Calendar } from "@/components/Ui/calendar"
import { ToggleGroup, ToggleGroupItem } from "@/components/Ui/toggle-group"
import { Textarea } from "@/components/Ui/textarea"
import { useUserStore } from "@/store/userStore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { format } from "date-fns"
import AuthModal from "@/components/auth/AuthModal"

interface FormData {
  pickupDate: Date | undefined;
  pickupSlot: string;
  deliveryDate: Date | undefined;
  deliverySlot: string;
  notes: string;
}

export default function PickupDeliveryForm() {
  const { isAuthenticated, openAuthModal } = useUserStore();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    pickupDate: undefined,
    pickupSlot: "",
    deliveryDate: undefined,
    deliverySlot: "",
    notes: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const timeSlots = [
    "08:00 - 10:00",
    "10:00 - 12:00",
    "12:00 - 14:00",
    "14:00 - 16:00",
    "16:00 - 18:00",
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.pickupDate) {
      newErrors.pickupDate = "Please select a pickup date";
    }

    if (!formData.pickupSlot) {
      newErrors.pickupSlot = "Please select a pickup time slot";
    }

    if (!formData.deliveryDate) {
      newErrors.deliveryDate = "Please select a delivery date";
    }

    if (!formData.deliverySlot) {
      newErrors.deliverySlot = "Please select a delivery time slot";
    }

    // اعتبارسنجی تاریخ - pickup باید قبل از delivery باشد
    if (formData.pickupDate && formData.deliveryDate) {
      if (formData.pickupDate >= formData.deliveryDate) {
        newErrors.deliveryDate = "Delivery date must be after pickup date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // چک کردن وضعیت احراز هویت
    if (!isAuthenticated) {
      openAuthModal('login');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const submitData = {
        pickupDate: formData.pickupDate ? format(formData.pickupDate, "yyyy-MM-dd") : null,
        pickupSlot: formData.pickupSlot,
        deliveryDate: formData.deliveryDate ? format(formData.deliveryDate, "yyyy-MM-dd") : null,
        deliverySlot: formData.deliverySlot,
        notes: formData.notes,
      };

      console.log('Form submitted:', submitData);

      // شبیه‌سازی API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // موفقیت آمیز بود - ادامه به مرحله بعد
      router.push('/book-order/book');

    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({ submit: "Failed to save pickup/delivery details. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (key: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    // پاک کردن error مربوط به این فیلد
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* نمایش خطای کلی */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {errors.submit}
          </div>
        )}

        {/* Pickup Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Pickup Details</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Pickup Date *</label>
            <Calendar
              mode="single"
              selected={formData.pickupDate}
              onSelect={(date) => updateFormData('pickupDate', date)}
              className="rounded-md border"
              disabled={(date) => date < new Date()}
            />
            {errors.pickupDate && (
              <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Pickup Time *</label>
            <ToggleGroup
              type="single"
              value={formData.pickupSlot}
              onValueChange={(value) => updateFormData('pickupSlot', value || '')}
              className="flex flex-wrap gap-2"
            >
              {timeSlots.map((slot) => (
                <ToggleGroupItem
                  key={slot}
                  value={slot}
                  className="px-4 py-2 text-sm border rounded-md data-[state=on]:bg-primary data-[state=on]:text-white"
                >
                  {slot}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            {errors.pickupSlot && (
              <p className="text-red-500 text-sm mt-1">{errors.pickupSlot}</p>
            )}
          </div>
        </div>

        {/* Delivery Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Delivery Details</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Delivery Date *</label>
            <Calendar
              mode="single"
              selected={formData.deliveryDate}
              onSelect={(date) => updateFormData('deliveryDate', date)}
              className="rounded-md border"
              disabled={(date) => date <= (formData.pickupDate || new Date())}
            />
            {errors.deliveryDate && (
              <p className="text-red-500 text-sm mt-1">{errors.deliveryDate}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Delivery Time *</label>
            <ToggleGroup
              type="single"
              value={formData.deliverySlot}
              onValueChange={(value) => updateFormData('deliverySlot', value || '')}
              className="flex flex-wrap gap-2"
            >
              {timeSlots.map((slot) => (
                <ToggleGroupItem
                  key={slot}
                  value={slot}
                  className="px-4 py-2 text-sm border rounded-md data-[state=on]:bg-primary data-[state=on]:text-white"
                >
                  {slot}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            {errors.deliverySlot && (
              <p className="text-red-500 text-sm mt-1">{errors.deliverySlot}</p>
            )}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Notes for the driver (optional)
          </label>
          <Textarea
            value={formData.notes}
            onChange={(e) => updateFormData('notes', e.target.value)}
            placeholder="e.g., Please ring the bell twice, parking instructions, etc."
            className="w-full"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-md text-white font-medium transition ${isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:bg-secondary"
            }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Saving Details...
            </div>
          ) : !isAuthenticated ? (
            "Login to Continue"
          ) : (
            "Save & Continue to Booking"
          )}
        </button>

        {/* Additional Info */}
        <div className="text-sm text-gray-500 text-center">
          <p>* Required fields</p>
          <p className="mt-1">You can modify these details later if needed.</p>
        </div>
      </form>

      {/* AuthModal از store مدیریت می‌شود */}
      <AuthModal />
    </>
  );
}