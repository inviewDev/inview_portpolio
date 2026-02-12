// ScrollMagic
let controller = new ScrollMagic.Controller();
// GSAP
let galley = gsap.timeline();
let xPos = 0;
galley
  .set(".ring_box", { rotationY: 280, cursor: "grab" }) //set initial rotationY so the parallax jump happens off screen
  .set(".cont_box", {
    // apply transform rotations to each image
    rotateY: (i) => i * -24,
    transformOrigin: "50% 50% 1200px",
    z: -1200,
    backgroundPosition: (i) => getBgPos(i),
    backfaceVisibility: "hidden",
  })
  .from(".cont_box", {
    duration: 1,
    y: 200,
    opacity: 0,
    stagger: 0.1,
    ease: "expo",
  })
  .add(() => {
    $(".cont_box").on("mouseenter", (e) => {
      let current = e.currentTarget;
      gsap.to(".cont_box", { opacity: (i, t) => (t == current ? 1 : 0.5), ease: "power3" });
    });
    $(".cont_box").on("mouseleave", (e) => {
      gsap.to(".cont_box", { opacity: 1, ease: "power2.inOut" });
    });
  }, "-=0.5");

function dragStart(e) {
  if (e.touches) e.clientX = e.touches[0].clientX;
  xPos = Math.round(e.clientX);
  gsap.set(".ring_box", { cursor: "grabbing" });
  $(window).on("mousemove touchmove", drag);
}
function drag(e) {
  if (e.touches) e.clientX = e.touches[0].clientX;
  gsap.to(".ring_box", {
    rotationY: "-=" + ((Math.round(e.clientX) - xPos) % 360),
    onUpdate: () => {
      gsap.set(".cont_box", { backgroundPosition: (i) => getBgPos(i) });
    },
  });
  xPos = Math.round(e.clientX);
}
function dragEnd(e) {
  $(window).off("mousemove touchmove", drag);
  gsap.set(".ring_box", { cursor: "grab" });
}
function getBgPos(i) {
  return (
    100 - (gsap.utils.wrap(0, 360, gsap.getProperty(".ring_box", "rotationY") - 180 - i * 36) / 360) * 500 + "px 0px"
  );
}
$(window).on("mousedown touchstart", dragStart);
$(window).on("mouseup touchend", dragEnd);

new ScrollMagic.Scene({
  triggerElement: ".ring_cont_slide_box",
  offset: 100,
  reverse: true,
})
  .setTween(galley)
  .addTo(controller);

// button event
$(".button--bubble").each(function () {
  var $circlesTopLeft = $(this).parent().find(".circle.top-left");
  var $circlesBottomRight = $(this).parent().find(".circle.bottom-right");

  var tl = new TimelineLite();
  var tl2 = new TimelineLite();

  var btTl = new TimelineLite({ paused: true });

  tl.to($circlesTopLeft, 1.2, { x: -25, y: -25, scaleY: 2, ease: SlowMo.ease.config(0.1, 0.7, false) });
  tl.to($circlesTopLeft.eq(0), 0.1, { scale: 0.2, x: "+=6", y: "-=2" });
  tl.to($circlesTopLeft.eq(1), 0.1, { scaleX: 1, scaleY: 0.8, x: "-=10", y: "-=7" }, "-=0.1");
  tl.to($circlesTopLeft.eq(2), 0.1, { scale: 0.2, x: "-=15", y: "+=6" }, "-=0.1");
  tl.to($circlesTopLeft.eq(0), 1, { scale: 0, x: "-=5", y: "-=15", opacity: 0 });
  tl.to($circlesTopLeft.eq(1), 1, { scaleX: 0.4, scaleY: 0.4, x: "-=10", y: "-=10", opacity: 0 }, "-=1");
  tl.to($circlesTopLeft.eq(2), 1, { scale: 0, x: "-=15", y: "+=5", opacity: 0 }, "-=1");

  var tlBt1 = new TimelineLite();
  var tlBt2 = new TimelineLite();

  tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 });
  tlBt1.add(tl);

  tl2.set($circlesBottomRight, { x: 0, y: 0 });
  tl2.to($circlesBottomRight, 1.1, { x: 30, y: 30, ease: SlowMo.ease.config(0.1, 0.7, false) });
  tl2.to($circlesBottomRight.eq(0), 0.1, { scale: 0.2, x: "-=6", y: "+=3" });
  tl2.to($circlesBottomRight.eq(1), 0.1, { scale: 0.8, x: "+=7", y: "+=3" }, "-=0.1");
  tl2.to($circlesBottomRight.eq(2), 0.1, { scale: 0.2, x: "+=15", y: "-=6" }, "-=0.2");
  tl2.to($circlesBottomRight.eq(0), 1, { scale: 0, x: "+=5", y: "+=15", opacity: 0 });
  tl2.to($circlesBottomRight.eq(1), 1, { scale: 0.4, x: "+=7", y: "+=7", opacity: 0 }, "-=1");
  tl2.to($circlesBottomRight.eq(2), 1, { scale: 0, x: "+=15", y: "-=5", opacity: 0 }, "-=1");

  tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 });
  tlBt2.add(tl2);

  btTl.add(tlBt1);
  btTl.to($(this).parent().find(".button.effect-button"), 0.8, { scaleY: 1.1 }, 0.1);
  btTl.add(tlBt2, 0.2);
  btTl.to(
    $(this).parent().find(".button.effect-button"),
    1.8,
    { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) },
    1.2
  );

  btTl.timeScale(2.6);

  $(this).on("mouseover", function () {
    btTl.restart();
  });
});

// parallax item
gsap.utils.toArray(".parallax_item_p, .parallax_item_span, .parallax_item_img").forEach((item) => {
  let yPercentValue;
  let opacityValue;

  if (item.classList.contains("parallax_item_p")) {
    yPercentValue = -200;
    opacityValue = 0;
  } else if (item.classList.contains("parallax_item_span")) {
    yPercentValue = -150;
    opacityValue = 0;
  }

  gsap.to(item, {
    yPercent: yPercentValue,
    ease: "none",
    duration: 0.5,
    scrollTrigger: {
      trigger: item,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
    },
  });

  if (item.classList.contains("parallax_item_img")) {
    gsap.fromTo(
      item,
      { opacity: 0.1 },
      {
        opacity: 1,
        filter: "saturate(100%)",
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "center center",
          scrub: 0.5,
        },
      }
    );
  }

  if (item.classList.contains("parallax_item_span")) {
    let SplitClient = new SplitType(item, { type: "lines, words, chars" });
    let lines = SplitClient.lines;
    let words = SplitClient.words;
    let chars = SplitClient.chars;

    gsap.from(words, {
      yPercent: 100,
      opacity: 0,
      duration: 1,
      ease: "circ.out",
      stagger: {
        amount: 1,
        from: "random",
      },
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: "+=400",
      },
    });
  }
});

// movement
gsap.utils.toArray(".content_01.parallax_item").forEach((item) => {
  gsap.fromTo(
    item,
    { x: "20%", scale: "1.1", opacity: 0 },
    {
      x: "0%",
      opacity: 1,
      scale: "1",
      duration: 0.8,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: item,
        start: "top center",
        end: "bottom center",
      },
    }
  );
});

gsap.from(".belt_cont", {
  opacity: 0,
  scrollTrigger: {
    trigger: ".content_01",
    start: "center center",
    end: "bottom center",
    scrub: true,
  },
});

gsap.fromTo(
  ".belt_cont b",
  { x: "200%", scale: 1, opacity: 0 },
  {
    x: "5%",
    scale: 1,
    opacity: 1,
    scrollTrigger: {
      trigger: ".parallax_cont",
      start: "center center",
      end: "cetner center",
      scrub: 1,
    },
  }
);

gsap.fromTo(
  ".solve_one",
  { scale: 2.5, opacity: 0 },
  {
    scale: 1,
    opacity: 1,
    scrollTrigger: {
      trigger: ".solve_cont",
      duration: 0.8,
      start: "top center",
      end: "bottom center",
    },
  }
);

gsap.fromTo(
  ".solve_two",
  { y: "50%", scale: 0.5, opacity: 0 },
  {
    y: "0",
    scale: 1,
    opacity: 1,
    scrollTrigger: {
      trigger: ".solve_cont",
      duration: 1.2,
      ease: "power3.inOut",
      start: "top center",
      end: "bottom center",
    },
  }
);

gsap.fromTo(
  ".projects_box img",
  { y: "-30%", scale: 1, opacity: 0 },
  {
    y: "0",
    scale: 1,
    opacity: 1,
    scrollTrigger: {
      trigger: ".projects_box",
      ease: "power3.inOut",
      start: "top center",
      end: "top center",
      scrub: 1,
      restart: true,
    },
  }
);

$(document).ready(function () {
  // aos load event
  AOS.init({
    easing: "ease-in-out-quart",
    duration: 350,
  });
  // top vis
  var top_card = $(".c_card");
  $(".c_cont").on("mousemove", function (t) {
    var e = -($(window).innerWidth() / 2 - t.pageX) / 60,
      n = ($(window).innerHeight() / 2 - t.pageY) / 50;
    top_card.attr(
      "style",
      "transform: rotateY(" +
        e +
        "deg) rotateX(" +
        n +
        "deg);-webkit-transform: rotateY(" +
        e +
        "deg) rotateX(" +
        n +
        "deg);-moz-transform: rotateY(" +
        e +
        "deg) rotateX(" +
        n +
        "deg)"
    );
  });

  // tap
  $(".tap_btn_group a").on("click", function (e) {
    e.preventDefault();
    var a_this = $(this);
    var tapVal = a_this.index();
    var parentTapBox = a_this.closest(".tap_box");
    a_this.addClass("active");
    parentTapBox.find(".tap_btn_group a").removeClass("active");
    parentTapBox.find(".tap_cont_group div").removeClass("active");
    parentTapBox.find(".tap_btn_group a").eq(tapVal).addClass("active");
    parentTapBox.find(".tap_cont_group div").eq(tapVal).addClass("active");
    var ddd = parentTapBox.find(".tap_cont_group div").eq(tapVal).find("li").length;
    console.log(ddd);
  });
});

// video img
const canvas = document.querySelector(".sample-canvas");
const context = canvas.getContext("2d");
const videoImages = [];
let totalImagesCount = 176;
let progress;
let currentFrame;
function setImages() {
  for (let i = 0; i < totalImagesCount; i++) {
    let imgElem = new Image();
    imgElem.src = `./resource/videoimg2/IMG_${111 + i}.jpg`;
    videoImages.push(imgElem);
  }
}
function loop() {
  progress = pageYOffset / (document.body.offsetHeight - window.innerHeight);
  if (progress < 0) progress = 0;
  if (progress > 1) progress = 1;

  currentFrame = Math.round((totalImagesCount - 1) * progress);
  context.drawImage(videoImages[currentFrame], 0, 0);

  requestAnimationFrame(loop);
}
function init() {
  document.body.classList.remove("before-load");
  context.drawImage(videoImages[0], 0, 0);
  loop();
}
window.addEventListener("load", init);
setImages();

$(function () {
  $("nav a").on("click", function (e) {
    e.preventDefault();

    var navHref = $(this).attr("href").substring(1);
    var tapContent = $(".tap_btn_group > a").filter(function () {
      return $(this).data("tap-cont") === navHref;
    });

    var targetContent = $(".tap_cont_group > div").filter(function () {
      return $(this).data("tap-cont") === navHref;
    });

    $(".tap_btn_group a, .tap_cont_group > div").removeClass("active");
    targetContent.addClass("active");
    tapContent.addClass("active");

    var offsetTop = $(".projects_box").offset().top;
    $("html, body").animate({ scrollTop: offsetTop }, 600);
  });

  $(".template_move").on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $(".projects_box").offset().top,
      },
      1000
    );
  });
  $(window).on("scroll", function () {
    $(".template_move").each(function () {
      var $this = $(this);
      var elementOffset = $(".projects_box").offset().top;
      var scrollTop = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (
        scrollTop + windowHeight > elementOffset &&
        scrollTop < elementOffset + $(".projects_box").outerHeight()
      ) {
        $this.addClass("on_project");
      } else {
        $this.removeClass("on_project");
      }
    });
  });
});
