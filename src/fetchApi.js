const myFetchApi = async ({
  url,
  method = "GET",
  responseType = `application/json`,
  data = null,
}) => {
  try {
    //hanlding edge cases
    if (!url) throw new Error("Please give valid url");
    if (["POST", "PATCH", "PUT"].includes(method) && !data)
      throw new Error("Please enter valid data");
    const methodsWithBody = ["POST", "PATCH", "PUT"];
    const options = {
      method,
      headers: {},
    };

    //only add Content-Type and body for the idempotentMethods
    if (methodsWithBody.includes(method)) {
      options.headers["Content-Type"] = responseType;
      options["body"] = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP ERROR: ${response.status}`);

    let responseData;

    if (method === "GET") {
      const responseContentType = response.headers.get("Content-Type");
      if (responseContentType && responseContentType.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
    } else if (methodsWithBody.includes(method)) {
      responseData = responseType = "application/json"
        ? await response.json()
        : await response.text();
    }

    return {
      data: responseData,
      status: response.status,
      statusText: response.statusText || "",
      headers: Object.fromEntries(response.headers.entries()),
    };
  } catch (error) {
    console.error("Fetch API error:", error);
    return { error: error.message };
  }
};

export default myFetchApi;
