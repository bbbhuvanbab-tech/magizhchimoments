import { describe, expect, it } from "vitest";
import { validateEnquiry } from "@/lib/enquiry-validation";

const valid = { name: "Test Guest", phone: "9876543210", email: "guest@example.com", date: "2026-10-20" };

describe("enquiry requirements", () => {
  it("requires a name, including rejecting whitespace-only input", () => {
    for (const name of ["", "   "]) expect(validateEnquiry({ ...valid, name }).name).toBeDefined();
    expect(validateEnquiry(valid).name).toBeUndefined();
  });
  it("requires a phone number", () => {
    expect(validateEnquiry({ ...valid, phone: "" }).phone).toBeDefined();
  });
  it("accepts Indian mobiles with an optional +91", () => {
    for (const phone of ["9876543210", "+919876543210", "+91 98765 43210"]) expect(validateEnquiry({ ...valid, phone }).phone).toBeUndefined();
  });
  it("accepts valid international numbers", () => {
    for (const phone of ["+442079460018", "+1 (202) 555-0123"]) expect(validateEnquiry({ ...valid, phone }).phone).toBeUndefined();
  });
  it("rejects letters, incorrect lengths and invalid phone formats", () => {
    for (const phone of ["abc9876543210", "98765abc10", "123", "12345678901234567890", "++919876543210", "98+76543210", "0000000000"]) expect(validateEnquiry({ ...valid, phone }).phone).toBeDefined();
  });
  it("requires a valid email format", () => {
    for (const email of ["", "guest", "guest@", "guest@example", "guest @example.com"]) expect(validateEnquiry({ ...valid, email }).email).toBeDefined();
    expect(validateEnquiry(valid).email).toBeUndefined();
  });
  it("requires a real event date", () => {
    for (const date of ["", "not-a-date", "2026-02-30"]) expect(validateEnquiry({ ...valid, date }).date).toBeDefined();
    expect(validateEnquiry(valid)).toEqual({});
  });
});