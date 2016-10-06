update_icon (lvl,count) {
  var bgColor;
  switch (lvl) {
    case 1:
      bgColor = '#008000';
    break;
    case 2:
      bgColor = '#FFA500';
    break;
    case 3:
      bgColor = '#ff0000';
    break;
    default:
      bgColor = '#0043ff';
  }

  var canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  var ctx = canvas.getContext('2d');
  var img = new Image();
  img.src = '/ico/no.ico';
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, 16, 16);

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 10px sans-serif';
    var t = ((Math.random() * 10) + 1) + "";
    ctx.fillText(count, 10, 14);

    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = canvas.toDataURL("image/x-icon");
    var icon = document.getElementById('dynamic-favicon');
    icon.setAttribute('href', canvas.toDataURL("image/x-icon"));
  }
}
