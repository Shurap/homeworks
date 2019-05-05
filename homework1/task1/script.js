const userName = prompt('Enter youre name:');

function renamed(userName) {
  if (userName.search(/[0-9]/) === -1) {
    return newName = userName.split('').reverse().join('');
  } else {
      const newName = userName.split('').map((element, index) => {
      if (index % 2) {
        return element.toUpperCase();
      } else {
        return element;
      }
    });
    return newName.join('');
  }    
}

alert(renamed(userName));


  
