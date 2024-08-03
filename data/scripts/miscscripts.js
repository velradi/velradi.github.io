// Script for the mass paste button at the bottom of character pages.
function ShowAndHide() {
    var x = document.getElementById("SectionName");
    if (x.classList.contains("hidden")) {
        x.classList.remove("hidden");
    } else {
        x.classList.add("hidden");
    }
    x.classList.toggle("texte"); // Toggle the "texte" class
}

// Script for alphabetically sorting the character list in index.html
window.addEventListener('DOMContentLoaded', function() {
    var list = document.querySelector('#sortable-list');
    var items = list.children;
    var itemsArr = [];
    for (var i = 0; i < items.length; i++) {
        if (items[i].nodeType === 1) { // get rid of the whitespace text nodes
            itemsArr.push(items[i]);
        }  }
    itemsArr.sort(function(a, b) {
        return a.textContent.localeCompare(b.textContent);
    });
    for (var i = 0; i < itemsArr.length; i++) {
        list.appendChild(itemsArr[i]);
    }
});


// Password button for main.html and certain characters //

function checkPassword() {
    var password = document.getElementById("passwordInput").value;
    var correctPassword;
    var passwordNumber; // Variable to determine which password is correct

    // Determine the correct password based on some condition
    // Replace placeholders with actual conditions or expressions
    if (password === "vz611") {
      correctPassword = "vz611";
      passwordNumber = 1; // Set password number to 1
    } else if (password === "c3112") {
      correctPassword = "c3112";
      passwordNumber = 2; // Set password number to 2
    } else if (password === "t41190") {
      correctPassword = "t41190";
      passwordNumber = 3; // Set password number to 3
    }
      else if (password === "vz633") {
        correctPassword = "vz633";
        passwordNumber = 4; // Set password number to 4
    }
     else {
    // Display an error message or take other action
    alert("Are you sure you should be accessing this?");
    return; // Exit the function
  }
  
    // Check if the entered password matches the correct password
    if (password === correctPassword) {
      // Show the hidden links based on the determined password number
      var hiddenLinksId = "hiddenLinks" + passwordNumber;
      document.getElementById(hiddenLinksId).style.display = "block";

      // Retrieve the existing password numbers array from localStorage
      var storedPasswordNumbers = JSON.parse(localStorage.getItem("passwordNumbers")) || [];

      // Check if the password number is not already in the array before adding it
      if (!storedPasswordNumbers.includes(passwordNumber)) {
        // Add the password number to the array
        storedPasswordNumbers.push(passwordNumber);

        // Save the updated array back to localStorage
        localStorage.setItem("passwordNumbers", JSON.stringify(storedPasswordNumbers));
      }

} }


  
// Check if the password numbers were previously entered correctly
window.onload = function() {
  var storedPasswordNumbers = JSON.parse(localStorage.getItem("passwordNumbers")) || [];
  storedPasswordNumbers.forEach(function(passwordNumber) {
      // Show the hidden links based on the stored password numbers
      var hiddenLinksId = "hiddenLinks" + passwordNumber;
      document.getElementById(hiddenLinksId).style.display = "block";
  });
};







// Navigation bar code

document.addEventListener("DOMContentLoaded", function() {
  function loadComponent(elementId, filePath, callback) {
    fetch(filePath)
      .then(response => response.text())
      .then(data => {
        document.getElementById(elementId).innerHTML = data;
        if (callback) callback();
      });
  }

  function hideCurrentPageLink() {
    const currentPage = window.location.pathname.split('/').pop().split('.').shift();
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      if (link.dataset.page === currentPage) {
        link.style.display = 'none';
      }
    });
  }

  // Load components with correct paths
  loadComponent('navbar_etchfield', 'assets/navbar-e.html', hideCurrentPageLink);
  loadComponent('footer-placeholder', '../components/footer.html');
  // Add more components as needed
});
