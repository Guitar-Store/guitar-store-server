const express = require("express");
const { openai, userInterface } = require("../Chat/chat");

const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt } = req.body;
try {
  const completion =  await userInterface.prompt(prompt);
  res.send(completion.data.choices[0].message.content);
  
}
catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
  // res.send(completion.data.choices[0].message.content);
});
module.exports = router;