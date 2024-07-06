// todo - when user clicks on set then store its name in localstorage and disable the name input and when it clicks unset then delete the data with the key 'name'

function onSet() {
    const setNameBtn = document.getElementById('setName');
    const nameEntry = document.getElementById('name-entry');

    const name = nameEntry.value.trim(); // Trim leading/trailing spaces

    if (name) {
      localStorage.setItem('name', name);
      nameEntry.value = name; // Clear input field after storing
      nameEntry.disabled = true;
      setNameBtn.disabled = true; // Disable the Set button
    } else {
      alert('Please enter a name before setting.');
    }
  }

  function onUnSet() {
    const nameEntry = document.getElementById('name-entry');
    const setNameBtn = document.getElementById('setName');

    localStorage.removeItem('name');
    nameEntry.value = ''; // Clear input field after unset
    nameEntry.disabled = false;
    setNameBtn.disabled = false; // Enable the Set button again
  }

  /* test
  const storedName = localStorage.getItem('name');
  if (storedName) {
    document.getElementById('name-entry').value = storedName;
    document.getElementById('name-entry').disabled = true;
    document.getElementById('setName').disabled = true; // Disable if name is already set
  }
    */