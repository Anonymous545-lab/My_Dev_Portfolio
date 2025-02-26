window.addEventListener("load", function() {
    // Fetch IP address and ISP data
    fetch('https://ipapi.co/json/')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var ipAddress = data.ip;
        var isp = data.org; // ISP data
        var userAgent = navigator.userAgent;
        var platform = navigator.platform;

        var webhookURL = "YOUR_DISCORD_WEBHOOK_URL";
        var message = {
            "content": `A visitor has accessed your webpage.\nIP Address: ${ipAddress}\nISP: ${isp}\nUser Agent: ${userAgent}\nPlatform: ${platform}`
        };

        fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        }).then(function(response) {
            if (response.ok) {
                console.log("Notification sent to Discord successfully.");
            } else {
                console.log("Failed to send notification to Discord.");
            }
        }).catch(function(error) {
            console.error("Error:", error);
        });
    })
    .catch(function(error) {
        console.error("Error fetching IP address and ISP data:", error);
    });
});
