const blogList = document.getElementById('blog-list');
const addBlogForm = document.getElementById('add-blog-form');

// Function to create a new blog item
function createBlogItem(blog) {
  const blogItem = document.createElement('div');
  blogItem.classList.add('blog-item');
  blogItem.innerHTML = `
    <h2>${blog.title}</h2>
    <p>${blog.body}</p>
    <button class="delete-btn" data-id="${blog.id}">Delete</button>
  `;
  return blogItem;
}

// Function to fetch and display blogs
function fetchAndDisplayBlogs() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => {
      blogList.innerHTML = '';
      data.forEach(blog => {
        const blogItem = createBlogItem(blog);
        blogList.appendChild(blogItem);
      });
    })
    .catch(error => console.log(error));
}

// Function to handle form submission for adding a new blog
function handleAddBlogForm(event) {
  event.preventDefault();

  const titleInput = document.getElementById('title');
  const contentInput = document.getElementById('content');

  const newBlog = {
    title: titleInput.value,
    body: contentInput.value,
    userId: 1 // Hardcoded user ID for simplicity
  };

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newBlog)
  })
    .then(response => response.json())
    .then(blog => {
      const blogItem = createBlogItem(blog);
      blogList.appendChild(blogItem);

      titleInput.value = '';
      contentInput.value = '';
    })
    .catch(error => console.log(error));
}

// Function to handle delete button click
function handleDeleteButtonClick(event) {
  if (event.target.classList.contains('delete-btn')) {
    const blogId = event.target.getAttribute('data-id');
    fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
      method: 'DELETE'
    })
      .then(() => {
        const blogItem = event.target.closest('.blog-item');
        blogItem.remove();
      })
      .catch(error => console.log(error));
  }
}

// Event listeners
addBlogForm.addEventListener('submit', handleAddBlogForm);
blogList.addEventListener('click', handleDeleteButtonClick);

// Fetch and display blogs on page load
fetchAndDisplayBlogs();
