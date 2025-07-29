const form = document.getElementById('login');
const submitBtn = document.getElementById('submit');
const info = document.getElementById('info');

function generateFakeToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

async function createUser(user) {
  const response = await fetch('https://fakestoreapi.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  return response;
}

async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const name = formData.get("name");
  const username = formData.get("username");
  const password = formData.get("password");
  const email = formData.get("email");

  if (!name || !username || !password || !email) {
    info.innerHTML = `<p style="color:red;">Please fill every input box</p>`;
    return;
  }

  const user = {
    username,
    password,
    email,
    name: {
      firstname: name.split(" ")[0] || "",
      lastname: name.split(" ")[1] || ""
    }
  };

  try {
    const response = await createUser(user);
    const userData = await response.json();
    console.log("User created:", userData);

    if (response.ok) {
     
      let storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      storedUsers.push(user);
      localStorage.setItem('users', JSON.stringify(storedUsers));

      
      const token = generateFakeToken();
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      info.innerHTML = `<p style="color:green;">User created successfully. Redirecting...</p>`;
      form.reset();

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    } else {
      info.innerHTML = `<p style="color:red;">Failed to create user</p>`;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    info.innerHTML = `<p style="color:red;">Something went wrong</p>`;
  }
}

submitBtn.addEventListener('click', handleSubmit);

let storedUsers = [];
try {
  const usersFromStorage = localStorage.getItem('users');
  if (usersFromStorage) {
    storedUsers = JSON.parse(usersFromStorage);
  }
} catch (error) {
  console.error("Error parsing users from localStorage:", error);
}





