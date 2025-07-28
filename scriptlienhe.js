document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("formMessage");

  if (name && email && message) {
    formMessage.textContent = "✔️ Your message has been sent successfully.";
    formMessage.style.color = "green";

    
    if (typeof confetti === "function") {
      confetti({ 
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      console.warn("Confetti chưa được tải.");
    }

    this.reset();
  } else {
    formMessage.textContent = "❌ Please fill in all information.";
    formMessage.style.color = "red";
  }
});



const style = document.createElement("style");
style.textContent = `
  .shake {
    animation: shake 0.4s;
  }
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }
`;
document.head.appendChild(style);


const text = "Thu Pham - Web Developer | Game Designer";
let i = 0;

function typeEffect() {
  if (i < text.length) {
    document.querySelector(".typing-text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, 80);
  }
}
window.onload = typeEffect;
