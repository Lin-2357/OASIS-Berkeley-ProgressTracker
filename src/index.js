async function getData() {
    const url = "./src/NewRaw.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      return json
    } catch (error) {
      console.error(error.message);
    }
  }

const dat = await getData()

var selectedOrg = -1

function updatecolor() {
  for (var i=0; i<dat.length; i++) {
    const v = dat[i]
    if (document.getElementById(v['Organization ID'].toString())) {
      document.getElementById(v['Organization ID'].toString()).style.backgroundColor = selectedOrg===v['Organization ID']? "#a0a0a0" : "#d9d9d9"
    }
  }
}

async function update(searchstr) {
    var orgs = `<div style="width: 100vw; min-width: 400px; height: 100vh; overflow-Y: scroll;">
        <h2>UCB Student Organization Registration Progress Tracker</h2>
        <input type="text" id="search" value="${searchstr}" placeholder="search your organization here" style="padding: 5px; width: 80%; height: 25px; margin: 20px 10% 20px 10%; background-color: #d9d9d9; border-radius: 13px; font-size: 20px; padding-left: 10px; padding: right: 10px;"></input>
        <div id="detail" style="float: right; padding: 20px; width: 45%; border: 2px black solid; min-width: 150px; min-height: 250px; background-color: blue; margin-right: 40px; margin-top: 20px; background-color: #d9d9d9; border-radius: 10px">
            No Organization selected
        </div>
    `
    for (var i=0; i<dat.length; i++) {
      const v = dat[i]
      if (v['Organization Name'].toLowerCase().indexOf(searchstr.toLowerCase()) != -1 || v['Organization ID'].toString().indexOf(searchstr) !== -1) {
          orgs += `<div id="${v['Organization ID'].toString()}" style="cursor: pointer; min-width: 150px; width: 30%; height: 80px; overflow: scroll; background-color: #d9d9d9; border: 2px solid black; margin: 20px; padding: 10px; border-radius: 10px">
              <div>${v['Organization Name']}</div>
              <div>ID: ${v['Organization ID']}</div>
              <div>STATUS: ${v['Org Type']}</div>
          </div>`
      }
    }
    orgs += `</div>`
    document.body.innerHTML = orgs
    for (var i=0; i<dat.length; i++) {
      const v = dat[i]
      if (document.getElementById(v['Organization ID'].toString())) {
        document.getElementById(v['Organization ID'].toString()).addEventListener('click', ()=>{
          selectedOrg = v['Organization ID']
          updatecolor()
          document.getElementById('detail').innerHTML = `<h3>${v['Organization Name']}</h3>
              <p>NOTE: If your organization has no less than 4 signatories, has registration form approved, but is still action required: check if <b>at least 4 signatories agreed to terms and condition</b></p>
              <p>Registration Form: ${v['Reg Form']} - Use [insert link] to complete registration form</p>
              <p>Number of Signatories: ${v['Signatory']} - Use <a href="https://callink.berkeley.edu/event/8110681">https://callink.berkeley.edu/event/8110681</a> to complete signatory training</p>
              <h4>Action Required: <span style="color: ${v['T&C'] == 'In Progress' ? 'red' : 'green'}">${(v['T&C'] == 'In Progress').toString().toUpperCase()}</span> </h4>
              <p>for more information, please contact your organization advisor <span style="color: #1010d9">${v['OASIS Center Advisor']}</span></p>`
        })
      }
    }
    document.getElementById('search').addEventListener('change', (e)=>{
      if (e.target.value != searchstr) {
        update(e.target.value)
      }
    })
}

await update('')