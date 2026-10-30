async function logApiResponse(response, requestDetails, duration, label = "API Response") {
  const status = response.status();
  const body = await response.text();

  console.log(`\n========== ${label} ==========`);
  console.log(`Method: ${requestDetails.method}`);
  console.log(`URL: ${requestDetails.url}`);
  console.log(`Status: ${status}`);
  console.log(`Response time: ${duration} ms`);
  console.log(`Response body: ${body}`);
  console.log("================================\n");
}

module.exports = { logApiResponse };
