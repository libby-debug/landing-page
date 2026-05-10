const form = document.querySelector("#waitlist-form");
const message = document.querySelector(".success-message");
const submitButton = form?.querySelector("button");

const WAITLIST_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbwhzI0z2hU5IZu5T3uoazEZCTQN8ixca2OXeRq3e0zx9G9MK1ax6WrgDaFpapbizuwe/exec";

if (form && message && submitButton) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const email = formData.get("email");

    submitButton.disabled = true;
    submitButton.textContent = "Joining...";
    message.textContent = "";

    try {
      const payload = new URLSearchParams({
        email,
        sourcePage: window.location.href,
        userAgent: navigator.userAgent,
      });

      await fetch(WAITLIST_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: payload,
      });

      message.textContent = `You're on the list, ${email}.`;
      form.reset();
    } catch (error) {
      message.textContent = "Something went wrong. Please try again.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Join Waitlist";
    }
  });
}
