(function () {
  var SUPABASE_URL = "https://0ec90b57d6e95fcbda19832f.supabase.co";
  var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw";

  if (window.location.pathname.startsWith("/admin")) return;

  var sessionId = sessionStorage.getItem("redstone_analytics_sid");
  if (!sessionId) {
    sessionId = "sid-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
    sessionStorage.setItem("redstone_analytics_sid", sessionId);
  }

  function track() {
    var payload = {
      path: window.location.pathname,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null,
      session_id: sessionId,
    };

    fetch(SUPABASE_URL + "/rest/v1/page_views", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: "Bearer " + SUPABASE_ANON_KEY,
      },
      body: JSON.stringify(payload),
    }).catch(function () {});
  }

  if (document.readyState === "complete") {
    track();
  } else {
    window.addEventListener("load", track);
  }
})();
