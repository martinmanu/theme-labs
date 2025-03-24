const express = require('express');
const path = require('path');

const app = express();
const PORT = 4000;

app.use(express.static(path.join(__dirname, 'ui')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

(async () => {
  // Dynamically import the ES Module "open"
  const openModule = await import('open');
  const open = openModule.default;

  app.listen(PORT, () => {
    console.log(`Theme Lab UI running at http://localhost:${PORT}`);
    open(`http://localhost:${PORT}`);
  });
})();
