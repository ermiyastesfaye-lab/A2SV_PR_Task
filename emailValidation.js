/**
 * Validates an email address based on format and domain structure.
 *
 * Rules:
 * - Must be a string
 * - Trims leading and trailing spaces
 * - Must contain only one "@" symbol
 * - Domain must contain at least one dot, not at the start or end
 * - Prevents double dots in domain
 * - Uses regex for final validation
 *
 * @param {string} email - The email address to validate.
 * @returns {boolean} - True if valid, otherwise false.
 */
function isValidEmail(email) {
  if (typeof email !== "string") return false;

  email = email.trim();

  // Ensure only one "@"
  const atIndex = email.indexOf("@");
  if (atIndex === -1 || email.lastIndexOf("@") !== atIndex) {
    return false;
  }

  // Extract domain and ensure proper structure
  const domain = email.substring(atIndex + 1);
  if (!domain.includes(".") || domain.startsWith(".") || domain.endsWith(".")) {
    return false;
  }

  if (email.includes("..")) {
    return false;
  }

  // Validate using regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/;
  return emailRegex.test(email);
}

/**
 * Runs a set of test cases to validate the isValidEmail function.
 * Returns structured test results instead of only logging them.
 *
 * @returns {Array} - A summary of test results.
 */
function runTests() {
  const testCases = [
    { input: "test@example.com", expected: true },
    { input: "user@domain.com", expected: true },
    { input: " user@domain.com ", expected: true }, // Trims whitespace
    { input: "user@sub..domain.com", expected: false }, // Double dots in domain
    { input: "user@.com", expected: false }, // Dot at domain start
    { input: "user@domain", expected: false }, // Missing TLD
    { input: "user@@domain.com", expected: false }, // Multiple @
    { input: "user@domain..com", expected: false }, // Double dots in domain
    { input: "user@domain.com.", expected: false }, // Trailing dot in domain
    { input: "user@domain.c", expected: false }, // TLD too short
    {
      input: "user@domain.toolongtlddddddddddddddddddddddd",
      expected: false,
    }, // TLD too long
    { input: "invalid-email", expected: false }, // No @
    { input: "", expected: false }, // Empty string
    { input: 12345, expected: false }, // Not a string
    { input: "user@domain.com.com", expected: true }, // Double valid TLD
  ];

  const results = testCases.map(({ input, expected }, index) => {
    const result = isValidEmail(input);
    const passed = result === expected;
    return { test: index + 1, input, expected, result, passed };
  });

  // Log a structured summary
  console.table(results);
  return results;
}

// Run tests
runTests();
