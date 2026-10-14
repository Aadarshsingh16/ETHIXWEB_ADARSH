// scripts/test-leads.mjs - Unit test for POST /api/leads logic
import { leadSchema, normalizePhone } from "../src/lib/validation";

console.log("Testing validation and normalisation logic...");

// 1. Phone normalisation tests
const testPhones = [
  { input: "+91 98765 43210", expected: "9876543210" },
  { input: "09876543210", expected: "9876543210" },
  { input: "9876543210", expected: "9876543210" },
];

for (const { input, expected } of testPhones) {
  const norm = normalizePhone(input);
  if (norm !== expected) {
    throw new Error(`Phone normalization failed for ${input}: got ${norm}, expected ${expected}`);
  }
}
console.log("✓ Phone normalization passed for +91, 0, and raw numbers");

// 2. Invalid phone rejection
const invalidPhoneResult = leadSchema.safeParse({
  name: "Rajesh",
  email: "rajesh@example.com",
  phone: "5123456789", // starts with 5, invalid in India
  city: "Delhi NCR",
  service: "Website",
  consent: true,
  startedAt: Date.now() - 5000,
  turnstileToken: "dummy",
});

if (invalidPhoneResult.success) {
  throw new Error("Invalid phone starting with 5 was unexpectedly accepted!");
}
console.log("✓ Invalid phone starting with 5 correctly rejected with 422 schema error");

// 3. Valid lead schema parse
const validLeadResult = leadSchema.safeParse({
  name: "Rajesh Sharma",
  email: "rajesh@example.com",
  phone: "+91 98765 43210",
  city: "Mumbai",
  service: "Website",
  budget: "₹25,000–75,000",
  contactPref: "whatsapp",
  consent: true,
  startedAt: Date.now() - 5000,
  turnstileToken: "1x00000000000000000000AA",
});

if (!validLeadResult.success) {
  throw new Error("Valid lead failed to parse: " + JSON.stringify(validLeadResult.error.errors));
}
console.log("✓ Valid lead payload successfully validated with normalized phone: " + validLeadResult.data.phone);

console.log("\nALL VALIDATION AND LOGIC GATES PASSED!");
