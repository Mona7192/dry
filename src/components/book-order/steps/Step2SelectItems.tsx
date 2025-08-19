'use client';

import React from 'react';
import { serviceCategories } from '@/data/services-data';
import { ServiceCategorySection } from '@/components/services/ServiceCategorySection';
import { useOrderStore } from '@/store/orderStore';

const Step2SelectItems = () => {
  const { selectedService } = useOrderStore();

  if (!selectedService) {
    return (
      <div className="text-center text-gray-400 mt-8">
        Please select a service in Step 1.
      </div>
    );
  }

  // تمام دسته‌های مربوط به سرویس انتخاب‌شده
  const categories = serviceCategories.find(
    (service) => service.name === selectedService
  )?.categories;

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-8">
        No categories found for this service.
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-4">
      {categories.map((category) => (
        <ServiceCategorySection
          key={category.name}
          title={category.name}
          items={category.items}
        />
      ))}
    </div>
  );
};

export default Step2SelectItems;
