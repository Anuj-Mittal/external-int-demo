module.exports = function (app) {
  app.use("/api/getOTA", async (req, res) => {
    const response = await fetch(
      "https://api-qa6-dt.sprinklr.com/api/admin/generate-ota/crm?crmUserId=1234&applicationType=INTEGRATION_CONNECTOR",
      {
        method: "GET",
        headers: {
          Key: "**",
          Authorization: "Bearer **",
        },
      }
    );
    const responseObj = await response.json();
    console.log(responseObj.data);
    res.writeHead(200);
    res.end(JSON.stringify({ ota: responseObj.data }));
  });
};
