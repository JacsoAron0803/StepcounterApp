let contentBox = document.getElementById('content');
async function navigate(page){
 contentBox.innerHTML = await (await fetch(`views/${page}.html`)).text();
}
navigate('users/home');