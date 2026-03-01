export const summarizeText = async (text) => {
  try {
    // This calls your local Node.js backend instead of Google
    const response = await fetch('http://localhost:5001/api/simplify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Backend response was not ok');
    }

    const data = await response.json();
    return data.output; // Returns the bullet points from the backend
  } catch (error) {
    console.error("Frontend Fetch Error:", error);
    return ["Error: Is the backend server running on port 5001?"];
  }
};