// modules
import path from 'path';

// frontend ctrl
const client = (req, res) => {
  const client = path.join(__dirname, '../frontend/build/index.html');

  return res.sendFile(client);
};

// export module
export default {
  client
};