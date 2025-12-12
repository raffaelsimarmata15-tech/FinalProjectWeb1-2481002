// PENTING: Diganti sesuai 2 digit terakhir NIM Anda (02)
const postNumber = 2; 

// API endpoint
const apiUrl = `https://jsonplaceholder.typicode.com/posts/${postNumber}`;

// Get elements
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const errorMessage = document.getElementById('errorMessage');
const postContent = document.getElementById('postContent');
const postId = document.getElementById('postId');
const postTitle = document.getElementById('postTitle');
const postBody = document.getElementById('postBody');
const userId = document.getElementById('userId');
const apiEndpoint = document.getElementById('apiEndpoint');

// Function to fetch post data
async function fetchPostData() {
  try {
    // Show loading indicator
    loading.classList.remove('hidden');
    error.classList.add('hidden');
    postContent.classList.add('hidden');

    // Fetch data from API
    const response = await fetch(apiUrl);

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse JSON data
    const data = await response.json();

    // Display the data
    displayPostData(data);

  } catch (err) {
    // Handle errors
    showError(err.message);
  } finally {
    // Hide loading indicator
    loading.classList.add('hidden');
  }
}

// Function to display post data
function displayPostData(data) {
  // Populate the elements with data
  postId.textContent = data.id;
  postTitle.textContent = capitalizeFirstLetter(data.title);
  postBody.textContent = capitalizeFirstLetter(data.body);
  userId.textContent = data.userId;
  apiEndpoint.textContent = apiUrl;

  // Show post content
  postContent.classList.remove('hidden');
}

// Function to show error message
function showError(message) {
  errorMessage.textContent = message;
  error.classList.remove('hidden');
}

// Function to capitalize first letter
function capitalizeFirstLetter(string) {
  if (!string) return ""; // Safety check
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Fetch data when page loads
document.addEventListener('DOMContentLoaded', function() {
  fetchPostData();
});

// Optional: You can also add a button to fetch different posts
function fetchSpecificPost(postNum) {
  const newUrl = `https://jsonplaceholder.typicode.com/posts/${postNum}`;
  
  loading.classList.remove('hidden');
  error.classList.add('hidden');
  postContent.classList.add('hidden');
  
  fetch(newUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      displayPostData(data);
      apiEndpoint.textContent = newUrl;
    })
    .catch(err => {
      showError(err.message);
    })
    .finally(() => {
      loading.classList.add('hidden');
    });
}