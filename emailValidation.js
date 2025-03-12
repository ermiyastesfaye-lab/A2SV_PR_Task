function isValidEmail(email) {
  if (typeof email !== "string") return false;

  email = email.trim();

  //Ensure only one "@"
  const atIndex = email.indexOf("@");
  if (atIndex === -1 || email.lastIndexOf("@") !== atIndex) {
    return false;
  }

  // Ensure domain has at least one dot, not at start or end
  const domain = email.split("@")[1];
  if (!domain || domain.startsWith(".") || domain.endsWith(".")) {
    return false;
  }

  if (email.includes("..")) {
    return false;
  }

  // Validate using regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

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
    { input: "user@domain.toolongtld", expected: false }, // TLD too long
    { input: "invalid-email", expected: false }, // No @
    { input: "", expected: false }, // Empty string
    { input: 12345, expected: false }, // Not a string
    { input: "user@domain.com.com", expected: true }, // Double valid TLD
  ];

  testCases.forEach(({ input, expected }, index) => {
    const result = isValidEmail(input);
    console.log(
      `Test ${index + 1}: ${input} → Expected: ${expected}, Got: ${result} → ${
        result === expected ? "✅ Pass" : "❌ Fail"
      }`
    );
  });
}

runTests();
