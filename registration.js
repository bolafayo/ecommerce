const form = document.getElementById('login')
const submitBtn = document.getElementById('submit')
const info = document.getElementById('info')

async function createUser(user) {
  const response = await fetch('https://fakestoreapi.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  return response
}

async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(form)
  const name = formData.get("name")
  const username = formData.get("userName")
  const password = formData.get("password")
  const email = formData.get("email")

  if (name === '' || username === '' || password === '' || email === '') {
    console.log("Please fill every input box");
  } else {
    const user = {
      username,
      password,
      email
    }
    try {
      const response = await createUser(user);
      if (response.ok) {
        const userData = await response.json()
        console.log("user created" , userData)
         info.innerHTML = `<p>User Created: ${userData.username} </p>`;
          form.reset();
         
            } else {
      info.innerHTML = `<p style="color:red;">Failed to create user</p>`;
    
      
      }
    } catch (error) {
      console.error("Error creating user:", error);
       info.innerHTML = `<p style="color:red;">Something went wrong</p>`;
    }

    
  }
  
}

submitBtn.addEventListener('click', (e) => handleSubmit(e))

let storedUsers = [];
try {
  const usersFromStorage = localStorage.getItem('users');
  if (usersFromStorage) {
    storedUsers = JSON.parse(usersFromStorage);
  }
} catch (error) {
  console.error("Error parsing users from localStorage:", error);
}
  info.innerHTML = '';
  for (let i = 0; i < storedUsers.length; i++) {
  const user = storedUsers[i];
  console.log(user);

  const content = `<div>
  <p>${user.name}</p>
  <p>${user.username}</p>
  <p>${user.email}</p>
  </div>`;

  info.innerHTML += content;
}
if (storedUsers.length > 0) {
  info.innerHTML = '';
  storedUsers.forEach(user => {
   info.innerHTML += `<div><p>${user.name}</p></div>`;
});

}

