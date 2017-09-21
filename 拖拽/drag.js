(function ($) {
	$.fn.tinyDraggable = function (options) {
		var settings = $.extend({
			list:null,					//拖拽的内容
			Boxn:null,					//拖拽盒子的数量
			type:'add',					//拖拽的类型是填入
			backFn:null
		}, options);
		var th = $(this);
		var Drag = {
			init:function(){
				this.creatDrag();
				this.DragBtn();
			},
			creatDrag:function(){
				var html = ''
				html += '<div class="dragBtn">';
				$.each(settings.list,function(p){
					html += '<span val="'+p+'">'+p+'</span>';
				});
				html += '</div>';
				for (var i=0;i<settings.Boxn;i++){
					html += '<div class="dragBox"></div>';
				}
				th.html(html);
			},
			DragBtn:function(){
				th.find('span').each(function () {
					var dx, dy,handle = $(this);
					function dragon(handle){
						var el = handle;
						handle.on({
							mousedown: function (e) {
								el.css('position', 'absoluter');
								if (settings.exclude && ~$.inArray(e.target, $(settings.exclude, el))) return;
								e.preventDefault();
								var os = el.offset();
								dx = e.pageX - os.left, dy = e.pageY - os.top;
								$(document).on('mousemove.drag', function (e) {
										el.offset({top: e.pageY - dy, left: e.pageX - dx});
										th.children('div').each(function(){
											var x = el.offset().left - $(this).offset().left+el.width();
											var y = el.offset().top - $(this).offset().top+el.height();
											if((x>0&&x<$(this).width())&&(y>0&&y<$(this).height())){
												$(this).css('border-color','red');
											}else{
												$(this).removeAttr('style');
											}
										});
									}
								);
							},
							mouseup: function (e) {
								th.children('div').removeAttr('style');
								el.offset({top: e.pageY - dy, left: e.pageX - dx});
								var sclone = el.clone();
								dragon(sclone);
								var i = 0;
								var n = th.children('div').length;
								th.children('div').each(function(){
									i++;
									var x = el.offset().left - $(this).offset().left+el.width();
									var y = el.offset().top - $(this).offset().top+el.height();
									if((x>0&&x<$(this).width())&&(y>0&&y<$(this).height())){
										console.log($(this).children().length,el.parent().children().length)
										sclone.removeAttr('style');
										$(this).append(sclone);
										el.remove();
										return false;
									}else if(i==n){
										el.removeAttr('style');
									}
								});
								$(document).off('mousemove.drag');
							}
						});
					}
					dragon(handle);
				});
			},
			AddDrag:function(){

			},
			replaceDrag:function(){

			}
		}
		Drag.init();
	}
})(jQuery);