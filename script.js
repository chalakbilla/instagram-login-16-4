document
    .querySelector(".login-form")
    .addEventListener("submit", async (event) => {
        event.preventDefault();

        const uname = document.getElementById("uname").value;
        const password = document.getElementById("password").value;

        const userData = { username: uname, password: password };
        console.log(userData);

        try {
            const response = await fetch("http://localhost:3000/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            // If response is not OK, throw an error
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            // Parse the JSON response only if it's a successful response
            const result = await response.json();
            alert(result.message || "Data saved successfully!");
        } catch (error) {
            console.error("Error:", error);
            alert(`An error occurred: ${error.message || "Please try again."}`);
        }
    });
