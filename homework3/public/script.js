createPageHome();

function createPageHome() {
  const buttonHtml = '<button onclick="addNewElement()">Add new element</button>'
  const divPageHome = document.createElement('div');
  divPageHome.id = 'divPageHome';
  const table = document.createElement('table');
  table.id = 'table';
  table.innerHTML = '<tr>\
                      <td>type</td>\
                      <td>maked</td>\
                      <td>number CPU</td>\
                      <td>processor type</td>\
                      <td>videocard type</td>\
                      <td>HDD type</td>\
                      <td>HDD size</td>\
                      <td>monitor size (notebook) / type server (server)</td>\
                      <td>battery (notebook) / power server (server)</td>\
                    </tr>';
  dpd.computers.get((result, error) => {
    result.forEach((element) => {
      let tableHtml = '<tr><td>' + element.type + '</td>';
      tableHtml += '<td>' + element.manufactured + '</td>';
      tableHtml += '<td>' + element.numberCpuCores + '</td>';
      tableHtml += '<td>' + element.processorType + '</td>';
      tableHtml += '<td>' + element.videocardType + '</td>';
      tableHtml += '<td>' + element.hddType + '</td>';
      tableHtml += '<td>' + element.hddSize + '</td>';
      tableHtml += '<td>' + (element.monitorSizeNotebook || element.typeServer) + '</td>';
      tableHtml += '<td>' + (element.batteryNotebook || element.powerServer) + '</td>';
      tableHtml += '<td><button onClick="onPressTableButton(event)" data-id=' + element.id + '>Info</button></td></tr>'
      table.innerHTML += tableHtml;
    });
  });
  divPageHome.innerHTML = buttonHtml;
  divPageHome.appendChild(table);
  document.body.appendChild(divPageHome);
}

function createPageAddNewElement() {
  const divPageAdd = document.createElement('div');
  divPageAdd.id = 'divPageAdd';
  const divPageAddHtml = '<form class="wrapper" onsubmit="onSubmit(event)" style="border: 1px solid blue">\
                            <select id="select" name="select">\
                              <option value="notebook" selected>Notebook</option>\
                              <option value="server">Server</option>\
                            </select>\
                            <input name="manufactured" type="text" placeholder="manufactured" />\
                            <input name="numberCpuCores" type="text" placeholder="numberCpuCores" />\
                            <input name="processorType" type="text" placeholder="processorType" />\
                            <input name="videocardType" type="text" placeholder="videocardType" />\
                            <input name="hddType" type="text" placeholder="hddType" />\
                            <input name="hddSize" type="text" placeholder="hddSize" />\
                            <input name="monitorSizeNotebook" type="text" placeholder="monitorSizeNotebook" />\
                            <input name="batteryNotebook" type="text" placeholder="batteryNotebook" />\
                            <input name="typeServer" type="text" placeholder="typeServer" disabled="true" />\
                            <input name="powerServer" type="text" placeholder="powerServer" disabled="true" />\
                            <input type="submit">\
                          </form>\
                          <button onclick="exitToHomePage()">Exit</button>';
  divPageAdd.innerHTML = divPageAddHtml;
  document.body.appendChild(divPageAdd);
  select.addEventListener('change', () => {
    if (document.getElementById('select').value === 'server') {
      document.querySelector('input[name=monitorSizeNotebook]').disabled = true;
      document.querySelector('input[name=batteryNotebook]').disabled = true;
      document.querySelector('input[name=typeServer]').disabled = false;
      document.querySelector('input[name=powerServer]').disabled = false;
    }
    if (document.getElementById('select').value === 'notebook') {
      document.querySelector('input[name=monitorSizeNotebook]').disabled = false;
      document.querySelector('input[name=batteryNotebook]').disabled = false;
      document.querySelector('input[name=typeServer]').disabled = true;
      document.querySelector('input[name=powerServer]').disabled = true;
    }
  });
}

function createPageInfoAboutElement() {
  const divPageInfo = document.createElement('div');
  divPageInfo.id = 'divPageInfo';
  const table = document.createElement('table');
  table.id = 'tableInfo';
  divPageInfo.innerHTML = '<button onclick="closePageInfoAboutElement()">Close</button>\
                          <button id="deleteButton" onclick="deleteElement(event)">Delete this element</button>';
  table.innerHTML = '<tr>\
                      <td>type</td>\
                      <td>maked</td>\
                      <td>number CPU</td>\
                      <td>processor type</td>\
                      <td>videocard type</td>\
                      <td>HDD type</td>\
                      <td>HDD size</td>\
                      <td>monitor size (notebook) / type server (server)</td>\
                      <td>battery (notebook) / power server (server)</td>\
                    </tr>'
  divPageInfo.appendChild(table);
  document.body.appendChild(divPageInfo);
}

function addNewElement() {
  document.getElementById('divPageHome').remove();
  createPageAddNewElement();
}

closePageInfoAboutElement = () => {
  document.getElementById('divPageInfo').remove();
  createPageHome();
}

exitToHomePage = () => {
  document.getElementById('divPageAdd').remove();
  createPageHome();
}

deleteElement = (event) => {
  dpd.computers.del(event.target.dataset.id, (error) => {
    if (error) console.log(error);
    closePageInfoAboutElement()
  })
}

const onPressTableButton = (event) => {
  document.getElementById('divPageHome').remove();
  createPageInfoAboutElement();
  dpd.computers.get(event.target.dataset.id, (result, error) => {
    if (error) return console.log(error);
    table = document.getElementById('tableInfo');
    table.innerHTML += '<td>' + result.type + '</td>' +
      '<td>' + result.manufactured + '</td>' +
      '<td>' + result.numberCpuCores + '</td>' +
      '<td>' + result.processorType + '</td>' +
      '<td>' + result.videocardType + '</td>' +
      '<td>' + result.hddType + '</td>' +
      '<td>' + result.hddSize + '</td>' +
      '<td>' + (result.monitorSizeNotebook || result.typeServer) + '</td>' +
      '<td>' + (result.batteryNotebook || result.powerServer) + '</td>'
      document.getElementById('deleteButton').dataset.id = event.target.dataset.id;
  });
};

onSubmit = (event) => {
  event.preventDefault();
  dpd.computers.post({
    'type': document.querySelector('select').options[document.querySelector('select').selectedIndex].text,
    'manufactured': document.querySelector('input[name=manufactured]').value,
    'numberCpuCores': document.querySelector('input[name=numberCpuCores]').value,
    'processorType': document.querySelector('input[name=processorType]').value,
    'videocardType': document.querySelector('input[name=videocardType]').value,
    'hddType': document.querySelector('input[name=hddType]').value,
    'hddSize': document.querySelector('input[name=hddSize]').value,
    'monitorSizeNotebook': document.querySelector('input[name=monitorSizeNotebook]').value,
    'batteryNotebook': document.querySelector('input[name=batteryNotebook]').value,
    'typeServer': document.querySelector('input[name=typeServer]').value,
    'powerServer': document.querySelector('input[name=powerServer]').value
  },
    function (result, error) {
      if (error) return console.log(error);
    });

  document.getElementById('divPageAdd').remove();
  createPageHome();
}
