var wedgit = window.wedgit || {};
wedgit.Run = function() {
  function NumTol(obj){
    return $(obj).length;
  }
  function Wid(obj){
    return $(obj).width();
  }
  $('.LL_box .box_list').css('width',NumTol('.LL_box .cell')*750)
  function Tabqh(){
    this.run=function(inx,obj){
      $(inx).on('touchstart',function(){
        $(this).addClass('on').siblings().removeClass('on');
        var x = $(this).index();
        $(obj).css('height',$(obj).find('.cell:eq('+x+')').height())
        $(obj).find('.box_list').animate({'left':-x*750})
      })
    }
  }
  var p = new Tabqh();
  p.run('.LL_tab li','.LL_box')
}, wedgit.Run();