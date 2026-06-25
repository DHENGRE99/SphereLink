const user =
JSON.parse(
localStorage.getItem("user")
);

if(document.getElementById("username")){

    document.getElementById(
        "username"
    ).innerText =
    user.username;

    document.getElementById(
        "email"
    ).innerText =
    user.email;
}

async function loadUsers(){

    const response =
    await fetch(
        `${API_URL}/users`
    );

    const users =
    await response.json();

    let html = "";

    users.forEach(u => {

        html += `
        <div class="user-card">

            <h3>${u.username}</h3>

            <p>${u.email}</p>

            <button onclick="followUser(${u.id})">
                Follow
            </button>

        </div>
        `;
    });

    const container =
    document.getElementById(
        "usersContainer"
    );

    if(container){
        container.innerHTML = html;
    }
}

async function followUser(id){

    await fetch(
        `${API_URL}/follow/${id}`,
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                follower_id:user.id
            })
        }
    );

    alert("User Followed");
}

loadUsers();