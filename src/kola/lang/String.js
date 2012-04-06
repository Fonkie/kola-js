/**
 * @fileOverview kola.lang.String �ַ�����
 * @author Jady Yang
 * @version 2.0.0
 */


kola('kola.lang.String', 
	null, 
	function() {
	
	/********************************************** �ඨ�� **********************************************/
	
	var String = {
		
		/**
		 * ȥ�����ַ�����������Ŀո�
		 * @type Function
		 */
		trim: function(string) {
			var reg = /^\s|\s$/g;
			return string.replace(reg,'');
		},
		/**
		 * ��ʽ���ַ���
		 * @param {String} ��Ҫ��ʽ�����ַ���
		 * @param {ANY} ��ʽ�������������ö��ŷָ�
		 * @return ��ʽ��������ַ���
		 * @type String
		 */
		format:function() {
	    if( arguments.length == 0 )
	        return null;
	    var str = arguments[0];
	    for(var i=1;i<arguments.length;i++) {
	        var re = new RegExp('\\{' + (i-1) + '\\}','gm');
	        str = str.replace(re, arguments[i]);
	    }
	    return str;
		},
		/**
		 * �����ַ������ȣ�����ַ�������һ��
		 * @param str {String} �ַ���
		 * @return {Int} �ַ�������
		 */
		SimpinLen:function(str){
			var half=0,full=0;
			for(var i=0,len=str.length;i<len;i++){
				var c=str.charCodeAt(i);
				if(c>255)
					full++;
				else
					half++;
			}
			return Math.ceil(half/2)+full;
		},
		/**
		 * ���հ���ַ�������һ���Ĺ�����ҵ���Ӧ����Ϊlength���ַ���ʵ���ַ���������ֵ
		 * @param str {String} �ַ���
		 * @param index {Int} �ַ���
		 * @return {Int} ����ֵ
		 */
		findIndex:function(str,length){
			var full=0;
			for(var i=0,len=str.length;i<len;i++){
				var c=str.charCodeAt(i);
				if(c>255){
					full++;
				}
				else {
					if((i+1)<len){
						c=str.charCodeAt(i+1);
						if(c&&c<256){
							full++;
							i++;
						} else
							full++;
					}
					else 
						full++;					
				}	
				if(full==length){			
					break;
				}
			}
			return i+1;		
		},
		/**
		 * ���հ���ַ��ָ��Ϊlength���Ӵ�
		 * @param str {String} �ַ���
		 * @param length {Int} �ַ���
		 * @return {String} �ָ����Ӵ�
		 */
		cutSimpStr:function(str,length){
			return str.substring(0,this.findIndex(str,length));
		}
		
	};

	return String;
	
});