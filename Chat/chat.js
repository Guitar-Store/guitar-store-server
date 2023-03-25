const readline = require("readline");
const { OpenAIApi, Configuration } = require ("openai");

function createOpenAI(apiKey) {
    const openai = new OpenAIApi(new Configuration({ apiKey }));
    return openai;
}

const openai = createOpenAI(process.env.OPENAI_API_KEY);

const userInterface = {
    prompt: async (input) => {
      const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
      });
      return res;
    },
  };

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter your prompt: ", async (input) => {
    const res = await userInterface.prompt(input);
    console.log(res.data.choices[0].message.content);
    rl.close();
  });
  

// userInterface.prompt();
// userInterface.on("line", async input => {
//     const res = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [{role: "user", content: input}],
//     });
//     console.log(res.data.choices[0].message.content);
    // .then((res) => {
    //     console.log(res.data.choices[0].message.content);
    // });
// });

module.exports = { openai, userInterface };