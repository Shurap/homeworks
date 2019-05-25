const userName = prompt('Enter youre name:');

function transformName(userName) {
  if (userName.search(/[0-9]/) === -1) {
    return userName.split('').reverse().join('');
  } else {
      const newName = userName.split('').map((element, index) => {
        return index % 2 ? element.toUpperCase() : element;
    });
    return newName.join('');
  }    
}

alert(transformName(userName));


  
