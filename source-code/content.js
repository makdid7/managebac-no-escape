// All the classes of that big edit window
const bigEditWindowClasses = [
    'modal',
    'fade',
    'primary',
    'general',
    'wide-modal',
    'skip-focus-field',
    'in'
];


// Listen for keystrokes
document.addEventListener('keydown', function (event) {

    // Find the element and assign it to bigEditWindow
    const bigEditWindow = findElementWithClasses(bigEditWindowClasses);

    // Check if the Escape key is pressed and user is in the CAS exp. edit window
    if (event.key === 'Escape' && bigEditWindow) {
        event.preventDefault(); // Stops default behavior
        event.stopPropagation(); // Stops the event from propagating to other listeners

        createToast('Escape key blocked!');

    }

}, true);  // Add the event listener in the capture phase (important!)


document.addEventListener('click', function (event) {

    // Find the element and assign it to bigEditWindow
    const bigEditWindow = findElementWithClasses(bigEditWindowClasses);

    // Check if the click is outside the big edit window
    if (bigEditWindow && bigEditWindow === event.target) {

        event.preventDefault(); // Stops default behavior
        event.stopPropagation(); // Stops the event from propagating to other listeners

        createToast('Click blocked!');

    }

}, true); // Use the capture phase to intercept the event before bubbling


// Function to find the element that contains all the required classes
function findElementWithClasses(requiredClasses) {
    // Get all elements in the document
    const allElements = document.querySelectorAll('*');

    // Loop through each element and check if it contains all required classes
    for (let element of allElements) {
        if (requiredClasses.every(className => element.classList.contains(className))) {
            return element; // Return the element if it matches all classes
        }
    }

    // Return null if no element is found
    return null;
}


// Function to create a toast notification
function createToast(message) {
    // Create a new div element for the toast
    const toast = document.createElement('div');
    toast.id = 'my-toast';  // Assign an ID to the toast for styling
    toast.style.position = 'fixed';
    toast.style.top = '10%'; // Position at the top of the screen
    toast.style.left = '50%';
    toast.style.transform = 'translate(-50%, 0)'; // Center it horizontally
    toast.style.backgroundColor = 'rgba(51, 51, 51, 0.9)'; // Dark background with 60% opacity (alpha = 0.6)
    toast.style.color = '#fff'; // White text
    toast.style.padding = '10px 20px'; // Padding around the text
    toast.style.borderRadius = '5px'; // Rounded corners
    toast.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; // Shadow effect
    toast.style.fontFamily = 'Arial, sans-serif';
    toast.style.fontSize = '14px';
    toast.style.zIndex = '10000'; // Ensure it's on top of other elements
    toast.style.opacity = '1'; // Initial opacity (fully visible)
    toast.style.transition = 'opacity 0.5s ease-out'; // Smooth fade-out transition

    // Add the message text to the toast
    toast.innerText = message;

    // Append the toast to the body
    document.body.appendChild(toast);

    // Remove the toast after 2 seconds with a fade-out effect
    setTimeout(() => {
        toast.style.opacity = '0'; // Start fading out

        // Remove the toast from the DOM after the fade-out transition (0.5s)
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 500); // Wait for the fade-out to complete (0.5s)
    }, 2000); // Show the toast for 2 seconds
}
