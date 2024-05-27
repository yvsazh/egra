class Dot {
    constructor(x, y) {
        this.x = x*rectSide;
        this.y = y*rectSide;
        this.selected = false;
        this.active = true;

        this.size = 10;
    }

    giveInfo() {
        return {x: this.x/rectSide, y: -Math.round(parseFloat(this.y/rectSide) * 100) / 100};
    }

    draw() {
        translate(centerx, centery);
        this.width = this.size;
        this.height = this.size;
        strokeWeight(0);
        if (!this.selected) {
            fill(245, 212, 66);
        } else {
            fill(255, 0, 0);
        }
        
        ellipse(this.x, this.y, this.width);
    }

    checkMouseCollision(localMouseX, localMouseY) {
        translate(centerx, centery);
        localMouseX = -centerx + mouseX;
        localMouseY = -centery + mouseY;
        if (
            localMouseX >= this.x-this.width/2 &&
            localMouseX <= this.x-this.width/2 + this.width &&
            localMouseY >= this.y-this.height/2 &&
            localMouseY <= this.y-this.height/2 + this.height
        ) {
            this.selected = true;
        }else {
            this.selected = false;
        }
        resetMatrix();
    }
}
