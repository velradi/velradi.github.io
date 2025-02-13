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


// Password button for main.html //

function checkPassword() {
  var password = document.getElementById("passwordInput").value;
  var encryptedContent;
  var passwordNumber; // Variable to determine which password is correct

  // Encrypted content corresponding to each password
  const encryptedContents = {
      "vz611": "U2FsdGVkX1+encryptedContent1...",
      "c3112": "U2FsdGVkX1+encryptedContent2...",
      "t41190": "U2FsdGVkX1+encryptedContent3..."
  };

  // Determine the correct password based on the input
  if (encryptedContents[password]) {
      encryptedContent = encryptedContents[password];
      passwordNumber = Object.keys(encryptedContents).indexOf(password) + 1;
  }

  // Check if the entered password matches the correct password
  if (encryptedContent) {
      try {
          var bytes = CryptoJS.AES.decrypt(encryptedContent, password);
          var decryptedContent = bytes.toString(CryptoJS.enc.Utf8);

          if (decryptedContent) {
              // Show the decrypted content
              var hiddenLinksId = "hiddenLinks" + passwordNumber;
              document.getElementById(hiddenLinksId).innerHTML = decryptedContent;
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
          }
      } catch (e) {
          alert("An error occurred while decrypting the content.");
      }
  } else {
      // Display an error message or take other action
      alert("Are you sure you should be accessing this?");
  }
}

// Check if the password numbers were previously entered correctly
window.onload = function() {
  var storedPasswordNumbers = JSON.parse(localStorage.getItem("passwordNumbers")) || [];
  storedPasswordNumbers.forEach(function(passwordNumber) {
    // Show the hidden links based on the stored password numbers
    var hiddenLinksId = "hiddenLinks" + passwordNumber;
    document.getElementById(hiddenLinksId).style.display = "block";
  });
};