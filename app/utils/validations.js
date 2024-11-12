export function validateUsername({ e, error }) {
  const regex = /^[a-zA-Z][a-zA-Z0-9]*$/;

  if (!e) {
    error("Username cannot be empty");
    return false;
  } else if (e.length < 4) {
    error("Username must be at least 4 characters long");
    return false;
  } else if (e.length > 20) {
    error("Username cannot be more than 20 characters long");
    return false;
  } else if (!regex.test(e)) {
    error(
      "Username must start with a letter and contain only letters and numbers"
    );
    return false;
  } else if (!/[a-zA-Z]/.test(e)) {
    error("Username must contain at least one letter");
    return false;
  } else {
    error(""); // Clear the error message if validation passes
    return true;
  }
}

export function validateEmail({ e, error }) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!e) {
    error("Email cannot be empty");
    return false;
  } else if (!emailRegex.test(e)) {
    error("Please enter a valid email address");
    return false;
  } else {
    error(""); // Clear the error message if validation passes
    return true;
  }
}

export function validatePassword({ e, error }) {
  const minLength = 8;
  const hasNumber = /[0-9]/;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  if (!e) {
    error("Password cannot be empty");
    return false;
  } else if (e.length < minLength) {
    error(`Password must be at least ${minLength} characters long`);
    return false;
  } else if (!hasNumber.test(e)) {
    error("Password must contain at least one number");
    return false;
  } else if (!hasUpperCase.test(e)) {
    error("Password must contain at least one uppercase letter");
    return false;
  } else if (!hasLowerCase.test(e)) {
    error("Password must contain at least one lowercase letter");
    return false;
  } else if (!hasSpecialChar.test(e)) {
    error("Password must contain at least one special character");
    return false;
  } else {
    error(""); // Clear the error message if validation passes
    return true;
  }
}

export function validateConfirmPassword({ password, confirmPassword, error }) {
  if (!confirmPassword) {
    error("Confirm password cannot be empty");
    return false;
  } else if (confirmPassword !== password) {
    error("Passwords do not match");
    return false;
  } else {
    error(""); // Clear the error message if validation passes
    return true;
  }
}

export function validateOTP({ e, error }) {
  const otpRegex = /^[0-9]{6}$/; // Assuming OTP is a 6-digit numeric code

  if (!e) {
    error("OTP cannot be empty");
    return false;
  } else if (!otpRegex.test(e)) {
    error("Please enter a valid 6-digit OTP");
    return false;
  } else {
    error(""); // Clear the error message if validation passes
    return true;
  }
}

// Full Name Validation: Allowing alphabets, spaces, and basic punctuation
export function validateFullName({ e, error }) {
  const nameRegex = /^[a-zA-Z\s.'-]+$/;

  if (!e) {
    error("Full name cannot be empty");
    return false;
  } else if (e.length < 2) {
    error("Full name must be at least 2 characters long");
    return false;
  } else if (!nameRegex.test(e)) {
    error(
      "Full name can only contain letters, spaces, periods, apostrophes, and hyphens"
    );
    return false;
  } else {
    error(""); // Clear error if validation passes
    return true;
  }
}

// Full Name Validation: Allowing alphabets, spaces, and basic punctuation
export function validateFullNameOptional({ e, error }) {
  const nameRegex = /^[a-zA-Z\s.'-]+$/;

  if (e.length < 2) {
    error("Full name must be at least 2 characters long");
    return false;
  } else if (!nameRegex.test(e)) {
    error(
      "Full name can only contain letters, spaces, periods, apostrophes, and hyphens"
    );
    return false;
  } else {
    error(""); // Clear error if validation passes
    return true;
  }
}

// Address Validation: Allowing letters, numbers, spaces, commas, and basic punctuation
export function validateAddress({ e, error }) {
  const addressRegex = /^[a-zA-Z0-9\s,.'-]*$/;

  if (!e) {
    error("Address cannot be empty");
    return false;
  } else if (e.length < 5) {
    error("Address must be at least 5 characters long");
    return false;
  } else if (!addressRegex.test(e)) {
    error(
      "Address can only contain letters, numbers, spaces, commas, periods, apostrophes, and hyphens"
    );
    return false;
  } else {
    error(""); // Clear error if validation passes
    return true;
  }
}

// Phone Number Validation: Allowing 10-15 digits, with optional starting plus (+) for international format
export function validatePhoneNumber({ e, error }) {
  const phoneRegex = /^\+?[0-9]{10,15}$/;

  if (!e) {
    error("Phone number cannot be empty");
    return false;
  } else if (!phoneRegex.test(e)) {
    error("Please enter a valid phone number with 10 to 15 digits");
    return false;
  } else {
    error(""); // Clear error if validation passes
    return true;
  }
}

export function validatePrice({ e, error }) {
  const priceRegex = /^\d+(\.\d{1,2})?$/;

  if (!e) {
    error("Price cannot be empty");
    return false;
  } else if (Number(e) <= 0) {
    error("Price must be greater than 0");
    return false;
  } else if (!priceRegex.test(e)) {
    error("Please enter a valid price (e.g., 100 or 100.99)");
    return false;
  } else {
    error(""); // Clear error if validation passes
    return true;
  }
}

export function validatePriceOptional({ e, error }) {
  const priceRegex = /^\d+(\.\d{1,2})?$/;

  if (Number(e) <= 0) {
    error("Price must be greater than 0");
    return false;
  } else if (!priceRegex.test(e)) {
    error("Please enter a valid price (e.g., 100 or 100.99)");
    return false;
  } else {
    error(""); // Clear error if validation passes
    return true;
  }
}

// Quantity Validation: Allowing only positive integers from 1 to 9999
export function validateQuantity({ e, error }) {
  const quantityRegex = /^[1-9][0-9]{0,3}$/;

  if (!e) {
    error("Quantity cannot be empty");
    return false;
  } else if (!quantityRegex.test(e)) {
    error("Please enter a valid quantity (1–9999)");
    return false;
  } else {
    error(""); // Clear error if validation passes
    return true;
  }
}
