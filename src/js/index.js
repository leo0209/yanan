var wedgit = window.wedgit || {};
wedgit.Run = function() {
  function NumTol(obj){
    return $(obj).length;
  }
  function Wid(obj){
    return $(obj).width();
  }

  var mySwiper = new Swiper('.swiper-container',{
    paginationClickable: true,
    slidesPerView: 'auto',
    resistance : "100%",
  })

  var mySwiper1 = new Swiper('.swiper-container_detail',{
    grabCursor: true,
    paginationClickable: true,
    resistance : "100%",
    onSwiperCreated:function(){
      $('.swiper_total em').html(1)
      $('.swiper_total span').html(NumTol('.swiper-container_detail .swiper-slide'))
    },
    onSlideChangeStart:function(){
      $('.swiper_total em').html(mySwiper1.activeIndex+1)
    }
  })
  var WHeight = $(window).innerHeight();
  var windowTop=0;//初始话可视区域距离页面顶端的距离
  $(window).on('scroll',function(){
    var STop = $(this).scrollTop();
    var DHeight = $('.wrap').innerHeight();
    if(STop>windowTop){
      windowTop=STop;
      if(STop+WHeight>DHeight-5){
        $.ajax({
          url:'11.html',
          type:'get', //GET
          async:true,    //或false,是否异步
          dataType:'html',    //返回的数据格式：json/xml/html/script/jsonp/text
          success:function(data){
            $('.czygy_box').append(data);
          },
        })
      }
    }else{
      windowTop=STop;
    }
  })

  $('.tp_back').on('touchstart',function(){
    $('html,body').animate({"scrollTop":0},400)
  })
  $(function(){
    $('.MM_tab li').each(function(i){
      if($(this).hasClass('on')){
        $('.MM_box .list').css('display','none')
        $('.MM_box .list:eq('+i+')').css('display','block')
      }
    })
  })
  function Tab(){
    this.tab=function(obj,inx){
      $(obj).find('li').on('touchstart',function(){
        $(this).addClass('on').siblings().removeClass('on');
        var x = $(this).index();
        $(inx).find('.list').css('display','none')
        $(inx).find('.detail_list').css('display','none')
        $(inx).find('.list:eq('+x+')').css('display','block');
        if(x==0){
          ShowDel()
        }
      })
    }
    this.show=function(obj,inx){
      $(obj).on('click',function(){
        $(inx).find('.list').css('display','none')
        $(inx).find('.detail_list').css('display','block')
      })
    }
  }
  function ShowDel(){
    if($('.JJ_txt ul').height()>=425){
      $('.JJ_txt ul').height(425)
      $('.JJ_detail').css('display','inline-block')
      $('.JJ_detail').removeClass('on')
      $('.JJ_detail').html('查看行程详情');
    }else{
      $(this).height('auto')
      $('.JJ_detail').css('display','none');
    }
  }
  var o = new Tab();
  o.tab('.MM_tab','.MM_box');
  o.show('.det_infor_btn','.MM_box');

  $('.tuijian_order_btn').on('touchstart',function(){
    $(this).toggleClass('on');
    if($(this).hasClass('on')){
      $(this).closest('.order_list').find('.order_me').animate({
        "top":-56,
      }, 400)
      $(this).closest('.order_list').find('.order_ding').animate({
        "top":-24,
        "left":-40
      }, 400)
      $(this).closest('.order_list').find('.order_you').animate({
        "top":48,
        "left":-55
      }, 400)
    }else{
      $(this).closest('.order_list').find('.a_order').animate({
        "top":30,
        "left":35
      }, 400)
    }
  })
  $(function(){
    ShowDel()
  })
  $(document).on('touchstart','.JJ_detail',function(){
    $(this).toggleClass('on');
    if($(this).hasClass('on')){
      $('.JJ_txt ul').css('height','auto');
      $(this).html('收回行程详情');
    }else{
      $('.JJ_txt ul').css('height','425');
      $(this).html('查看行程详情');
    }
  })
}, wedgit.Run();