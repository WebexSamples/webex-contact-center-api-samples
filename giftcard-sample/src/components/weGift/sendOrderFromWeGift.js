export async function sendOrderFromWeGift(raw) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: raw,
    redirect: 'follow',
  };

  try {
    let response = await fetch(
      'https://saproxy.herokuapp.com/wegift',
      requestOptions
    );
    let result = await response.text();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
