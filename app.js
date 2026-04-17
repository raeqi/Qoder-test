// State
let options = [];
let isSpinning = false;
let currentRotation = 0;
const MIN_OPTIONS_TO_SPIN = 2;

// Canvas setup
const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = canvas.width / 2 - 10;

// Colors for wheel segments
const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#F8B739', '#52BE80'
];

// Sound effects using Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSpinSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 200;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

function playWinSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);

    // Play a victory melody
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C
    const duration = 0.15;

    notes.forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.frequency.value = freq;
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.2, audioContext.currentTime + i * duration);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + (i + 1) * duration);

        osc.start(audioContext.currentTime + i * duration);
        osc.stop(audioContext.currentTime + (i + 1) * duration);
    });
}

function playTickSound() {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
}

// Initialize
function init() {
    loadSavedWheels();
    updateOptionsDisplay();
    drawWheel();
}

// Add option
function addOption() {
    const input = document.getElementById('optionInput');
    const value = input.value.trim();

    if (!value) {
        alert('Please enter an option!');
        return;
    }

    if (options.length >= 10) {
        alert('Maximum 10 options allowed!');
        return;
    }

    if (options.includes(value)) {
        alert('This option already exists!');
        return;
    }

    options.push(value);
    input.value = '';
    input.focus();

    updateOptionsDisplay();
    drawWheel();
}

function removeOption(index) {
    options.splice(index, 1);
    updateOptionsDisplay();
    drawWheel();
}

function updateOptionsDisplay() {
    const optionsList = document.getElementById('optionsList');
    const optionCount = document.getElementById('optionCount');

    optionsList.innerHTML = '';

    options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'option-item';
        const optionText = document.createElement('span');
        optionText.className = 'option-text';
        optionText.textContent = option;

        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger';
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeOption(index));

        div.appendChild(optionText);
        div.appendChild(removeButton);
        optionsList.appendChild(div);
    });

    optionCount.textContent = options.length;

    // Update spin button state
    const spinButton = document.getElementById('spinButton');
    spinButton.disabled = options.length < MIN_OPTIONS_TO_SPIN;
}

// Draw wheel
function drawWheel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (options.length === 0) {
        ctx.fillStyle = '#e0e0e0';
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = '#666';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Add options to start', centerX, centerY);
        return;
    }

    const anglePerOption = (2 * Math.PI) / options.length;

    options.forEach((option, index) => {
        const startAngle = index * anglePerOption + currentRotation;
        const endAngle = startAngle + anglePerOption;

        // Draw segment
        ctx.fillStyle = colors[index % colors.length];
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.fill();

        // Draw border
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Draw text
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + anglePerOption / 2);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 3;

        // Draw text at radius distance
        const textRadius = radius * 0.7;
        ctx.fillText(option, textRadius, 0);

        ctx.restore();
    });
}

// Spin wheel
function spinWheel() {
    if (isSpinning || options.length < MIN_OPTIONS_TO_SPIN) return;

    isSpinning = true;
    const spinButton = document.getElementById('spinButton');
    spinButton.disabled = true;

    playSpinSound();

    // Random spin parameters
    const minSpins = 5;
    const maxSpins = 8;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    const totalRotation = spins * 2 * Math.PI;

    // Animation parameters
    const duration = 4000; // 4 seconds
    const startTime = Date.now();
    let lastTickIndex = -1;

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease out)
        const easeOut = 1 - Math.pow(1 - progress, 3);

        currentRotation = easeOut * totalRotation;
        drawWheel();

        // Play tick sound when crossing segments
        const anglePerOption = (2 * Math.PI) / options.length;
        const currentIndex = Math.floor((currentRotation % (2 * Math.PI)) / anglePerOption);

        if (currentIndex !== lastTickIndex && progress < 0.95) {
            playTickSound();
            lastTickIndex = currentIndex;
        }

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Determine winner
            const finalAngle = currentRotation % (2 * Math.PI);
            const winnerIndex = options.length - 1 - Math.floor(finalAngle / anglePerOption);
            const winner = options[winnerIndex];

            showWinner(winner);
            playWinSound();

            isSpinning = false;
            spinButton.disabled = false;
        }
    }

    animate();
}

// Show winner
function showWinner(winner) {
    const winnerDisplay = document.getElementById('winnerDisplay');
    const winnerText = document.getElementById('winnerText');

    winnerText.textContent = winner;
    winnerDisplay.classList.remove('hidden');
}

function closeWinner() {
    const winnerDisplay = document.getElementById('winnerDisplay');
    winnerDisplay.classList.add('hidden');
}

// Handle enter key
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        addOption();
    }
}

// Save wheel
function saveWheel() {
    if (options.length < MIN_OPTIONS_TO_SPIN) {
        alert('Add at least 2 options before saving!');
        return;
    }

    const nameInput = document.getElementById('wheelNameInput');
    const name = nameInput.value.trim();

    if (!name) {
        alert('Please enter a name for your wheel!');
        return;
    }

    const savedWheels = getSavedWheels();

    // Check if name already exists
    if (savedWheels.some(wheel => wheel.name === name)) {
        if (!confirm(`A wheel named "${name}" already exists. Overwrite it?`)) {
            return;
        }
        // Remove old one
        const index = savedWheels.findIndex(wheel => wheel.name === name);
        savedWheels.splice(index, 1);
    }

    savedWheels.push({
        name: name,
        options: [...options]
    });

    localStorage.setItem('savedWheels', JSON.stringify(savedWheels));

    nameInput.value = '';
    loadSavedWheels();

    alert(`Wheel "${name}" saved successfully!`);
}

function getSavedWheels() {
    const saved = localStorage.getItem('savedWheels');
    return saved ? JSON.parse(saved) : [];
}

function loadSavedWheels() {
    const savedWheels = getSavedWheels();
    const savedWheelsList = document.getElementById('savedWheelsList');

    savedWheelsList.innerHTML = '';

    if (savedWheels.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.style.color = '#999';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.textContent = 'No saved wheels yet';
        savedWheelsList.appendChild(emptyMessage);
        return;
    }

    savedWheels.forEach((wheel, index) => {
        const div = document.createElement('div');
        div.className = 'saved-wheel-item';

        const name = document.createElement('div');
        name.className = 'saved-wheel-name';
        name.textContent = wheel.name;

        const wheelOptions = document.createElement('div');
        wheelOptions.className = 'saved-wheel-options';
        wheelOptions.textContent = wheel.options.join(', ');

        const actions = document.createElement('div');
        actions.className = 'saved-wheel-actions';

        const loadButton = document.createElement('button');
        loadButton.className = 'btn';
        loadButton.style.background = 'rgba(255,255,255,0.3)';
        loadButton.style.border = '1px solid white';
        loadButton.style.color = 'white';
        loadButton.style.padding = '5px 15px';
        loadButton.style.fontSize = '0.85em';
        loadButton.textContent = 'Load';
        loadButton.addEventListener('click', () => loadWheel(index));

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-wheel-btn';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteWheel(index));

        actions.appendChild(loadButton);
        actions.appendChild(deleteButton);
        div.appendChild(name);
        div.appendChild(wheelOptions);
        div.appendChild(actions);
        savedWheelsList.appendChild(div);
    });
}

function loadWheel(index) {
    const savedWheels = getSavedWheels();
    const wheel = savedWheels[index];

    if (!wheel) return;

    options = [...wheel.options];
    updateOptionsDisplay();
    drawWheel();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteWheel(index) {
    const savedWheels = getSavedWheels();
    const wheel = savedWheels[index];

    if (!confirm(`Delete wheel "${wheel.name}"?`)) {
        return;
    }

    savedWheels.splice(index, 1);
    localStorage.setItem('savedWheels', JSON.stringify(savedWheels));
    loadSavedWheels();
}

// Initialize on load
window.addEventListener('load', init);
