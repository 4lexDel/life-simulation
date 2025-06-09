import p5 from "p5";

const sketch = (p: p5) => {
  let lastCircleTime = 0;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(220);
  };

  p.draw = () => {
    const currentTime = p.millis();
    if (currentTime - lastCircleTime >= 5) {
      const x = p.random(p.width);
      const y = p.random(p.height);
      const r = p.random(255);
      const g = p.random(255);
      const b = p.random(255);

      p.fill(r, g, b);
      p.noStroke();
      p.circle(x, y, 40);

      lastCircleTime = currentTime;
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.background(220);
  };
};

new p5(sketch);