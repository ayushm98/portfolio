// Generate OG Image for Portfolio
// This creates a 1200x630 image for social media previews

const fs = require('fs');
const path = require('path');

// We'll create an HTML template and use it to generate the image
const htmlTemplate = `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px;
      height: 630px;
      background: linear-gradient(135deg, #0a0a0b 0%, #18181b 50%, #0a0a0b 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      position: relative;
      overflow: hidden;
    }
    .grid {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image:
        linear-gradient(rgba(59, 130, 246, 0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(59, 130, 246, 0.02) 1px, transparent 1px);
      background-size: 60px 60px;
    }
    .content {
      text-align: center;
      z-index: 10;
      padding: 60px;
    }
    .name {
      font-size: 88px;
      font-weight: 700;
      color: #fafafa;
      margin-bottom: 30px;
      letter-spacing: -3px;
      line-height: 1;
      background: linear-gradient(135deg, #fafafa 0%, #60a5fa 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .title {
      font-size: 32px;
      color: #60a5fa;
      margin-bottom: 20px;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
    .dot {
      color: #3b82f6;
      margin: 0 12px;
      font-size: 28px;
    }
    .glow {
      position: absolute;
      width: 800px;
      height: 800px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 60%);
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .glow2 {
      position: absolute;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
      border-radius: 50%;
      top: 20%;
      right: 10%;
    }
    .floating-shapes {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .shape {
      position: absolute;
      border: 1px solid rgba(59, 130, 246, 0.2);
      border-radius: 50%;
    }
    .shape1 {
      width: 120px;
      height: 120px;
      top: 10%;
      left: 5%;
      animation: float 10s ease-in-out infinite;
    }
    .shape2 {
      width: 80px;
      height: 80px;
      bottom: 15%;
      right: 8%;
      animation: float 12s ease-in-out infinite reverse;
    }
    .shape3 {
      width: 60px;
      height: 60px;
      top: 70%;
      left: 10%;
      animation: float 8s ease-in-out infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
  </style>
</head>
<body>
  <div class="grid"></div>
  <div class="floating-shapes">
    <div class="shape shape1"></div>
    <div class="shape shape2"></div>
    <div class="shape shape3"></div>
  </div>
  <div class="glow"></div>
  <div class="glow2"></div>
  <div class="content">
    <div class="name">Ayush Kumar Malik</div>
    <div class="title">AI/ML Engineer <span class="dot">•</span> RAG Systems <span class="dot">•</span> LLM Optimization</div>
  </div>
</body>
</html>
`;

// Save the HTML template
const outputDir = path.join(__dirname, '../public');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(
  path.join(outputDir, 'og-template.html'),
  htmlTemplate
);

console.log('✅ OG image HTML template created at public/og-template.html');
console.log('\nTo generate the actual image, you can:');
console.log('1. Open public/og-template.html in a browser');
console.log('2. Take a screenshot (1200x630)');
console.log('3. Save as public/og-image.png');
console.log('\nOr use an automated tool:');
console.log('  npx playwright screenshot public/og-template.html public/og-image.png --viewport-size=1200,630');
