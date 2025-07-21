$(function () {
  // Dropdown changes
  $('#nav-search-select').change(function () {
    var selectedText = $(this).find('option:selected').text();
    $('#nav-search').find('.nav-search-label').html(selectedText);

    // Sending dropdown
    sendToBackend({
      action: 'dropdown_change',
      value: selectedText,
      timestamp: new Date().toISOString()
    });
  });

  // Tracking clicks
  const buttons = document.querySelectorAll("button, input[type='button'], input[type='submit']");

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const label = btn.innerText || btn.value || `Button ${index}`;
      sendToBackend({
        action: 'button_click',
        label: label,
        timestamp: new Date().toISOString()
      });
    });
  });

  // Tracking mouse
  let lastMouseMoveTime = 0;
  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastMouseMoveTime > 1000) {  // time (1 per sec)
      lastMouseMoveTime = now;
      sendToBackend({
        action: 'mousemove',
        x: e.clientX,
        y: e.clientY,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Tracking keys
  document.addEventListener("keydown", (e) => {
    sendToBackend({
      action: 'keydown',
      key: e.key,
      timestamp: new Date().toISOString()
    });
  });

  // connecting backend
  function sendToBackend(data) {
    fetch("http://localhost:5000/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(response => {
        console.log("Backend response:", response.result);
      })
      .catch(error => {
        console.error("Error sending data:", error);
      });
  }
});
