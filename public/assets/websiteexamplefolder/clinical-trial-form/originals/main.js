let currentStep = 1;
const totalSteps = 6; // Adjust this to match the actual number of steps

// Update progress bar based on the current step
function updateProgress() {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
  document.getElementById('progress').style.width = `${progress}%`;
}

// Navigate to the next step without validation during transition
function nextStep(step) {
  const currentStepElement = document.getElementById(`step-${step}`);
  const nextStepElement = document.getElementById(`step-${step + 1}`);

  // Move to the next step without validating inputs
  currentStepElement.classList.remove('active');
  nextStepElement.classList.add('active');
  currentStep++;
  updateProgress();

  // Display trial-specific questions based on the user’s answers
  if (document.querySelector('input[name="dry-eye"]:checked')?.value === 'yes') {
    document.getElementById('dry-eye-questions').style.display = 'block';
  } else {
    document.getElementById('dry-eye-questions').style.display = 'none';
  }

  if (document.querySelector('input[name="allergies"]:checked')?.value === 'yes') {
    document.getElementById('allergy-questions').style.display = 'block';
  } else {
    document.getElementById('allergy-questions').style.display = 'none';
  }
}

// Navigate to the previous step
function prevStep(step) {
  const currentStepElement = document.getElementById(`step-${step}`);
  const prevStepElement = document.getElementById(`step-${step - 1}`);
  
  currentStepElement.classList.remove('active');
  prevStepElement.classList.add('active');
  currentStep--;
  updateProgress();
}

// Validate the entire form before final submission
document.getElementById('multiStepForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission behavior

  if (validateForm()) {
    const formData = new FormData(this);
    // Perform any custom processing or sending data to a server here
    alert('Form submitted successfully! Thank you for your participation.');
  }
});

// Validate the entire form during submission
function validateForm() {
  const form = document.getElementById('multiStepForm');
  const requiredFields
