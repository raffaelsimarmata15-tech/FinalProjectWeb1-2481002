// Get form and elements
const form = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');

// Function to show error message
function showError(fieldId, message) {
  const errorElement = document.getElementById(fieldId + 'Error');
  const inputElement = document.getElementById(fieldId) || document.querySelector(`[name="${fieldId}"]`);
  
  errorElement.textContent = message;
  errorElement.classList.remove('hidden');
  
  if (inputElement) {
    inputElement.classList.add('border-ducati-red');
  }
}

// Function to clear error message
function clearError(fieldId) {
  const errorElement = document.getElementById(fieldId + 'Error');
  const inputElement = document.getElementById(fieldId) || document.querySelector(`[name="${fieldId}"]`);
  
  errorElement.textContent = '';
  errorElement.classList.add('hidden');
  
  if (inputElement) {
    inputElement.classList.remove('border-ducati-red');
  }
}

// Function to clear all errors
function clearAllErrors() {
  const errorElements = document.querySelectorAll('[id$="Error"]');
  errorElements.forEach(element => {
    element.classList.add('hidden');
    element.textContent = '';
  });
  
  const inputElements = document.querySelectorAll('input, select, textarea');
  inputElements.forEach(element => {
    element.classList.remove('border-ducati-red');
  });
}

// Validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone number (only numbers, minimum 10 digits)
function validatePhone(phone) {
  const phoneRegex = /^[0-9]+$/;
  return phoneRegex.test(phone) && phone.length >= 10;
}

// Function to validate form
function validateForm() {
  clearAllErrors();
  let isValid = true;

  // Validate Full Name
  const fullName = document.getElementById('fullName').value.trim();
  if (fullName === '') {
    showError('fullName', 'Full name is required');
    isValid = false;
  }

  // Validate NIM
  const nim = document.getElementById('nim').value.trim();
  if (nim === '') {
    showError('nim', 'Student ID (NIM) is required');
    isValid = false;
  }

  // Validate Email
  const email = document.getElementById('email').value.trim();
  if (email === '') {
    showError('email', 'Email address is required');
    isValid = false;
  } else if (!validateEmail(email)) {
    showError('email', 'Please enter a valid email address');
    isValid = false;
  }

  // Validate Faculty
  const faculty = document.getElementById('faculty').value;
  if (faculty === '') {
    showError('faculty', 'Please select a faculty/major');
    isValid = false;
  }

  // Validate Date of Birth
  const dob = document.getElementById('dob').value;
  if (dob === '') {
    showError('dob', 'Date of birth is required');
    isValid = false;
  }

  // Validate Gender
  const gender = document.querySelector('input[name="gender"]:checked');
  if (!gender) {
    showError('gender', 'Please select your gender');
    isValid = false;
  }

  // Validate Address
  const address = document.getElementById('address').value.trim();
  if (address === '') {
    showError('address', 'Address is required');
    isValid = false;
  }

  // Validate Phone
  const phone = document.getElementById('phone').value.trim();
  if (phone === '') {
    showError('phone', 'Phone number is required');
    isValid = false;
  } else if (!/^[0-9]+$/.test(phone)) {
    showError('phone', 'Phone number must contain only numbers');
    isValid = false;
  } else if (phone.length < 10) {
    showError('phone', 'Phone number must be at least 10 digits');
    isValid = false;
  }

  return isValid;
}

// Function to clear form
function clearForm() {
  form.reset();
}

// Function to show success message
function showSuccessMessage() {
  successMessage.classList.remove('hidden');
  
  // Scroll to success message
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Hide success message after 5 seconds
  setTimeout(() => {
    successMessage.classList.add('hidden');
  }, 5000);
}

// Add event listener to form submit
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  if (validateForm()) {
    // If validation passes
    showSuccessMessage();
    
    // Clear form after 1 second
    setTimeout(() => {
      clearForm();
    }, 1000);
  } else {
    // Scroll to first error
    const firstError = document.querySelector('[id$="Error"]:not(.hidden)');
    if (firstError) {
      firstError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
});

// Add real-time validation on input blur
const inputs = form.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
  input.addEventListener('blur', function() {
    const fieldName = this.id || this.name;
    
    // Only validate if field has been touched
    if (this.value.trim() !== '' || this.type === 'radio') {
      // Re-validate the specific field
      if (fieldName === 'fullName' && this.value.trim() === '') {
        showError('fullName', 'Full name is required');
      } else if (fieldName === 'email') {
        if (this.value.trim() === '') {
          showError('email', 'Email address is required');
        } else if (!validateEmail(this.value.trim())) {
          showError('email', 'Please enter a valid email address');
        } else {
          clearError('email');
        }
      } else if (fieldName === 'phone') {
        if (this.value.trim() === '') {
          showError('phone', 'Phone number is required');
        } else if (!/^[0-9]+$/.test(this.value.trim())) {
          showError('phone', 'Phone number must contain only numbers');
        } else if (this.value.trim().length < 10) {
          showError('phone', 'Phone number must be at least 10 digits');
        } else {
          clearError('phone');
        }
      }
    }
  });
  
  // Clear error on input
  input.addEventListener('input', function() {
    const fieldName = this.id || this.name;
    if (this.value.trim() !== '') {
      clearError(fieldName);
    }
  });
});