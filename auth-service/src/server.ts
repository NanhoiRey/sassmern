import { app } from './app';
import { env } from './config/env';

app.listen(env.port, () => {
  console.log(`Auth Service escuchando en puerto ${env.port}`);
  console.log("DEBUG TOKENS:", env.jwtAccessSecret, env.jwtRefreshSecret);

});


