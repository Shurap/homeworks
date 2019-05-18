const arrayComputers = [];

createPageHome(arrayComputers);

function createPageHome(arrayComputers) {
  const buttonHtml = '<button onclick="addNewElement()">Add</button>'
  const divPageHome = document.createElement('div');
  divPageHome.id = 'divPageHome';
  const table = document.createElement('table');
  table.id = 'table';
  let tableHtml = '<tr>\
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

  arrayComputers.forEach((element) => {
    tableHtml += '<tr><td>' + element.getValue('type') + '</td>';
    tableHtml += '<td>' + element.getValue('manufactured') + '</td>';
    tableHtml += '<td>' + element.getValue('numberCpuCores') + '</td>';
    tableHtml += '<td>' + element.getValue('processorType') + '</td>';
    tableHtml += '<td>' + element.getValue('videocardType') + '</td>';
    tableHtml += '<td>' + element.getValue('hddType') + '</td>';
    tableHtml += '<td>' + element.getValue('hddSize') + '</td>';
    tableHtml += '<td>' + (element.getValue('monitorSizeNotebook') || element.getValue('typeServer')) + '</td>';
    tableHtml += '<td>' + (element.getValue('batteryNotebook') || element.getValue('powerServer')) + '</td></tr>';
  });

  table.innerHTML = tableHtml;
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
                          </form>';
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

function addNewElement() {
  document.getElementById('divPageHome').remove();
  createPageAddNewElement();
}

function Computer() {
  const prop = {
    type: null,
    manufactured: null,
    numberCpuCores: null,
    processorType: null,
    videocardType: null,
    hddType: null,
    hddSize: null
  }
  this.setValue = (name, value) => {
    prop[name] = value;
  };
  this.getValue = (name) => {
    return prop[name];
  };
}

function Notebook() {
  Computer.call(this);
  const prop = {
    monitorSizeNotebook: null,
    batteryNotebook: null
  }
}

function Server() {
  Computer.call(this);
  const prop = {
    typeServer: null,
    powerServer: null
  }
}

onSubmit = (event) => {
  event.preventDefault();

  var newComputer = {};

  if (select.value === 'notebook') {
    newComputer = new Notebook();
    newComputer.setValue('monitorSizeNotebook', document.querySelector('input[name=monitorSizeNotebook]').value);
    newComputer.setValue('batteryNotebook', document.querySelector('input[name=batteryNotebook]').value);
  }

  if (select.value === 'server') {
    newComputer = new Server();
    newComputer.setValue('typeServer', document.querySelector('input[name=typeServer]').value);
    newComputer.setValue('powerServer', document.querySelector('input[name=powerServer]').value);
  }

  newComputer.setValue('type', document.querySelector('select').options[document.querySelector('select').selectedIndex].text);
  newComputer.setValue('manufactured', document.querySelector('input[name=manufactured]').value);
  newComputer.setValue('numberCpuCores', document.querySelector('input[name=numberCpuCores]').value);
  newComputer.setValue('processorType', document.querySelector('input[name=processorType]').value);
  newComputer.setValue('videocardType', document.querySelector('input[name=videocardType]').value);
  newComputer.setValue('hddType', document.querySelector('input[name=hddType]').value);
  newComputer.setValue('hddSize', document.querySelector('input[name=hddSize]').value);

  arrayComputers.push(newComputer);
  document.getElementById('divPageAdd').remove();
  createPageHome(arrayComputers);
}
