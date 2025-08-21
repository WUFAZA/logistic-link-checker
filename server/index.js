const express = require('express');
const cors = require('cors');
const { PythonShell } = require('python-shell');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/check-link', (req, res) => {
  const url = req.body.url;

  PythonShell.run(
    path.join(__dirname, 'ml/check_link.py'),
    { args: [url] },
    (err, results) => {
      if (err || !results) {
        return res.status(500).json({ error: 'Python error' });
      }
      res.json({ classification: results[0] });
    }
  );
});

app.listen(3001, () => console.log('Backend running on port 3001'));
