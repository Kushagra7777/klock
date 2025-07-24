(function () {
  const sessionId = Date.now() + "-" + Math.random().toString(36).substring(2);
  const startTime = Date.now();
  const userAgent = navigator.userAgent;
  const referrer = document.referrer;
  const screenSize = `${window.innerWidth}x${window.innerHeight}`;
  const eventLog = [];

  const log = (eventName, payload) => {
    const logEntry = {
      sessionId,
      timestamp: Date.now(),
      url: window.location.href,
      event: eventName,
      data: payload,
      referrer,
      userAgent,
      screenSize,
    };
    eventLog.push(logEntry);

    
    fetch("http://localhost:8000/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logEntry),
    });
  };

  
  const clickMap = {};
  document.addEventListener("click", (e) => {
    const target = e.target.closest("button, a, input");
    if (!target) return;

    const id = target.id || "no-id";
    const now = Date.now();

    if (!clickMap[id]) clickMap[id] = [];
    clickMap[id].push(now);
    clickMap[id] = clickMap[id].filter(ts => now - ts < 2000); 

    if (clickMap[id].length >= 3) {
      log("rage_click", {
        tag: target.tagName,
        id,
        text: target.innerText || target.value || "",
        count: clickMap[id].length,
      });
    }

    log("click", {
      tag: target.tagName,
      id,
      text: target.innerText || target.value || "",
    });
  });

  // Input tracking
  document.querySelectorAll("input, textarea, select").forEach((el) => {
    el.addEventListener("focus", () => {
      log("input_focus", { name: el.name || el.id || el.placeholder || "unknown" });
    });
    el.addEventListener("input", () => {
      log("input_type", { name: el.name || el.id });
    });
  });

  // Scroll tracking
  let scrollTimeout = null;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollDepth = window.scrollY / document.body.scrollHeight;
      log("scroll", { scrollDepth: scrollDepth.toFixed(2) });
    }, 500);
  });

  // Section in-view detection
  const trackedSections = document.querySelectorAll("[data-brainfish-watch]");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        log("section_view", { id: entry.target.id });
      }
    });
  });
  trackedSections.forEach(el => observer.observe(el));

  // Continuous mouse motion detection
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
      log("mouse_moving", { duration: 5000 });
      signalSent = true;
    }

    clearTimeout(window.mouseStopTimer);
    window.mouseStopTimer = setTimeout(() => {
      isMouseMoving = false;
      moveStartTime = null;
      signalSent = false;
    }, 1000);
  });

  // On unload — final summary log
  window.addEventListener("beforeunload", () => {
    const totalTime = (Date.now() - startTime) / 1000;
    log("session_end", {
      duration: totalTime.toFixed(2),
      totalEvents: eventLog.length,
    });
  });
})();
