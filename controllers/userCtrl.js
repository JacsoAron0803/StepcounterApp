
async function registration(){
    let name = document.querySelector('#name');
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let confirm = document.querySelector('#confirm');

    //meg kell szolitani a szervert

   const response =await  fetch(`http://localhost:3000/admin/users`);

   const data = await response.json();

   console.log(data);
}