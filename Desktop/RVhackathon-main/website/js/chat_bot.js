var scrollingDiv = document.getElementById("scrolling-div");

    // Automatically scroll the div down when new content is added
    function scrollToBottom() {
      scrollingDiv.scrollTop = scrollingDiv.scrollHeight;
    }

    // Add content to the div
    function addContent(content) {
      var contentDiv = document.getElementById("content");
      contentDiv.innerHTML += content;
      scrollToBottom();
    }

    // Example usage:

    addContent("<div class=' ms-3 d-flex justify-content-start'><div class='p-2 chats rounded-2 w-75'>Hello How may i be of Service :)</div></div>");
    
document.getElementById('send-btn').addEventListener('click', async () => {
    const response = await fetch("http://127.0.0.1:9000/response", {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, GET, PUT',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body:JSON.stringify({
            "message":document.getElementById("message").value
        })
    })

    const content = await response.json();
    addContent("<div class='p-1 m-3 d-flex justify-content-end'><div class='p-2 chatsmine rounded-2'>"+document.getElementById("message").value+"</div></div>");   
    
    addContent("<div class=' ms-3 d-flex justify-content-start'><div class='p-2 chats rounded-2'>"+content['response']+"</div></div>");
    
})