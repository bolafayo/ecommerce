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
  const username = formData.get("username")
  const password = formData.get("password")
  const email = formData.get("email")

  if (name === '' || username === '' || password === '' || email === '') {
    console.log("Please fill every input box");
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
  },
    }
    try {
      const response = await createUser(user);
       const userData = await response.json()
        console.log(user)
        
      if (response.ok) {
        storedUsers.push(user);
        localStorage.setItem('users', JSON.stringify(storedUsers));
       
          form.reset();
         
            } else {
      info.innerHTML = `<p style="color:red;">Failed to create user</p>`;
    
      
      }
    } catch (error) {
      console.error("Error creating user:", error);
       info.innerHTML = `<p style="color:red;">Something went wrong</p>`;
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
const content=` <div>
 <p>Name: ${user.name.firstname}</p>
  <p>Username:${user.username}</p>
  <p>Email: ${user.email}</p>
  </div>`;
  console.log(user);
  info.innerHTML += content;
}






