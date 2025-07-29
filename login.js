document.getElementById("loginForm").addEventListener("submit", async(e) =>{
  e.preventDefault()

    const form = e.target
    const username = form.username.value.trim()
    const password = form.password.value.trim()

    if (!username || !password) {
       vanillaToasts.create({
        title:"Missing info",
        text:"Please enter both username and password",
        type: "warning",
        timeout:3000
       }) 
       return
    }
    try {
        const res = await fetch("https://fakestoreapi.com/auth/login",{
            method: "POST",
            headers:{ "Content-Type": "application/json" },
            body: JSON.stringify({ username,  password})
        })

        const data = await res.json()

        if(data.token){
            localStorage.setItem("token" , data.token)
            localStorage.setItem("username", username)

            vanillaToasts.create({
                title: "Login successful",
                text: `Welcome, ${username}!`,
                type:"success",
                timeout: 3000

            })
            setTimeout(() => window.location.href = "index.html" , 1000 );
             } else {
               VanillaToasts.create({
        title: "Login Failed",
        text: "Invalid credentials.",
        type: "error",
        timeout: 3000
      });
    
        }
    } catch (error) {
        VanillaToasts.create({
      title: "Login Failed",
      text: "Invalid credentials or server error.",
      type: "error",
      timeout: 3000
    });
        
    }

})
  