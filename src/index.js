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

async function update(searchstr) {
    const dat = await getData()
    var orgs = `<div style="width: 100vw; height: 100vh; overflow: scroll;">
        <input type="text" id="search" value="${searchstr}" style= "width: 80%; height: 25px; margin: 20px 10% 0 10%; background-color: #d9d9d9; border-radius: 13px; font-size: 20px; padding-left: 10px; padding: right: 10px;"></input>
    `
    dat.map((v)=>{
        if (v['Organization Name'].toLowerCase().indexOf(searchstr.toLowerCase()) != -1 || v['Organization ID'].toString().indexOf(searchstr) !== -1) {
            orgs += `<div id=${v['Organization ID']} style="width: 30%; height: 80px; overflow: scroll; background-color: #d9d9d9; margin: 20px; padding: 10px; border-radius: 10px">
                <div>${v['Organization Name']}</div>
                <div>ID: ${v['Organization ID']}</div>
                <div>STATUS: ${v['Org Type']}</div>
            </div>`
        }
    });
    orgs += `</div>`
    document.body.innerHTML = orgs
    document.getElementById('search').addEventListener('change', (e)=>{update(e.target.value)})
}

await update('')