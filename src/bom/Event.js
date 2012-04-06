/**
 * @fileOverview kola.bom.Event �¼�֧����
 * @author Jady Yang
 * @version 2.0.0
 * @fix scope bug 2011-03-30 by flyhuang
 */


kola('kola.bom.Event', 
	null,
	function() {
	
	/********************************************** �ඨ�� **********************************************/
    
	var Event = {
		
		/**
		 * ����һ���¼�
		 */
		on: function(element, name, listenerfn) {
			if (!element || !name || !listenerfn) return this;
					
			var events=element.events;
			if(!element.events)
				events=element.events={};		
				
			var eventType=events[name];		
			if(!eventType)
				var eventType=events[name]=[];
			
			var fn=function(){
				listenerfn.apply(element,arguments);			
			}
				
			eventType.push({
				srcHandler:listenerfn,
				handler:fn
			});
					
			//	���¼�
			if (element.addEventListener) {
				element.addEventListener(name, fn, false);
			} else {
				element.attachEvent('on' + name, fn);
			}
					
			return this;
		},
		
		/**
		 * ȡ�����¼��ļ���
		 */
		un: function(element, name, listenerfn, origin) {
			if (!element || !name) return this;
							
			if(listenerfn){							
				if(origin){				
					Event._remove(element, name, listenerfn);
				} else {				
					var events=element.events;
					if(!events) return;
					
					var eventType=events[name];			
					if(!eventType) return;
								
					for(var i=0,len=eventType.length;i<len;i++){
						if(eventType[i].srcHandler==listenerfn){
							Event._remove(element ,name , eventType[i].handler);
							eventType.splice(i,1);
							i--;
							len--;
						}
					}		
				}	
	
			} else {							
				var events=element.events;
				if(!events) return;
				
				var eventType=events[name];			
				if(!eventType) return;	
			
				for(var i=0,len=eventType.length;i<len;i++){
					Event._remove(element, name, eventType[i].handler , true);
				}			
				delete events[name];
			}		
			return this;
		},
		
		/**
		 * ɾ��ָ�����¼�
		 */
		_remove:function(element, name, listenerfn){
			//	ɾ��listener
			if (element.removeEventListener) {
				element.removeEventListener(name, listenerfn, false);
			} else {
				element.detachEvent('on' + name, listenerfn);
			}	
		},
		
		/**
		 * �����������ⲿ��ĳ���¼�
		 */
		onout: function(element, name, listenerfn) {
			var f = Event._listener.out(element, name, listenerfn),
				kolaEvent = element._kolaEvent;
			if (!kolaEvent) {
				kolaEvent = element._kolaEvent = {
					out: []
				};
			}
			kolaEvent.out.push({e: element, n: name, l: listenerfn, f: f});
			Event.on(document.body, name, f);
			
			return this;
		},
		
		/**
		 * ȡ�����ⲿĳ���¼��ļ���
		 */
		unout: function(element, name, listenerfn) {
			var events;
			if ((events = element._kolaEvent) && (events = events.out) && (events.length > 0)) {
		
				for (var i = 0, il = events.length; i < il; i++) {
					var event = events[i];
					if (event.e === element && event.n === name && event.l === listenerfn) {
						Event.un(document.body, name, event.f);
						events.splice(i, 1);
						break;
					}
				}
			}
			
			return this;
		},
		/**
		 * �ɷ��¼�
		 * @param element
		 * @param name
		 * @param event
		 */
		fire: function( element, name, event ) {
			//	TODO: ��ʱû��������������¼���������֧��

			//	���û�м��������ǾͲ�������
			var listeners;
			if ( !( listeners = element.__events ) || !( listeners = listeners[ name ] ) ) return;

			//	����������¼������Ǿͽ���֮
			event = event || {};
			event.type = name;

			//	ѭ��ÿ��������������ִ��֮
			for ( var i = 0, il = listeners.length; i < il; i++ ) {
				listeners[ i ].h.call( element, event );
			}
		},		
		/**
		 * ��ֹ�¼��Ĵ��ݺ�Ĭ����Ϊ
		 */
		stop: function(e) {
			Event.stopPropagation(e);
			Event.preventDefault(e);
		},
		
		/**
		 * ��ֹ�¼��Ĵ���
		 */
		stopPropagation: function(e) {
			e.cancelBubble = true;
			if (e.stopPropagation) {
				e.stopPropagation();
			}
		},
		
		/**
		 * ��ֹ�¼���Ĭ����Ϊ
		 */
		preventDefault: function(e) {
			e.returnValue = false;
			if (e.preventDefault) {
				e.preventDefault();
			}
		},
		
		/**
		 * ��ȡ�¼�������Դ����
		 */
		element: function(e) {
			return e.target || e.srcElement;
		},	
		/**
		 * �洢���������¼����͵ļ��������ɷ���
		 */
		_listener: {
			out: function(element, name, listenerfn) {
				return function(e) {
					if (!Event.contains(element,(Event.element(e)))) {
						listenerfn.call(window, e);
					}
				};
			}
		},
		/**
		 * �ж��Ƿ����ָ���Ķ���
		 * @param {KolaElement} element ����
		 * @return true ���� false
		 * @type boolean
		 */
		contains: function(parent,child) {
			if (!child) return false;
			var element = child;
			while (element = element.parentNode) {
				if (element == parent) return true;
			}
			return false;
		}		
	};

	return Event;
	
});