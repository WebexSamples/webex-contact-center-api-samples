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
      'http://locahost:5000/wegift',
      requestOptions
    );
    let result = await response.text();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}
