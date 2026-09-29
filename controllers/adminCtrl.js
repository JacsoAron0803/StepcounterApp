async function getAllUsers(){

    let luid = loadUser().ID ? loadUser().ID : 0;
    const response = await fetch(`http://localhost:3000/admin/users`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({luid}),
    });
    

    if (response.status !== 200){
        const res = await response.json();
        showMessage('danger', 'ERROR', res.error);
    }
    else{
        const users = await response.json();
        drawTable(users);
    }
    
    
}
function drawTable(users){


    let usersCount = document.querySelector('#usersCount');
    usersCount.innerHTML = users.length;
    users.forEach((user, index) => {
      addTableRow(user, index);
   });
}
function addTableRow(user, index){

    let tr = document.createElement('tr');

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    let td7 = document.createElement('td');

    td1.innerHTML = (index + 1 )+ ".";
    td2.innerHTML = user.name;
    td3.innerHTML = user.email;
    td4.innerHTML = moment(user.created_at).format('YYYY-MM-DD HH:mm');
    td5.innerHTML = user.last_login ? moment(user.last_login, "YYYYMMDDHmm").fromNow() : 'Never';
    td6.innerHTML = user.login_count;
    td7.innerHTML = `<div class="form-check form-switch float-end"><input class="form-check-input" type="checkbox" role="switch" id="is_active" ` + (user.is_active ? 'checked' : '') + `></div>`;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);



    userList.appendChild(tr);
  };
  async function getStatistics(){
    
    let luid = loadUser().ID ? loadUser().ID : 0;
    const response = await fetch(`http://localhost:3000/admin/statistics`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({luid}),
    });
    

    if (response.status !== 200){
        const res = await response.json();
        showMessage('danger', 'ERROR', res.error);
    }
    else{
        const data = await response.json();
        drawDashboard(data);
    }
    
  }
  function drawDashboard(results){
    let totalSteps = document.querySelector('#totalSteps')
    let totalKm = document.querySelector('#totalKm')
    let avgStep = document.querySelector('#avgSteps')
    let avgKm = document.querySelector('#avgKm')

    totalSteps.innerHTML = results[0][0].total + ' steps';
    totalKm.innerHTML = Math.round((results[0][0].total  * 0.7 / 100)) + ' km';
    avgStep.innerHTML = results[0][0].avg + ' km';
    avgKm.innerHTML = Math.round((results[0][0].avg  * 0.7 / 100)) + ' km';

    let topUsers = document.querySelector('#topUsers');

    results[1].forEach((user, index) => {
        let km = Math.round((user.steps * 0.7 / 100));
        topUsers.innerHTML += `
        <tr>
        <td>${index + 1}.</td>
        <td class="text-start">
        ${user.name} <br> <small>${user.email}</small>
        </td>
        <td class="text-end">${user.steps} steps <br> <small>${km} km</small></td>
        </tr>`;
    }
    )
  }