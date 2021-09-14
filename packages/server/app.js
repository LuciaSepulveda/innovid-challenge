const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
const PORT = process.env.PORT || 8000

app.get("/status/:id", async (req, res) =>
  res.json({id: req.params.id, load: Math.floor(Math.random() * 100)}),
)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
