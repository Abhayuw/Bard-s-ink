const h3Elements = document.querySelectorAll("h3.hdg3 a"); // Selecting <a> tag child of <h3 class = "hdg3">

h3Elements.forEach(async(h3Element) => { // Loop to go through each element and make api call 
  const heading = h3Element.innerText;
    
    const rhyme = await fetchRhyme(heading);// Api call 
    h3Element.innerText = rhyme; 
  
});
 
async function fetchRhyme(heading) {
  try {
    // Prepare the data for the API request
    const requestData = {
      input: `[INST] <<SYS>> you are a writer who converts every statement into a short rhyme <<SYS>> ${heading} [/INST]`,
    };

    // Make the API request using node-fetch
    const response = await fetch("https://api.deepinfra.com/v1/inference/meta-llama/Llama-2-70b-chat-hf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "{your deepinfra auth key here}"
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch rhymes from the API");
    }

    const data = await response.json();
    // Extract and use the generated text from the response
    if (data.results && data.results.length > 0) { // checking if response contains data
      const generatedText = data.results[0].generated_text; 
      console.log("Generated Text:", generatedText);
      return generatedText;
    } else {
      throw new Error("No generated text found in API response");
    }
  } catch (error) {
    console.error("Error fetching rhymes:", error);
    
  }
}

