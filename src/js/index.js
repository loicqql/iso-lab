
let Shape = Isomer.Shape;
let Point = Isomer.Point;
let Color = Isomer.Color;

let coeff = 1.3;
let color1 = 'FFC003';
let color2 = '6D32ED';

window.addEventListener('DOMContentLoaded', () => {

    const onEvent = (selectorCss, event, functionCallback) => {document.querySelectorAll(selectorCss).forEach(el => {el.addEventListener(event, function() {functionCallback(this)})})};

    let iso; // isomer


    let canvas = document.createElement('canvas');
    let main = document.querySelector('main');
    canvas.id = 'game';
    canvas.width = main.offsetWidth;
    canvas.height = main.offsetHeight;
    document.querySelector('main').appendChild(canvas); // adds the canvas to #someBox

    iso = new Isomer(document.getElementById('game'), {
        originX: main.offsetWidth / 2,
        originY: main.offsetHeight / 2,
        scale: 25
    });

    let cubes = [];

    let size = 30;

    let k = 0;
    for (let i = size / 2; i > - size / 2; i--) {
        for (let j = size / 2; j > -size / 2; j--) {
            cubes[k] = new Cube(i, j);
            k++;
        }  
    }

    let delta = 0;

    let animate = () => {

        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        for (let j = 0; j < size; j++) {
            let up = Math.cos(j * (2*Math.PI / (size - 1)) + delta);
            for (let i = j; i < cubes.length; i += 29) {
                cubes[i].setZ(up / coeff);
            }
        }

        delta += (2*Math.PI / (size - 1));

        cubes.forEach(cube => {
            cube.draw(iso);
        });

        requestAnimationFrame(animate);
    };

    animate();
});

class Cube {
    z = 0;
    rgb = [];

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.rgb = [237,50,134];
    }

    setZ(delta) {
        this.z = delta;
    }

    setColor(rgb) {
        this.rgb = rgb;
    }

    draw(isomer) {
        let scale = chroma.scale([color1, color2]);
        let color = scale(((this.z + (1 / coeff)) / (2 / coeff))).rgb();
        isomer.add(Shape.Prism(Point(this.x, this.y, this.z), 1, 1, 1), new Color(color[0], color[1], color[2]));
    }
}