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
      background: linear-gradient(135deg, #09090b 0%, #18181b 100%);
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
        linear-gradient(rgba(52, 211, 153, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(52, 211, 153, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
    }
    .content {
      text-align: center;
      z-index: 10;
      padding: 60px;
    }
    .name {
      font-size: 72px;
      font-weight: 700;
      color: #fafafa;
      margin-bottom: 20px;
      letter-spacing: -2px;
    }
    .title {
      font-size: 36px;
      color: #34d399;
      margin-bottom: 40px;
      font-weight: 500;
    }
    .stats {
      display: flex;
      gap: 60px;
      justify-content: center;
      margin-top: 50px;
    }
    .stat {
      text-align: center;
    }
    .stat-number {
      font-size: 48px;
      font-weight: 700;
      color: #34d399;
      margin-bottom: 8px;
    }
    .stat-label {
      font-size: 18px;
      color: #a1a1aa;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .glow {
      position: absolute;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(52, 211, 153, 0.15) 0%, transparent 70%);
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  </style>
</head>
<body>
  <div class="grid"></div>
  <div class="glow"></div>
  <div class="content">
    <div class="name">Ayush Kumar Malik</div>
    <div class="title">AI/ML Engineer • RAG Systems • LLM Optimization</div>
    <div class="stats">
      <div class="stat">
        <div class="stat-number">5</div>
        <div class="stat-label">Projects</div>
      </div>
      <div class="stat">
        <div class="stat-number">4</div>
        <div class="stat-label">Live Demos</div>
      </div>
      <div class="stat">
        <div class="stat-number">400ms</div>
        <div class="stat-label">LLM Latency</div>
      </div>
    </div>
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
