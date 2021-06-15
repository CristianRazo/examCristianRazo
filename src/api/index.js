export default async function apiCall({ url, method = "get", body, headers }) {
  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    return response.json();
  } catch (error) {
    Promise.reject(error);
    console.log(error);
  }
}
