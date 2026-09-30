async function getUserSteps(){
    let luid = loadUser().ID ? loadUser().ID : 0;
    const response = await fetch(`http://localhost:3000/steps/${luid}?luid=${luid}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.status !== 200){

        const res = await response.json();
        showMessage('danger', 'ERROR', res.error);
    }
    else{

        const results = await response.json();
        console.log(results);
        drawStepsTable(results);

    }
}


function drawStepsTable(results) {

    let stepsList = document.querySelector('#stepsList');
    stepsList.innerHTML = '';
    let totalSteps = 0;

    results.forEach((step, index) => {



        console.log("STEP OBJECT:", step);
    console.log("STEP ID:", step.ID);
        totalSteps += step.step_count;

        stepsList.innerHTML += `
            <tr>
                <th scope="row">${index + 1}</th>

                <td>
                    ${moment(step.date).format('YYYY.MM.DD')}
                </td>

                <td scope="row" class="text-end">
                    ${step.step_count}
                </td>

                <td class="text-end">
                    <button type="button" class="btn btn-danger" onclick="deleteSteps(${step.ID})">
                        <i class="bi bi-trash3-fill"></i>
                        &nbsp;&nbsp;Delete
                    </button>
                </td>
            </tr>
        `;
    });

    stepsList.innerHTML += `
        <tr class="tfoot">
            <td colspan="2">
                <strong>Summary:</strong>
            </td>

            <td class="text-end">
                <strong>${totalSteps * 0.7 / 1000} km</strong>
            </td>

            <td></td>
        </tr>
    `;
}
async function addSteps() {

    let luid = loadUser().ID ? loadUser().ID : 0;
    let date = document.querySelector('#date').value;
    let steps = document.querySelector('#stepcount').value;

    if (!date || !steps) {
        showMessage('danger', 'ERROR', 'Please fill in all fields!');
        return;
    }

    const response = await fetch('http://localhost:3000/steps', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            steps: steps,
            luid: luid,
            date: date
        })
    });

    const res = await response.json();

    if (response.status !== 201) {
        showMessage('danger', 'ERROR', res.error);
        return;
    }

    showMessage('success', 'SUCCESS', res.message);

    document.querySelector('#date').value = '';
    document.querySelector('#stepcount').value = '';

    getUserSteps();
}

async function deleteSteps(stepID) {
        let luid = loadUser().ID ? loadUser().ID : 0;




    const response = await fetch(`http://localhost:3000/steps/${stepID}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            luid: luid
        })
    });

    const res = await response.json();

    if (response.status !== 200) {
        showMessage('danger', 'ERROR', res.error);
        return;
    }

    showMessage('success', 'SUCCESS', res.message);

    getUserSteps();
}
    