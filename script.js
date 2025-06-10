function startApp() {
  // This will navigate to the login page (to be created next)
  window.location.href = "login.html";
}

//login

function showSignup() {
  document.querySelector(".auth-container").classList.add("hidden");
  document.getElementById("signupForm").classList.remove("hidden");
}

function showLogin() {
  document.querySelector(".auth-container").classList.remove("hidden");
  document.getElementById("signupForm").classList.add("hidden");
}

function loginUser(event) {
  event.preventDefault();
  alert("Login successful!");
  window.location.href = "dashboard.html"; // Next page
  return false;
}

function signupUser(event) {
  event.preventDefault();
  alert("Account created! Please login.");
  showLogin();
  return false;
}
function logout() {
  alert("Logging out...");
  window.location.href = "login.html";
}

//logic
function calculateTotal(event) {
  event.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const currency = document.getElementById("currency").value;

  const exchangeRates = {
    KES: 145,
    NGN: 1300,
    UGX: 3800,
    TZS: 2600,
    GBP: 0.78,
    YEN: 155,
    CAD: 1.35,
  };

  const rate = exchangeRates[currency] || 1;
  const converted = amount * rate;
  const fee = 2.5; // fixed for demo
  const total = amount + fee;

  document.getElementById("rate").innerText = `Exchange Rate: 1 USD = ${rate} ${currency}`;
  document.getElementById("fee").innerText = `Transfer Fee: $${fee.toFixed(2)}`;
  document.getElementById("total").innerText = `Total To Pay: $${total.toFixed(2)}`;

  alert(`Review transaction:\nRecipient: ${document.getElementById("recipient").value}\nCurrency: ${currency}\nConverted Amount: ${converted.toFixed(2)}\nFee: $${fee}\nTotal: $${total}`);
  
  // Navigate to confirmation page (next step)
  window.location.href = "confirm.html";
}

//confirmation
function confirmTransaction() {
  alert("Transaction sent successfully!\nReceipt generated.");
  window.location.href = "history.html";
}

//profile
function updateProfile(event) {
  event.preventDefault();
  alert("Profile updated successfully!");
  return false;
}

//deposit
function depositFunds(event) {
  event.preventDefault();

  const method = document.getElementById("depositMethod").value;
  const amount = parseFloat(document.getElementById("depositAmount").value);
  const instructions = document.getElementById("instructions");

  if (method === "mpesa") {
    instructions.innerHTML = `
      <strong>Deposit via M-Pesa:</strong><br />
      1. Go to M-Pesa Menu<br />
      2. Select Lipa na M-Pesa > PayBill<br />
      3. Business Number: <strong>123456</strong><br />
      4. Account Number: <strong>your phone number</strong><br />
      5. Enter Amount: <strong>$${amount}</strong><br />
      6. Confirm and send.
    `;
  } else if (method === "bank") {
    instructions.innerHTML = `
      <strong>Deposit via Bank Transfer:</strong><br />
      Bank Name: <strong>Red Bank</strong><br />
      Account Name: <strong>SendMoneyNow Inc</strong><br />
      Account Number: <strong>000123456789</strong><br />
      SWIFT Code: <strong>RBKENYA</strong><br />
      Amount: <strong>$${amount}</strong>
    `;
  }

  instructions.classList.remove("hidden");
}

// Nav
function toggleMobileMenu() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("active");
}

function toggleSendInputs() {
  const method = document.getElementById("send-method").value;

  document.getElementById("recipient-group").style.display = method === "recipient" ? "block" : "none";
  document.getElementById("phone-group").style.display = method === "phone" ? "block" : "none";
  document.getElementById("paypal-group").style.display = method === "paypal" ? "block" : "none";
}

//deposit
function selectMethod(method) {
  const form = document.getElementById("deposit-form");
  const methodName = document.getElementById("selected-method-name");

  const readableNames = {
    mpesa: "Mpesa",
    bank: "Bank Transfer",
    visa: "Visa Card",
    apple: "Apple Pay",
    google: "Google Pay"
  };

  form.style.display = "block";
  methodName.textContent = `Deposit via ${readableNames[method] || method}`;
}

//settings
// ======================
// Settings Page JS
// ======================

document.addEventListener("DOMContentLoaded", function () {
  // Handle form submissions (basic feedback)
  const forms = document.querySelectorAll(".settings-section form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("✅ Settings updated successfully!");
    });
  });

  // Danger zone: confirmation before deleting or deactivating
  const dangerButtons = document.querySelectorAll(".danger-zone .danger");
  dangerButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const confirmAction = confirm("⚠️ Are you sure you want to proceed?");
      if (confirmAction) {
        alert("🚧 Feature not implemented yet. Coming soon!");
      }
    });
  });
});

// ============ MOBILE NAV TOGGLE ============

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }
});

//profile picture
// ========= PROFILE IMAGE UPLOAD =========

document.addEventListener("DOMContentLoaded", () => {
  const imageInput = document.getElementById("imageUpload");
  const profileImage = document.getElementById("profileImage");

  if (imageInput && profileImage) {
    imageInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
});


// Social signup (demo)
document.querySelectorAll('.social-buttons button').forEach(btn => {
  btn.addEventListener('click', () => {
    alert("🔐 This is a placeholder. Social login coming soon!");
  });
});

//history
document.getElementById('printBtn').addEventListener('click', function() {
  window.print();
});

//profile
const imageUpload = document.getElementById("imageUpload");
const profileImage = document.getElementById("profileImage");

if (imageUpload && profileImage) {
  imageUpload.addEventListener("change", function () {
    const file = this.files[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onload = function (e) {
        profileImage.src = e.target.result;
        localStorage.setItem("profileImage", e.target.result); // store to reuse elsewhere
      };
      reader.readAsDataURL(file);
    }
  });

  // Load saved profile image on page load
  const savedImg = localStorage.getItem("profileImage");
  if (savedImg) {
    profileImage.src = savedImg;
  }
}

//deposit
function selectMethod(method) {
  document.getElementById("deposit-form").style.display = "block";
  document.getElementById("selected-method-name").textContent = `Deposit via ${capitalize(method)}`;

  const allFields = ['mpesa', 'bank', 'visa', 'apple', 'google'];
  allFields.forEach(id => {
    const field = document.getElementById(`${id}-fields`);
    if (field) {
      field.style.display = (id === method) ? 'block' : 'none';
    }
  });
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

//send
function selectSendMethod(method) {
  const formContainer = document.getElementById('send-form');
  const methodTitle = document.getElementById('send-method-name');

  const methodNames = {
    mpesa: "Send via M-Pesa",
    bank: "Send to Bank Account",
    visa: "Send via Visa",
    apple: "Send via Apple Pay",
    google: "Send via Google Pay"
  };

  methodTitle.textContent = methodNames[method] || "Send Money";
  formContainer.style.display = 'block';
}


    function toggleBalance() {
      const balance = document.getElementById("account-balance");
      const toggleBtn = document.getElementById("toggleBtn");
      if (balance.textContent === "•••••") {
        balance.textContent = "1234.56"; // Replace with actual balance
        toggleBtn.textContent = "🙈";
      } else {
        balance.textContent = "•••••";
        toggleBtn.textContent = "👁️";
      }
    }

  
  function openTransaction(desc, id, amount, status) {
    document.getElementById("txn-desc").textContent = desc;
    document.getElementById("txn-id").textContent = id;
    document.getElementById("txn-amount").textContent = amount;
    document.getElementById("txn-status").textContent = status;
    document.getElementById("transactionModal").style.display = "block";
  }

  function closeModal() {
    document.getElementById("transactionModal").style.display = "none";
  }

  // Close modal if clicked outside content
  window.onclick = function (event) {
    const modal = document.getElementById("transactionModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

// Toggle account balance visibility
document.addEventListener("DOMContentLoaded", () => {
  const balance = document.getElementById("account-balance");
  const eyeIcon = document.querySelector(".eye-icon");

  let isHidden = false;
  eyeIcon.addEventListener("click", () => {
    if (isHidden) {
      balance.textContent = "$2345.67"; // You can fetch dynamically if needed
      eyeIcon.textContent = "👁️";
    } else {
      balance.textContent = "••••••";
      eyeIcon.textContent = "🙈";
    }
    isHidden = !isHidden;
  });
});

// Download statement as PDF
function downloadStatement() {
  const transactions = document.querySelectorAll(".transaction-list li");
  let content = "Transaction History\n\n";

  transactions.forEach((item) => {
    const text = item.textContent.trim().replace(/\s+/g, " ");
    content += `• ${text}\n`;
  });

  const blob = new Blob([content], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "transaction-statement.pdf";
  link.click();

  URL.revokeObjectURL(url);
}

//dashboard
// Toggle Account Balance Visibility
let isBalanceVisible = true;
const balanceElement = document.getElementById('account-balance');
const toggleBtn = document.getElementById('toggle-balance');

toggleBtn.addEventListener('click', () => {
  if (isBalanceVisible) {
    balanceElement.textContent = '****';
    toggleBtn.textContent = 'Show';
  } else {
    balanceElement.textContent = '$1,250.75'; // Replace with real balance in production
    toggleBtn.textContent = 'Hide';
  }
  isBalanceVisible = !isBalanceVisible;
});

// Clickable Transactions
const transactions = document.querySelectorAll('.transaction-item');
transactions.forEach(item => {
  item.addEventListener('click', () => {
    const name = item.getAttribute('data-name');
    const amount = item.getAttribute('data-amount');
    const date = item.getAttribute('data-date');
    alert(`Transaction:\nName: ${name}\nAmount: ${amount}\nDate: ${date}`);
  });
});

// PDF Statement Download
document.getElementById('download-statement').addEventListener('click', () => {
  const element = document.querySelector('.transactions');
  const opt = {
    margin: 0.5,
    filename: 'Transaction_Statement.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
});

// Hide/Show Balance
document.addEventListener('DOMContentLoaded', () => {
  const balanceText = document.getElementById('balance-amount');
  const hideBtn = document.getElementById('hide-btn');

  let isHidden = false;

  hideBtn.addEventListener('click', () => {
    if (isHidden) {
      balanceText.textContent = '$1,234.56'; // Replace with dynamic value if needed
      hideBtn.textContent = 'Hide Balance';
    } else {
      balanceText.textContent = '****';
      hideBtn.textContent = 'Show Balance';
    }
    isHidden = !isHidden;
  });

  // Expand/Collapse transaction details
  const transactionItems = document.querySelectorAll('.transaction-item');
  transactionItems.forEach(item => {
    item.addEventListener('click', () => {
      const details = item.querySelector('.details');
      details.classList.toggle('show');
    });
  });

  // Download Transaction PDF
  document.getElementById('download-pdf-btn').addEventListener('click', () => {
    const content = document.querySelector('.transactions-section').innerHTML;
    const newWindow = window.open('', '', 'width=800,height=600');
    newWindow.document.write(`
      <html>
        <head>
          <title>Transaction Statement</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h3 { color: #d6001c; }
            .transaction-item { border: 1px solid #ccc; padding: 10px; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h3>Transaction Statement</h3>
          ${content}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.focus();
    newWindow.print(); // Optionally replace with html2pdf if using advanced libraries
  });
});


// settings

document.querySelectorAll('.settings-section h3').forEach(header => {
  header.addEventListener('click', () => {
    const section = header.parentElement;
    section.classList.toggle('collapsed');
  });
});

// Toggle collapsible sections
document.querySelectorAll('.settings-section h3').forEach(header => {
  header.addEventListener('click', () => {
    const section = header.nextElementSibling;
    section.classList.toggle('hidden');
  });
});

// Alert on form submission
document.querySelectorAll('.settings-section form').forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Settings updated successfully!');
  });
});

// Dark mode toggle
const darkToggle = document.getElementById('darkModeToggle');
if (darkToggle) {
  darkToggle.addEventListener('change', function () {
    document.body.classList.toggle('dark-mode', this.checked);
  });
}

// deposit
function selectMethod(method) {
  document.getElementById('deposit-form').style.display = 'block';

  const allFields = document.querySelectorAll('.method-fields');
  allFields.forEach(f => f.style.display = 'none');

  const selectedField = document.getElementById(`${method}-fields`);
  if (selectedField) {
    selectedField.style.display = 'block';
  }

  const methodName = {
    mpesa: 'Mpesa',
    bank: 'Bank Transfer',
    visa: 'Visa Card',
    apple: 'Apple Pay',
    google: 'Google Pay'
  };

  document.getElementById('selected-method-name').textContent = `Using: ${methodName[method]}`;
}






