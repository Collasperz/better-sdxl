const express = require('express')
const WebSocket = require('ws')
const app = express()

app.use(express.json())

app.post('/api/image', function (req, res) {
  const body = req.body
  const ws = new WebSocket("wss://prodia-sdxl-stable-diffusion-xl.hf.space/queue/join")
  
  ws.on("open", function () {
      ws.send(JSON.stringify({"fn_index":0,"session_hash":"zev6i7enjee"}))
      ws.send(JSON.stringify({"data":[body.prompt, body.neg,"sd_xl_base_1.0.safetensors [be9edd61]",body.steps,"DPM++ 2S a Karras",body.cfg,1024,1024,body.seed],"event_data":null,"fn_index":0,"session_hash":"zev6i7enjee"}))
  })
  ws.on("message", function (data) {
        ws_res = JSON.parse(data)
        if (ws_res.msg == "process_completed") {
          res.json({
            "data": ws_res.output.data[0]
          })

        }
    })
  })

app.listen(3000, function() {
  console.log('Server has started!')
})
