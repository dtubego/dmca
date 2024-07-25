const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const port = process.env.PORT || 3000
const jsonfile = require('jsonfile')
const file = 'dmca.json'
jsonfile.readFile(file, function(err, dmca) {
  app.get('/v/:author/:permlink', (req, res) => {
    if (dmca.authors.indexOf(req.params.author) > -1)
        res.json({dmca: 2})
    else if (dmca.videos.indexOf(req.params.author+'/'+req.params.permlink) > -1)
        res.json({dmca: 1})
    else
        res.json({dmca: 0})
  })
  app.use(express.json({limit: '50mb'}));
  app.post('/feed', (req, res) => {
    let newFeed = [];
    for (let feedItem in req.body) {
      if (dmca.authors.indexOf(req.body[feedItem].author) == -1 && dmca.videos.indexOf(req.body[feedItem]._id) == -1) {
        newFeed.push(req.body[feedItem]);
      }
    }
    res.json(newFeed);
  })
  app.listen(port, '127.0.0.1', () => console.log('DMCA server is ready on port '+port))
})
