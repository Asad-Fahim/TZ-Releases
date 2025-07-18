// Email functionality
function sendEmail() {
  const modal = document.getElementById('emailModal');
  modal.style.display = 'block';
  
  // Focus on first input
  setTimeout(() => {
    document.getElementById('senderName').focus();
  }, 100);
}

function closeModal() {
  const modal = document.getElementById('emailModal');
  modal.style.display = 'none';
  clearForm();
}

function clearForm() {
  document.getElementById('emailForm').reset();
  removeMessage();
}

function showMessage(text, type = 'success') {
  removeMessage();
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = text;
  
  const form = document.getElementById('emailForm');
  form.insertBefore(messageDiv, form.firstChild);
  
  setTimeout(() => {
    removeMessage();
  }, 5000);
}

function removeMessage() {
  const existingMessage = document.querySelector('.message');
  if (existingMessage) {
    existingMessage.remove();
  }
}

function sendEmailViaMailto(formData) {
  const { senderName, senderEmail, subject, message } = formData;
  
  const emailBody = `From: ${senderName} (${senderEmail})\n\nMessage:\n${message}`;
  const mailtoLink = `mailto:tzreleases@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
  
  window.location.href = mailtoLink;
  
  showMessage('Email client opened! Please send the email from your email application.');
  
  setTimeout(() => {
    closeModal();
  }, 2000);
}

function sendEmailViaEmailJS(formData) {
  const SERVICE_ID = 'your_service_id';
  const TEMPLATE_ID = 'your_template_id';
  const PUBLIC_KEY = 'your_public_key';
  
  if (typeof emailjs === 'undefined') {
    console.error('EmailJS not loaded');
    sendEmailViaMailto(formData);
    return;
  }
  
  const templateParams = {
    from_name: formData.senderName,
    from_email: formData.senderEmail,
    subject: formData.subject,
    message: formData.message,
    to_email: 'tzreleases@gmail.com'
  };
  
  emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
    .then((response) => {
      console.log('Email sent successfully:', response);
      showMessage('Email sent successfully!');
      setTimeout(() => {
        closeModal();
      }, 2000);
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      showMessage('Failed to send email. Please try again.', 'error');
    });
}

function sendEmailViaAPI(formData) {
  const API_ENDPOINT = 'https://your-api-endpoint.com/send-email';
  
  fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: 'tzreleases@gmail.com',
      from: formData.senderEmail,
      subject: formData.subject,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${formData.senderName}</p>
        <p><strong>Email:</strong> ${formData.senderEmail}</p>
        <p><strong>Subject:</strong> ${formData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, '<br>')}</p>
      `
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      showMessage('Email sent successfully!');
      setTimeout(() => {
        closeModal();
      }, 2000);
    } else {
      throw new Error(data.message || 'Failed to send email');
    }
  })
  .catch(error => {
    console.error('API error:', error);
    showMessage('Failed to send email. Please try again.', 'error');
  });
}

document.getElementById('emailForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = {
    senderName: document.getElementById('senderName').value.trim(),
    senderEmail: document.getElementById('senderEmail').value.trim(),
    subject: document.getElementById('subject').value.trim(),
    message: document.getElementById('message').value.trim()
  };
  
  if (!formData.senderName || !formData.senderEmail || !formData.subject || !formData.message) {
    showMessage('Please fill in all fields.', 'error');
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.senderEmail)) {
    showMessage('Please enter a valid email address.', 'error');
    return;
  }
  
  const submitBtn = document.querySelector('.btn-send');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  try {
    sendEmailViaMailto(formData);
    
  } catch (error) {
    console.error('Error sending email:', error);
    showMessage('Failed to send email. Please try again.', 'error');
  } finally {
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  }
});

window.addEventListener('click', function(event) {
  const modal = document.getElementById('emailModal');
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    particlesContainer.appendChild(particle);
  }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  createParticles();
});