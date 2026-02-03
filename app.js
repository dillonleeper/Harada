// app.js
import { loginWithGoogle, logout, onAuth } from "./firebase-setup.js";

function qs(sel) {
  return document.querySelector(sel);
}

function setSignedInUI(user) {
  qs("#authStatus").textContent = `Signed in as ${user.displayName || user.email}`;
  qs("#loginBtn").style.display = "none";
  qs("#logoutBtn").style.display = "inline-block";
  qs("#appView").style.display = "block";
  qs("#publicView").style.display = "none";

  // TODO: load user dashboard data here
  // loadDashboard(user.uid);
}

function setSignedOutUI() {
  qs("#authStatus").textContent = "Not signed in";
  qs("#loginBtn").style.display = "inline-block";
  qs("#logoutBtn").style.display = "none";
  qs("#appView").style.display = "none";
  qs("#publicView").style.display = "block";
}

function wireButtons() {
  qs("#loginBtn")?.addEventListener("click", async () => {
    try {
      await loginWithGoogle();
    } catch (e) {
      console.error(e);
      alert("Login failed. Check console.");
    }
  });

  qs("#logoutBtn")?.addEventListener("click", async () => {
    try {
      await logout();
    } catch (e) {
      console.error(e);
      alert("Logout failed. Check console.");
    }
  });
}

wireButtons();

onAuth((user) => {
  if (user) setSignedInUI(user);
  else setSignedOutUI();
});
