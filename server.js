const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());

// Garante que a pasta 'uploads' existe para não dar erro
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `residuo_${Date.now()}.jpg`)
});

const upload = multer({ storage });

app.post('/upload', upload.single('foto'), (req, res) => {
  console.log("📸 Foto recebida com sucesso!");
  console.log("Arquivo:", req.file.filename);
  res.status(200).json({ message: "Foto salva!", arquivo: req.file.filename });
});

// ESCUTA EM TODAS AS INTERFACES (0.0.0.0) para o celular conseguir conectar
app.listen(3000, '0.0.0.0', () => {
  console.log("🚀 Servidor Full-Stack rodando!");
  console.log("Acesse pelo celular em: http://10.12.21.10:3000");
});