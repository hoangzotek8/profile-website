document.addEventListener('DOMContentLoaded', () => {
    // Display Date and Time
    function updateDateTime() {
        const dateTimeElement = document.getElementById('datetime');
        if (dateTimeElement) {
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            dateTimeElement.textContent = now.toLocaleDateString('en-US', options);
        }
    }

    // Call updateDateTime every second
    setInterval(updateDateTime, 1000);
    
    // Function to display random quote
    function displayRandomQuote() {
        const quotes = [
            "The only way to do great work is to love what you do. - Steve Jobs",
            "Success is not how high you have climbed, but how you make a positive difference to the world. - Roy T. Bennett",
            "Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
            "If you want to live a happy life, tie it to a goal, not to people or things. - Albert Einstein",
            "In the end, we only regret the chances we didn't take. - Lewis Carroll",
            "The best way to predict the future is to invent it. - Alan Kay",
            "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll",
            "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
            "Do not wait to strike till the iron is hot, but make it hot by striking. - William Butler Yeats"
        ];
        
        const quoteElement = document.getElementById('quote');
        if (quoteElement) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            quoteElement.textContent = randomQuote;
        }
    }

    // Call the function to display a random quote on page load
    displayRandomQuote();

    // Get Weather Information
    async function getWeather() {
        const apiKey = '450bc65f79a9732087bdd77de51ed07e'; // Replace with your actual API key
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                try {
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch weather data.");
                    }
                    const data = await response.json();
                    const weatherElement = document.getElementById('weather');
                    if (weatherElement) {
                        weatherElement.innerHTML = `<i class="fas fa-${getWeatherIcon(data.weather[0].icon)}"></i> ${data.main.temp}°C, ${data.weather[0].description}`;
                    }
                } catch (error) {
                    console.error("Error fetching weather data: ", error);
                }
            }, (error) => {
                console.error("Error getting geolocation: ", error);
            });
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }

    // Map OpenWeatherMap icon to FontAwesome
    function getWeatherIcon(icon) {
        const iconMap = {
            '01d': 'sun', '01n': 'moon',
            '02d': 'cloud-sun', '02n': 'cloud-moon',
            '03d': 'cloud', '03n': 'cloud',
            '04d': 'cloud-meatball', '04n': 'cloud-meatball',
            '09d': 'cloud-showers-heavy', '09n': 'cloud-showers-heavy',
            '10d': 'cloud-sun-rain', '10n': 'cloud-moon-rain',
            '11d': 'bolt', '11n': 'bolt',
            '13d': 'snowflake', '13n': 'snowflake',
            '50d': 'smog', '50n': 'smog'
        };
        return iconMap[icon] || 'sun'; // Default icon if not found
    }

    // Fetch weather when the page loads
    getWeather();
});