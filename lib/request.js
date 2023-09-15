export default async function request(uri, method, body_obj, headers_obj, type) {
  var data = new FormData();
  var headers = {};
  if (type === "form") {
    for (let i = 0; i < Object.keys(body_obj).length; i++) {
      data.append(String(Object.keys(body_obj)[i]), String(Object.values(body_obj)[i]));
    }
  } else if (type === "json") {
    data = JSON.stringify(body_obj);
    headers["Content-Type"] = "application/json";
  }
  if (headers_obj !== undefined) {
    for (let i = 0; i < Object.keys(headers_obj).length; i++) {
      headers[String(Object.keys(headers_obj)[i])] = String(Object.values(headers_obj)[i]);
    }
  }

  var requestOptionsPOST = {
    method: method,
    body: type === "json" ? JSON.stringify(body_obj) : data,
    redirect: 'follow',
    headers: headers
  };
  var requestOptionsGET = {
    method: method,
    redirect: 'follow',
    headers: headers
  };
  
  //console.log(requestOptionsPOST);

  try {
    const response = await fetch(uri, method === 'POST' ? requestOptionsPOST : requestOptionsGET);
    if (!response.ok) {
      // Log the error message and reject the promise
      console.error("Error:", response.statusText);
      throw new Error("Network response was not ok");
    }
    return await response.text();
  } catch (error) {
    // Log any errors that occur during the fetch operation
    console.error("Fetch Error:", error);
    throw error; // Rethrow the error to propagate it further if needed
  }
}
