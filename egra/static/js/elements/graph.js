class Graph {
    constructor(func, name, id, m, k, b, n, d) {
        this.textfunc = func;
        this.func;
        this.updateFunc();
        this.name = name;
        this.id = id;

        this.selected = false;

        this.m = m;
        this.k = k;
        this.b = b;
        this.n = n;
        this.d = d;

        this.dots = [];
    }

    init() {
        for (var x = -maxGridSize; x <= maxGridSize; x += 1) {
            var y = this.m*this.func(this.k*(x+ this.b)**this.d ) + this.n;
            this.dots.push(new Dot(x, y));
        }
    }

    updateFunc() {
        if (this.textfunc == "null") {
            this.func = (arg) => {return arg};
        }
        if (this.textfunc == "sqrt") {
            this.func = Math.sqrt;
        }
        if (this.textfunc == "cos") {
            this.func = Math.cos;
        }
        if (this.textfunc == "sin") {
            this.func = Math.sin;
        }
        if (this.textfunc == "tan") {
            this.func = Math.tan;
        }
        if (this.textfunc == "asin") {
            this.func = Math.asin;
        }
        if (this.textfunc == "acos") {
            this.func = Math.acos;
        }
    }

    update() {
        translate(centerx, centery);
        // update main dots
        var i = 0;
        for (var x = -maxGridSize; x <= maxGridSize; x += 1)  {        
            var y = this.m*this.func(this.k*(x+ this.b)**this.d ) + this.n;
            var dot = this.dots[i];
            if (dot.active) {
                dot.x = x*rectSide;
                dot.y = -y*rectSide;
                dot.checkMouseCollision(mouseX, mouseY);
                dot.draw();
            }
            i++;            
        }
        // create beautiful graph
        beginShape();
        for (var x = -maxGridSize; x <= maxGridSize; x += 0.1)  {
            var y = -(this.m*this.func(this.k*(x+ this.b)**this.d ) + this.n);
            vertex(x*rectSide, y*rectSide);
        }
        if (this.selected) {
            stroke(255, 0, 0);
        } else {
            stroke(255, 255, 255);
        }
        
        strokeWeight(2);
        noFill();
        endShape();
        resetMatrix();
    }
}