const fs = require('fs');

// Read the file
const content = fs.readFileSync('c:\\Users\\HANTER\\Desktop\\awd — копия\\src\\data\\tools.js', 'utf8');

// Split into lines
const lines = content.split('\n');

// Find the CAMERAS section and fix it
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("'CAMERAS': {")) {
    // Replace the CAMERAS section with clean syntax
    lines[i] = "  'CAMERAS': {";
    lines[i+1] = "    'Nesca v3': {";
    lines[i+2] = "      'content': 'Nesca v3 — мощная утилита для сканирования и получения доступа к IP-камерам по всему миру. Позволяет находить уязвимые устройства и просматривать трансляции в реальном времени. Обладает высокой скоростью работы и удобным интерфейсом.\\n\\nВНИМАНИЯ СВОЙ БИЛД ЛУЧШЕ НЕ ЗАПУСКАТЬ НА ОСНОВНОМ КОМПЬЮТЕРЕ, ЧТОБЫ НЕ ЗАРАЗИТСЯ',";
    lines[i+3] = "      'image': '/yguewgy.png',";
    lines[i+4] = "      'download_url': 'https://drive.google.com/file/d/1MGu3Q4RR9Wewbnq7tV3JaQm22iOcf_6O/view?usp=drive_link',";
    lines[i+5] = "      'password': 'owlsq'";
    lines[i+6] = "    }";
    lines[i+7] = "  }";
    lines[i+8] = "};";
    break;
  }
}

// Write the fixed content back
const fixedContent = lines.join('\n');
fs.writeFileSync('c:\\Users\\HANTER\\Desktop\\awd — копия\\src\\data\\tools.js', fixedContent, 'utf8');
console.log('File fixed successfully');
