import "./style.css";
import "./../tween.js"

const DEG = Math.PI / 180;
const POWER = 10; // 力量单位比例 单位。 1:10
const G = 5;    // 重力加速度
const Duration = 1000; //动画执行时长

const Quad = Math.tween.Quad;

class Partical {
    constructor() {
        this.dom = document.createElement("div");
        this.dom.classList.add("Boom-Partical_Holder");
        this.dom.innerHTML = `
            <div class="Boom-Partical_con">
                Boom
            </div>
        `;
    }
    dom = null;
    StartTime = -1;
    direction = "UP";
    delay = 0;
    targetZ = 0;
    targetY = 0;
    targetX = 0;
    scaleNum = 1;
    animating = false;
    parent = null;
    animEndCBList = [];
    con = null;

    insertChild(child){
        this.con.innerHTML = '';
        this.con.appendChild(child);
    }

    onAnimationEnd(cb) {
        if (typeof cb !== 'function') return;
        this.animEndCBList.push(cb);
    }
    emitEndCB() {
        this.dom.style.cssText += `;-webkit-transform:translate3d(0,0,0);opacity:1;`;
        this.animating = false;
        try {
            for (let cb of this.animEndCBList) {
                cb();
            }
        } catch (error) {
            console.warn("回调报错:",cb);
        }
    }

    moveX(currentDuration) {
        return Math.tween.Linear(currentDuration, 0, this.targetX, Duration) * 2;
    }

    moveY(currentDuration) {
        let direction = this.direction;
        if (direction === 'UP') {
            // 如果是上抛运动
            if (currentDuration < Duration / 2) {
                // 上抛过程
                return Quad.easeOut(currentDuration, 0, this.targetY + G, Duration / 2);
            }
            // 下降过程
            return this.targetY + G - Quad.easeIn(currentDuration - Duration / 2, 0, this.targetY / 2, Duration / 2);
        }
        return Quad.easeIn(currentDuration, 0, this.targetY, Duration);
    }

    moveZ(currentDuration) {
        return Quad.easeIn(currentDuration, 0, this.targetZ, Duration);
    }

    scale(currentDuration) {
        return Quad.easeOut(currentDuration, 1, this.scaleNum, Duration);
    }

    opacity(currentDuration) {
        return Quad.easeIn(currentDuration, 1, -1, Duration);
    }

    raf() {
        this.animating = true;
        this.StartTime = +new Date();
        let StartTime = this.StartTime;
        let delay = this.delay;
        let StartTimeAfterDelay = StartTime + delay

        // 界定开始时间

        let animate = () => {
            let timeGap = +new Date() - StartTimeAfterDelay;
            if (timeGap >= 0) {
                if (timeGap > Duration) {
                    this.emitEndCB();
                    return;
                }
                this.dom.style.cssText += `;will-change:transform;-webkit-transform:translate3d(${this.moveX(timeGap)}vh,${this.moveY(timeGap)}vh,0) scale(${this.scale(timeGap)});opacity:${this.opacity(timeGap)};`;
            }
            requestAnimationFrame(animate);
        }
        animate();
    }

    // 在哪里渲染
    renderIn(con) {
        con.appendChild(this.dom);
        this.parent = con;
        !this.con && ( this.con = this.dom.querySelector(".Boom-Partical_con"));
    }

    deleteEl(){
        this.parent.removeChild(this.dom);
    }

    // 执行动画 角度 ， 力 1 ~ 10 ; 1 = 10vh
    animate({ deg, pow, delay } = {}) {
        this.direction = deg > 180 ? "UP" : "DOWN";
        this.delay = delay || 0;
        let r = Math.random();
        this.targetZ = Math.round(pow * pow) * (r < 0.5 ? -1 : 1);
        this.targetY = Math.round(pow * Math.sin(deg * DEG) * POWER);
        this.targetX = Math.round(pow * Math.cos(deg * DEG) * POWER) * (r + 1);
        this.scaleNum = (r * 0.8) * (r < 0.5 ? -1 : 1);
        this.raf();
    }
}

export default Partical;
