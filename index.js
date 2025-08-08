const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
// Вставьте сюда ваши VAPID-ключи:
const publicVapidKey = 'BEmCtGNaMk_6pFhZqX_Fp9_oRDjv04edkjvCZ-XprWe4Yt0fC5Xk-e-hDba6lu2NMTpKOfxj6eDK_a7pZ51Me-Y';
const privateVapidKey = 'Lw6e6af7mnlvRR59A9Mz9OG7yuqQdRy0vtG1C30ggKU';

webpush.setVapidDetails(
  'mailto:afdimval@gmail.com',
  publicVapidKey,
  privateVapidKey
);

// Хранилище подписок (в реальном проекте — БД)
const subscriptions = [];

// Маршрут для сохранения подписки от клиента
app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({ message: 'Подписка сохранена.' });
});

// Маршрут для отправки уведомления всем подписчикам
app.post('/send-notification', async (req, res) => {
  const { title, body, url } = req.body;
  const payload = JSON.stringify({ title, body, url });

  const sendPromises = subscriptions.map(sub =>
    webpush.sendNotification(sub, payload).catch(console.error)
  );

  try {
    await Promise.all(sendPromises);
    res.json({ message: 'Уведомления отправлены.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Запуск сервера
const PORT = 4000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));