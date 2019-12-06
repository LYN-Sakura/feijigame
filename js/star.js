var yxks = document.querySelector('#yxks');
var yxsm = document.querySelector('#yxsm');
var phb = document.querySelector('#phb');
var yxjs = document.querySelector('#yxjs');
var youxijs = document.querySelector('#youxijs');
var cxks = document.querySelector('#cxks');
var scsj = document.querySelector(".scsj");
var fs = document.querySelectorAll('.fs');
var nengliang = document.querySelector('.nl');
var hit  = document.querySelector('#hit');
var shoot  = document.querySelector('#shoot');
var zjdr = document.querySelector('.zjdr');
var zjnl = document.querySelector('.zjnl');



var canvas = document.querySelector("#canvas");
var context = canvas.getContext('2d');
var cw = canvas.width = 500;
var ch = canvas.height = 500;

var play = false;
var img1 = new Image();
img1.src = "./img/ship_2.png";
var img2 = new Image();
img2.src = "./img/ship_1.png"
var img3 = new Image();
img3.src = "img/aestroid_gray_2.png"
class Player {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.vx = 6;
		this.vy = 6;
		this.shang = false;
		this.xia = false;
		this.zuo = false;
		this.you = false;
		this.kongge = false;
	}
}

class Diren {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.w = 30;
		this.h = 30;
		this.vx = Math.random() * 6 - 3;
		this.vy = Math.random() * 3;
	}
}

class Nengliang {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.w = this.h = 10;
		this.vy = 3;
	}
}

class Yunshi {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.w = this.h = Math.random() * 50;
		this.vy = 1;
	}
}

class Zidan {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.vy = 50;
	}
}

var player = new Player(cw / 2 - 20, ch - 40, 40, 40);

var direnArr = [];
var yunshiArr = [];
var nengliangArr = [];
var zidanArr = [];
// 初始x坐标
var csx = 0;
// 数量变量
var drs = 8;
var nls = 3;
var yss = 2;
var nl = 10;
var yssm = 3;

// buff按钮
zjdr.addEventListener("click", function() {
	drs += 1;
	for (let i = 0; i < drs; i++) {
		let x = Math.random() * cw;
		let y = -50;
		direnArr.push(new Diren(x, y));
	}
})
zjnl.addEventListener("click", function() {
	nls += 1;
	for (let i = 0; i < nls; i++) {
		let x = Math.random() * cw;
		let y = -200;
		nengliangArr.push(new Nengliang(x, y));
	}
})
// 制造敌人
for (let i = 0; i < drs; i++) {
	let x = Math.random() * cw;
	let y = -50;
	direnArr.push(new Diren(x, y));
}
// 制造能量
for (let i = 0; i < nls; i++) {
	let x = Math.random() * cw;
	let y = -200;
	nengliangArr.push(new Nengliang(x, y));
}
// 制造陨石
for (let i = 0; i < yss; i++) {
	let x = Math.random() * cw;
	let y = -50;
	yunshiArr.push(new Yunshi(x, y));
}
// 开始
yxks.addEventListener("click", function() {
	phb.style.display = "none";
	yxsm.style.display = "none";
	yxks.style.display = "none";
	yxjs.style.display = "flex";
	play = true;
	if (play) {
		window.requestAnimationFrame(animate)
	}
})

// 键盘控制
var shangyi = 87;
var xiayi = 83;
var zuoyi = 65;
var youyi = 68;
var kaipao = 32;

window.onkeydown = function(e) {
	let kc = e.keyCode;
	if (kc == zuoyi) {
		player.zuo = true;
	} else if (kc == shangyi) {
		player.shang = true;
	} else if (kc == youyi) {
		player.you = true;
	} else if (kc == xiayi) {
		player.xia = true;
	} else if (kc == kaipao) {
		player.kongge = true;
	}
}

window.onkeyup = function(e) {
	let kc = e.keyCode;
	if (kc == zuoyi) {
		player.zuo = false;
	} else if (kc == shangyi) {
		player.shang = false;
	} else if (kc == youyi) {
		player.you = false;
	} else if (kc == xiayi) {
		player.xia = false;
	} else if (kc == kaipao) {
		player.kongge = false;
	}
}


// 碰撞检测
function pz(A, B) {
	var ko = false;
	if ((A.x > (B.x - A.w)) && (A.x < (B.x + B.w)) && (A.y > (B.y - A.h)) && (A.y < (B.y + B.w))) {
		ko = true;
	}
	return ko;
}


// 重新开始
cxks.addEventListener("click", function() {
	location.reload(true);
})

var shengcun = 0;
// 时间差
var lasttime1 = 0;
var lasttime2 = 0;
var lasttime3 = 0;
// 分数
var fenshu = 0;
// animate
function animate(time) {

	// 计时间
	if ((time - lasttime2) > 1000) {
		shengcun += 1;
		scsj.innerHTML = shengcun;
		lasttime2 = time;
	}
	// 计数
	nengliang.innerHTML = nl;
	fs[0].innerHTML = fs[1].innerHTML = fenshu;
	if (nl <= 0) {
		nl = 0;
		play = false;
		youxijs.style.display = "block";
	} else if (nl >= 30) {
		nl = 30;
	}
	if ((time - lasttime3) > 2000 && shengcun >= 1) {
		nl -= 1;
		lasttime3 = time;
	}

	context.clearRect(0, 0, cw, ch);
	context.fillStyle = "#F39C12";

	csx += 80;
	if (csx > 240) {
		csx = 0;
	}
	context.drawImage(img1, csx, 0, 80, 80, player.x, player.y, player.w, player.h);
	// 移动
	if (player.shang) {
		player.y -= player.vy;
	}
	if (player.xia) {
		player.y += player.vy;
	}
	if (player.zuo) {
		player.x -= player.vx;
	}
	if (player.you) {
		player.x += player.vx;
	}
	// 子弹
	if (player.kongge && (time - lasttime1) > 50) {
		let x = player.x + player.w / 3;
		let y = player.y - player.h / 3;
		let w = player.w / 3;
		let h = player.h / 2;
		zidanArr.push(new Zidan(x, y, w, h))
		lasttime1 = time;
		shoot.currentTime = 0.18;
		shoot.play();
		
	}
	for (let zd of zidanArr) {
		zd.y -= zd.vy;
		context.fillStyle = "#F39C12";
		context.fillRect(zd.x, zd.y, zd.w, zd.h)
		if (zd.y < -20) {
			let xiabiao = zidanArr.indexOf(zd);
			zidanArr.splice(xiabiao, 1);
		}
		// 击杀敌人
		for (let dq of direnArr) {
			if (pz(zd, dq)) {
				dq.x = Math.random() * cw;
				dq.y = -50;
				fenshu += 1;
				let xiabiao = zidanArr.indexOf(zd);
				zidanArr.splice(xiabiao, 1);
				hit.play();
				hit.currentTime = 0.18;
			}
		}
		// 击杀陨石
		for (let ys of yunshiArr) {
			if (pz(zd, ys)) {
				let xiabiao = zidanArr.indexOf(zd);
				zidanArr.splice(xiabiao, 1);
				yssm -= 1;
				if (yssm <= 0) {
					ys.x = Math.random() * cw;
					ys.y = -100;
					yssm = 3;
				}
			}

		}
	}
	// 制造敌人
	for (let dq of direnArr) {
		dq.x += dq.vx;
		dq.y += dq.vy;
		context.fillStyle = "red";
		context.drawImage(img2, csx, 0, 80, 80, dq.x, dq.y, dq.w, dq.h);
		if (dq.x < -30 || dq.x > cw) {
			dq.vx = -dq.vx;
		}
		if (dq.y > ch) {
			dq.x = Math.random() * cw;
			dq.y = -50;
		}
		if (pz(dq, player)) {
			nl -= 5;
			dq.x = Math.random() * cw;
			dq.y = -50;
		}
	}

	// 制造能量
	for (let dq of nengliangArr) {
		dq.y += dq.vy;
		context.fillStyle = "white";
		context.fillRect(dq.x, dq.y, dq.w, dq.h)
		if (dq.y > ch) {
			dq.x = Math.random() * cw;
			dq.y = -300;
		}
		if (pz(dq, player)) {
			nl += 5;
			dq.x = Math.random() * cw;
			dq.y = -300;
		}
	}
	// 制造陨石
	for (let dq of yunshiArr) {
		dq.y += dq.vy;
		context.fillStyle = "red";
		context.drawImage(img3, dq.x, dq.y, dq.w, dq.h)
		if (dq.y > ch) {
			dq.x = Math.random() * cw;
			dq.y = -100;
			yssm = 3;
		}
		if (pz(dq, player)) {
			nl -= 10;
			dq.x = Math.random() * cw;
			dq.y = -100;
			yssm = 3;
		}
	}

	// 边界判定
	if (player.x < 0) {
		player.x = 0;
	} else if (player.x > (cw - player.w)) {
		player.x = cw - player.w
	}

	if (player.y < 0) {
		player.y = 0;
	} else if (player.y > (ch - player.h)) {
		player.y = ch - player.h;
	}
	if (play) {
		window.requestAnimationFrame(animate);
	}

}
