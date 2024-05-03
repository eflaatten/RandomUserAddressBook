let users = document.getElementById('user-list');

const getUsers = async () => {
  try {
    const response = await fetch("https://randomuser.me/api/?results=10")
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    data.results.map((user) => {
      let userElement = document.createElement('li');
      userElement.classList.add('user-item')
      userElement.innerHTML = `
        <img src="${user.picture.thumbnail}" alt="${user.name.first}">
        <p>${user.name.first}
      `;
      users.appendChild(userElement);
    });
  } catch (error) {
    console.log('Unable to fetch users')
  }
}

window.onload = getUsers;