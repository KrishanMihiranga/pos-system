console.log('Java Script'); 
$('.dashboard').css({
    'display': 'block' 
});
$('.customer').css({
    'display': 'none' 
});
$('.item').css({
    'display': 'none' 
});
$('.order').css({
    'display': 'none' 
});

$('.home-nav').on('click', ()=>{
    $('body').css({
        'background': "url('../assets/image/sara-web-header-08.jpg') center no-repeat",
        'background-size': 'cover',
        'height': '100vh'
      });
      
    $('.dashboard').css({
        'display': 'block' 
    });
    $('.customer').css({
        'display': 'none' 
    });
    $('.item').css({
        'display': 'none' 
    });
    $('.order').css({
        'display': 'none' 
    });
});
$('.customer-nav').on('click', ()=>{
    $('body').css({
        'background': 'none',
        'height' :  '0'
    });
    $('.dashboard').css({
        'display': 'none' 
    });
    $('.customer').css({
        'display': 'block' 
    });
    $('.item').css({
        'display': 'none' 
    });
    $('.order').css({
        'display': 'none' 
    });
});

$('.item-nav').on('click', ()=>{
    $('body').css({
        'background': 'none',
        'height' :  '0'
    });
    $('.dashboard').css({
        'display': 'none' 
    });
    $('.customer').css({
        'display': 'none' 
    });
    $('.item').css({
        'display': 'block' 
    });
    $('.order').css({
        'display': 'none' 
    });
});
$('.order-nav').on('click', ()=>{
    $('body').css({
        'background': 'none',
        'height' :  '0'
    });
    $('.dashboard').css({
        'display': 'none' 
    });
    $('.customer').css({
        'display': 'none' 
    });
    $('.item').css({
        'display': 'none' 
    });
    $('.order').css({
        'display': 'block' 
    });
});