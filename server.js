// config do express escutar
import app from './app';

const port = 3002;

// ==== config da port ====
app.listen(port, () => {
  console.log('===============');
  console.log(`Porta sendo escutada ${port}`);
  console.log(`Click + crtl -> http://localhost:${port}`);
});
