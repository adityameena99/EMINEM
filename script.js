
function init(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
}
init();

var particleAlphabet = {
  Particle: function(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 3.5;
    this.draw = function(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, this.radius, this.radius);
      ctx.restore();
    };
  },
  init: function() {
    particleAlphabet.canvas = document.querySelector('canvas');
    particleAlphabet.ctx = particleAlphabet.canvas.getContext('2d');
    particleAlphabet.W = window.innerWidth;
    particleAlphabet.H = window.innerHeight;
    particleAlphabet.particlePositions = [];
    particleAlphabet.particles = [];
    particleAlphabet.tmpCanvas = document.createElement('canvas');
    particleAlphabet.tmpCtx = particleAlphabet.tmpCanvas.getContext('2d');

    particleAlphabet.canvas.width = particleAlphabet.W;
    particleAlphabet.canvas.height = particleAlphabet.H;

    setInterval(function(){
      particleAlphabet.changeLetter();
      particleAlphabet.getPixels(particleAlphabet.tmpCanvas, particleAlphabet.tmpCtx);
    }, 400);

    particleAlphabet.makeParticles(1000);
    particleAlphabet.animate();
  }, 
  currentPos: 0,
  changeLetter: function() {
    var letters = 'EMINEM',
      letters = letters.split('');
    particleAlphabet.time = letters[particleAlphabet.currentPos];
    particleAlphabet.currentPos++;
    if (particleAlphabet.currentPos >= letters.length) {
      particleAlphabet.currentPos = 0;
    }
  },
  makeParticles: function(num) {
    for (var i = 0; i <= num; i++) {
      particleAlphabet.particles.push(new particleAlphabet.Particle(particleAlphabet.W / 2 + Math.random() * 400 - 200, particleAlphabet.H / 2 + Math.random() * 400 -200));
    }
  },
  getPixels: function(canvas, ctx) {
    var keyword = particleAlphabet.time,
      gridX = 6,
      gridY = 6;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = 'red';
    ctx.font = 'italic bold 400px Noto Serif';
    ctx.fillText(keyword, canvas.width / 2 - ctx.measureText(keyword).width / 2, canvas.height / 2 + 100);
    var idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var buffer32 = new Uint32Array(idata.data.buffer);
    if (particleAlphabet.particlePositions.length > 0) particleAlphabet.particlePositions = [];
    for (var y = 0; y < canvas.height; y += gridY) {
      for (var x = 0; x < canvas.width; x += gridX) {
        if (buffer32[y * canvas.width + x]) {
          particleAlphabet.particlePositions.push({x: x, y: y});
        }
      }
    }
  },
  animateParticles: function() {
    var p, pPos;
    for (var i = 0, num = particleAlphabet.particles.length; i < num; i++) {
      p = particleAlphabet.particles[i];
      pPos = particleAlphabet.particlePositions[i];
      if (particleAlphabet.particles.indexOf(p) === particleAlphabet.particlePositions.indexOf(pPos)) {
      p.x += (pPos.x - p.x) * .3;
      p.y += (pPos.y - p.y) * .3;
      p.draw(particleAlphabet.ctx);
    }
    }
  },
  animate: function() {
    requestAnimationFrame(particleAlphabet.animate);
    // particleAlphabet.ctx.fillStyle = 'rgba(23, 41, 58, .8)';
    particleAlphabet.ctx.fillRect(0, 0, particleAlphabet.W, particleAlphabet.H);
    particleAlphabet.animateParticles();
  }
};

window.onload = particleAlphabet.init;

gsap.set("#myElement", {
  position: "absolute",
  left: "50px",
  top: "100px"
});


gsap.to(".p>.l1",{
  y:20,
  opacity:"1",
  scrollTrigger:{
    scroller:"#main",
    start:"top 45%",
    end:"top 70%",
    trigger:".p>.l1",
    scrub:0.5
  }
})
gsap.to(".p1>.l2",{
  y:20,
  opacity:"1",
  scrollTrigger:{
    scroller:"#main",
    start:"top 82%",
    end:"top 84%",
    trigger:".p1>.l2",
    scrub:0.5
  }
})
gsap.to(".e",{
  y:800,
  opacity:"1",
  scale:"0.9",
  duration:10,
  scrollTrigger:{
    scroller:"#main",
    start:"top 10%",
    end:"top 84%",
    trigger:".e",
    // markers:true,
    scrub:2
  }
})

gsap.from("#t",{
  y:-600,
  // duration:10,
  scrollTrigger:{
    scroller:"#main",
    trigger: "#t",
    start:"top 40%",
    end:"top 90%",
    // markers:true,
    scrub:2
  }
})

gsap.to("#ra",{
  duration:10,
  x:"-380%",
  scrollTrigger:{
    scroller:"#main",
    start:"top 20%",
    end:"top -80%",
    trigger:"#ra",
    // markers:true,
    scrub:1,
    // pin:true,
  }
})

gsap.to("#i3",{
  scale:4,
  scrollTrigger:{
    trigger:"#i3",
    scroller:"#main",
    // markers:true,
    start:"top 60%",
    end:"top 80%",
    scrub:8,
    pin:true,
  }
})
gsap.to("#i3",{
  duration:10,
  scale:1,
  scrollTrigger:{
    trigger:"#i3",
    scroller:"#main",
    // markers:true,
    start:"top 20%",
    end:"top 80%",
    scrub:20,
    pin:true,
  }
})
// gsap.from(".containerss",{
//   // y:400,
//   scrollTrigger:{
//     scroller:"#main",
//     start:"top 20%",
//     end:"top 80%",
//     trigger:".containerss",
//     markers:true,
//     scrub:1,
//     // pin:true
//   }
// })
gsap.from("#overlay",{
  y:8000,
  // opacity:1,
  duration:10,
  scrollTrigger:{
    scroller:"#main",
    start:"top 80%",
    end:"top 10%",
    trigger:"#page5",
    // markers:true,
    scrub:2,

  }
})
gsap.to("#images1",{
  y:-600,
  scrollTrigger:{
    scroller:"#main",
    start:"top 80%",
    end:"top 10%",
    trigger:"#page6",
    // markers:true,
    scrub:2,
  }
})
gsap.to("#images2",{
  y:-200,
  scrollTrigger:{
    scroller:"#main",
    start:"top 60%",
    end:"top -10%",
    trigger:"#images1",
    // markers:true,
    scrub:2,
  }
})
 
gsap.to(".cla",{
  y:-200,
  scrollTrigger:{
    scroller:"#main",
    start:"top 2%",
    end:"top -10%",
    trigger:"#images2",
    // markers:true,
    scrub:2,
  }
})
 