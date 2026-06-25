async function registerUser() {

    const username =
    document.getElementById("username").value;

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const response = await fetch(
        `${API_URL}/auth/register`,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                username,
                email,
                password
            })
        }
    );

    const data =
    await response.json();

    alert(data.message);

    window.location.href =
    "login.html";
}

async function loginUser(){

    const email =
    document.getElementById("email").value;

    const password =
    document.getElementById("password").value;

    const response = await fetch(
        `${API_URL}/auth/login`,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                email,
                password
            })
        }
    );

    const data =
    await response.json();

    localStorage.setItem(
        "token",
        data.token
    );

    localStorage.setItem(
        "user",
        JSON.stringify(data.user)
    );

    window.location.href =
    "dashboard.html";
}