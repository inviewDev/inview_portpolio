const homepageList = [
    {
    url: "https://inviewdev.cafe24.com/skin-skin7/",
    img: "skin7",
    name: "템플릿01",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin9/",
    img: "skin9",
    name: "템플릿02",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin10/",
    img: "skin10",
    name: "템플릿03",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin11/",
    img: "skin11",
    name: "템플릿04",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin13/",
    img: "skin13",
    name: "템플릿05",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin14/",
    img: "skin14",
    name: "템플릿06",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin5/",
    img: "skin5",
    name: "템플릿07",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin15/",
    img: "skin15",
    name: "템플릿08",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin16/",
    img: "skin16",
    name: "템플릿09",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin17/",
    img: "skin17",
    name: "템플릿10",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin19/",
    img: "skin19",
    name: "템플릿11",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin20/",
    img: "skin20",
    name: "템플릿12",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin21/",
    img: "skin21",
    name: "템플릿13",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin22/",
    img: "skin22",
    name: "템플릿14",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin23/",
    img: "skin23",
    name: "템플릿15",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin24/",
    img: "skin24",
    name: "템플릿16",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin25/",
    img: "skin25",
    name: "템플릿17",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin29/",
    img: "skin29",
    name: "템플릿18",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin30/",
    img: "skin30",
    name: "템플릿19",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin31/",
    img: "skin31",
    name: "템플릿20",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin32/",
    img: "skin32",
    name: "템플릿21",
    },
    {
    url: "https://inviewdev.cafe24.com/skin-skin33/",
    img: "skin33",
    name: "템플릿22",
    },
    {
    url: "https://inview0310.cafe24.com/skin-skin18/",
    img: "skin18",
    name: "템플릿23",
    },
    {
      url: "https://inview0310.cafe24.com/skin-skin20",
      img: "skin20-1",
      name: "템플릿24",
      },
];

function setList(pfFrame) {
  for (let i = 0; i < homepageList.length; i++) {
    pfFrame.innerHTML +=
      "<li><a href=" +
      homepageList[i].url +' target="_blank"><img src="./img/web_portpolio/' +
      homepageList[i].img +'.webp" alt="' +
      homepageList[i].name +' 섬네일" /></a>' +
      '<a href="' +
      homepageList[i].url +
      '" target="_blank" class="portpolio_info">' +
      homepageList[i].name +
      "</span></li>";
    +"</a>";
  }
}

const pfFrames = document.querySelectorAll(".all");
pfFrames.forEach(pfFrame => setList(pfFrame));

$(function () {
  $(".all li").slice(0, 20).show(); // 초기갯수
});