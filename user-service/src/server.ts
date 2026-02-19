import { app } from './app';
import { env } from './config/env';

app.listen(env.port, () => {
  console.log(`Users Service escuchando en puerto ${env.port}`);
});
