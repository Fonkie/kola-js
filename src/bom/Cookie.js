/**
 * @fileOverview kola.bom.Event �¼�֧����
 * @author Jady Yang
 * @version 2.0.0
 */


kola('kola.bom.Cookie',null,function() {

	/********************************************** �ඨ�� **********************************************/

    var Cookie = {
        get: function(name) {
            var tmp, reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)","gi");
            if( tmp = reg.exec( unescape(document.cookie) ) )
                return(tmp[2]);
            return null;
        },

/**
* @function
* @description ����cookie
* @param name cookie name.
* @param value cookie value, ���Զ� escape Ȼ��洢.
* @param expires ʧЧʱ�䣬Ĭ��Ϊ�����session��Ч.ΪDate����
* @param path cookie ���ں� path �£�Ĭ��ֵΪ����cookieʱ��·��.
* @param domain cookie ���ں� domain �£�Ĭ��Ϊ��ǰ��.
*
* @return
*/
        set: function(name, value, expires, path, domain) {
            var str = name + "=" + escape(value);
            if (expires) {
                if (expires == 'never') {
                    expires = 100*365*24*60;
                }
                var exp = new Date();
                exp.setTime(exp.getTime() + expires*60*1000);
                str += "; expires="+exp.toGMTString();
            }
            if (path) {
                str += "; path=" + path;
            }
            if (domain) {
                str += "; domain=" + domain;
            }
            document.cookie = str;
        },
        remove: function(name, path, domain) {
            document.cookie = name + "=" +
                ((path) ? "; path=" + path : "") +
                ((domain) ? "; domain=" + domain : "") +
                "; expires=Thu, 01-Jan-70 00:00:01 GMT";
        }
    };

	return Cookie;

});