function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return; 
  toast.innerText = message;
  toast.style.visibility = "visible";
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.visibility = "hidden";
  }, 3000);
}



$(function () {
  // Tracking button clicks
  const buttons = document.querySelectorAll("button, input[type='button'], input[type='submit']");

  buttons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const label = btn.innerText || btn.value || `Button ${index}`;

      
      const id = btn.id || `auto-generated-btn-${index}`;

      sendToBackend({
        action: 'button_click',
        label: label,
        button_id: id,
        timestamp: new Date().toISOString()
      });
    });
  });

  // Detecting continuos motion of mouse
  let isMouseMoving = false;
  let moveStartTime = null;
  let signalSent = false;

  document.addEventListener("mousemove", () => {
    const now = Date.now();

    if (!isMouseMoving) {
      isMouseMoving = true;
      moveStartTime = now;
      signalSent = false;
    } else if (!signalSent && now - moveStartTime >= 5000) {
      sendToBackend({
        action: 'mouse_moving_10_seconds',
        timestamp: new Date().toISOString()
      });
      signalSent = true;
    }

    clearTimeout(window.mouseStopTimer);
    window.mouseStopTimer = setTimeout(() => {
      isMouseMoving = false;
      moveStartTime = null;
      signalSent = false;
    }, 1000);
  });

  // Sending to backend
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

      if (response.message) {
        showToast(response.message);  
      }
    })
    .catch(error => {
      console.error("Error sending data:", error);
    });
}


});
