const h3Elements = document.querySelectorAll("h3.hdg3 a"); // Selecting <a> tag child of <h3 class = "hdg3">

const headlineArray = [];
h3Elements.forEach((h3Element) => { // Loop to go through ech element and map text inside them to an array
  headlineArray.push(h3Element.innerText);
    });

   console.log("headlineArray",headlineArray) 
 async function fetchRhymes(headlineArray) {
  try {
   
   // Make the API request using node-fetch
    const response = await fetch("http://localhost:3000/api/get-rhymes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        },
      body: JSON.stringify(headlineArray),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch rhymes. Status: ${response.status}`);
    } 
    const extensionRhymeData = await response.json();
    console.log("Headlines fetched, updating dom....",extensionRhymeData)
  // Update DOM after all API calls are complete
  
   for (let i = 0; i < h3Elements.length; i++) {
    h3Elements[i].innerText = extensionRhymeData[i].data;
    }
  
    console.log("Dom updated....")
    
  } catch (error) {
    console.error("Error fetching rhymes:", error);
    
  }
}
Promise.all([fetchRhymes(headlineArray)]);
