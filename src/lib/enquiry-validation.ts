import { parsePhoneNumberFromString } from "libphonenumber-js/max";

export interface EnquiryFields {
  name: string;
  phone: string;
  email: string;
  date: string;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryFields, string>>;

export function validateEnquiry(form: EnquiryFields): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  const phone = form.phone.trim();
  const permitted = /^\+?[\d\s()-]+$/.test(phone);
  const parsed = permitted ? parsePhoneNumberFromString(phone, "IN") : undefined;
  if (!phone) errors.phone = "Please enter your phone number.";
  else if (!parsed?.isValid()) errors.phone = "Please enter a valid phone number, including the country code for international numbers.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Please enter a valid email address.";
  const date = new Date(`${form.date}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(form.date) || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== form.date) {
    errors.date = "Please select your event date.";
  }
  return errors;
}