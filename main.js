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
        <img src="${user.picture.thumbnail}">
        <p>${user.name.first}</p>
      `;

      // Create a dropdown element
      let dropdown = document.createElement('div');
      dropdown.className = 'dropdown-content'
      dropdown.classList.add('dropdown');

      // Format the date of birth to MM/DD/YYYY
      const dob = new Date(user.dob.date);
      const formattedDate = `${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear()}`;

      // Info shown in the dropdown
      dropdown.innerHTML = `
        <p>Gender: ${user.gender}</p>
        <p>Email: ${user.email}</p>
        <p>Phone: ${user.phone}</p>
        <p>DOB: ${formattedDate}</p>
        <p>Location: ${user.location.city}, ${user.location.country}</p>
      `;

      dropdown.style.display = 'none'
      userElement.appendChild(dropdown)

      // Add click event to show/hide dropdown
      userElement.addEventListener('click', () => {
        if(dropdown.style.display === 'none') {
          dropdown.style.display = 'block'
        } else {
          dropdown.style.display = 'none'
        }
      })

      //Tooltip - show more
      let tooltip = document.createElement('div')
      tooltip.innerHTML = 'Click to see more info'
      tooltip.className = 'tooltip'
      userElement.appendChild(tooltip)
      
      // Tooltip - show less
      let tooltipLess = document.createElement('div')
      tooltipLess.innerHTML = 'Click to hide info'
      tooltipLess.className = 'tooltip-less'
      dropdown.appendChild(tooltipLess)

      userElement.addEventListener('mouseover', () => {
        if(dropdown.style.display === 'none') {
          tooltip.style.visibility = 'visible'
          tooltipLess.style.visibility = 'hidden'
        } else {
          tooltip.style.visibility = 'hidden'
          tooltipLess.style.visibility = 'visible'
        }
      })

      userElement.addEventListener('mouseout', () => {
        tooltip.style.visibility = 'hidden'
        tooltipLess.style.visibility = 'hidden'
      })

      users.appendChild(userElement);
    });

  } catch (error) {
    console.log('Unable to fetch users')
  }
}

window.onload = getUsers;