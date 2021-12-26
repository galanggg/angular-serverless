exports.handler = async (event, context) => {
  console.log("Hi from the Angular Serverless App");
  console.log(`\nHere is the event info: ${JSON.stringify(event)}`);
  console.log(`\nHere is the context info: ${JSON.stringify(context)}`);

  return {
    statusCode: 200,
    body: `${JSON.stringify(event.queryStringParameters)}`,
  };
};
