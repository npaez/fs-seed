// modules
import path from 'path';

// frontend ctrl
export const client = (req, res) => {
  const client = path.join(__dirname, '../frontend/build/index.html');

  return res.sendFile(client);
};