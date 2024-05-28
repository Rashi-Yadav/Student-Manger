function handleFormSubmit(event) {
    event.preventDefault();
    const userDetails = {
        username: event.target.username.value,
        adress: event.target.adress.value,
        phone: event.target.phone.value,
    };

    axios
       .post(
            "https://crudcrud.com/api/eaaaa463b47b4237b976487c21bf686f/data",
            userDetails
        )
       .then((response) => {
            displayUserOnScreen(response.data);
            incrementStudentCount();
        })
       .catch((error) => console.log(error));

    // Clearing the input fields
    document.getElementById("username").value = "";
    document.getElementById("adress").value = "";
    document.getElementById("phone").value = "";
}

function incrementStudentCount() {
    const studentCountElement = document.getElementById("student-count");
    const currentCount = parseInt(studentCountElement.textContent) || 0;
    studentCountElement.textContent = currentCount + 1;
}
window.addEventListener("DOMContentLoaded", () => {
    axios
       .get("https://crudcrud.com/api/eaaaa463b47b4237b976487c21bf686f/data")
       .then((response) => {
            console.log(response.data)
            for (var i = 0; i < response.data.length; i++) {
                displayUserOnScreen(response.data[i]);
            }
            setInitialStudentCount(response.data.length);
        })
       .catch((error) => console.log(error));
});

function setInitialStudentCount(count) {
    const studentCountElement = document.getElementById("student-count");
    studentCountElement.textContent = count;
}
function displayUserOnScreen(userDetails) {
    const userItem = document.createElement("li");
    userItem.appendChild(
      document.createTextNode(
        `${userDetails.username} - ${userDetails.adress} - ${userDetails.phone}`
      )
    );
  
    const deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("Delete"));
    userItem.appendChild(deleteBtn);
  
    const editBtn = document.createElement("button");
    editBtn.appendChild(document.createTextNode("Edit"));
    userItem.appendChild(editBtn);
  
    const userList = document.querySelector(".details");
    userList.appendChild(userItem);
  
  
  
    deleteBtn.addEventListener("click", function (event) {
      userList.removeChild(event.target.parentElement);
      axios
        .delete(`https://crudcrud.com/api/eaaaa463b47b4237b976487c21bf686f/data/${userDetails._id}`)
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    });
  
    editBtn.addEventListener("click", function (event) {
      userList.removeChild(event.target.parentElement);
      axios
        .delete(`https://crudcrud.com/api/eaaaa463b47b4237b976487c21bf686f/data/${userDetails._id}`)
        .then((data) => alert('Edit the details then submit'))
        .catch((err) => console.log(err));
  
      document.getElementById("username").value = userDetails.username;
      document.getElementById("adress").value = userDetails.adress;
      document.getElementById("phone").value = userDetails.phone;
      userList.appendChild(userItem)
    });
  }
  