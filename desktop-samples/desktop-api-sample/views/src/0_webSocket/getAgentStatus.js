// Get Ready
export async function getAgentStatus(token) {
  try {
    const post = await fetch(`https://api.wxcc-us1.cisco.com/v1/agents/reload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    const response = await post.text();
    console.log(`${response} all good `);
  } catch (error) {
    console.log(error);
  }
}
