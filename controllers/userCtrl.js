
async function registration(){
    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let passwd = document.querySelector('#passwd').value;
    let confirm = document.querySelector('#confirm').value;

    //meg kell szolitani a szervert
    
    let user = {
        name, // name: name mivel ugyanaz a ket valtozo nev
        email,
        passwd, 
        confirm
    }

   const response = await fetch(`http://localhost:3000/users/register`,{
        method: 'POST',
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(user),
    });

   const res = await response.json();

    if (response.status != 201){
        showMessage('danger', 'ERROR', res.error)
    }
    else{
        showMessage('success', 'OK', res.message)
        navigate('users/login')
    }
}