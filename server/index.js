import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

const app = express()

env.config()

app.use(cors())
app.use(bodyParser.json())
const port = 3094

// Connect to OpenAI API
const configuration = new Configuration({ 
    organization: "org-tUnuzgDwQIZrE3hT0UA7cBg5",
    apiKey: process.env.OPENAI_API_KEY, // for testing purposes
});
const openai = new OpenAIApi(configuration)

// listening
app.listen(port, () => console.log(`Kanaitech ChaptGPT listening at http://localhost:${port}`))

// dummy route to test
app.get('/', (req, res) => {
    res.send("Hello World! Welcome to Kanaitech ChatGPT v2.0...")
})

// post route for making request
app.post('/', async (req, res) => {
    const { message } = req.body 

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 100,
            temperature: 0.5,
        })
        res.json({message: response.data.choices[0].text,})
        console.log(response.data.choices[0].text)

    } catch (error) {
        console.log(error)
        res.send(error).status(400)
    }
})
