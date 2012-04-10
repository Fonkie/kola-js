kola('kola.html.Traveller', 
	['kola.lang.Object','kola.html.ElementCore','kola.lang.Array','kola.lang.Type','kola.css.Selector'],
function(O,KElement,A,Type,Selector){
    var Traveller={
        /*
            TODO:
                add()
                remove()
                first()
                last()
                index()
        */
        filter:function(selector){
            return new KElement(Selector(selector,this._elements));
        },
        is:function(){
            return new Selector(selector,[this[0]]).length!=0;
        }
    };
    var SingleTraveller={
        /**
            �õ���Ԫ��
        */
        parent:function(element){
            return element.parentNode;
        },
        /**
            �õ���������������Ԫ��
        */
        parents:function(element,selector){
            var nodes=[];
            while ((element = element.parentNode) && (element.nodeType == 1)) {
                nodes.push(element);
            }
            return Selector(selector,nodes);
        },
        /**
            Ԫ�ؼ�������Ԫ���������ǰԪ�صķ���������Ԫ��
        */
        closest:function(element,selector){
            while ((element = element.parentNode) && (element.nodeType == 1)) {
                if(Selector(selector,[element]).length==1)
                    return element;
            }
        },
        /**
            �õ�����selector����Ԫ��
        */
        children:function(element,selector){
            return Selector(selector,element.children)
        },
        /**
            �õ������Ϸ���selector��Ԫ��
        */
        find:function(element,selector){
            return Selector(selector,element).concat(Selector(selector,[element]));
        },
        /**
		 * �õ�ÿһ��Ԫ�ص�ǰһ���ֵܽڵ�
		 * @return ���������нڵ��Element����
		 * @type kola.html.Element
		 */
        prev:function(element){
            while ( element = element.previousSibling ) {
                if ( element.nodeType == 1 ) {
                    return element;
                }
            }
        },
        /**
		 * �õ�ÿһ��Ԫ�صĺ�һ���ֵܽڵ�
		 * @return ���������нڵ��Element����
		 * @type kola.html.Element
		 */
        next:function(element){
            while ( element = element.nextSibling ) {
                if ( element.nodeType == 1 ) {
                    return element;
                }
            }
        },
        /**
		 * �õ�ÿһ��Ԫ�صĵ�һ���ӽڵ�
		 * @return ���������нڵ��Element����
		 * @type kola.html.Element
		 */
		firstChild: function(element){
            var length = element.children.length;
            for (var j = 0; j < length; j++) {
                var child = element.children[j];
                if (!!child && child.nodeType == 1) {
                    return child;
                }
            }
		},
		/**
		 * �õ�ÿһ��Ԫ�ص����һ���ӽڵ�
		 * @return ���������нڵ��Element����
		 * @type kola.html.Element
		 */
		lastChild: function(element) {
            var length = element.children.length;
            for (var j = length - 1; j >= 0; j--) {
                var child = element.children[j];
                if (!!child && child.nodeType == 1) {
                    return child;
                }
            }
		},
    }
    O.each(SingleTraveller,function(name,func){
        Traveller[name]=function(selector){
            var nodes=[];
            var _this=this;
            this._each(function(element){
                var res=func.call(_this,element,selector);
                if(Type.isArray(res))
                    nodes=nodes.concat(res);
                else if(res){
                    nodes.push(res);
                }
			});
            return new KElement(A.unique(nodes));
        }
    });
    return Traveller;
});