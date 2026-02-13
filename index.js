const app = {
    init: () => {
        // Refresh hone par login check
        if (localStorage.getItem('satyam_session') === 'active') {
            app.showDashboard();
        }

        // Login Submit Handle
        const loginForm = document.getElementById('mainLoginForm');
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const pass = document.getElementById('pass').value;

            if (pass === "1234") {
                localStorage.setItem('satyam_session', 'active');
                localStorage.setItem('user_email', email);
                app.showDashboard();
            } else {
                alert("Galat Password! Use 1234 to login.");
            }
        };

        // Price Update Logic
        document.getElementById('roomType').onchange = (e) => {
            const price = parseInt(e.target.value).toLocaleString('en-IN');
            document.getElementById('display-price').innerText = "₹" + price;
        };
    },

    showDashboard: () => {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        const email = localStorage.getItem('user_email');
        if(email) document.getElementById('user-name').innerText = email.split('@')[0];
    },

    proceedToPay: () => {
        document.getElementById('step-select').classList.add('hidden');
        document.getElementById('step-payment').classList.remove('hidden');
    },

    confirmBooking: () => {
        document.getElementById('step-payment').classList.add('hidden');
        document.getElementById('step-success').classList.remove('hidden');
    },

    cancelPay: () => {
        document.getElementById('step-payment').classList.add('hidden');
        document.getElementById('step-select').classList.remove('hidden');
    },

    whatsappReceipt: () => {
        const room = document.getElementById('roomType').options[document.getElementById('roomType').selectedIndex].text;
        const phone = "91XXXXXXXXXX"; // <--- Apna 10 digit number yahan daalein
        const message = `*BOOKING CONFIRMED*%0A%0AHello Satyam, your room is ready.%0A🏨 *Hotel:* Ayodhya Heritage%0A🛏️ *Type:* ${room}%0A🆔 *ID:* AH-9028%0A%0ASee you soon!`;
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    },

    logout: () => {
        localStorage.clear();
        location.reload();
    }
};

// Start the App
app.init();
