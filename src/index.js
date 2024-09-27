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

async function update(searchstr, selectedOrg) {
    var orgs = `<div style="width: 100vw; height: 100vh; overflow: scroll;">
        <input type="text" id="search" value="${searchstr}" style= "width: 80%; height: 25px; margin: 20px 10% 0 10%; background-color: #d9d9d9; border-radius: 13px; font-size: 20px; padding-left: 10px; padding: right: 10px;"></input>
        <div id="detail" style="float: right; padding: 20px; width: 55%; height: 250px; background-color: blue; margin-right: 40px; margin-top: 20px; background-color: #d9d9d9; border-radius: 10px">
          ${selectedOrg ? 
            `<h3>${selectedOrg['Organization Name']}</h3>
            <p>NOTE: If your organization has no less than 4 signatories, has registration form approved, but is still action required: check if at least 4 signatories agreed to terms and condition</p>
            <p>Registration Form: ${selectedOrg['Reg Form']}</p>
            <p>Number of Signatories: ${selectedOrg['Signatory']}</p>
            <h4>Action Required: <span style="color: ${selectedOrg['T&C'] == 'In Progress' ? 'red' : 'green'}">${(selectedOrg['T&C'] == 'In Progress').toString().toUpperCase()}</span> </h4>` : 'No Organization Selected'}
        </div>
    `
    for (var i=0; i<dat.length; i++) {
      const v = dat[i]
      if (v['Organization Name'].toLowerCase().indexOf(searchstr.toLowerCase()) != -1 || v['Organization ID'].toString().indexOf(searchstr) !== -1) {
          orgs += `<div id=${v['Organization ID'].toString()} style="cursor: pointer; width: 30%; height: 80px; overflow: scroll; background-color: #d9d9d9; margin: 20px; padding: 10px; border-radius: 10px">
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
      document.getElementById(v['Organization ID'].toString()).addEventListener('click', ()=>{
        document.getElementById('detail').innerHTML = "Loading.."
        update(searchstr, v)
      })
    }
    document.getElementById('search').addEventListener('change', (e)=>{update(e.target.value, selectedOrg)})
}

await update('', undefined)