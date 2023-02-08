export async function getSocketURL(token) {
    const force = true;
    const isKeepAliveEnabled = false;
    const allowMultiLogin = true;
    const clientType = "AgentDesktopMessage";
    let raw = JSON.stringify({
        force,
        isKeepAliveEnabled,
        allowMultiLogin,
        clientType
    });
    try {
        const posts = await fetch(`https://api.wxcc-us1.cisco.com/v1/notification/subscribe?force=true`, {
            method: "POST",
            headers: {
                // Authorization: `Bearer ${token.ccAccessToken}`,
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: raw
        });
        const response = await posts.json();
        return response.webSocketUrl;
    } catch (error) {
        console.log(error);
    }
}