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