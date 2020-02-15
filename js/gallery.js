class GalleryItem {
  constructor(imageSrc, width, height) {
    this.src = imageSrc;
    this.width = width;
    this.height = height;
  }
  createItem(parent) {
    var container = document.querySelector(parent);
    var itemBox = document.createElement('div');
    itemBox.className = "work-list-item";
    itemBox.style.backgroundImage = `url(${this.src})`;
    itemBox.style.width = `${this.width}px`;
    itemBox.style.height = `${this.height}px`;
    container.append(itemBox);
  }
}
let srcList = [];
function addURL(index = srcList.length + 1, lastIndex = 0) {
  if (lastIndex != 0) {
    for (let i = index; i <= lastIndex; i++) {
      srcList.push(`files/gallery/${i}.png`);
      console.log(srcList[i - 1]);
    }
  }
  else {
    srcList.push(`files/gallery/${index}.png`);
    console.log(srcList[0]);
  }
  if (index == srcList.length + 1) {
    srcList.push(`files/gallery/${index}.png`);
  }
}

function galleryConstuct(parent, srcList, columnNum) {
  let itemWidth = Math.round(parseInt(getComputedStyle(document.querySelector(parent)).width) / columnNum);
  console.log(itemWidth);
  var galItems = [];
  for (i = 0; i < srcList.length; i++) {
    galItems[i] = new GalleryItem(srcList[i], itemWidth, 620);
    galItems[i].createItem(parent);
  }
}




addURL(1, 9);
galleryConstuct(".works-list", srcList, 3);

$(document).ready(function () {

  $('body').append('<div id="blackout"></div>');

  var boxWidth = 1366;

  function centerBox() {

    /* определяем нужные данные */
    var winWidth = $(window).width();
    var winHeight = $(document).height();
    var scrollPos = $(window).scrollTop();

    /* Вычисляем позицию */

    var disWidth = (winWidth - boxWidth) / 2
    var disHeight = scrollPos + 75;

    /* Добавляем стили к блокам */
    $(".selected-work-popup").css({ 'width': boxWidth + 'px', 'left': disWidth + 'px', 'top': disHeight + 'px' });
    $('#blackout').css({ 'width': winWidth + 'px', 'height': winHeight + 'px' });

    return false;
  }

  $(window).resize(centerBox);
  $(window).scroll(centerBox);
  centerBox();


  $(".work-list-item").click(function (event) {
    event.preventDefault();
    event.stopPropagation();

    var galitem = event.target;
    $(".selected-work-image").attr("src", srcList[$(galitem).index()]);
    $(".selected-work-popup").css("display", "flex");
    $('#blackout').show();
    $('html,body').css('overflow', 'hidden');
  });

  $(".selected-work-popup").click(function (e) {
    /* Предотвращаем работу ссылки, если она являеться нашим popup окном */
    e.stopPropagation();
  });
  $('html').click(function () {
    var scrollPos = $(window).scrollTop();
    /* Скрыть окно, когда кликаем вне его области */
    $('.selected-work-popup').hide();
    $('#blackout').hide();
    $("html,body").css("overflow", "auto");
    $('html').scrollTop(scrollPos);
  });
});
