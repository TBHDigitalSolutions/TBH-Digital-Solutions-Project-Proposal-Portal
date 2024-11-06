// cookieConsentConfig.js

function enableCookies() {
    console.log("Cookies are enabled");
    // Place any logic to initialize cookies here, e.g., analytics or third-party services
}

function disableCookies() {
    console.log("Cookies are disabled");
    // Place logic here to disable or remove cookies as necessary
}

// Cookie consent configuration
const cookieConsentConfig = {
    palette: {
        popup: { background: "#000", text: "#fff" },
        button: { background: "#f1d600", text: "#000" }
    },
    theme: "classic",
    position: "bottom-right",
    type: "opt-in",
    content: {
        message: "We use cookies to improve your experience and for analytics.",
        dismiss: "Allow All Cookies",
        deny: "Decline",
        link: "Learn more",
        href: "/privacy-policy"
    },
    onInitialise: function (status) {
        if (status === cookieConsentConfig.status.allow) {
            enableCookies();
        }
    },
    onStatusChange: function (status) {
        if (status === cookieConsentConfig.status.allow) {
            enableCookies();
        } else {
            disableCookies();
        }
    }
};

export default cookieConsentConfig;
