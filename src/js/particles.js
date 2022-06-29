export default function() {

    class Particle {

        dx = 0;
        dy = 0;
        dz = 0;
    
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;

            this.dx = Math.random() * 0.1;
            this.dy = Math.random() * 0.1;
            this.dz = Math.random() * 0.12;

            this.dy = Math.random() > 0.5 ? this.dy * -1 : this.dy;

        }
    
        getX() {
            return this.x;
        }
        
        getY() {
            return this.y;
        }

        getZ() {
            return this.z;
        }

        update() {
            let m = 0.006;
            this.dx -= m * 0.8;
            this.dy > 0 ?  this.dy - m : this.dy + m;
            this.dz -= m; 
            
            if(this.z <= 0.9) { //sol si true = sur le sol
                this.z = 0.9;
                //reset des deltas
                this.dx = 0;
                this.dy = 0;
                this.dz = 0;
            }else {
                // this.dx = this.dx < 0.2 ? 0.2 : this.dx;
                // this.dy = this.dy < 0.2 ? 0.2 : this.dy;
            }

            

            this.x += this.dx;
            this.y += this.dy;
            this.z += this.dz;

            //limites de directions
            this.x = this.x > 0.7 ? 0.7 : this.x; // bloc en face

            
        }

        draw(isomer) {
            // console.log(this.y);
            isomer.add(Shape.Prism(Point(this.x, this.y, this.z), 0.2, 0.2, 0.2), new Color(255, 0, 0));
        }
    }


    let iso; // isomer

    let Shape = Isomer.Shape;
    let Point = Isomer.Point;
    let Color = Isomer.Color;

    let canvas = document.createElement('canvas');
    let main = document.querySelector('main');
    canvas.id = 'game';
    canvas.width = main.offsetWidth;
    canvas.height = main.offsetHeight;
    document.querySelector('main').appendChild(canvas);

    iso = new Isomer(document.getElementById('game'), {
        originX: main.offsetWidth / 2,
        originY: main.offsetHeight / 2,
    });

    let delta = 0;
    let stop = false;

    let particles = [];
    for (let i = 0; i < 150; i++) {
        particles[i] = new Particle(0.7, -0.5, 2);
    }
    

    let animate = () => {

        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);


        iso.add(Shape.Prism(Point(-5 - delta, -3, 0), 20, 5, 1));
        
        iso.add(Shape.Prism(Point(12 - delta, -1, 1), 1, 1, 1));

        if(!stop) {
            iso.add(Shape.Prism(Point(0, -1, 1), 1, 1, 1), new Color(255, 0, 0));
        } else {
            particles.sort((a, b) => {
                if((a.getX() > b.getX()) && (a.getY() < b.getY())) {
                    return true;
                }
            })
            particles.forEach(particle => {
                particle.update();
                particle.draw(iso);
            });
        }

        if(delta < 11) {
            delta += 0.15;
        } else {
            stop = true;
        }
        

        requestAnimationFrame(animate); 

    };

    animate();
}