export async function sendWebHook(method, raw, webhook) {
  const requestOptions = {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json"
    },
    body: raw,
    redirect: "follow"
  };

  try {
    let response = await fetch(`https://hooks.us.webexconnect.io/events/${webhook}`, requestOptions);
    let result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
