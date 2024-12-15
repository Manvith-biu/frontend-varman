const API_BASE_URL = "https://backend-varman.onrender.com";

export async function checkUserExistence(username) {
  try {
    const response = await fetch(`${API_BASE_URL}/getUser?username=${username}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();  // Directly parse JSON

    return data.user ? true : false;  // Return true if 'user' exists, else false
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;  // Return false in case of error
  }
}   

export async function loginUser(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    return { message: "Login failed" };
  }
}

export async function registerUser(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    return { message: "Registration failed" };
  }
}
