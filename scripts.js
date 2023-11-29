// Show reservation form after 'Hell, yes' has been clicked
function showReservationForm() {
    // Display reservation form and hide initial invitation content
    document.getElementById("reservationForm").style.display = "block";
    document.getElementById("initialInvitation").style.display = "none";
    // Hide 'Hell, yes' and 'Sadly, No' buttons
    document.getElementById("acceptButton").style.display = "none";
    document.getElementById("sadlyNoButton").style.display = "none";
  }
  
  // Validate form fields before submission
  function validateForm(event) {
    // Get values of date and time inputs
    const date = document.getElementById('availabilityDate').value;
    const time = document.getElementById('availabilityTime').value;
    const errorMessage = document.getElementById('errorMessage');
  
    if (date === '' || time === '') {
      // Display error message if any field is empty
      errorMessage.style.display = 'block';
      event.preventDefault();
      return false;
    } else {
      // Hide error message and proceed to send email
      errorMessage.style.display = 'none';
      sendEmail(date, time);
      return false;
    }
  }
  
  // Send RSVP email after form submission
  function sendEmail(date, time) {
    // Retrieve full name value
    const fullName = document.getElementById('fullName').value;
    // Prepare email subject and body
    const emailSubject = encodeURIComponent('Invitation RSVP');
    const emailBody = encodeURIComponent(`Hello Ellah,\n\nI've dusted off my dancing shoes in eager anticipation of the 9th of December 🎵💃.\n\nI'm gleefully waiting to receive the mystery box at my doorstep on the ${date} at ${time}.\n\nGeared up for an epic weekend rollercoaster! 🥂\n${fullName}. `);
    // Construct mailto link to open email client
    const mailtoLink = `mailto:ellahhlapolosa@gmail.com?subject=${emailSubject}&body=${emailBody}`;
  
    // Check if 'share' functionality is supported, otherwise open mailto link in a new window
    if ('share' in navigator) {
      navigator.share({
        url: mailtoLink,
        title: emailSubject,
        text: emailBody
      });
    } else {
      window.open(mailtoLink);
    }
  
    // Hide reservation form and display 'Invitation Accepted' section
    document.getElementById("reservationForm").style.display = "none";
    document.getElementById("invitationAccepted").style.display = "block";
    // Start countdown timer for the event
    startCountdown();
    // Play John Cena theme song
    var audio = document.getElementById("johnCenaTheme");
    audio.play();
  }
  
  // Countdown function to show time remaining until the event
  function startCountdown() {
    const eventDate = new Date('2023-12-09T00:00:00');
    const countdownElement = document.getElementById("countdown");
    const countdownInterval = setInterval(() => {
      const currentDate = new Date().getTime();
      const timeRemaining = eventDate - currentDate;
      const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      if (timeRemaining < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = "Event has started!";
      }
    }, 1000);
  }
  
  // Show sad GIF section after invitation has been declined
  function showSadMessage() {
    document.getElementById("sadMessage").style.display = "block";
    document.getElementById("initialInvitation").style.display = "none";
  }
  
  // Send rejection email after invitation has been declined
  function sendRejectionEmail() {
    const rejectionReason = document.getElementById('rejectionReason').value;
  
    if (rejectionReason === '') {
      // Display error message if rejection reason is empty
      document.getElementById('rejectionErrorMessage').style.display = 'block';
    } else {
      // Prepare email subject and body for rejection
      const emailSubject = encodeURIComponent('Invitation rejected');
      const emailBody = encodeURIComponent(`Hello Ellah\n\nRegrettably, I've decided to decline the fantastic offer for an all-inclusive weekend of a lifetime.\n\nThe reason why I'm breaking your heart 🥺💔: ${rejectionReason}\n\nRegrettably,\n[add your name here]`);
      const mailtoLink = `mailto:ellahhlapolosa@gmail.com?subject=${emailSubject}&body=${emailBody}`;
  
      if ('share' in navigator) {
        navigator.share({
          url: mailtoLink,
          title: emailSubject,
          text: emailBody
        });
      } else {
        window.open(mailtoLink);
      }
    }
  }
  
  // Function to navigate back to the initial section and reset audio
  function goBackToInitial() {
    // Hide other sections except the initial one
    document.getElementById("sadMessage").style.display = "none";
    document.getElementById("reservationForm").style.display = "none";
    document.getElementById("invitationAccepted").style.display = "none";
    document.getElementById("initialInvitation").style.display = "block";
    document.getElementById("acceptButton").style.display = "block";
    document.getElementById("sadlyNoButton").style.display = "block";
    
    // Stop the music if it's playing
    var audio = document.getElementById("johnCenaTheme");
    audio.pause();
    audio.currentTime = 0;
  
    // Reset button alignment
    document.querySelector('.button-group').style.display = 'flex';
    document.querySelector('.button-group').style.justifyContent = 'center';
  }
  
  // Function to play audio on button hover
  function playAudioOnHover() {
    var audioSadlyNo = new Audio('Music/boo.mp3');
    audioSadlyNo.preload = 'auto';
    var sadlyNoButton = document.getElementById('sadlyNoButton');
    sadlyNoButton.addEventListener('mouseover', function() {
      audioSadlyNo.play();
    });
    sadlyNoButton.addEventListener('mouseout', function() {
      audioSadlyNo.pause();
      audioSadlyNo.currentTime = 0;
    });
  
    var audioHellYes = new Audio('Music/cheer.mp3');
    audioHellYes.preload = 'auto';
    var acceptButton = document.getElementById('acceptButton');
    acceptButton.addEventListener('mouseover', function() {
      audioHellYes.play();
    });
    acceptButton.addEventListener('mouseout', function() {
      audioHellYes.pause();
      audioHellYes.currentTime = 0;
    });
  }
  
  // Call the function to start playing audio on hover
  playAudioOnHover();
  
  // Event listener to initialize audio on first interaction
  document.addEventListener('click', function initializeAudioOnFirstInteraction() {
    document.removeEventListener('click', initializeAudioOnFirstInteraction);
    playAudioOnHover();
  });
  
  // Function to handle 'Enter' button action
  function onEnter() {
    console.log('You clicked "Enter"!');
  }
  
  // Function to hide invitation section by default and show it on 'Enter' button click
  function hideInvitationSection() {
    document.getElementById("initialInvitation").style.display = "none";
    document.getElementById("enterButton").style.display = "block";
  }
  
  // Function to toggle the visibility of the invitation section and the 'Enter' button
  function toggleInvitation() {
    const enterButton = document.getElementById("enterButton");
    const invitationSection = document.getElementById("initialInvitation");
  
    if (enterButton.style.display !== "none") {
      enterButton.style.display = "none";
      invitationSection.style.display = "block";
    } else {
      enterButton.style.display = "block";
      invitationSection.style.display = "none";
    }
  }
  
  // Hide invitation section by default
  hideInvitationSection();
  
  // Function to handle 'Enter' button click
  function onEnter() {
    toggleInvitation();
  }
  
  // Function to play click sound on button clicks
  function playClickSound() {
    var audioClick = new Audio('Music/mouse-click.mp3');
    audioClick.play();
  }
  
  // Add click event listeners to specific buttons by their IDs to play click sound
  document.getElementById('enterButton').addEventListener('click', function() {
    playClickSound();
  });
  
  document.getElementById('acceptButton').addEventListener('click', function() {
    playClickSound();
  });
  
  document.getElementById('sadlyNoButton').addEventListener('click', function() {
    playClickSound();
  });
  
  document.getElementById('reservationDetails').addEventListener('submit', function() {
    playClickSound();
  });
  
  document.getElementById('sadMessage').querySelector('.submission').addEventListener('click', function() {
    playClickSound();
  });
  