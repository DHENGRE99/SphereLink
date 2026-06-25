async function createPost() {

  const content =
  document.getElementById(
    "postContent"
  ).value;

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  const response = await fetch(
    `${API_URL}/posts`,
    {
      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify({
        user_id:user.id,
        content
      })
    }
  );

  if(response.ok){

    alert("Post Created");

    loadPosts();

    document.getElementById(
      "postContent"
    ).value="";
  }
}

async function loadPosts(){

  const response =
  await fetch(
    `${API_URL}/posts`
  );

  const posts =
  await response.json();

  let html = "";

  posts.forEach(post => {

    html += `
      <div class="post">
        <h4>${post.username}</h4>
        <p>${post.content}</p>
      </div>
    `;
  });

  document.getElementById(
    "postsContainer"
  ).innerHTML = html;
}

function logout(){

  localStorage.clear();

  window.location.href =
  "login.html";
}

loadPosts();