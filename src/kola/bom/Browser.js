/**
 * @fileOverview kola.bom.Browser �����֧����
 * @author Jady Yang
 * @version 2.0.0
 */


kola('kola.bom.Browser',
[ 'kola.lang.Function' ],
function( KolaFunction ) {

	var Browser = {

		/**
		 * ��ȡ��Ⱦģʽ
		 */
		render: function() {
			var agent = navigator.userAgent,
				value;

			//	�ж��Ǻ�����Ⱦģʽ
			if ( agent.indexOf( 'MSIE' ) != -1 ) {
				value = 'ie';
			} else if ( agent.indexOf( 'AppleWebKit' ) != -1 ) {
				value = 'webkit';
			} else if ( agent.indexOf( 'Gecko' ) != -1 ) {
				value = 'gecko';
			} else if ( agent.indexOf( 'Presto' ) != -1 ) {
				value = 'Presto';
			} else {
				value = 'unkown';
			}

			Browser.render = KolaFunction.x( value );
			return value;
		},

		name: function() {
			var agent = navigator.userAgent,
				value;

			switch ( Browser.render() ) {
				case 'ie':
					if ( agent.indexOf( 'QQBrowser' ) != -1 ) {
						value = 'qq';
					} else if ( agent.indexOf( 'Maxthon' ) != -1 ) {
					    value = 'maxthon';
					} else if ( agent.indexOf( 'SE') != -1 && agent.indexOf( 'MetaSr') != -1 ) {
						value = 'sogou';
					} else {
						//	��ģʽ���޷�ʶ���360
						value = 'ie';
					}
					break;
				case 'webkit':
					if ( agent.indexOf( 'Chrome' ) != -1 ) {
						value = 'chrome';
					} else if ( agent.indexOf( 'QQBrowser' ) != -1 ) {
						value = 'qq';
					} else if ( agent.indexOf( 'Maxthon' ) != -1 ) {
					    value = 'maxthon';
					} else if ( agent.indexOf( 'SE') != -1 && agent.indexOf( 'MetaSr') != -1 ) {
						value = 'sogou';
					} else if ( agent.indexOf( 'Version') != -1 && agent.indexOf( 'Safari') != -1 ) {
						value = 'safari';
					} else {
						//	��ģʽ���޷�ʶ���360������
						value = 'unkown';
					}
					break;
				case 'gecko':
				    value = 'firefox';
					break;
				case 'Presto':
					value = 'opera';
					break;
			}

			Browser.name = KolaFunction.x( value );
			return value;
		},

		renderVersion: function() {
			var agent = navigator.userAgent,
				value;

			switch ( Browser.render() ) {
				case 'ie':
					value = parseInt( agent.substr( agent.indexOf( 'MSIE' ) + 5, 3 ) );
					break;
				case 'webkit':
					value = parseInt( agent.substr( agent.indexOf( 'AppleWebKit' ) + 12, 4 ) );
					break;
				case 'gecko':
				    value = parseInt( agent.substr( agent.indexOf( 'Gecko' ) + 6, 8 ) );
					break;
				case 'presto':
					value = parseInt( agent.substr( agent.indexOf( 'Presto' ) + 7, 3 ) );
					break;
			}

			Browser.renderVersion = KolaFunction.x( value );
			return value;
		}
	};
    Browser.isIE=(Browser.render()=='ie');
    Browser.isIE6=(Browser.render()=='ie' && Browser.renderVersion()==6);

    Browser.isWebkit=(Browser.render()=='webkit');
    Browser.isGecko=(Browser.render()=='gecko');
	return Browser;
	
});