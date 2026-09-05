const createA11ySdk = ({ a11yProperty }) => (api) => {
  const { props, setProps } = api;
  return {
    accessibility: {
      get ariaLabel() {
        return props[a11yProperty]?.ariaLabel;
      },
      set ariaLabel(value) {
        const existingA11y = props[a11yProperty] ?? {};
        setProps({ [a11yProperty]: { ...existingA11y, ariaLabel: value } });
      }
    }
  };
};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var lib$1 = {exports: {}};

var _default$1 = {};

var lib = {exports: {}};

var _default = {};

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var hasRequired_default$1;

function require_default$1 () {
	if (hasRequired_default$1) return _default;
	hasRequired_default$1 = 1;
	function getDefaultWhiteList () {
	  // 白名单值说明：
	  // true: 允许该属性
	  // Function: function (val) { } 返回true表示允许该属性，其他值均表示不允许
	  // RegExp: regexp.test(val) 返回true表示允许该属性，其他值均表示不允许
	  // 除上面列出的值外均表示不允许
	  var whiteList = {};

	  whiteList['align-content'] = false; // default: auto
	  whiteList['align-items'] = false; // default: auto
	  whiteList['align-self'] = false; // default: auto
	  whiteList['alignment-adjust'] = false; // default: auto
	  whiteList['alignment-baseline'] = false; // default: baseline
	  whiteList['all'] = false; // default: depending on individual properties
	  whiteList['anchor-point'] = false; // default: none
	  whiteList['animation'] = false; // default: depending on individual properties
	  whiteList['animation-delay'] = false; // default: 0
	  whiteList['animation-direction'] = false; // default: normal
	  whiteList['animation-duration'] = false; // default: 0
	  whiteList['animation-fill-mode'] = false; // default: none
	  whiteList['animation-iteration-count'] = false; // default: 1
	  whiteList['animation-name'] = false; // default: none
	  whiteList['animation-play-state'] = false; // default: running
	  whiteList['animation-timing-function'] = false; // default: ease
	  whiteList['azimuth'] = false; // default: center
	  whiteList['backface-visibility'] = false; // default: visible
	  whiteList['background'] = true; // default: depending on individual properties
	  whiteList['background-attachment'] = true; // default: scroll
	  whiteList['background-clip'] = true; // default: border-box
	  whiteList['background-color'] = true; // default: transparent
	  whiteList['background-image'] = true; // default: none
	  whiteList['background-origin'] = true; // default: padding-box
	  whiteList['background-position'] = true; // default: 0% 0%
	  whiteList['background-repeat'] = true; // default: repeat
	  whiteList['background-size'] = true; // default: auto
	  whiteList['baseline-shift'] = false; // default: baseline
	  whiteList['binding'] = false; // default: none
	  whiteList['bleed'] = false; // default: 6pt
	  whiteList['bookmark-label'] = false; // default: content()
	  whiteList['bookmark-level'] = false; // default: none
	  whiteList['bookmark-state'] = false; // default: open
	  whiteList['border'] = true; // default: depending on individual properties
	  whiteList['border-bottom'] = true; // default: depending on individual properties
	  whiteList['border-bottom-color'] = true; // default: current color
	  whiteList['border-bottom-left-radius'] = true; // default: 0
	  whiteList['border-bottom-right-radius'] = true; // default: 0
	  whiteList['border-bottom-style'] = true; // default: none
	  whiteList['border-bottom-width'] = true; // default: medium
	  whiteList['border-collapse'] = true; // default: separate
	  whiteList['border-color'] = true; // default: depending on individual properties
	  whiteList['border-image'] = true; // default: none
	  whiteList['border-image-outset'] = true; // default: 0
	  whiteList['border-image-repeat'] = true; // default: stretch
	  whiteList['border-image-slice'] = true; // default: 100%
	  whiteList['border-image-source'] = true; // default: none
	  whiteList['border-image-width'] = true; // default: 1
	  whiteList['border-left'] = true; // default: depending on individual properties
	  whiteList['border-left-color'] = true; // default: current color
	  whiteList['border-left-style'] = true; // default: none
	  whiteList['border-left-width'] = true; // default: medium
	  whiteList['border-radius'] = true; // default: 0
	  whiteList['border-right'] = true; // default: depending on individual properties
	  whiteList['border-right-color'] = true; // default: current color
	  whiteList['border-right-style'] = true; // default: none
	  whiteList['border-right-width'] = true; // default: medium
	  whiteList['border-spacing'] = true; // default: 0
	  whiteList['border-style'] = true; // default: depending on individual properties
	  whiteList['border-top'] = true; // default: depending on individual properties
	  whiteList['border-top-color'] = true; // default: current color
	  whiteList['border-top-left-radius'] = true; // default: 0
	  whiteList['border-top-right-radius'] = true; // default: 0
	  whiteList['border-top-style'] = true; // default: none
	  whiteList['border-top-width'] = true; // default: medium
	  whiteList['border-width'] = true; // default: depending on individual properties
	  whiteList['bottom'] = false; // default: auto
	  whiteList['box-decoration-break'] = true; // default: slice
	  whiteList['box-shadow'] = true; // default: none
	  whiteList['box-sizing'] = true; // default: content-box
	  whiteList['box-snap'] = true; // default: none
	  whiteList['box-suppress'] = true; // default: show
	  whiteList['break-after'] = true; // default: auto
	  whiteList['break-before'] = true; // default: auto
	  whiteList['break-inside'] = true; // default: auto
	  whiteList['caption-side'] = false; // default: top
	  whiteList['chains'] = false; // default: none
	  whiteList['clear'] = true; // default: none
	  whiteList['clip'] = false; // default: auto
	  whiteList['clip-path'] = false; // default: none
	  whiteList['clip-rule'] = false; // default: nonzero
	  whiteList['color'] = true; // default: implementation dependent
	  whiteList['color-interpolation-filters'] = true; // default: auto
	  whiteList['column-count'] = false; // default: auto
	  whiteList['column-fill'] = false; // default: balance
	  whiteList['column-gap'] = false; // default: normal
	  whiteList['column-rule'] = false; // default: depending on individual properties
	  whiteList['column-rule-color'] = false; // default: current color
	  whiteList['column-rule-style'] = false; // default: medium
	  whiteList['column-rule-width'] = false; // default: medium
	  whiteList['column-span'] = false; // default: none
	  whiteList['column-width'] = false; // default: auto
	  whiteList['columns'] = false; // default: depending on individual properties
	  whiteList['contain'] = false; // default: none
	  whiteList['content'] = false; // default: normal
	  whiteList['counter-increment'] = false; // default: none
	  whiteList['counter-reset'] = false; // default: none
	  whiteList['counter-set'] = false; // default: none
	  whiteList['crop'] = false; // default: auto
	  whiteList['cue'] = false; // default: depending on individual properties
	  whiteList['cue-after'] = false; // default: none
	  whiteList['cue-before'] = false; // default: none
	  whiteList['cursor'] = false; // default: auto
	  whiteList['direction'] = false; // default: ltr
	  whiteList['display'] = true; // default: depending on individual properties
	  whiteList['display-inside'] = true; // default: auto
	  whiteList['display-list'] = true; // default: none
	  whiteList['display-outside'] = true; // default: inline-level
	  whiteList['dominant-baseline'] = false; // default: auto
	  whiteList['elevation'] = false; // default: level
	  whiteList['empty-cells'] = false; // default: show
	  whiteList['filter'] = false; // default: none
	  whiteList['flex'] = false; // default: depending on individual properties
	  whiteList['flex-basis'] = false; // default: auto
	  whiteList['flex-direction'] = false; // default: row
	  whiteList['flex-flow'] = false; // default: depending on individual properties
	  whiteList['flex-grow'] = false; // default: 0
	  whiteList['flex-shrink'] = false; // default: 1
	  whiteList['flex-wrap'] = false; // default: nowrap
	  whiteList['float'] = false; // default: none
	  whiteList['float-offset'] = false; // default: 0 0
	  whiteList['flood-color'] = false; // default: black
	  whiteList['flood-opacity'] = false; // default: 1
	  whiteList['flow-from'] = false; // default: none
	  whiteList['flow-into'] = false; // default: none
	  whiteList['font'] = true; // default: depending on individual properties
	  whiteList['font-family'] = true; // default: implementation dependent
	  whiteList['font-feature-settings'] = true; // default: normal
	  whiteList['font-kerning'] = true; // default: auto
	  whiteList['font-language-override'] = true; // default: normal
	  whiteList['font-size'] = true; // default: medium
	  whiteList['font-size-adjust'] = true; // default: none
	  whiteList['font-stretch'] = true; // default: normal
	  whiteList['font-style'] = true; // default: normal
	  whiteList['font-synthesis'] = true; // default: weight style
	  whiteList['font-variant'] = true; // default: normal
	  whiteList['font-variant-alternates'] = true; // default: normal
	  whiteList['font-variant-caps'] = true; // default: normal
	  whiteList['font-variant-east-asian'] = true; // default: normal
	  whiteList['font-variant-ligatures'] = true; // default: normal
	  whiteList['font-variant-numeric'] = true; // default: normal
	  whiteList['font-variant-position'] = true; // default: normal
	  whiteList['font-weight'] = true; // default: normal
	  whiteList['grid'] = false; // default: depending on individual properties
	  whiteList['grid-area'] = false; // default: depending on individual properties
	  whiteList['grid-auto-columns'] = false; // default: auto
	  whiteList['grid-auto-flow'] = false; // default: none
	  whiteList['grid-auto-rows'] = false; // default: auto
	  whiteList['grid-column'] = false; // default: depending on individual properties
	  whiteList['grid-column-end'] = false; // default: auto
	  whiteList['grid-column-start'] = false; // default: auto
	  whiteList['grid-row'] = false; // default: depending on individual properties
	  whiteList['grid-row-end'] = false; // default: auto
	  whiteList['grid-row-start'] = false; // default: auto
	  whiteList['grid-template'] = false; // default: depending on individual properties
	  whiteList['grid-template-areas'] = false; // default: none
	  whiteList['grid-template-columns'] = false; // default: none
	  whiteList['grid-template-rows'] = false; // default: none
	  whiteList['hanging-punctuation'] = false; // default: none
	  whiteList['height'] = true; // default: auto
	  whiteList['hyphens'] = false; // default: manual
	  whiteList['icon'] = false; // default: auto
	  whiteList['image-orientation'] = false; // default: auto
	  whiteList['image-resolution'] = false; // default: normal
	  whiteList['ime-mode'] = false; // default: auto
	  whiteList['initial-letters'] = false; // default: normal
	  whiteList['inline-box-align'] = false; // default: last
	  whiteList['justify-content'] = false; // default: auto
	  whiteList['justify-items'] = false; // default: auto
	  whiteList['justify-self'] = false; // default: auto
	  whiteList['left'] = false; // default: auto
	  whiteList['letter-spacing'] = true; // default: normal
	  whiteList['lighting-color'] = true; // default: white
	  whiteList['line-box-contain'] = false; // default: block inline replaced
	  whiteList['line-break'] = false; // default: auto
	  whiteList['line-grid'] = false; // default: match-parent
	  whiteList['line-height'] = false; // default: normal
	  whiteList['line-snap'] = false; // default: none
	  whiteList['line-stacking'] = false; // default: depending on individual properties
	  whiteList['line-stacking-ruby'] = false; // default: exclude-ruby
	  whiteList['line-stacking-shift'] = false; // default: consider-shifts
	  whiteList['line-stacking-strategy'] = false; // default: inline-line-height
	  whiteList['list-style'] = true; // default: depending on individual properties
	  whiteList['list-style-image'] = true; // default: none
	  whiteList['list-style-position'] = true; // default: outside
	  whiteList['list-style-type'] = true; // default: disc
	  whiteList['margin'] = true; // default: depending on individual properties
	  whiteList['margin-bottom'] = true; // default: 0
	  whiteList['margin-left'] = true; // default: 0
	  whiteList['margin-right'] = true; // default: 0
	  whiteList['margin-top'] = true; // default: 0
	  whiteList['marker-offset'] = false; // default: auto
	  whiteList['marker-side'] = false; // default: list-item
	  whiteList['marks'] = false; // default: none
	  whiteList['mask'] = false; // default: border-box
	  whiteList['mask-box'] = false; // default: see individual properties
	  whiteList['mask-box-outset'] = false; // default: 0
	  whiteList['mask-box-repeat'] = false; // default: stretch
	  whiteList['mask-box-slice'] = false; // default: 0 fill
	  whiteList['mask-box-source'] = false; // default: none
	  whiteList['mask-box-width'] = false; // default: auto
	  whiteList['mask-clip'] = false; // default: border-box
	  whiteList['mask-image'] = false; // default: none
	  whiteList['mask-origin'] = false; // default: border-box
	  whiteList['mask-position'] = false; // default: center
	  whiteList['mask-repeat'] = false; // default: no-repeat
	  whiteList['mask-size'] = false; // default: border-box
	  whiteList['mask-source-type'] = false; // default: auto
	  whiteList['mask-type'] = false; // default: luminance
	  whiteList['max-height'] = true; // default: none
	  whiteList['max-lines'] = false; // default: none
	  whiteList['max-width'] = true; // default: none
	  whiteList['min-height'] = true; // default: 0
	  whiteList['min-width'] = true; // default: 0
	  whiteList['move-to'] = false; // default: normal
	  whiteList['nav-down'] = false; // default: auto
	  whiteList['nav-index'] = false; // default: auto
	  whiteList['nav-left'] = false; // default: auto
	  whiteList['nav-right'] = false; // default: auto
	  whiteList['nav-up'] = false; // default: auto
	  whiteList['object-fit'] = false; // default: fill
	  whiteList['object-position'] = false; // default: 50% 50%
	  whiteList['opacity'] = false; // default: 1
	  whiteList['order'] = false; // default: 0
	  whiteList['orphans'] = false; // default: 2
	  whiteList['outline'] = false; // default: depending on individual properties
	  whiteList['outline-color'] = false; // default: invert
	  whiteList['outline-offset'] = false; // default: 0
	  whiteList['outline-style'] = false; // default: none
	  whiteList['outline-width'] = false; // default: medium
	  whiteList['overflow'] = false; // default: depending on individual properties
	  whiteList['overflow-wrap'] = false; // default: normal
	  whiteList['overflow-x'] = false; // default: visible
	  whiteList['overflow-y'] = false; // default: visible
	  whiteList['padding'] = true; // default: depending on individual properties
	  whiteList['padding-bottom'] = true; // default: 0
	  whiteList['padding-left'] = true; // default: 0
	  whiteList['padding-right'] = true; // default: 0
	  whiteList['padding-top'] = true; // default: 0
	  whiteList['page'] = false; // default: auto
	  whiteList['page-break-after'] = false; // default: auto
	  whiteList['page-break-before'] = false; // default: auto
	  whiteList['page-break-inside'] = false; // default: auto
	  whiteList['page-policy'] = false; // default: start
	  whiteList['pause'] = false; // default: implementation dependent
	  whiteList['pause-after'] = false; // default: implementation dependent
	  whiteList['pause-before'] = false; // default: implementation dependent
	  whiteList['perspective'] = false; // default: none
	  whiteList['perspective-origin'] = false; // default: 50% 50%
	  whiteList['pitch'] = false; // default: medium
	  whiteList['pitch-range'] = false; // default: 50
	  whiteList['play-during'] = false; // default: auto
	  whiteList['position'] = false; // default: static
	  whiteList['presentation-level'] = false; // default: 0
	  whiteList['quotes'] = false; // default: text
	  whiteList['region-fragment'] = false; // default: auto
	  whiteList['resize'] = false; // default: none
	  whiteList['rest'] = false; // default: depending on individual properties
	  whiteList['rest-after'] = false; // default: none
	  whiteList['rest-before'] = false; // default: none
	  whiteList['richness'] = false; // default: 50
	  whiteList['right'] = false; // default: auto
	  whiteList['rotation'] = false; // default: 0
	  whiteList['rotation-point'] = false; // default: 50% 50%
	  whiteList['ruby-align'] = false; // default: auto
	  whiteList['ruby-merge'] = false; // default: separate
	  whiteList['ruby-position'] = false; // default: before
	  whiteList['shape-image-threshold'] = false; // default: 0.0
	  whiteList['shape-outside'] = false; // default: none
	  whiteList['shape-margin'] = false; // default: 0
	  whiteList['size'] = false; // default: auto
	  whiteList['speak'] = false; // default: auto
	  whiteList['speak-as'] = false; // default: normal
	  whiteList['speak-header'] = false; // default: once
	  whiteList['speak-numeral'] = false; // default: continuous
	  whiteList['speak-punctuation'] = false; // default: none
	  whiteList['speech-rate'] = false; // default: medium
	  whiteList['stress'] = false; // default: 50
	  whiteList['string-set'] = false; // default: none
	  whiteList['tab-size'] = false; // default: 8
	  whiteList['table-layout'] = false; // default: auto
	  whiteList['text-align'] = true; // default: start
	  whiteList['text-align-last'] = true; // default: auto
	  whiteList['text-combine-upright'] = true; // default: none
	  whiteList['text-decoration'] = true; // default: none
	  whiteList['text-decoration-color'] = true; // default: currentColor
	  whiteList['text-decoration-line'] = true; // default: none
	  whiteList['text-decoration-skip'] = true; // default: objects
	  whiteList['text-decoration-style'] = true; // default: solid
	  whiteList['text-emphasis'] = true; // default: depending on individual properties
	  whiteList['text-emphasis-color'] = true; // default: currentColor
	  whiteList['text-emphasis-position'] = true; // default: over right
	  whiteList['text-emphasis-style'] = true; // default: none
	  whiteList['text-height'] = true; // default: auto
	  whiteList['text-indent'] = true; // default: 0
	  whiteList['text-justify'] = true; // default: auto
	  whiteList['text-orientation'] = true; // default: mixed
	  whiteList['text-overflow'] = true; // default: clip
	  whiteList['text-shadow'] = true; // default: none
	  whiteList['text-space-collapse'] = true; // default: collapse
	  whiteList['text-transform'] = true; // default: none
	  whiteList['text-underline-position'] = true; // default: auto
	  whiteList['text-wrap'] = true; // default: normal
	  whiteList['top'] = false; // default: auto
	  whiteList['transform'] = false; // default: none
	  whiteList['transform-origin'] = false; // default: 50% 50% 0
	  whiteList['transform-style'] = false; // default: flat
	  whiteList['transition'] = false; // default: depending on individual properties
	  whiteList['transition-delay'] = false; // default: 0s
	  whiteList['transition-duration'] = false; // default: 0s
	  whiteList['transition-property'] = false; // default: all
	  whiteList['transition-timing-function'] = false; // default: ease
	  whiteList['unicode-bidi'] = false; // default: normal
	  whiteList['vertical-align'] = false; // default: baseline
	  whiteList['visibility'] = false; // default: visible
	  whiteList['voice-balance'] = false; // default: center
	  whiteList['voice-duration'] = false; // default: auto
	  whiteList['voice-family'] = false; // default: implementation dependent
	  whiteList['voice-pitch'] = false; // default: medium
	  whiteList['voice-range'] = false; // default: medium
	  whiteList['voice-rate'] = false; // default: normal
	  whiteList['voice-stress'] = false; // default: normal
	  whiteList['voice-volume'] = false; // default: medium
	  whiteList['volume'] = false; // default: medium
	  whiteList['white-space'] = false; // default: normal
	  whiteList['widows'] = false; // default: 2
	  whiteList['width'] = true; // default: auto
	  whiteList['will-change'] = false; // default: auto
	  whiteList['word-break'] = true; // default: normal
	  whiteList['word-spacing'] = true; // default: normal
	  whiteList['word-wrap'] = true; // default: normal
	  whiteList['wrap-flow'] = false; // default: auto
	  whiteList['wrap-through'] = false; // default: wrap
	  whiteList['writing-mode'] = false; // default: horizontal-tb
	  whiteList['z-index'] = false; // default: auto

	  return whiteList;
	}


	/**
	 * 匹配到白名单上的一个属性时
	 *
	 * @param {String} name
	 * @param {String} value
	 * @param {Object} options
	 * @return {String}
	 */
	function onAttr (name, value, options) {
	  // do nothing
	}

	/**
	 * 匹配到不在白名单上的一个属性时
	 *
	 * @param {String} name
	 * @param {String} value
	 * @param {Object} options
	 * @return {String}
	 */
	function onIgnoreAttr (name, value, options) {
	  // do nothing
	}

	var REGEXP_URL_JAVASCRIPT = /javascript\s*\:/img;

	/**
	 * 过滤属性值
	 *
	 * @param {String} name
	 * @param {String} value
	 * @return {String}
	 */
	function safeAttrValue(name, value) {
	  if (REGEXP_URL_JAVASCRIPT.test(value)) return '';
	  return value;
	}


	_default.whiteList = getDefaultWhiteList();
	_default.getDefaultWhiteList = getDefaultWhiteList;
	_default.onAttr = onAttr;
	_default.onIgnoreAttr = onIgnoreAttr;
	_default.safeAttrValue = safeAttrValue;
	return _default;
}

var util$1;
var hasRequiredUtil$1;

function requireUtil$1 () {
	if (hasRequiredUtil$1) return util$1;
	hasRequiredUtil$1 = 1;
	util$1 = {
	  indexOf: function (arr, item) {
	    var i, j;
	    if (Array.prototype.indexOf) {
	      return arr.indexOf(item);
	    }
	    for (i = 0, j = arr.length; i < j; i++) {
	      if (arr[i] === item) {
	        return i;
	      }
	    }
	    return -1;
	  },
	  forEach: function (arr, fn, scope) {
	    var i, j;
	    if (Array.prototype.forEach) {
	      return arr.forEach(fn, scope);
	    }
	    for (i = 0, j = arr.length; i < j; i++) {
	      fn.call(scope, arr[i], i, arr);
	    }
	  },
	  trim: function (str) {
	    if (String.prototype.trim) {
	      return str.trim();
	    }
	    return str.replace(/(^\s*)|(\s*$)/g, '');
	  },
	  trimRight: function (str) {
	    if (String.prototype.trimRight) {
	      return str.trimRight();
	    }
	    return str.replace(/(\s*$)/g, '');
	  }
	};
	return util$1;
}

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var parser$2;
var hasRequiredParser$1;

function requireParser$1 () {
	if (hasRequiredParser$1) return parser$2;
	hasRequiredParser$1 = 1;
	var _ = requireUtil$1();


	/**
	 * 解析style
	 *
	 * @param {String} css
	 * @param {Function} onAttr 处理属性的函数
	 *   参数格式： function (sourcePosition, position, name, value, source)
	 * @return {String}
	 */
	function parseStyle (css, onAttr) {
	  css = _.trimRight(css);
	  if (css[css.length - 1] !== ';') css += ';';
	  var cssLength = css.length;
	  var isParenthesisOpen = false;
	  var lastPos = 0;
	  var i = 0;
	  var retCSS = '';

	  function addNewAttr () {
	    // 如果没有正常的闭合圆括号，则直接忽略当前属性
	    if (!isParenthesisOpen) {
	      var source = _.trim(css.slice(lastPos, i));
	      var j = source.indexOf(':');
	      if (j !== -1) {
	        var name = _.trim(source.slice(0, j));
	        var value = _.trim(source.slice(j + 1));
	        // 必须有属性名称
	        if (name) {
	          var ret = onAttr(lastPos, retCSS.length, name, value, source);
	          if (ret) retCSS += ret + '; ';
	        }
	      }
	    }
	    lastPos = i + 1;
	  }

	  for (; i < cssLength; i++) {
	    var c = css[i];
	    if (c === '/' && css[i + 1] === '*') {
	      // 备注开始
	      var j = css.indexOf('*/', i + 2);
	      // 如果没有正常的备注结束，则后面的部分全部跳过
	      if (j === -1) break;
	      // 直接将当前位置调到备注结尾，并且初始化状态
	      i = j + 1;
	      lastPos = i + 1;
	      isParenthesisOpen = false;
	    } else if (c === '(') {
	      isParenthesisOpen = true;
	    } else if (c === ')') {
	      isParenthesisOpen = false;
	    } else if (c === ';') {
	      if (isParenthesisOpen) ; else {
	        addNewAttr();
	      }
	    } else if (c === '\n') {
	      addNewAttr();
	    }
	  }

	  return _.trim(retCSS);
	}

	parser$2 = parseStyle;
	return parser$2;
}

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var css;
var hasRequiredCss;

function requireCss () {
	if (hasRequiredCss) return css;
	hasRequiredCss = 1;
	var DEFAULT = require_default$1();
	var parseStyle = requireParser$1();
	requireUtil$1();


	/**
	 * 返回值是否为空
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	function isNull (obj) {
	  return (obj === undefined || obj === null);
	}

	/**
	 * 浅拷贝对象
	 *
	 * @param {Object} obj
	 * @return {Object}
	 */
	function shallowCopyObject (obj) {
	  var ret = {};
	  for (var i in obj) {
	    ret[i] = obj[i];
	  }
	  return ret;
	}

	/**
	 * 创建CSS过滤器
	 *
	 * @param {Object} options
	 *   - {Object} whiteList
	 *   - {Function} onAttr
	 *   - {Function} onIgnoreAttr
	 *   - {Function} safeAttrValue
	 */
	function FilterCSS (options) {
	  options = shallowCopyObject(options || {});
	  options.whiteList = options.whiteList || DEFAULT.whiteList;
	  options.onAttr = options.onAttr || DEFAULT.onAttr;
	  options.onIgnoreAttr = options.onIgnoreAttr || DEFAULT.onIgnoreAttr;
	  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
	  this.options = options;
	}

	FilterCSS.prototype.process = function (css) {
	  // 兼容各种奇葩输入
	  css = css || '';
	  css = css.toString();
	  if (!css) return '';

	  var me = this;
	  var options = me.options;
	  var whiteList = options.whiteList;
	  var onAttr = options.onAttr;
	  var onIgnoreAttr = options.onIgnoreAttr;
	  var safeAttrValue = options.safeAttrValue;

	  var retCSS = parseStyle(css, function (sourcePosition, position, name, value, source) {

	    var check = whiteList[name];
	    var isWhite = false;
	    if (check === true) isWhite = check;
	    else if (typeof check === 'function') isWhite = check(value);
	    else if (check instanceof RegExp) isWhite = check.test(value);
	    if (isWhite !== true) isWhite = false;

	    // 如果过滤后 value 为空则直接忽略
	    value = safeAttrValue(name, value);
	    if (!value) return;

	    var opts = {
	      position: position,
	      sourcePosition: sourcePosition,
	      source: source,
	      isWhite: isWhite
	    };

	    if (isWhite) {

	      var ret = onAttr(name, value, opts);
	      if (isNull(ret)) {
	        return name + ':' + value;
	      } else {
	        return ret;
	      }

	    } else {

	      var ret = onIgnoreAttr(name, value, opts);
	      if (!isNull(ret)) {
	        return ret;
	      }

	    }
	  });

	  return retCSS;
	};


	css = FilterCSS;
	return css;
}

/**
 * cssfilter
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var hasRequiredLib$1;

function requireLib$1 () {
	if (hasRequiredLib$1) return lib.exports;
	hasRequiredLib$1 = 1;
	(function (module, exports$1) {
		var DEFAULT = require_default$1();
		var FilterCSS = requireCss();


		/**
		 * XSS过滤
		 *
		 * @param {String} css 要过滤的CSS代码
		 * @param {Object} options 选项：whiteList, onAttr, onIgnoreAttr
		 * @return {String}
		 */
		function filterCSS (html, options) {
		  var xss = new FilterCSS(options);
		  return xss.process(html);
		}


		// 输出
		exports$1 = module.exports = filterCSS;
		exports$1.FilterCSS = FilterCSS;
		for (var i in DEFAULT) exports$1[i] = DEFAULT[i];

		// 在浏览器端使用
		if (typeof window !== 'undefined') {
		  window.filterCSS = module.exports;
		} 
	} (lib, lib.exports));
	return lib.exports;
}

var util;
var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util;
	hasRequiredUtil = 1;
	util = {
	  indexOf: function (arr, item) {
	    var i, j;
	    if (Array.prototype.indexOf) {
	      return arr.indexOf(item);
	    }
	    for (i = 0, j = arr.length; i < j; i++) {
	      if (arr[i] === item) {
	        return i;
	      }
	    }
	    return -1;
	  },
	  forEach: function (arr, fn, scope) {
	    var i, j;
	    if (Array.prototype.forEach) {
	      return arr.forEach(fn, scope);
	    }
	    for (i = 0, j = arr.length; i < j; i++) {
	      fn.call(scope, arr[i], i, arr);
	    }
	  },
	  trim: function (str) {
	    if (String.prototype.trim) {
	      return str.trim();
	    }
	    return str.replace(/(^\s*)|(\s*$)/g, "");
	  },
	  spaceIndex: function (str) {
	    var reg = /\s|\n|\t/;
	    var match = reg.exec(str);
	    return match ? match.index : -1;
	  },
	};
	return util;
}

/**
 * default settings
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var hasRequired_default;

function require_default () {
	if (hasRequired_default) return _default$1;
	hasRequired_default = 1;
	var FilterCSS = requireLib$1().FilterCSS;
	var getDefaultCSSWhiteList = requireLib$1().getDefaultWhiteList;
	var _ = requireUtil();

	function getDefaultWhiteList() {
	  return {
	    a: ["target", "href", "title"],
	    abbr: ["title"],
	    address: [],
	    area: ["shape", "coords", "href", "alt"],
	    article: [],
	    aside: [],
	    audio: [
	      "autoplay",
	      "controls",
	      "crossorigin",
	      "loop",
	      "muted",
	      "preload",
	      "src",
	    ],
	    b: [],
	    bdi: ["dir"],
	    bdo: ["dir"],
	    big: [],
	    blockquote: ["cite"],
	    br: [],
	    caption: [],
	    center: [],
	    cite: [],
	    code: [],
	    col: ["align", "valign", "span", "width"],
	    colgroup: ["align", "valign", "span", "width"],
	    dd: [],
	    del: ["datetime"],
	    details: ["open"],
	    div: [],
	    dl: [],
	    dt: [],
	    em: [],
	    figcaption: [],
	    figure: [],
	    font: ["color", "size", "face"],
	    footer: [],
	    h1: [],
	    h2: [],
	    h3: [],
	    h4: [],
	    h5: [],
	    h6: [],
	    header: [],
	    hr: [],
	    i: [],
	    img: ["src", "alt", "title", "width", "height", "loading"],
	    ins: ["datetime"],
	    kbd: [],
	    li: [],
	    mark: [],
	    nav: [],
	    ol: [],
	    p: [],
	    pre: [],
	    s: [],
	    section: [],
	    small: [],
	    span: [],
	    sub: [],
	    summary: [],
	    sup: [],
	    strong: [],
	    strike: [],
	    table: ["width", "border", "align", "valign"],
	    tbody: ["align", "valign"],
	    td: ["width", "rowspan", "colspan", "align", "valign"],
	    tfoot: ["align", "valign"],
	    th: ["width", "rowspan", "colspan", "align", "valign"],
	    thead: ["align", "valign"],
	    tr: ["rowspan", "align", "valign"],
	    tt: [],
	    u: [],
	    ul: [],
	    video: [
	      "autoplay",
	      "controls",
	      "crossorigin",
	      "loop",
	      "muted",
	      "playsinline",
	      "poster",
	      "preload",
	      "src",
	      "height",
	      "width",
	    ],
	  };
	}

	var defaultCSSFilter = new FilterCSS();

	/**
	 * default onTag function
	 *
	 * @param {String} tag
	 * @param {String} html
	 * @param {Object} options
	 * @return {String}
	 */
	function onTag(tag, html, options) {
	  // do nothing
	}

	/**
	 * default onIgnoreTag function
	 *
	 * @param {String} tag
	 * @param {String} html
	 * @param {Object} options
	 * @return {String}
	 */
	function onIgnoreTag(tag, html, options) {
	  // do nothing
	}

	/**
	 * default onTagAttr function
	 *
	 * @param {String} tag
	 * @param {String} name
	 * @param {String} value
	 * @return {String}
	 */
	function onTagAttr(tag, name, value) {
	  // do nothing
	}

	/**
	 * default onIgnoreTagAttr function
	 *
	 * @param {String} tag
	 * @param {String} name
	 * @param {String} value
	 * @return {String}
	 */
	function onIgnoreTagAttr(tag, name, value) {
	  // do nothing
	}

	/**
	 * default escapeHtml function
	 *
	 * @param {String} html
	 */
	function escapeHtml(html) {
	  return html.replace(REGEXP_LT, "&lt;").replace(REGEXP_GT, "&gt;");
	}

	/**
	 * default safeAttrValue function
	 *
	 * @param {String} tag
	 * @param {String} name
	 * @param {String} value
	 * @param {Object} cssFilter
	 * @return {String}
	 */
	function safeAttrValue(tag, name, value, cssFilter) {
	  // unescape attribute value firstly
	  value = friendlyAttrValue(value);

	  if (name === "href" || name === "src") {
	    // filter `href` and `src` attribute
	    // only allow the value that starts with `http://` | `https://` | `mailto:` | `/` | `#`
	    value = _.trim(value);
	    if (value === "#") return "#";
	    if (
	      !(
	        value.substr(0, 7) === "http://" ||
	        value.substr(0, 8) === "https://" ||
	        value.substr(0, 7) === "mailto:" ||
	        value.substr(0, 4) === "tel:" ||
	        value.substr(0, 11) === "data:image/" ||
	        value.substr(0, 6) === "ftp://" ||
	        value.substr(0, 2) === "./" ||
	        value.substr(0, 3) === "../" ||
	        value[0] === "#" ||
	        value[0] === "/"
	      )
	    ) {
	      return "";
	    }
	  } else if (name === "background") {
	    // filter `background` attribute (maybe no use)
	    // `javascript:`
	    REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
	    if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
	      return "";
	    }
	  } else if (name === "style") {
	    // `expression()`
	    REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex = 0;
	    if (REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)) {
	      return "";
	    }
	    // `url()`
	    REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex = 0;
	    if (REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)) {
	      REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex = 0;
	      if (REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)) {
	        return "";
	      }
	    }
	    if (cssFilter !== false) {
	      cssFilter = cssFilter || defaultCSSFilter;
	      value = cssFilter.process(value);
	    }
	  }

	  // escape `<>"` before returns
	  value = escapeAttrValue(value);
	  return value;
	}

	// RegExp list
	var REGEXP_LT = /</g;
	var REGEXP_GT = />/g;
	var REGEXP_QUOTE = /"/g;
	var REGEXP_QUOTE_2 = /&quot;/g;
	var REGEXP_ATTR_VALUE_1 = /&#([a-zA-Z0-9]*);?/gim;
	var REGEXP_ATTR_VALUE_COLON = /&colon;?/gim;
	var REGEXP_ATTR_VALUE_NEWLINE = /&newline;?/gim;
	// var REGEXP_DEFAULT_ON_TAG_ATTR_3 = /\/\*|\*\//gm;
	var REGEXP_DEFAULT_ON_TAG_ATTR_4 =
	  /((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi;
	// var REGEXP_DEFAULT_ON_TAG_ATTR_5 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/gi;
	// var REGEXP_DEFAULT_ON_TAG_ATTR_6 = /^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//gi;
	var REGEXP_DEFAULT_ON_TAG_ATTR_7 =
	  /e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;
	var REGEXP_DEFAULT_ON_TAG_ATTR_8 = /u\s*r\s*l\s*\(.*/gi;

	/**
	 * escape double quote
	 *
	 * @param {String} str
	 * @return {String} str
	 */
	function escapeQuote(str) {
	  return str.replace(REGEXP_QUOTE, "&quot;");
	}

	/**
	 * unescape double quote
	 *
	 * @param {String} str
	 * @return {String} str
	 */
	function unescapeQuote(str) {
	  return str.replace(REGEXP_QUOTE_2, '"');
	}

	/**
	 * escape html entities
	 *
	 * @param {String} str
	 * @return {String}
	 */
	function escapeHtmlEntities(str) {
	  return str.replace(REGEXP_ATTR_VALUE_1, function replaceUnicode(str, code) {
	    return code[0] === "x" || code[0] === "X"
	      ? String.fromCharCode(parseInt(code.substr(1), 16))
	      : String.fromCharCode(parseInt(code, 10));
	  });
	}

	/**
	 * escape html5 new danger entities
	 *
	 * @param {String} str
	 * @return {String}
	 */
	function escapeDangerHtml5Entities(str) {
	  return str
	    .replace(REGEXP_ATTR_VALUE_COLON, ":")
	    .replace(REGEXP_ATTR_VALUE_NEWLINE, " ");
	}

	/**
	 * clear nonprintable characters
	 *
	 * @param {String} str
	 * @return {String}
	 */
	function clearNonPrintableCharacter(str) {
	  var str2 = "";
	  for (var i = 0, len = str.length; i < len; i++) {
	    str2 += str.charCodeAt(i) < 32 ? " " : str.charAt(i);
	  }
	  return _.trim(str2);
	}

	/**
	 * get friendly attribute value
	 *
	 * @param {String} str
	 * @return {String}
	 */
	function friendlyAttrValue(str) {
	  str = unescapeQuote(str);
	  str = escapeHtmlEntities(str);
	  str = escapeDangerHtml5Entities(str);
	  str = clearNonPrintableCharacter(str);
	  return str;
	}

	/**
	 * unescape attribute value
	 *
	 * @param {String} str
	 * @return {String}
	 */
	function escapeAttrValue(str) {
	  str = escapeQuote(str);
	  str = escapeHtml(str);
	  return str;
	}

	/**
	 * `onIgnoreTag` function for removing all the tags that are not in whitelist
	 */
	function onIgnoreTagStripAll() {
	  return "";
	}

	/**
	 * remove tag body
	 * specify a `tags` list, if the tag is not in the `tags` list then process by the specify function (optional)
	 *
	 * @param {array} tags
	 * @param {function} next
	 */
	function StripTagBody(tags, next) {
	  if (typeof next !== "function") {
	    next = function () {};
	  }

	  var isRemoveAllTag = !Array.isArray(tags);
	  function isRemoveTag(tag) {
	    if (isRemoveAllTag) return true;
	    return _.indexOf(tags, tag) !== -1;
	  }

	  var removeList = [];
	  var posStart = false;

	  return {
	    onIgnoreTag: function (tag, html, options) {
	      if (isRemoveTag(tag)) {
	        if (options.isClosing) {
	          var ret = "[/removed]";
	          var end = options.position + ret.length;
	          removeList.push([
	            posStart !== false ? posStart : options.position,
	            end,
	          ]);
	          posStart = false;
	          return ret;
	        } else {
	          if (!posStart) {
	            posStart = options.position;
	          }
	          return "[removed]";
	        }
	      } else {
	        return next(tag, html, options);
	      }
	    },
	    remove: function (html) {
	      var rethtml = "";
	      var lastPos = 0;
	      _.forEach(removeList, function (pos) {
	        rethtml += html.slice(lastPos, pos[0]);
	        lastPos = pos[1];
	      });
	      rethtml += html.slice(lastPos);
	      return rethtml;
	    },
	  };
	}

	/**
	 * remove html comments
	 *
	 * @param {String} html
	 * @return {String}
	 */
	function stripCommentTag(html) {
	  var retHtml = "";
	  var lastPos = 0;
	  while (lastPos < html.length) {
	    var i = html.indexOf("<!--", lastPos);
	    if (i === -1) {
	      retHtml += html.slice(lastPos);
	      break;
	    }
	    retHtml += html.slice(lastPos, i);
	    var j = html.indexOf("-->", i);
	    if (j === -1) {
	      break;
	    }
	    lastPos = j + 3;
	  }
	  return retHtml;
	}

	/**
	 * remove invisible characters
	 *
	 * @param {String} html
	 * @return {String}
	 */
	function stripBlankChar(html) {
	  var chars = html.split("");
	  chars = chars.filter(function (char) {
	    var c = char.charCodeAt(0);
	    if (c === 127) return false;
	    if (c <= 31) {
	      if (c === 10 || c === 13) return true;
	      return false;
	    }
	    return true;
	  });
	  return chars.join("");
	}

	_default$1.whiteList = getDefaultWhiteList();
	_default$1.getDefaultWhiteList = getDefaultWhiteList;
	_default$1.onTag = onTag;
	_default$1.onIgnoreTag = onIgnoreTag;
	_default$1.onTagAttr = onTagAttr;
	_default$1.onIgnoreTagAttr = onIgnoreTagAttr;
	_default$1.safeAttrValue = safeAttrValue;
	_default$1.escapeHtml = escapeHtml;
	_default$1.escapeQuote = escapeQuote;
	_default$1.unescapeQuote = unescapeQuote;
	_default$1.escapeHtmlEntities = escapeHtmlEntities;
	_default$1.escapeDangerHtml5Entities = escapeDangerHtml5Entities;
	_default$1.clearNonPrintableCharacter = clearNonPrintableCharacter;
	_default$1.friendlyAttrValue = friendlyAttrValue;
	_default$1.escapeAttrValue = escapeAttrValue;
	_default$1.onIgnoreTagStripAll = onIgnoreTagStripAll;
	_default$1.StripTagBody = StripTagBody;
	_default$1.stripCommentTag = stripCommentTag;
	_default$1.stripBlankChar = stripBlankChar;
	_default$1.attributeWrapSign = '"';
	_default$1.cssFilter = defaultCSSFilter;
	_default$1.getDefaultCSSWhiteList = getDefaultCSSWhiteList;
	return _default$1;
}

var parser$1 = {};

/**
 * Simple HTML Parser
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var hasRequiredParser;

function requireParser () {
	if (hasRequiredParser) return parser$1;
	hasRequiredParser = 1;
	var _ = requireUtil();

	/**
	 * get tag name
	 *
	 * @param {String} html e.g. '<a hef="#">'
	 * @return {String}
	 */
	function getTagName(html) {
	  var i = _.spaceIndex(html);
	  var tagName;
	  if (i === -1) {
	    tagName = html.slice(1, -1);
	  } else {
	    tagName = html.slice(1, i + 1);
	  }
	  tagName = _.trim(tagName).toLowerCase();
	  if (tagName.slice(0, 1) === "/") tagName = tagName.slice(1);
	  if (tagName.slice(-1) === "/") tagName = tagName.slice(0, -1);
	  return tagName;
	}

	/**
	 * is close tag?
	 *
	 * @param {String} html 如：'<a hef="#">'
	 * @return {Boolean}
	 */
	function isClosing(html) {
	  return html.slice(0, 2) === "</";
	}

	/**
	 * parse input html and returns processed html
	 *
	 * @param {String} html
	 * @param {Function} onTag e.g. function (sourcePosition, position, tag, html, isClosing)
	 * @param {Function} escapeHtml
	 * @return {String}
	 */
	function parseTag(html, onTag, escapeHtml) {

	  var rethtml = "";
	  var lastPos = 0;
	  var tagStart = false;
	  var quoteStart = false;
	  var currentPos = 0;
	  var len = html.length;
	  var currentTagName = "";
	  var currentHtml = "";

	  chariterator: for (currentPos = 0; currentPos < len; currentPos++) {
	    var c = html.charAt(currentPos);
	    if (tagStart === false) {
	      if (c === "<") {
	        tagStart = currentPos;
	        continue;
	      }
	    } else {
	      if (quoteStart === false) {
	        if (c === "<") {
	          rethtml += escapeHtml(html.slice(lastPos, currentPos));
	          tagStart = currentPos;
	          lastPos = currentPos;
	          continue;
	        }
	        if (c === ">" || currentPos === len - 1) {
	          rethtml += escapeHtml(html.slice(lastPos, tagStart));
	          currentHtml = html.slice(tagStart, currentPos + 1);
	          currentTagName = getTagName(currentHtml);
	          rethtml += onTag(
	            tagStart,
	            rethtml.length,
	            currentTagName,
	            currentHtml,
	            isClosing(currentHtml)
	          );
	          lastPos = currentPos + 1;
	          tagStart = false;
	          continue;
	        }
	        if (c === '"' || c === "'") {
	          var i = 1;
	          var ic = html.charAt(currentPos - i);

	          while (ic.trim() === "" || ic === "=") {
	            if (ic === "=") {
	              quoteStart = c;
	              continue chariterator;
	            }
	            ic = html.charAt(currentPos - ++i);
	          }
	        }
	      } else {
	        if (c === quoteStart) {
	          quoteStart = false;
	          continue;
	        }
	      }
	    }
	  }
	  if (lastPos < len) {
	    rethtml += escapeHtml(html.substr(lastPos));
	  }

	  return rethtml;
	}

	var REGEXP_ILLEGAL_ATTR_NAME = /[^a-zA-Z0-9\\_:.-]/gim;

	/**
	 * parse input attributes and returns processed attributes
	 *
	 * @param {String} html e.g. `href="#" target="_blank"`
	 * @param {Function} onAttr e.g. `function (name, value)`
	 * @return {String}
	 */
	function parseAttr(html, onAttr) {

	  var lastPos = 0;
	  var lastMarkPos = 0;
	  var retAttrs = [];
	  var tmpName = false;
	  var len = html.length;

	  function addAttr(name, value) {
	    name = _.trim(name);
	    name = name.replace(REGEXP_ILLEGAL_ATTR_NAME, "").toLowerCase();
	    if (name.length < 1) return;
	    var ret = onAttr(name, value || "");
	    if (ret) retAttrs.push(ret);
	  }

	  // 逐个分析字符
	  for (var i = 0; i < len; i++) {
	    var c = html.charAt(i);
	    var v, j;
	    if (tmpName === false && c === "=") {
	      tmpName = html.slice(lastPos, i);
	      lastPos = i + 1;
	      lastMarkPos = html.charAt(lastPos) === '"' || html.charAt(lastPos) === "'" ? lastPos : findNextQuotationMark(html, i + 1);
	      continue;
	    }
	    if (tmpName !== false) {
	      if (
	        i === lastMarkPos
	      ) {
	        j = html.indexOf(c, i + 1);
	        if (j === -1) {
	          break;
	        } else {
	          v = _.trim(html.slice(lastMarkPos + 1, j));
	          addAttr(tmpName, v);
	          tmpName = false;
	          i = j;
	          lastPos = i + 1;
	          continue;
	        }
	      }
	    }
	    if (/\s|\n|\t/.test(c)) {
	      html = html.replace(/\s|\n|\t/g, " ");
	      if (tmpName === false) {
	        j = findNextEqual(html, i);
	        if (j === -1) {
	          v = _.trim(html.slice(lastPos, i));
	          addAttr(v);
	          tmpName = false;
	          lastPos = i + 1;
	          continue;
	        } else {
	          i = j - 1;
	          continue;
	        }
	      } else {
	        j = findBeforeEqual(html, i - 1);
	        if (j === -1) {
	          v = _.trim(html.slice(lastPos, i));
	          v = stripQuoteWrap(v);
	          addAttr(tmpName, v);
	          tmpName = false;
	          lastPos = i + 1;
	          continue;
	        } else {
	          continue;
	        }
	      }
	    }
	  }

	  if (lastPos < html.length) {
	    if (tmpName === false) {
	      addAttr(html.slice(lastPos));
	    } else {
	      addAttr(tmpName, stripQuoteWrap(_.trim(html.slice(lastPos))));
	    }
	  }

	  return _.trim(retAttrs.join(" "));
	}

	function findNextEqual(str, i) {
	  for (; i < str.length; i++) {
	    var c = str[i];
	    if (c === " ") continue;
	    if (c === "=") return i;
	    return -1;
	  }
	}

	function findNextQuotationMark(str, i) {
	  for (; i < str.length; i++) {
	    var c = str[i];
	    if (c === " ") continue;
	    if (c === "'" || c === '"') return i;
	    return -1;
	  }
	}

	function findBeforeEqual(str, i) {
	  for (; i > 0; i--) {
	    var c = str[i];
	    if (c === " ") continue;
	    if (c === "=") return i;
	    return -1;
	  }
	}

	function isQuoteWrapString(text) {
	  if (
	    (text[0] === '"' && text[text.length - 1] === '"') ||
	    (text[0] === "'" && text[text.length - 1] === "'")
	  ) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function stripQuoteWrap(text) {
	  if (isQuoteWrapString(text)) {
	    return text.substr(1, text.length - 2);
	  } else {
	    return text;
	  }
	}

	parser$1.parseTag = parseTag;
	parser$1.parseAttr = parseAttr;
	return parser$1;
}

/**
 * filter xss
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var xss$1;
var hasRequiredXss;

function requireXss () {
	if (hasRequiredXss) return xss$1;
	hasRequiredXss = 1;
	var FilterCSS = requireLib$1().FilterCSS;
	var DEFAULT = require_default();
	var parser = requireParser();
	var parseTag = parser.parseTag;
	var parseAttr = parser.parseAttr;
	var _ = requireUtil();

	/**
	 * returns `true` if the input value is `undefined` or `null`
	 *
	 * @param {Object} obj
	 * @return {Boolean}
	 */
	function isNull(obj) {
	  return obj === undefined || obj === null;
	}

	/**
	 * get attributes for a tag
	 *
	 * @param {String} html
	 * @return {Object}
	 *   - {String} html
	 *   - {Boolean} closing
	 */
	function getAttrs(html) {
	  var i = _.spaceIndex(html);
	  if (i === -1) {
	    return {
	      html: "",
	      closing: html[html.length - 2] === "/",
	    };
	  }
	  html = _.trim(html.slice(i + 1, -1));
	  var isClosing = html[html.length - 1] === "/";
	  if (isClosing) html = _.trim(html.slice(0, -1));
	  return {
	    html: html,
	    closing: isClosing,
	  };
	}

	/**
	 * shallow copy
	 *
	 * @param {Object} obj
	 * @return {Object}
	 */
	function shallowCopyObject(obj) {
	  var ret = {};
	  for (var i in obj) {
	    ret[i] = obj[i];
	  }
	  return ret;
	}

	function keysToLowerCase(obj) {
	  var ret = {};
	  for (var i in obj) {
	    if (Array.isArray(obj[i])) {
	      ret[i.toLowerCase()] = obj[i].map(function (item) {
	        return item.toLowerCase();
	      });
	    } else {
	      ret[i.toLowerCase()] = obj[i];
	    }
	  }
	  return ret;
	}

	/**
	 * FilterXSS class
	 *
	 * @param {Object} options
	 *        whiteList (or allowList), onTag, onTagAttr, onIgnoreTag,
	 *        onIgnoreTagAttr, safeAttrValue, escapeHtml
	 *        stripIgnoreTagBody, allowCommentTag, stripBlankChar
	 *        css{whiteList, onAttr, onIgnoreAttr} `css=false` means don't use `cssfilter`
	 */
	function FilterXSS(options) {
	  options = shallowCopyObject(options || {});

	  if (options.stripIgnoreTag) {
	    if (options.onIgnoreTag) {
	      console.error(
	        'Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'
	      );
	    }
	    options.onIgnoreTag = DEFAULT.onIgnoreTagStripAll;
	  }
	  if (options.whiteList || options.allowList) {
	    options.whiteList = keysToLowerCase(options.whiteList || options.allowList);
	  } else {
	    options.whiteList = DEFAULT.whiteList;
	  }

	  this.attributeWrapSign = options.singleQuotedAttributeValue === true ? "'" : DEFAULT.attributeWrapSign;

	  options.onTag = options.onTag || DEFAULT.onTag;
	  options.onTagAttr = options.onTagAttr || DEFAULT.onTagAttr;
	  options.onIgnoreTag = options.onIgnoreTag || DEFAULT.onIgnoreTag;
	  options.onIgnoreTagAttr = options.onIgnoreTagAttr || DEFAULT.onIgnoreTagAttr;
	  options.safeAttrValue = options.safeAttrValue || DEFAULT.safeAttrValue;
	  options.escapeHtml = options.escapeHtml || DEFAULT.escapeHtml;
	  this.options = options;

	  if (options.css === false) {
	    this.cssFilter = false;
	  } else {
	    options.css = options.css || {};
	    this.cssFilter = new FilterCSS(options.css);
	  }
	}

	/**
	 * start process and returns result
	 *
	 * @param {String} html
	 * @return {String}
	 */
	FilterXSS.prototype.process = function (html) {
	  // compatible with the input
	  html = html || "";
	  html = html.toString();
	  if (!html) return "";

	  var me = this;
	  var options = me.options;
	  var whiteList = options.whiteList;
	  var onTag = options.onTag;
	  var onIgnoreTag = options.onIgnoreTag;
	  var onTagAttr = options.onTagAttr;
	  var onIgnoreTagAttr = options.onIgnoreTagAttr;
	  var safeAttrValue = options.safeAttrValue;
	  var escapeHtml = options.escapeHtml;
	  var attributeWrapSign = me.attributeWrapSign;
	  var cssFilter = me.cssFilter;

	  // remove invisible characters
	  if (options.stripBlankChar) {
	    html = DEFAULT.stripBlankChar(html);
	  }

	  // remove html comments
	  if (!options.allowCommentTag) {
	    html = DEFAULT.stripCommentTag(html);
	  }

	  // if enable stripIgnoreTagBody
	  var stripIgnoreTagBody = false;
	  if (options.stripIgnoreTagBody) {
	    stripIgnoreTagBody = DEFAULT.StripTagBody(
	      options.stripIgnoreTagBody,
	      onIgnoreTag
	    );
	    onIgnoreTag = stripIgnoreTagBody.onIgnoreTag;
	  }

	  var retHtml = parseTag(
	    html,
	    function (sourcePosition, position, tag, html, isClosing) {
	      var info = {
	        sourcePosition: sourcePosition,
	        position: position,
	        isClosing: isClosing,
	        isWhite: Object.prototype.hasOwnProperty.call(whiteList, tag),
	      };

	      // call `onTag()`
	      var ret = onTag(tag, html, info);
	      if (!isNull(ret)) return ret;

	      if (info.isWhite) {
	        if (info.isClosing) {
	          return "</" + tag + ">";
	        }

	        var attrs = getAttrs(html);
	        var whiteAttrList = whiteList[tag];
	        var attrsHtml = parseAttr(attrs.html, function (name, value) {
	          // call `onTagAttr()`
	          var isWhiteAttr = _.indexOf(whiteAttrList, name) !== -1;
	          var ret = onTagAttr(tag, name, value, isWhiteAttr);
	          if (!isNull(ret)) return ret;

	          if (isWhiteAttr) {
	            // call `safeAttrValue()`
	            value = safeAttrValue(tag, name, value, cssFilter);
	            if (value) {
	              return name + '=' + attributeWrapSign + value + attributeWrapSign;
	            } else {
	              return name;
	            }
	          } else {
	            // call `onIgnoreTagAttr()`
	            ret = onIgnoreTagAttr(tag, name, value, isWhiteAttr);
	            if (!isNull(ret)) return ret;
	            return;
	          }
	        });

	        // build new tag html
	        html = "<" + tag;
	        if (attrsHtml) html += " " + attrsHtml;
	        if (attrs.closing) html += " /";
	        html += ">";
	        return html;
	      } else {
	        // call `onIgnoreTag()`
	        ret = onIgnoreTag(tag, html, info);
	        if (!isNull(ret)) return ret;
	        return escapeHtml(html);
	      }
	    },
	    escapeHtml
	  );

	  // if enable stripIgnoreTagBody
	  if (stripIgnoreTagBody) {
	    retHtml = stripIgnoreTagBody.remove(retHtml);
	  }

	  return retHtml;
	};

	xss$1 = FilterXSS;
	return xss$1;
}

/**
 * xss
 *
 * @author Zongmin Lei<leizongmin@gmail.com>
 */

var hasRequiredLib;

function requireLib () {
	if (hasRequiredLib) return lib$1.exports;
	hasRequiredLib = 1;
	(function (module, exports$1) {
		var DEFAULT = require_default();
		var parser = requireParser();
		var FilterXSS = requireXss();

		/**
		 * filter xss function
		 *
		 * @param {String} html
		 * @param {Object} options { whiteList, onTag, onTagAttr, onIgnoreTag, onIgnoreTagAttr, safeAttrValue, escapeHtml }
		 * @return {String}
		 */
		function filterXSS(html, options) {
		  var xss = new FilterXSS(options);
		  return xss.process(html);
		}

		exports$1 = module.exports = filterXSS;
		exports$1.filterXSS = filterXSS;
		exports$1.FilterXSS = FilterXSS;

		(function () {
		  for (var i in DEFAULT) {
		    exports$1[i] = DEFAULT[i];
		  }
		  for (var j in parser) {
		    exports$1[j] = parser[j];
		  }
		})();

		// using `xss` on the browser, output `filterXSS` to the globals
		if (typeof window !== "undefined") {
		  window.filterXSS = module.exports;
		}

		// using `xss` on the WebWorker, output `filterXSS` to the globals
		function isWorkerEnv() {
		  return (
		    typeof self !== "undefined" &&
		    typeof DedicatedWorkerGlobalScope !== "undefined" &&
		    self instanceof DedicatedWorkerGlobalScope
		  );
		}
		if (isWorkerEnv()) {
		  self.filterXSS = module.exports;
		} 
	} (lib$1, lib$1.exports));
	return lib$1.exports;
}

var libExports = requireLib();
const xss = /*@__PURE__*/getDefaultExportFromCjs(libExports);

const ALLOWED_PREFIX_ATTRIBUTES = ["data", "aria"];
const ALLOWED_ATTRIBUTES = [
  "style",
  "class",
  "dir",
  "wix-comp",
  "role",
  "tabindex",
  "focus",
  "start"
];
const ALLOWED_LINK_ATTRIBUTES = ["href", "dataquery", "id", "rel", "target"];
const CSS_PROPS_WHITELIST = [
  "color",
  "background-color",
  "font-size",
  "font-family",
  "font-style",
  "text-decoration",
  "writing-mode",
  "text-orientation",
  "line-height",
  "text-shadow",
  "direction",
  "position",
  "z-index",
  "top",
  "left",
  "overflow",
  "overflow-x",
  "overflow-y"
];
function generateHTMLWhiteList() {
  const whitelist = {
    ...libExports.whiteList,
    strike: [],
    hatul: [],
    wline: [],
    object: []
  };
  if (whitelist.a) {
    whitelist.a.push(...ALLOWED_LINK_ATTRIBUTES);
  }
  Object.keys(whitelist).forEach((key) => {
    if (!whitelist[key]) {
      whitelist[key] = [];
    }
    whitelist[key].push(...ALLOWED_ATTRIBUTES);
  });
  return whitelist;
}
function getSafeAttrValue(tag, name, value, cssFilter) {
  if (tag === "a" && name === "href") {
    if (value.startsWith("wix:document")) {
      return value;
    }
  }
  return libExports.safeAttrValue(tag, name, value, cssFilter);
}
function generateCSSWhiteList() {
  return CSS_PROPS_WHITELIST.reduce(
    (acc, key) => {
      acc[key] = true;
      return acc;
    },
    {}
  );
}
const XSSWhitelist = generateHTMLWhiteList();
const CSSWhitelist = generateCSSWhiteList();
function sanitizeHTML(html) {
  return xss(html, {
    whiteList: XSSWhitelist,
    stripIgnoreTagBody: ["script", "style"],
    stripBlankChar: true,
    css: { whiteList: { ...libExports.getDefaultCSSWhiteList(), ...CSSWhitelist } },
    safeAttrValue: function onAttrValue(tag, name, value, cssFilter) {
      const attrValue = getSafeAttrValue(tag, name, value, cssFilter);
      return attrValue ? attrValue : "";
    },
    onIgnoreTagAttr(tag, name, value) {
      if (ALLOWED_PREFIX_ATTRIBUTES.some((prefix) => name.startsWith(prefix))) {
        return `${name}="${value}"`;
      }
      return "";
    },
    onIgnoreTag() {
      return "";
    }
  });
}

function defineService(id) {
    return id;
}

const defineStaticService = defineService;

/** @deprecated */
const LinkUtilsDefinition = defineStaticService('@wix/viewer-service-link-utils');

const wixGuard = '<span class="wixGuard">&#8203;</span>';
const startTagRegex = `<([-A-Za-z0-9_?:]+)((?:\\s+(?:x:)?[-A-Za-z0-9_]+(?:\\s*=\\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\\s]+))?)*)\\s*(/?)>`;
const endTagRegex = `</([-A-Za-z0-9_?:]+)[^>]*>`;
const endBlockTagRegex = `</(h[1-6]|p)[^>]*>`;
const wixCodeName = "$w.Text";

function flow(...fns) {
  return (value) => fns.reduce((output, fn) => fn(output), value);
}

const HTML_END = "HTML_END";
const OPEN_TAG_START = "<";
const TAG_END = ">";
const SELF_CLOSING = "/>";
const CLOSING_TAG_START = "</";
const SPACE = " ";
const selfClosingTags = [
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
const selfClosingTagsSet = new Set(selfClosingTags);
const bracketsSet = /* @__PURE__ */ new Set([
  OPEN_TAG_START,
  TAG_END,
  SELF_CLOSING,
  CLOSING_TAG_START
]);
function parseTagName(html, lastBracketTokenEnd, currentTokenIndex, indexOfFirstSpaceAfterOpenBracket) {
  const indexOfTagNameEnd = indexOfFirstSpaceAfterOpenBracket || currentTokenIndex;
  return html.slice(lastBracketTokenEnd + 1, indexOfTagNameEnd).toLowerCase();
}
function parseProps(html, lastBracketTokenEnd, currentTokenIndex, indexOfFirstSpaceAfterOpenBracket) {
  const indexOfTagNameEnd = indexOfFirstSpaceAfterOpenBracket || currentTokenIndex;
  return html.slice(indexOfTagNameEnd + 1, currentTokenIndex);
}
function processTagEnd(html, lastBracketToken, lastBracketTokenEnd, currentTokenIndex, indexOfFirstSpaceAfterOpenBracket, callbacks) {
  const tagName = parseTagName(
    html,
    lastBracketTokenEnd,
    currentTokenIndex,
    indexOfFirstSpaceAfterOpenBracket
  );
  if (lastBracketToken === OPEN_TAG_START) {
    const props = parseProps(
      html,
      lastBracketTokenEnd,
      currentTokenIndex,
      indexOfFirstSpaceAfterOpenBracket
    );
    if (selfClosingTagsSet.has(tagName)) {
      callbacks.onSelfClosingTag && callbacks.onSelfClosingTag({ tagName, props });
    } else {
      callbacks.onOpenTag && callbacks.onOpenTag({ tagName, props });
    }
  } else {
    callbacks.onClosingTag && callbacks.onClosingTag({ tagName, props: "" });
  }
}
function detectToken(html, i) {
  let currentToken;
  switch (html[i]) {
    case "<":
      if (html[i + 1] === "/") {
        currentToken = CLOSING_TAG_START;
        i++;
        break;
      }
      currentToken = OPEN_TAG_START;
      break;
    case ">":
      currentToken = TAG_END;
      break;
    case "/":
      if (html[i + 1] === ">") {
        currentToken = SELF_CLOSING;
        i++;
        break;
      }
    // eslint-disable-next-line no-fallthrough
    case " ":
      currentToken = SPACE;
      break;
    default:
      currentToken = html[i];
  }
  if (i === html.length) {
    currentToken = HTML_END;
  }
  return currentToken;
}
function parseFragment(html, callbacks = {}) {
  let currentToken;
  let currentTokenStart;
  let currentTokenEnd;
  let lastBracketToken;
  let lastBracketTokenEnd = -1;
  let indexOfFirstSpaceAfterOpenBracket = null;
  const htmlLength = html.length;
  let i = 0;
  while (i <= htmlLength) {
    currentTokenStart = i;
    currentToken = detectToken(html, i);
    i = currentTokenEnd = currentTokenStart + currentToken.length - 1;
    switch (currentToken) {
      case OPEN_TAG_START:
      case CLOSING_TAG_START: {
        const text = html.slice(lastBracketTokenEnd + 1, currentTokenStart);
        if (text && callbacks.onText) {
          callbacks.onText(text);
        }
        indexOfFirstSpaceAfterOpenBracket = null;
        break;
      }
      case TAG_END:
        processTagEnd(
          html,
          lastBracketToken,
          lastBracketTokenEnd,
          i,
          indexOfFirstSpaceAfterOpenBracket,
          callbacks
        );
        break;
      case SELF_CLOSING: {
        if (!callbacks.onSelfClosingTag) {
          break;
        }
        callbacks.onSelfClosingTag({
          tagName: parseTagName(
            html,
            lastBracketTokenEnd,
            currentTokenStart,
            indexOfFirstSpaceAfterOpenBracket
          ),
          props: parseProps(
            html,
            lastBracketTokenEnd,
            currentTokenStart,
            indexOfFirstSpaceAfterOpenBracket
          )
        });
        break;
      }
      case SPACE:
        if (!indexOfFirstSpaceAfterOpenBracket && (lastBracketToken === OPEN_TAG_START || lastBracketToken === CLOSING_TAG_START)) {
          indexOfFirstSpaceAfterOpenBracket = i;
        }
        break;
      case HTML_END:
        if (!callbacks.onText) {
          break;
        }
        if (!lastBracketToken) {
          callbacks.onText(html);
          return;
        }
        if (lastBracketTokenEnd !== htmlLength - 1) {
          callbacks.onText(html.slice(lastBracketTokenEnd + 1, htmlLength));
        }
        break;
    }
    if (bracketsSet.has(currentToken)) {
      lastBracketToken = currentToken;
      lastBracketTokenEnd = currentTokenEnd;
    }
    i++;
  }
}
const parser = { parseFragment };

const styleMap = {
  p: "font_8",
  h1: "font_0",
  h2: "font_2",
  h3: "font_3",
  h4: "font_4",
  h5: "font_5",
  h6: "font_6",
  ol: "font_8",
  ul: "font_8"
};
const startBlockRegexp = /<(ol|ul|h[1-6]|p)(.*?)>/g;
const p1p2regexp = /(class\s*=['"][^'"]*?)\bfont_([79])\b/;
function applyTransformationForGetHtml(data = "") {
  return data.replace(startBlockRegexp, (match, tag, attributes = "") => {
    const defaultClass = styleMap[tag];
    const defaultClassForTagRegexp = new RegExp(
      `(class\\s*=['"].*?)${defaultClass}`
    );
    if (defaultClassForTagRegexp.test(attributes)) {
      match = match.replace(defaultClassForTagRegexp, "$1");
    } else if (tag === "p" && p1p2regexp.test(attributes)) {
      match = match.replace(
        p1p2regexp,
        (matcho, prefix, p1p2) => `${prefix}${p1p2 === "7" ? "p1" : "p3"}`
      );
    }
    return match.replace(/class\s*=(['"])\s*\1/, "").replace(
      /class\s*=(['"])\s*(.*?)\s*\1/,
      (_match, quote, classes) => `class=${quote}${classes}${quote}`
    ).replace(/(.+)\s{2,}/g, "$1 ").replace(/\s+>/, ">");
  });
}
const regexp = /<(ol|ul|h[1-6]|p)(.*?)>/g;
const classRegexp = /class\s*?=\s*["'](.*?)['"]/;
const g2ClassRegexp = /(class\s*?=\s*["'])(.*?)(['"])/;
const applyTransformationForSetHtml = (htmlString = "", { addDefaultClasses } = {}) => {
  if (!htmlString) {
    return htmlString;
  }
  return htmlString.replace(regexp, (match, g1, g2) => {
    const matchedClassArray = g2.match(classRegexp);
    if (!matchedClassArray) {
      return addDefaultClasses ? `<${g1}${g2} class="${styleMap[g1]}">` : `<${g1}${g2}>`;
    }
    const matchedClass = matchedClassArray[1];
    if (/(^|\s)font_[0-9]($|\s)/.test(matchedClass)) {
      return match;
    } else if (g1 === "p" && /\bp[13]\b/i.test(matchedClass)) {
      return match.replace(
        /(.*?\bclass\s*?=.*?)\bp([13])\b(.*)/,
        (matcho, _g1, _g2, g3) => {
          const _class = _g2 === "1" ? "font_7" : "font_9";
          return `${_g1}${_class}${g3}`;
        }
      );
    }
    return `<${g1}${g2.replace(
      g2ClassRegexp,
      (_match, _g1, _g2, _g3) => `${_g1}${styleMap[g1]} ${_g2}${_g3}`
    )}>`;
  });
};

const removeWixGuard = (htmlStr) => {
  return htmlStr.replace(
    /<span class="wixGuard">([^<]*)<\/span>/g,
    (_full, group1 = "") => {
      if (group1.trim() === "&#8203;") {
        return "";
      }
      return group1;
    }
  );
};

const htmlEntitiesMap = {
  ldquo: "“",
  lsquo: "‘",
  rsquo: "’",
  laquo: "«",
  raquo: "»",
  lsaquo: "‹",
  rsaquo: "›",
  lt: "<",
  gt: ">",
  amp: "&",
  bull: "•",
  deg: "°",
  hellip: "…",
  trade: "™",
  copy: "©",
  reg: "®",
  mdash: "—",
  ndash: "–",
  nbsp: " ",
  emsp: " ",
  ensp: " ",
  sup2: "²",
  sup3: "³",
  frac14: "¼",
  frac12: "½",
  frac34: "¾"
};

const namedReferences = Object.keys(htmlEntitiesMap).sort(
  (a, b) => b.length - a.length
);
const namedReferenceRegex = new RegExp(
  `&(${namedReferences.join("|")});|&#([0-9]+);|&#[xX]([a-fA-F0-9]+);`,
  "g"
);

const numericEntitiesMap = {
  "0": "�",
  "128": "€",
  "130": "‚",
  "131": "ƒ",
  "132": "„",
  "133": "…",
  "134": "†",
  "135": "‡",
  "136": "ˆ",
  "137": "‰",
  "138": "Š",
  "139": "‹",
  "140": "Œ",
  "142": "Ž",
  "145": "‘",
  "146": "’",
  "147": "“",
  "148": "”",
  "149": "•",
  "150": "–",
  "151": "—",
  "152": "˜",
  "153": "™",
  "154": "š",
  "155": "›",
  "156": "œ",
  "158": "ž",
  "159": "Ÿ"
};

const HE_URL = "https://static.parastorage.com/unpkg/he@1.2.0/he.js";
const ENTITY_START = "&";
const ENTITY_END = ";";
function codePointToSymbol(codePoint) {
  let output = "";
  const numericEntities = numericEntitiesMap;
  if (codePoint in numericEntitiesMap) {
    return numericEntities[codePoint];
  }
  if (codePoint > 65535) {
    codePoint -= 65536;
    output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
    codePoint = 56320 | codePoint & 1023;
  }
  return output + String.fromCharCode(codePoint);
}
function getEntities(str) {
  const result = [];
  let buffer = [];
  let include = false;
  for (const char of str) {
    if (include && char !== ENTITY_END) {
      buffer.push(char);
    }
    if (char === ENTITY_START) {
      include = true;
    }
    if (char === ENTITY_END) {
      result.push(buffer.join(""));
      include = false;
      buffer = [];
    }
  }
  return result;
}
const decode = (rawText) => {
  if (!rawText) {
    return rawText;
  }
  const { he } = self;
  if (he) {
    return he.decode(rawText);
  }
  const entities = getEntities(rawText);
  const canConvert = entities.every(
    (entity) => entity in htmlEntitiesMap || entity[0] === "#"
  );
  if (canConvert) {
    return rawText.replace(namedReferenceRegex, ($0, $1, $2, $3) => {
      const htmlEntities = htmlEntitiesMap;
      if ($1) {
        return htmlEntities[$1];
      }
      if ($2) {
        return codePointToSymbol(parseInt($2, 10));
      }
      if ($3) {
        return codePointToSymbol(parseInt($3, 16));
      }
      return $0;
    });
  }
  self.importScripts(HE_URL);
  return decode(rawText);
};

function buildHtmlFromTagStack(tagStack, textInTheMiddle) {
  let openTags = "";
  let closingTags = "";
  for (const { tagName, props } of tagStack) {
    openTags += props ? `<${tagName} ${props}>` : `<${tagName}>`;
    closingTags = `</${tagName}>${closingTags}`;
  }
  return openTags + textInTheMiddle + closingTags;
}
function insertContentInHtml(html, content) {
  const tagStack = [];
  let stop = false;
  parser.parseFragment(html, {
    onText: () => {
      stop = true;
    },
    onOpenTag: (tag) => {
      if (tag.tagName === "span" && tag.props === 'class="wixGuard"') {
        stop = true;
      }
      if (!stop) {
        tagStack.push(tag);
      }
    },
    onClosingTag: () => {
      if (!stop) {
        tagStack.pop();
      }
    }
  });
  return buildHtmlFromTagStack(tagStack, content);
}

const regexHref = /(?:<a.*?href=(["']))(.*?)(?:\1)/i;
const regexTarget = /<a(.*?((target=["']([^"]+)["']).*?)?)>/i;
const regexLink = /<a.*?>/gi;
const addTarget = (htmlPart, target = "_blank") => {
  const match = regexTarget.exec(htmlPart);
  if (match) {
    const [fullMatch, replacedMatch, _, targetAttribute, targetName] = match;
    if (targetName === "_blank" || targetName === "_self") {
      return htmlPart;
    }
    let linkWithTarget;
    if (targetAttribute) {
      linkWithTarget = replacedMatch.replace(
        targetAttribute,
        `target="${target}"`
      );
      linkWithTarget = fullMatch.replace(replacedMatch, linkWithTarget);
    } else {
      linkWithTarget = fullMatch.replace(
        replacedMatch,
        `${replacedMatch} target="${target}"`
      );
    }
    return htmlPart.replace(fullMatch, linkWithTarget);
  }
  return htmlPart;
};
const convertLink = (htmlPart, getLinkProps, resolveHref) => {
  const match = regexHref.exec(htmlPart);
  if (match) {
    const fullMatch = match[0];
    const groupMatch = match[2];
    const props = getLinkProps(groupMatch);
    const replacedMatch = fullMatch.replace(groupMatch, resolveHref(props));
    return addTarget(htmlPart.replace(fullMatch, replacedMatch), props.target);
  }
  return htmlPart;
};
const convertLinkProperties = (html, getLinkProps, resolveHref = (props) => props.href || "") => {
  const replaces = [];
  let match;
  do {
    match = regexLink.exec(html);
    if (match) {
      const [fullMatch] = match;
      const link = convertLink(fullMatch, getLinkProps, resolveHref);
      replaces.push([fullMatch, link]);
    }
  } while (match);
  return replaces.reduce(
    (a, [matcho, replace]) => a.replace(matcho, replace),
    html
  );
};

const htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
const reUnescapedHtml = /[&<>"']/g;
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
function escape(string) {
  return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, (chr) => htmlEscapes[chr]) : string || "";
}

const htmlUnescapes = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'"
};
const reEscapedHtml = /&(?:amp|lt|gt|quot|#(0+)?39);/g;
const reHasEscapedHtml = RegExp(reEscapedHtml.source);
function unescape(string) {
  return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, (entity) => htmlUnescapes[entity] || "'") : string || "";
}

const IMPLIED_LINKS_PATTERN = /(?:<object.*?>)?<a data-auto-recognition="true".*?>(.*?)<\/a>(?:<\/object>)?/g;
const stripImpliedLinks = (text) => text.replace(IMPLIED_LINKS_PATTERN, (_fullMatch, innerText) => innerText);

function isNumber(value) {
  return typeof value === "number" && !Number.isNaN(value);
}
function isString(value) {
  return typeof value === "string";
}
function isBoolean(value) {
  return value === true || value === false;
}
function isDate(value) {
  return value instanceof Date && !Number.isNaN(value.getTime());
}
function isFunction(value) {
  return typeof value === "function";
}
function isArray(value) {
  return Array.isArray(value);
}
function isObject(value) {
  return typeof value === "object" && value !== null && !isArray(value);
}
function isInteger(value) {
  return Number.isInteger(value);
}
function isNil(value) {
  return value === null || value === void 0;
}
function isIn(value, arr) {
  return arr.includes(value);
}
function isAbove(value, limit) {
  return value > limit;
}
function isBelow(value, limit) {
  return value < limit;
}

const templates = {
  /* prettier-ignore */
  warning_not_null: ({ propertyName, functionName }) => `The ${propertyName} parameter that is passed to the ${functionName} method cannot be set to null.`,
  /* prettier-ignore */
  warning_non_images_in_gallery: ({ galleryId }) => `Gallery "${galleryId}" cannot contain items that are not images. To also display video and text, choose a gallery that supports those types.`,
  /* prettier-ignore */
  warning_invalid_effect_name: ({ propertyName, compName, effectName, infoLink }) => `The "${propertyName}" function called on "${compName}" was executed without the "${effectName}" effect because it is an invalid effectName value. Read more about effects: "${infoLink}"')`,
  /* prettier-ignore */
  warning_invalid_effect_option: ({ propertyName, compName, effectName, effectOption, effectOptionRef }) => `The "${propertyName}" function called on "${compName}" was executed without the "${effectName}" effect because it was called with the following invalid effectOptions keys: ${effectOption}. Read more about the effectOptions object: "https://www.wix.com/code/reference/$w.EffectOptions.html#${effectOptionRef}"`,
  /* prettier-ignore */
  warning_effect_options_not_set: ({ propertyName, compName, infoLink }) => `The "${propertyName}" function called on "${compName}" was executed without the specified effect options because it was called without an effect. Read more about effects: "${infoLink}"')`,
  /* prettier-ignore */
  warning_invalid_effect_options: ({ propertyName, compName, effectName, wrongProperty, wrongValue, infoLink }) => `The "${propertyName}" function called on "${compName}" was executed without the "${effectName}" effect because it was called with the following invalid effectOptions ${wrongProperty}: ${wrongValue}. Read more about the effectOptions object: "${infoLink}"')`,
  /* prettier-ignore */
  warning_deprecated_effect_name: ({ propertyName, compName, effectName, infoLink }) => `The "${propertyName}" function  called on "${compName}" was called with the following deprecated effect: "${effectName}". Read more about effects: "${infoLink}"')`,
  /* prettier-ignore */
  warning_deprecated_effect_with_options: ({ propertyName, compName, effectName, infoLink }) => `The "${propertyName}" function  called on "${compName}" was executed without the specified effect options because it was called with the following deprecated effect: "${effectName}". Read more about effects: "${infoLink}"`,
  /* prettier-ignore */
  warning_invalid_type_effect_options: ({ propertyName, compName, effectName, wrongValue, infoLink }) => `The "${propertyName}" function called on "${compName}" was executed without the "${effectName}" effect because the it was called with the following invalid effectOptions "${wrongValue}". The effectOptions must be of type Object. Read more about the effectOptions object: "${infoLink}"'`,
  /* prettier-ignore */
  error_bad_image_format_with_index: ({ propertyName, wrongValue, index }) => `The "${propertyName}" property of the item at index ${index} cannot be set to "${wrongValue}". It must be a valid URL starting with "http://", "https://", or "wix:image://".`,
  /* prettier-ignore */
  error_invalid_type_for_file_limit: ({ propertyName }) => `The ${propertyName} property is not yet supported for Document or Audio file types.`,
  /* prettier-ignore */
  warning_not_null_for_comp_name: ({ propertyName, functionName, compName }) => `The ${propertyName} parameter of "${compName}" that is passed to the ${functionName} method cannot be set to null.`,
  /* prettier-ignore */
  warning_not_null_with_index: ({ propertyName, functionName, index }) => `The ${propertyName} parameter of item at index ${index} that is passed to the ${functionName} method cannot be set to null or undefined.`,
  /* prettier-ignore */
  warning_invalid_option: ({ propertyName, wrongValue, index }) => `The ${propertyName} parameter at index ${index} that is passed to the options function cannot be set to ${JSON.stringify(wrongValue)}. Options must contain either a non-null value or a non-null label.`,
  /* prettier-ignore */
  warning_duplicates_found: ({ propertyName, duplicateOptions }) => `The ${propertyName} parameter provided to the options function includes duplicate options. To avoid confusion, these duplicates have been automatically removed: ${JSON.stringify(duplicateOptions)}.`,
  /* prettier-ignore */
  warning_duplicates_values_found: ({ propertyName, duplicateOptions }) => `The ${propertyName} parameter provided to the options function includes duplicate options. Please remove the duplicates: ${JSON.stringify(duplicateOptions)}.`,
  /* prettier-ignore */
  warning_invalid_option_value: ({ propertyName, wrongValue, functionName }) => `The ${propertyName} parameter that is passed to the ${functionName} cannot be set to ${JSON.stringify(wrongValue)}. Ensure that the value is one of the available options in the array.`,
  /* prettier-ignore */
  warning_color_casting_performed: ({ propertyName, compName, infoLink }) => ` The value of "${propertyName}" property of "${compName}" expects an rgbColor value, but was set to an rgbaColor value. The color value has been set, but the alpha opacity information has been ignored. Read more about rgbColor values: "${infoLink}"`,
  /* prettier-ignore */
  warning_value_changed: ({ propertyName, compName, newValue, changedProperty }) => `The ${propertyName} of ${compName} was set to ${newValue}, which is less than ${compName}'s ${changedProperty} value. ${compName} cannot have a ${changedProperty} value which is greater than its ${propertyName} value. The value of ${changedProperty} has therefore been set to ${newValue}.`,
  /* prettier-ignore */
  warning_at_least: ({ propertyName, wrongValue, minValue }) => `The value of ${propertyName} property should not be set to the value ${wrongValue}. It should be at least ${minValue}.`,
  /* prettier-ignore */
  warning_at_most: ({ propertyName, wrongValue, maxValue }) => `The value of ${propertyName} property should not be set to the value ${wrongValue}. It should be at most ${maxValue}.`,
  /* prettier-ignore */
  error_mandatory_val: ({ propertyName, functionName }) => `The ${propertyName} parameter is required for ${functionName} method.`,
  /* prettier-ignore */
  error_mandatory_multiple_vals: ({ propertyNames, functionName }) => `The following parameters: ${[...propertyNames]}, are required for ${functionName} method.`,
  /* prettier-ignore */
  error_mandatory_val_with_index: ({ propertyName, functionName, index }) => `The ${propertyName} parameter of item at index ${index} is required for ${functionName} method.`,
  /* prettier-ignore */
  error_unknown_val: ({ propertyName, functionName }) => `The ${propertyName} parameter is not allowed for ${functionName} method.`,
  /* prettier-ignore */
  error_unknown_multiple_vals: ({ propertyNames, functionName }) => `The following parameters: ${[...propertyNames]} are unknown for ${functionName} method.`,
  /* prettier-ignore */
  error_unknown_val_with_index: ({ propertyName, functionName, index }) => `The ${propertyName} parameter of item at index ${index} is not allowed for ${functionName} method.`,
  /* prettier-ignore */
  error_unknown_multiple_vals_with_index: ({ propertyNames, functionName, index }) => `The following parameters: ${[...propertyNames]} of item at index ${index} are unknown for ${functionName} method.`,
  /* prettier-ignore */
  error_length_in_range: ({ propertyName, functionName, value, minimum, maximum }) => `The value of ${propertyName} parameter that is passed to the ${functionName} method cannot be set to the value "${value}". Its length must be between ${minimum} and ${maximum}.`,
  /* prettier-ignore */
  error_length_in_range_with_index: ({ propertyName, functionName, value, minimum, maximum, index }) => `The ${propertyName} parameter of item at index ${index} that is passed to the ${functionName} method cannot be set to the value "${value}". Its length must be between ${minimum} and ${maximum}.`,
  /* prettier-ignore */
  error_length_accept_single_value: ({ propertyName, functionName, value, expectedValue }) => `The value of ${propertyName} parameter that is passed to the ${functionName} method cannot be set to the value "${value}". Its length must be ${expectedValue}.`,
  /* prettier-ignore */
  error_length_accept_single_value_with_index: ({ propertyName, functionName, value, expectedValue, index }) => `The ${propertyName} parameter of item at index ${index} that is passed to the ${functionName} method cannot be set to the value "${value}". Its length must be ${expectedValue}.`,
  /* prettier-ignore */
  error_length_less_than: ({ propertyName, functionName, value, minimum }) => `The value of ${propertyName} parameter that is passed to the ${functionName} method cannot be set to the value "${value}" because its length is shorter than ${minimum}.`,
  /* prettier-ignore */
  error_length_less_than_with_index: ({ propertyName, functionName, value, minimum, index }) => `The ${propertyName} parameter of item at index ${index} that is passed to the ${functionName} method cannot be set to the value "${value}" because its length is shorter than ${minimum}.`,
  /* prettier-ignore */
  error_length_exceeds: ({ propertyName, functionName, value, maximum }) => `The value of ${propertyName} parameter that is passed to the ${functionName} method cannot be set to the value "${value}" because its length exceeds ${maximum}.`,
  /* prettier-ignore */
  error_length_exceeds_with_index: ({ propertyName, functionName, value, maximum, index }) => `The ${propertyName} parameter of item at index ${index} that is passed to the ${functionName} method cannot be set to the value "${value}" because its length exceeds ${maximum}.`,
  /* prettier-ignore */
  error_range: ({ propertyName, functionName, value, minimum, maximum }) => `The value of ${propertyName} parameter that is passed to the ${functionName} method cannot be set to the value "${value}". It must be between ${minimum} and ${maximum}.`,
  /* prettier-ignore */
  error_range_with_index: ({ propertyName, functionName, value, minimum, maximum, index }) => `The ${propertyName} parameter of item at index ${index} that is passed to the ${functionName} method cannot be set to the value "${value}". It must be between ${minimum} and ${maximum}.`,
  /* prettier-ignore */
  error_accept_single_value: ({ propertyName, functionName, value, expectedValue }) => `The value of ${propertyName} parameter that is passed to the ${functionName} method cannot be set to the value "${value}". It must be ${expectedValue}.`,
  /* prettier-ignore */
  error_accept_single_value_with_index: ({ propertyName, functionName, value, expectedValue, index }) => `The ${propertyName} parameter of item at index ${index} that is passed to the ${functionName} method cannot be set to the value "${value}". It must be ${expectedValue}.`,
  /* prettier-ignore */
  error_larger_than: ({ propertyName, functionName, value, minimum }) => `The value of ${propertyName} parameter that is passed to the ${functionName} method cannot be set to the value ${value}. It must be larger than ${minimum}.`,
  /* prettier-ignore */
  error_at_least: ({ propertyName, functionName, value, minimum }) => `The value of ${propertyName} parameter that is passed to the ${functionName} method cannot be set to the value ${value}. It must be at least ${minimum}.`,
  /* prettier-ignore */
  error_larger_than_with_index: ({ propertyName, functionName, value, minimum, index }) => `The value of ${propertyName} parameter of item at ${index} that is passed to the ${functionName} method cannot be set to the value ${value}. It must be larger than ${minimum}.`,
  /* prettier-ignore */
  error_less_than: ({ propertyName, functionName, value, maximum }) => `The value of ${propertyName} parameter that is passed to the ${functionName} method cannot be set to the value ${value}. It must be less than ${maximum}.`,
  /* prettier-ignore */
  error_less_than_with_index: ({ propertyName, functionName, value, maximum, index }) => `The value of ${propertyName} parameter of item at index ${index} that is passed to the ${functionName} method cannot be set to the value ${value}. It must be less than ${maximum}.`,
  /* prettier-ignore */
  error_type: ({ propertyName, functionName, value, expectedType }) => `The ${propertyName} parameter that is passed to the ${functionName} method cannot be set to the value ${value}. It must be of type ${expectedType}.`,
  /* prettier-ignore */
  error_type_with_index: ({ propertyName, functionName, value, expectedType, index }) => `The ${propertyName} parameter of item at index ${index} that is passed to the ${functionName} method cannot be set to the value ${value}. It must be of type ${expectedType}.`,
  /* prettier-ignore */
  error_bad_format: ({ propertyName, functionName, value }) => `The value of ${propertyName} parameter that is passed to the ${functionName} method cannot be set to the value ${value}. Bad format`,
  /* prettier-ignore */
  error_effects_input: ({ functionName, wrongEffects, allowedEffects }) => `Passed  effects: "${wrongEffects.join('", "')}" to the ${functionName} method are wrong for this element. Allowed effects are: "${allowedEffects.join('", "')}".`,
  /* prettier-ignore */
  error_slide_input: ({ propertyName, functionName, slideShowId, value, minimum, maximum }) => `The "${propertyName}" parameter that is passed to the "${functionName}" method cannot be set to the value ${value}. It must be a slide from the "${slideShowId}" slideshow or an index between ${minimum} and ${maximum}`,
  /* prettier-ignore */
  error_state_input: ({ propertyName, functionName, stateBoxId, value }) => `The "${propertyName}" parameter that is passed to the "${functionName}" method cannot be set to the value ${value}. It must be a state from the "${stateBoxId}" statebox`,
  /* prettier-ignore */
  error_bad_format_with_index: ({ propertyName, functionName, value, index }) => `The "${propertyName}" property of the item at index ${index} that is passed to the ${functionName} method cannot be set to "${value}". Bad format`,
  /* prettier-ignore */
  error_bad_format_with_hint: ({ propertyName, functionName, wrongValue, hint }) => `The value of ${propertyName} parameter that is passed to the ${functionName} method cannot be set to the value ${wrongValue}. Bad format, must be ${hint} format.`,
  /* prettier-ignore */
  error_object_bad_format: ({ keyName, propertyName, functionName, wrongValue, message }) => `The value of ${keyName} in ${propertyName} parameter that is passed to the ${functionName} method cannot be set to the value ${wrongValue}. ${message}`,
  /* prettier-ignore */
  error_object_bad_format_with_index: ({ keyName, propertyName, index, functionName, wrongValue, message }) => `The value of ${keyName} of item at index ${index} in ${propertyName} parameter that is passed to the ${functionName} method cannot be set to the value ${wrongValue}. ${message}`,
  /* prettier-ignore */
  error_bad_svg_format: ({ propertyName, value }) => `The "${propertyName}" property cannot be set to "${value}". It must be a valid SVG XML string or an SVG source starting with "http://", "https://", or "wix:vector://v1/".`,
  /* prettier-ignore */
  error_target_w_photo: ({ target }) => `The target parameter that is passed to the target method cannot be set to the value ${target}. It must be of type from (_blank,_self).`,
  /* prettier-ignore */
  error_invalid_rel: ({ rel, validKeywords }) => `The rel parameter that is passed to the rel method cannot be set to the value ${rel}. It must be a space-separated list of unique keywords (${validKeywords.join()}).`,
  /* prettier-ignore */
  error_menu_items_target: ({ target, label, index }) => `The target parameter of the item with the label ${label} nested under the item at index ${index} that is passed to the target method cannot be set to the value ${target}. It must be of type from (_blank, _self).`,
  /* prettier-ignore */
  error_menu_items_id_pattern: ({ id, label, index }) => `The id parameter of the item with the label ${label} nested under the item at index ${index} that is passed to the id method cannot be set to the value ${id}. It must consist of letters, numbers, or dashes.`,
  /* prettier-ignore */
  error_menu_items_id_uniqueness: ({ id }) => `The menuItems parameter that is passed to the menuItems method cannot be set to the given value, as the id value ${id} already exists. Each menu item id must be unique.`,
  /* prettier-ignore */
  error_menu_items_depth: ({ labelValue, maxLevels }) => `The menuItems parameter with the label "${labelValue}" that is passed to the menuItems method cannot be nested at this level. Menus can be ${maxLevels} levels deep.`,
  /* prettier-ignore */
  error_menu_items_label: ({ index }) => `The value of the label parameter of the item at index ${index} that is passed to the label cannot be set to the value undefined, null, or an empty string, unless a label can be inferred from the item link's page title.`,
  /* prettier-ignore */
  error_bad_menu_item_format: ({ propertyName, value }) => `The "${propertyName}" property cannot be set to "${value}". It must be a valid URL starting with "http://", "https://", "image://", "wix:image://v1" or "wix:vector://v1/svgshape.v2".`,
  /* prettier-ignore */
  error_bad_menu_item_format_with_index: ({ propertyName, value, index }) => `The "${propertyName}" property of the item at index ${index} cannot be set to "${value}". It must be a valid URL starting with "http://", "https://", "image://", "wix:image://v1" or "wix:vector://v1/svgshape.v2"`,
  /* prettier-ignore */
  error_invalid_css_value: ({ propertyName, compName, cssProperty, exampleFormat, infoLink }) => ` The "${propertyName}" property of "${compName}" was set to an invalid "${cssProperty}" value. The value is expected in the following format:"${exampleFormat}". Read more about "${cssProperty}" values: "${infoLink}"`,
  /* prettier-ignore */
  error_invalid_css_value_multiple_expected_formats: ({ propertyName, compName, cssProperty, exampleFormats, infoLink }) => ` The "${propertyName}" property of "${compName}" was set to an invalid "${cssProperty}" value. The value is expected in one of the following formats:"${exampleFormats}". Read more about "${cssProperty}" values: "${infoLink}"`,
  /* prettier-ignore */
  error_invalid_location: ({ propertyName, index, wrongValue }) => `The ${propertyName} parameter at index ${index} that is passed to the markers function cannot be set to ${wrongValue}. You need to set either location object {longitude, latitude}, or a valid address - placeId.`,
  /* prettier-ignore */
  error_invalid_markers: ({ wrongValue }) => `The markers property cannot be set to ${wrongValue}. You need to set at least one marker in the array.`,
  /* prettier-ignore */
  error_only_getter: ({ propertyName, compType }) => `Cannot set property ${propertyName} of ${compType} which has only a getter.`,
  /* prettier-ignore */
  error_invalid_url: ({ url, type, prefix }) => `The "src" property cannot be set to "${url}". It must be a valid URL starting with "http://", "https://", or a valid ${type} URL starting with ${prefix}.`,
  /* prettier-ignore */
  error_supported_link_type_with_index: ({ functionName, wrongValue, index }) => `The link property of item at index ${index} that is passed to the ${functionName} method cannot be set to the value "${wrongValue}" as this is not a supported link type.`,
  /* prettier-ignore */
  error_invalid_target_with_index: ({ functionName, wrongValue, index }) => `The target parameter of item at index ${index} that is passed to the ${functionName} method cannot be set to the value ${wrongValue}. It must be of type from (_blank,_self).`,
  /* prettier-ignore */
  warning_unsupported_function_for_type: ({ functionName, type }) => `'${functionName}' is not supported for an element of type: ${type}.`,
  /* prettier-ignore */
  error_bad_iana_timezone: ({ timeZoneIANA }) => `Invalid IANA time zone specified: "${timeZoneIANA}"`,
  /* prettier-ignore */
  error_invalid_option_fields: ({ propertyName, wrongValue, fields, index }) => `The ${propertyName} at index ${index} cannot be set to ${JSON.stringify(wrongValue)}. Options must contain at least a non-null ${fields[0]} or a non-null ${fields[1]}.`,
  /* prettier-ignore */
  error_item_external_link: ({ propertyName, functionName, index }) => `The ${propertyName} of the ${functionName} parameter of item at index ${index} that is passed to the items method cannot be an external link. It must be a link to a page on your site.`,
  /* prettier-ignore */
  error_unsupported_property_with_hint: ({ propertyName, hint }) => `The ${propertyName} parameter cannot be set when ${hint}`,
  /* prettier-ignore */
  error_item_not_found: ({ propertyName, functionName, value }) => `The ${propertyName} parameter with value ${value} that is passed to the ${functionName} method is not found.`,
  /* prettier-ignore */
  error_array_length: ({ propertyName, functionName, value, arrayLength }) => `The value of ${propertyName} parameter that is passed to the ${functionName} method cannot be set to the value ${value}. Its length must be at least ${arrayLength}.`,
  /* prettier-ignore */
  error_unsupported_chars: ({ propertyName, functionName }) => `The ${propertyName} parameter that is passed to the ${functionName} method contains invalid characters.`,
  /* prettier-ignore */
  error_values_not_unique: ({ propertyName, functionName, wrongValue }) => `The ${propertyName} parameter that is passed to the ${functionName} method cannot be set to ${JSON.stringify(wrongValue)}. Options must contain unique value properties.`,
  /* prettier-ignore */
  error_invalid_indice_value: ({ propertyName, invalidValue }) => `The ${propertyName} parameter cannot be set to ${JSON.stringify(invalidValue)}. Ensure that the options array contains at least one option before applying ${propertyName}.`,
  /* prettier-ignore */
  error_none_value_unavailable: ({ propertyName, functionName, value }) => `The ${propertyName} parameter that is passed to the ${functionName} method cannot be set to ${value} value. Add none item to the ${functionName} list, or set ${propertyName} to existing value`,
  /* prettier-ignore */
  warning_item_value_not_found: ({ propertyName, functionName, value }) => `The ${propertyName} parameter with value ${value} that is passed to the ${functionName} method is not found.`,
  /* prettier-ignore */
  error_bad_link_format: ({ url, propertyName }) => `The ${propertyName} property that is passed to the ${propertyName} method cannot be set to the value "${url}" as this is not a supported link type.`,
  /* prettier-ignore */
  warning_icon_not_animated: ({ propertyName }) => `The animated icon is not set in the settings panel, so the ${propertyName} method will not have any effect.`
};

const nilAssignmentMessage = ({ compName, functionName, propertyName, index }) => {
  if (isNumber(index)) {
    return templates.warning_not_null_with_index({
      propertyName,
      functionName,
      index
    });
  }
  if (compName) {
    return templates.warning_not_null_for_comp_name({
      compName,
      functionName,
      propertyName
    });
  }
  return templates.warning_not_null({ functionName, propertyName });
};
const missingFieldMessage = ({
  functionName,
  propertyName,
  index
}) => {
  return isNumber(index) ? templates.error_mandatory_val_with_index({
    functionName,
    propertyName,
    index
  }) : templates.error_mandatory_val({ functionName, propertyName });
};
const unknownFieldMessage = ({ functionName, propertyNames, index }) => {
  if (propertyNames && propertyNames.length > 1) {
    return isNumber(index) ? templates.error_unknown_multiple_vals_with_index({
      functionName,
      propertyNames,
      index
    }) : templates.error_unknown_multiple_vals({ functionName, propertyNames });
  }
  return isNumber(index) ? templates.error_unknown_val_with_index({
    functionName,
    propertyName: propertyNames[0],
    index
  }) : templates.error_unknown_val({
    functionName,
    propertyName: propertyNames[0]
  });
};
const invalidStringLengthMessage = ({ functionName, propertyName, value, maximum, minimum, index }) => {
  if (minimum && maximum) {
    if (minimum === maximum) {
      return isNumber(index) ? templates.error_length_accept_single_value_with_index({
        functionName,
        propertyName,
        value,
        expectedValue: minimum,
        index
      }) : templates.error_length_accept_single_value({
        functionName,
        propertyName,
        value,
        expectedValue: minimum
      });
    }
    return isNumber(index) ? templates.error_length_in_range_with_index({
      functionName,
      propertyName,
      value,
      maximum,
      minimum,
      index
    }) : templates.error_length_in_range({
      functionName,
      propertyName,
      value,
      maximum,
      minimum
    });
  }
  if (!minimum && maximum) {
    return isNumber(index) ? templates.error_length_exceeds_with_index({
      functionName,
      propertyName,
      value,
      maximum,
      index
    }) : templates.error_length_exceeds({
      functionName,
      propertyName,
      value,
      maximum
    });
  }
  return isNumber(index) ? templates.error_length_less_than_with_index({
    functionName,
    propertyName,
    value,
    minimum,
    index
  }) : templates.error_length_less_than({
    functionName,
    propertyName,
    value,
    minimum
  });
};
const invalidNumberBoundsMessage = ({ functionName, propertyName, value, minimum, maximum, index }) => {
  if (minimum && maximum) {
    if (minimum === maximum) {
      return isNumber(index) ? templates.error_accept_single_value_with_index({
        functionName,
        propertyName,
        expectedValue: minimum,
        value,
        index
      }) : templates.error_accept_single_value({
        functionName,
        propertyName,
        expectedValue: minimum,
        value
      });
    }
    return isNumber(index) ? templates.error_range_with_index({
      functionName,
      propertyName,
      value,
      maximum,
      minimum,
      index
    }) : templates.error_range({
      functionName,
      propertyName,
      value,
      maximum,
      minimum
    });
  }
  if (!minimum && maximum) {
    return isNumber(index) ? templates.error_less_than_with_index({
      functionName,
      propertyName,
      maximum,
      value,
      index
    }) : templates.error_less_than({
      functionName,
      propertyName,
      maximum,
      value
    });
  }
  return isNumber(index) ? templates.error_larger_than_with_index({
    functionName,
    propertyName,
    value,
    minimum,
    index
  }) : templates.error_larger_than({
    functionName,
    propertyName,
    value,
    // TS should know that minimum can't be undefined here
    minimum
  });
};
const invalidTypeMessage = ({ functionName, propertyName, types, value, index }) => {
  const expectedType = types.map((type) => type === "nil" ? "null" : type).join(",");
  return isNumber(index) ? templates.error_type_with_index({
    functionName,
    index,
    propertyName,
    value,
    expectedType
  }) : templates.error_type({
    functionName,
    propertyName,
    value,
    expectedType
  });
};
const invalidEnumValueMessage = ({ functionName, propertyName, value, enum: enumArray, index }) => {
  const expectedType = `from (${enumArray.join(",")})`;
  return isNumber(index) ? templates.error_type_with_index({
    functionName,
    propertyName,
    value,
    expectedType,
    index
  }) : templates.error_type({
    functionName,
    propertyName,
    value,
    expectedType
  });
};
const patternMismatchMessage = ({
  functionName,
  propertyName,
  value,
  index
}) => {
  return isNumber(index) ? templates.error_bad_format_with_index({
    functionName,
    propertyName,
    value,
    index
  }) : templates.error_bad_format({ functionName, propertyName, value });
};

const WIX_SDK_ERROR_TEXT = "Wix code SDK error:";
const WIX_SDK_WARNING_TEXT = "Wix code SDK warning:";
const reportError = (message) => {
  console.error(`${WIX_SDK_ERROR_TEXT} ${message}`);
};
const reportWarning = (message) => {
  console.warn(`${WIX_SDK_WARNING_TEXT} ${message}`);
};

function validateNumber(value, schema, reportError, messageParams) {
  const { minimum, maximum, enum: enumArray } = schema;
  if (!isNumber(value)) {
    return ValidationResult.InvalidType;
  }
  if (enumArray && !isIn(value, enumArray)) {
    reportError(
      invalidEnumValueMessage({
        value,
        enum: enumArray,
        ...messageParams
      }),
      { ...messageParams, value }
    );
    return ValidationResult.Invalid;
  }
  if (isNumber(minimum) && isBelow(value, minimum) || isNumber(maximum) && isAbove(value, maximum)) {
    reportError(
      invalidNumberBoundsMessage({
        value,
        minimum,
        // either minimum or maximum are numbers here
        maximum,
        ...messageParams
      }),
      { ...messageParams, value }
    );
    return ValidationResult.Invalid;
  }
  return ValidationResult.Valid;
}

function validateInteger(value, schema, reportError, messageParams) {
  const { minimum, maximum, enum: enumArray } = schema;
  if (!isInteger(value)) {
    return ValidationResult.InvalidType;
  }
  if (enumArray && !isIn(value, enumArray)) {
    reportError(
      invalidEnumValueMessage({
        value,
        enum: enumArray,
        ...messageParams
      }),
      { ...messageParams, value }
    );
    return ValidationResult.Invalid;
  }
  if (isNumber(minimum) && isBelow(value, minimum) || isNumber(maximum) && isAbove(value, maximum)) {
    reportError(
      invalidNumberBoundsMessage({
        value,
        minimum,
        // minimum / maximum has to be of number type
        maximum,
        ...messageParams
      }),
      { ...messageParams, value }
    );
    return ValidationResult.Invalid;
  }
  return ValidationResult.Valid;
}

function validateString(value, schema, reportError, messageParams) {
  const { minLength, maxLength, enum: enumArray, pattern } = schema;
  if (!isString(value)) {
    return ValidationResult.InvalidType;
  }
  if (enumArray && !isIn(value, enumArray)) {
    reportError(
      invalidEnumValueMessage({
        value,
        enum: enumArray,
        ...messageParams
      }),
      { ...messageParams, value }
    );
    return ValidationResult.Invalid;
  }
  if (minLength && isBelow(value.length, minLength) || maxLength && isAbove(value.length, maxLength)) {
    reportError(
      invalidStringLengthMessage({
        value,
        minimum: minLength,
        // minimum / maximum has to be of type number,
        maximum: maxLength,
        ...messageParams
      }),
      { ...messageParams, value }
    );
    return ValidationResult.Invalid;
  }
  if (pattern && !new RegExp(pattern).test(value)) {
    reportError(
      patternMismatchMessage({
        value,
        ...messageParams
      }),
      { ...messageParams, value }
    );
    return ValidationResult.Invalid;
  }
  return ValidationResult.Valid;
}

function validateBoolean(value) {
  if (!isBoolean(value)) {
    return ValidationResult.InvalidType;
  }
  return ValidationResult.Valid;
}

function validateDate(value) {
  if (!isDate(value)) {
    return ValidationResult.InvalidType;
  }
  return ValidationResult.Valid;
}

function validateNil(value) {
  if (!isNil(value)) {
    return ValidationResult.InvalidType;
  }
  return ValidationResult.Valid;
}

function validateFunction(value) {
  if (!isFunction(value)) {
    return ValidationResult.InvalidType;
  }
  return ValidationResult.Valid;
}

function isTupleSchema(schema) {
  return Array.isArray(schema);
}
function validateArray(value, schema, validateSchema, reportError, messageParams, suppressIndexError = false) {
  if (!isArray(value)) {
    return ValidationResult.InvalidType;
  }
  let isValid = ValidationResult.Valid;
  if (schema.items) {
    const itemsToValidateCount = isTupleSchema(schema.items) ? Math.min(value.length, schema.items.length) : value.length;
    for (let itemIndex = 0; itemIndex < itemsToValidateCount; itemIndex++) {
      const item = value[itemIndex];
      let itemSchema;
      let propName;
      if (isTupleSchema(schema.items)) {
        itemSchema = schema.items[itemIndex];
        propName = schema.items[itemIndex].name;
      } else {
        itemSchema = schema.items;
        propName = schema.name;
      }
      const isItemValid = validateSchema(item, itemSchema, {
        functionName: messageParams.functionName,
        propertyName: propName || messageParams.propertyName,
        index: !suppressIndexError ? itemIndex : void 0
      });
      if (!isItemValid) {
        isValid = ValidationResult.Invalid;
      }
    }
  }
  return isValid;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
const getOwnPropertyNames = Object.getOwnPropertyNames;
const noop = () => {
};
function validateObject(value, schema, validateSchema, reportError, reportWarning, messageParams) {
  if (!isObject(value)) {
    return ValidationResult.InvalidType;
  }
  if (schema.oneOf) {
    return schema.oneOf.map(
      (variant) => validateObject(
        value,
        variant,
        validateSchema,
        noop,
        reportWarning,
        messageParams
      )
    ).filter((validity) => validity === ValidationResult.Valid).length === 1 ? ValidationResult.Valid : ValidationResult.Invalid;
  }
  if (schema.required) {
    for (let propNameIdx = 0; propNameIdx < schema.required.length; propNameIdx++) {
      if (!hasOwnProperty.call(value, schema.required[propNameIdx])) {
        reportError(
          missingFieldMessage({
            functionName: messageParams.functionName,
            index: messageParams.index,
            propertyName: schema.required[propNameIdx]
          }),
          { ...messageParams, value }
        );
        return ValidationResult.Invalid;
      }
    }
  }
  const propNames = getOwnPropertyNames(schema.properties ?? {});
  if (schema.additionalProperties === false) {
    const invalidPropertyNames = getOwnPropertyNames(value).filter(
      (key) => !propNames.includes(key)
    );
    if (invalidPropertyNames.length) {
      const message = unknownFieldMessage({
        functionName: messageParams.functionName,
        index: messageParams.index,
        propertyNames: invalidPropertyNames
      });
      reportError(message);
      return ValidationResult.Invalid;
    }
  }
  for (let propNameIdx = 0; propNameIdx < propNames.length; propNameIdx++) {
    const propName = propNames[propNameIdx];
    if (hasOwnProperty.call(value, propName)) {
      const propSchema = schema.properties[propName];
      const propValue = value[propName];
      if (!validateSchema(propValue, propSchema, {
        functionName: messageParams.functionName,
        index: messageParams.index,
        propertyName: propName
      })) {
        return ValidationResult.Invalid;
      }
    }
  }
  return ValidationResult.Valid;
}

const ValidationResult = {
  Valid: "valid",
  Invalid: "invalid",
  InvalidType: "invalid-type"
};
function createSchemaValidator({ reportError, reportWarning }, compName, { suppressIndexErrors = false } = {}) {
  function validate(value, schema, setterName) {
    return validateSchema(value, schema, {
      functionName: setterName,
      propertyName: setterName,
      /**
       * This intentional? In such a case all errors related to "index"
       * will never be fired
       */
      index: void 0
    });
  }
  function validateSchema(value, schema, params) {
    if (schema.warnIfNil && isNil(value)) {
      reportWarning(
        nilAssignmentMessage({
          ...params,
          compName
        }),
        { ...params, value }
      );
    }
    let typeIdx = 0;
    for (; typeIdx < schema.type.length; typeIdx++) {
      const validateSchemaForType = validatorsMap[schema.type[typeIdx]];
      const validationResult = validateSchemaForType(
        value,
        schema,
        params
      );
      if (validationResult !== ValidationResult.InvalidType) {
        return validationResult === ValidationResult.Valid;
      }
    }
    if (typeIdx === schema.type.length) {
      reportError(
        invalidTypeMessage({
          value,
          types: schema.type,
          ...params
        }),
        { ...params, value }
      );
    }
    return false;
  }
  const validatorsMap = {
    object: (value, schema, messageParams) => {
      return validateObject(
        value,
        schema,
        validateSchema,
        reportError,
        reportWarning,
        messageParams
      );
    },
    array: (value, schema, messageParams) => {
      return validateArray(
        value,
        schema,
        validateSchema,
        reportError,
        messageParams,
        suppressIndexErrors
      );
    },
    number: (value, schema, messageParams) => {
      return validateNumber(
        value,
        schema,
        reportError,
        messageParams
      );
    },
    integer: (value, schema, messageParams) => {
      return validateInteger(
        value,
        schema,
        reportError,
        messageParams
      );
    },
    string: (value, schema, messageParams) => {
      return validateString(
        value,
        schema,
        reportError,
        messageParams
      );
    },
    boolean: (value) => {
      return validateBoolean(value);
    },
    date: (value) => {
      return validateDate(value);
    },
    nil: (value) => {
      return validateNil(value);
    },
    function: (value) => {
      return validateFunction(value);
    }
  };
  return validate;
}

function createCompSchemaValidator(compName, { suppressIndexErrors = false } = {}) {
  return createSchemaValidator({ reportError, reportWarning }, compName, {
    suppressIndexErrors
  });
}

const ACTION_TYPES = {
  CLICK: "click",
  DBL_CLICK: "dblClick",
  MOUSE_IN: "mouseenter",
  MOUSE_OUT: "mouseleave",
  CHANGE: "change",
  BLUR: "blur",
  FOCUS: "focus",
  IMAGE_CHANGED: "imageChanged",
  IMAGE_EXPANDED: "imageExpanded",
  ON_INPUT: "onInput",
  ITEM_CLICKED: "itemClicked",
  CELL_SELECT: "cellSelect",
  CELL_EDIT: "cellEdit",
  ROW_SELECT: "rowSelect",
  FETCH_DATA: "fetchData",
  DATA_CHANGE: "dataChange",
  ON_TIMEOUT: "onTimeout",
  ON_VERIFY: "onVerified",
  ON_ERROR: "onError",
  ON_PLAY: "onPlay",
  ON_PAUSE: "onPause",
  ON_PROGRESS: "onProgress",
  ON_ENDED: "onEnded",
  AUTOPLAY_OFF: "autoplayOff",
  AUTOPLAY_ON: "autoplayOn",
  PLAY_ENDED: "playEnded",
  PLAY_PROGRESS: "playProgress",
  KEY_PRESS: "keyPress",
  KEY_UP: "keyUp",
  KEY_DOWN: "keyDown",
  SCREEN_IN: "screenIn",
  VIEWPORT_ENTER: "viewportEnter",
  VIEWPORT_LEAVE: "viewportLeave",
  SCROLL: "scroll",
  VALIDATE: "validate",
  SET_CUSTOM_VALIDITY: "setCustomValidity",
  SYNC_VALIDATION_DATA: "syncValidationData",
  UPDATE_VALIDITY_INDICATION: "updateValidityIndication",
  MESSAGE: "message",
  UPLOAD_COMPLETE: "uploadComplete",
  ITEM_READY: "itemReady",
  ITEM_REMOVED: "itemRemoved",
  TAG_CLICK: "tagClick",
  QUICK_ACTION_BAR_ITEM_CLICKED: "quickActionBarItemClicked",
  GOOGLE_MAP_MARKER_CLICKED: "markerClicked",
  GOOGLE_MAP_CLICKED: "mapClicked",
  ICON_MOUSE_IN: "iconMouseIn",
  ON_STATE_CHANGE: "onStateChange",
  ITEM_MOUSE_IN: "itemMouseIn",
  ITEM_MOUSE_OUT: "itemMouseOut",
  ITEM_MOUSE_CLICK: "itemMouseClick",
  ITEM_MOUSE_DOUBLE_CLICK: "itemMouseDblClick",
  ON_COLOR_CHANGE: "onColorChange",
  ON_FONT_CHANGE: "onFontChange",
  ON_OPACITY_CHANGE: "onOpacityChange"
};
const EVENT_TYPES_MAP = {
  [ACTION_TYPES.CLICK]: "onClick",
  [ACTION_TYPES.DBL_CLICK]: "onDblClick",
  [ACTION_TYPES.MOUSE_IN]: "onMouseIn",
  [ACTION_TYPES.MOUSE_OUT]: "onMouseOut",
  [ACTION_TYPES.CHANGE]: "onChange",
  [ACTION_TYPES.ON_INPUT]: "onInput",
  [ACTION_TYPES.BLUR]: "onBlur",
  [ACTION_TYPES.FOCUS]: "onFocus",
  [ACTION_TYPES.IMAGE_CHANGED]: "onCurrentItemChanged",
  [ACTION_TYPES.IMAGE_EXPANDED]: void 0,
  [ACTION_TYPES.ITEM_CLICKED]: "onItemClicked",
  [ACTION_TYPES.CELL_SELECT]: "onCellSelect",
  [ACTION_TYPES.CELL_EDIT]: void 0,
  [ACTION_TYPES.ROW_SELECT]: "onRowSelect",
  [ACTION_TYPES.FETCH_DATA]: void 0,
  [ACTION_TYPES.DATA_CHANGE]: "onDataChange",
  [ACTION_TYPES.ON_TIMEOUT]: "onTimeout",
  [ACTION_TYPES.ON_VERIFY]: "onVerified",
  [ACTION_TYPES.ON_ERROR]: "onError",
  [ACTION_TYPES.ON_PLAY]: "onPlay",
  [ACTION_TYPES.ON_PAUSE]: "onPause",
  [ACTION_TYPES.ON_PROGRESS]: "onProgress",
  [ACTION_TYPES.ON_ENDED]: "onEnded",
  [ACTION_TYPES.AUTOPLAY_OFF]: "onPause",
  [ACTION_TYPES.AUTOPLAY_ON]: "onPlay",
  [ACTION_TYPES.PLAY_ENDED]: void 0,
  [ACTION_TYPES.PLAY_PROGRESS]: void 0,
  [ACTION_TYPES.KEY_PRESS]: "onKeyPress",
  [ACTION_TYPES.KEY_UP]: "onKeyUp",
  [ACTION_TYPES.KEY_DOWN]: "onKeyDown",
  [ACTION_TYPES.SCREEN_IN]: void 0,
  [ACTION_TYPES.VIEWPORT_ENTER]: "onViewportEnter",
  [ACTION_TYPES.VIEWPORT_LEAVE]: "onViewportLeave",
  [ACTION_TYPES.SCROLL]: void 0,
  [ACTION_TYPES.VALIDATE]: void 0,
  [ACTION_TYPES.SET_CUSTOM_VALIDITY]: void 0,
  [ACTION_TYPES.SYNC_VALIDATION_DATA]: void 0,
  [ACTION_TYPES.UPDATE_VALIDITY_INDICATION]: void 0,
  [ACTION_TYPES.MESSAGE]: "onMessage",
  [ACTION_TYPES.UPLOAD_COMPLETE]: void 0,
  [ACTION_TYPES.ITEM_READY]: "onItemReady",
  [ACTION_TYPES.ITEM_REMOVED]: "onItemRemoved",
  [ACTION_TYPES.TAG_CLICK]: void 0,
  [ACTION_TYPES.QUICK_ACTION_BAR_ITEM_CLICKED]: "onItemClicked",
  [ACTION_TYPES.GOOGLE_MAP_MARKER_CLICKED]: "onMarkerClicked",
  [ACTION_TYPES.GOOGLE_MAP_CLICKED]: "onMapClicked",
  [ACTION_TYPES.ICON_MOUSE_IN]: void 0,
  [ACTION_TYPES.ON_STATE_CHANGE]: "onStateChange",
  [ACTION_TYPES.ITEM_MOUSE_IN]: "onItemMouseIn",
  [ACTION_TYPES.ITEM_MOUSE_OUT]: "onItemMouseOut",
  [ACTION_TYPES.ITEM_MOUSE_CLICK]: "onItemClick",
  [ACTION_TYPES.ITEM_MOUSE_DOUBLE_CLICK]: "onItemDblClick",
  [ACTION_TYPES.ON_COLOR_CHANGE]: "onColorChange",
  [ACTION_TYPES.ON_FONT_CHANGE]: "onFontChange",
  [ACTION_TYPES.ON_OPACITY_CHANGE]: "onOpacityChange"
};

const reactToCorvidEventType = {
  dblclick: "dblClick",
  keydown: "keyPress",
  input: "onInput"
};
const convertToCorvidEventBase = (event) => {
  const { target, type, context } = event;
  return { target, type: reactToCorvidEventType[type] ?? type, context };
};
const convertToCorvidMouseEvent = (event) => {
  const { clientX, clientY, pageX, pageY, screenX, screenY, nativeEvent } = event;
  const { offsetX, offsetY } = nativeEvent;
  return {
    clientX,
    clientY,
    pageX,
    pageY,
    screenX,
    screenY,
    offsetX,
    offsetY
  };
};
const functionValidator = (value, eventName, role) => {
  return createCompSchemaValidator(role)(
    value,
    {
      type: ["function"]
    },
    eventName
  );
};
const eventNameMapToMethodName = {
  onMouseEnter: "onMouseIn",
  onMouseLeave: "onMouseOut"
};
const removeOnPrefix = (st) => st.replace(/^on/i, "");
const mapMethodNameToEventName = (methodName) => {
  const mapEntry = Object.entries(eventNameMapToMethodName).find(
    ([_, value]) => removeOnPrefix(value.toLowerCase()) === removeOnPrefix(methodName.toLowerCase())
  );
  return mapEntry?.[0] ?? methodName;
};
const createEventListenerState = (api) => {
  return api.createSdkState(
    { listeners: [] },
    "eventListeners"
  );
};
const registerCorvidEvent = (eventName, api, cb, projection) => {
  const { create$w, createEvent, registerEvent, getSdkInstance, metaData } = api;
  const setterName = eventNameMapToMethodName[eventName] ?? eventName;
  if (!functionValidator(cb, setterName, metaData.role)) {
    return getSdkInstance();
  }
  const [eventListenerState, setEventListenerState] = createEventListenerState(api);
  const unregisterEvent = registerEvent(
    eventName,
    /**
     * `eventPayload` adds extra data into native React events
     * which will be sanitized by the platform
     */
    (event, eventPayload) => {
      const baseEvent = createEvent({ type: event.type, compId: event.compId });
      const $w = create$w({ context: baseEvent.context });
      const projectionEvent = projection?.({
        componentEvent: event,
        eventPayload
      });
      cb(
        {
          ...convertToCorvidEventBase(baseEvent),
          ...projectionEvent
        },
        $w
      );
    }
  );
  const listener = {
    eventName,
    compId: metaData.compId,
    cb,
    unregister: unregisterEvent
  };
  setEventListenerState({
    listeners: [...eventListenerState.listeners, listener]
  });
  return getSdkInstance();
};
const isEventNameMatches = (eventName, userRequestedEventNameOrActionType) => {
  const targetEventName = mapMethodNameToEventName(
    EVENT_TYPES_MAP[userRequestedEventNameOrActionType] ?? userRequestedEventNameOrActionType
  );
  return eventName.toLowerCase() === targetEventName.toLowerCase();
};
const unregisterCorvidEvent = (eventNameOrActionType, api, cb) => {
  const { metaData, getSdkInstance } = api;
  const [eventListenerState, setEventListenerState] = createEventListenerState(api);
  const eventListeners = eventListenerState.listeners.filter(
    (listener) => isEventNameMatches(listener.eventName, eventNameOrActionType) && listener.cb === cb && listener.compId === metaData.compId
  );
  for (const listener of eventListeners) {
    listener.unregister();
  }
  setEventListenerState({
    listeners: eventListenerState.listeners.filter(
      (listener) => !eventListeners.includes(listener)
    )
  });
  return getSdkInstance();
};
const registerCorvidMouseEvent = (eventName, api, cb, payloadProjection) => registerCorvidEvent(eventName, api, cb, ({ componentEvent, eventPayload }) => ({
  ...convertToCorvidMouseEvent(componentEvent),
  ...eventPayload && payloadProjection?.(eventPayload)
}));

const modifySourceKey = (key) => {
  return "aria" + key.charAt(0).toUpperCase() + key.slice(1);
};
function composeSDKFactories(sources, options) {
  const { modifyAriaSourceKeys } = {};
  return (api) => {
    const target = {};
    for (let sourceIdx = 0; sourceIdx < sources.length; sourceIdx++) {
      const source = sources[sourceIdx](api);
      const sourceKeys = Object.keys(source);
      for (let sourceKeyIdx = 0; sourceKeyIdx < sourceKeys.length; sourceKeyIdx++) {
        const sourceKey = sourceKeys[sourceKeyIdx];
        const sourceProp = Object.getOwnPropertyDescriptor(
          source,
          sourceKey
        );
        Object.defineProperty(
          target,
          modifyAriaSourceKeys && sourceProp.get ? modifySourceKey(sourceKey) : sourceKey,
          sourceProp
        );
      }
    }
    return target;
  };
}

const basePropsSDKFactory = ({
  handlers,
  metaData
}) => {
  const { compId, connection, compType, isGlobal, getParent, role, wixCodeId } = metaData;
  const type = `$w.${compType}`;
  return {
    get id() {
      return wixCodeId || role;
    },
    get role() {
      return role;
    },
    get connectionConfig() {
      return connection?.config;
    },
    get uniqueId() {
      return compId;
    },
    get parent() {
      return getParent();
    },
    get global() {
      return isGlobal();
    },
    get type() {
      return type;
    },
    scrollTo() {
      return new Promise(
        (resolve) => handlers.scrollToComponent(compId, resolve)
      );
    },
    toJSON() {
      return { id: role, type, global: isGlobal() };
    }
  };
};

const createViewportPropsSDKFactory = (registerCallback) => {
  return (api) => {
    const { metaData, getSdkInstance, create$w, createEvent } = api;
    const functionValidator = (value, setterName) => createCompSchemaValidator(metaData.role)(
      value,
      {
        type: ["function"]
      },
      setterName
    );
    return {
      onViewportEnter: (cb) => {
        if (!functionValidator(cb, "onViewportEnter")) {
          return getSdkInstance();
        }
        registerCallback?.("onViewportEnter", () => {
          const corvidEvent = createEvent({ type: "viewportEnter" });
          const $w = create$w();
          cb(corvidEvent, $w);
        });
        return registerCorvidEvent("onViewportEnter", api, cb);
      },
      onViewportLeave: (cb) => {
        if (!functionValidator(cb, "onViewportLeave")) {
          return getSdkInstance();
        }
        registerCallback?.("onViewportLeave", () => {
          const corvidEvent = createEvent({ type: "viewportLeave" });
          const $w = create$w();
          cb(corvidEvent, $w);
        });
        return registerCorvidEvent("onViewportLeave", api, cb);
      }
    };
  };
};

const sharedEffectDefaultOptions = {
  duration: 1200,
  delay: 0
};
const effectDefaultOptions = {
  arc: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  bounce: {
    ...sharedEffectDefaultOptions,
    direction: "topLeft",
    intensity: "medium"
  },
  puff: {
    ...sharedEffectDefaultOptions
  },
  zoom: {
    ...sharedEffectDefaultOptions
  },
  fade: {
    ...sharedEffectDefaultOptions
  },
  flip: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  float: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  fly: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  fold: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  glide: {
    ...sharedEffectDefaultOptions,
    angle: 0,
    distance: 0
  },
  roll: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  slide: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  spin: {
    ...sharedEffectDefaultOptions,
    direction: "cw",
    cycles: 5
  },
  turn: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  ArcIn: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  ArcOut: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  BounceIn: {
    ...sharedEffectDefaultOptions,
    direction: "topLeft",
    intensity: "medium"
  },
  BounceOut: {
    ...sharedEffectDefaultOptions,
    direction: "topLeft",
    intensity: "medium"
  },
  ExpandIn: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  CollapseOut: {
    ...sharedEffectDefaultOptions
  },
  Conceal: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  Reveal: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  FadeIn: {
    ...sharedEffectDefaultOptions
  },
  FadeOut: {
    ...sharedEffectDefaultOptions
  },
  FlipIn: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  FlipOut: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  FloatIn: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  FloatOut: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  FlyIn: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  FlyOut: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  FoldIn: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  FoldOut: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  GlideIn: {
    ...sharedEffectDefaultOptions,
    angle: 0,
    distance: 150
  },
  GlideOut: {
    ...sharedEffectDefaultOptions,
    angle: 0,
    distance: 150
  },
  DropIn: {
    ...sharedEffectDefaultOptions
  },
  PopOut: {
    ...sharedEffectDefaultOptions
  },
  SlideIn: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  SlideOut: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  SpinIn: {
    ...sharedEffectDefaultOptions,
    direction: "cw",
    cycles: 2
  },
  SpinOut: {
    ...sharedEffectDefaultOptions,
    direction: "cw",
    cycles: 2
  },
  TurnIn: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  TurnOut: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  }
};
const EFFECTS = {
  HIDE: {
    suffix: "out",
    deprecatedValues: [
      "ArcOut",
      "BounceOut",
      "CollapseOut",
      "Conceal",
      "FadeOut",
      "FlipOut",
      "FloatOut",
      "FlyOut",
      "FoldOut",
      "GlideOut",
      "PopOut",
      "SlideOut",
      "SpinOut",
      "TurnOut"
    ]
  },
  SHOW: {
    suffix: "in",
    deprecatedValues: [
      "ArcIn",
      "BounceIn",
      "DropIn",
      "ExpandIn",
      "FadeIn",
      "FlipIn",
      "FloatIn",
      "FlyIn",
      "FoldIn",
      "GlideIn",
      "Reveal",
      "SlideIn",
      "SpinIn",
      "TurnIn"
    ]
  }
};
const effectInfoLink = (propertyName) => `https://www.wix.com/corvid/reference/$w/hiddenmixin/${propertyName}`;

const duration = { type: ["number", "nil"], minimum: 0, maximum: 4e3 };
const delay = { type: ["number", "nil"], minimum: 0, maximum: 8e3 };
const direction = {
  type: ["string", "nil"],
  enum: ["left", "right", "top", "bottom"]
};
const effectsValidationSchema = {
  arc: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction: {
        type: ["string", "nil"],
        enum: ["left", "right"]
      }
    }
  },
  bounce: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction: {
        type: ["string", "nil"],
        enum: ["topLeft", "topRight", "bottomRight", "bottomLeft", "center"]
      },
      intensity: {
        type: ["string", "nil"],
        enum: ["soft", "medium", "hard"]
      }
    }
  },
  puff: {
    type: ["object"],
    properties: {
      duration,
      delay
    }
  },
  zoom: {
    type: ["object"],
    properties: {
      duration,
      delay
    }
  },
  fade: {
    type: ["object"],
    properties: {
      duration,
      delay
    }
  },
  flip: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction
    }
  },
  float: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction
    }
  },
  fly: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction
    }
  },
  fold: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction
    }
  },
  glide: {
    type: ["object"],
    properties: {
      duration,
      delay,
      angle: {
        type: ["number", "nil"],
        minimum: 0,
        maximum: 360
      },
      distance: {
        type: ["number", "nil"],
        minimum: 0,
        maximum: 300
      }
    }
  },
  roll: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction
    }
  },
  slide: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction
    }
  },
  spin: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction: {
        type: ["string", "nil"],
        enum: ["cw", "ccw"]
      },
      cycles: {
        type: ["number", "nil"],
        minimum: 1,
        maximum: 15
      }
    }
  },
  turn: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction: {
        type: ["string", "nil"],
        enum: ["right", "left"]
      }
    }
  }
};

const createInvalidOptionsTypeWarningReporter = ({
  effectName,
  propertyName,
  compName
}) => {
  return (message, messageParams) => {
    reportWarning(
      templates.warning_invalid_type_effect_options({
        propertyName,
        compName,
        effectName,
        wrongValue: `${messageParams?.value}`,
        infoLink: effectInfoLink(propertyName)
      })
    );
  };
};
const createWrongOptionsWarningReporter = ({
  effectName,
  propertyName,
  compName
}) => {
  return (message, messageParams) => {
    reportWarning(
      templates.warning_invalid_effect_options({
        propertyName,
        compName,
        effectName,
        wrongProperty: "value",
        wrongValue: `the key "${messageParams?.propertyName}" cannot be set to the value "${messageParams?.value}"`,
        infoLink: effectInfoLink(propertyName)
      })
    );
  };
};
const createEffectOptionsValidation = ({
  propertyName,
  compName
}) => {
  return (effectName, effectOptions) => {
    if (!effectName) {
      return false;
    }
    if (effectOptions === void 0) {
      return true;
    }
    const invalidOptionTypeReporter = createInvalidOptionsTypeWarningReporter({
      effectName,
      propertyName,
      compName
    });
    const isEffectOptionsTypeValid = () => createSchemaValidator(
      {
        reportError: invalidOptionTypeReporter,
        reportWarning: () => ({})
      },
      compName
    )(effectOptions, { type: ["object"] }, propertyName);
    if (!isEffectOptionsTypeValid()) {
      return false;
    }
    const invalidEffectOptionsReporter = createWrongOptionsWarningReporter({
      effectName,
      propertyName,
      compName
    });
    const isEffectOptionsValid = () => createSchemaValidator(
      {
        reportError: invalidEffectOptionsReporter,
        reportWarning: () => ({})
      },
      compName
    )(effectOptions, effectsValidationSchema[effectName], propertyName);
    if (!isEffectOptionsValid()) {
      return false;
    }
    return true;
  };
};

const isEmpty = (value) => {
  return Object.keys(value).length === 0;
};
const createEffectValidation = ({ compName }) => {
  return ({
    effectName,
    effectOptions,
    propertyName
  }) => {
    const validateEffectOption = createEffectOptionsValidation({
      propertyName,
      compName
    });
    if (!effectName && !effectOptions) {
      return false;
    }
    if (!effectName && effectOptions && !isEmpty(effectOptions)) {
      reportWarning(
        templates.warning_effect_options_not_set({
          propertyName,
          compName,
          infoLink: effectInfoLink(propertyName)
        })
      );
      return false;
    }
    const PROPERTY = propertyName === "hide" ? "HIDE" : "SHOW";
    const deprecatedValues = EFFECTS[PROPERTY]?.deprecatedValues;
    if (effectName && effectOptions && deprecatedValues && deprecatedValues.find((effect) => effect === effectName) && !isEmpty(effectOptions)) {
      reportWarning(
        templates.warning_deprecated_effect_with_options({
          compName,
          effectName,
          propertyName,
          infoLink: effectInfoLink(propertyName)
        })
      );
      return false;
    }
    if (deprecatedValues.find((effect) => effect === effectName)) {
      return true;
    }
    if (effectName && !(effectName in effectsValidationSchema)) {
      reportWarning(
        templates.warning_invalid_effect_name({
          propertyName,
          compName,
          effectName,
          infoLink: effectInfoLink(propertyName)
        })
      );
      return false;
    }
    if (!validateEffectOption(effectName, effectOptions)) {
      return false;
    }
    return true;
  };
};

const isValidClassName = (className, functionName) => {
  const classNameRegex = /^[a-zA-Z_-][a-zA-Z0-9_-]*$/;
  if (typeof className !== "string") {
    handleTypeError(className, functionName, "className", "string");
    return false;
  } else if (!classNameRegex.test(className)) {
    handleUnsupportedChars(className, functionName);
    return false;
  }
  return true;
};
const handleTypeError = (propertyName, functionName, value, expectedType) => {
  reportError(
    templates.error_type({
      propertyName,
      functionName,
      value,
      expectedType
    })
  );
};
const handleMandatoryVals = (propertyNames, functionName) => {
  reportError(
    templates.error_mandatory_multiple_vals({
      propertyNames,
      functionName
    })
  );
};
const handleMandatorySingleVal = (propertyName, functionName) => {
  reportError(
    templates.error_mandatory_val({
      propertyName,
      functionName
    })
  );
};
const handleUnsupportedChars = (propertyName, functionName) => {
  reportError(
    templates.error_unsupported_chars({
      propertyName,
      functionName
    })
  );
};

const createHiddenCollapsedSDKFactory = ({
  viewportState,
  hasPortal = false
} = {}) => ({
  setStyles,
  portal,
  metaData,
  getSdkInstance,
  runAnimation,
  createSdkState,
  styleUtils,
  setProps
}) => {
  const validateEffect = createEffectValidation({
    compName: metaData.role
  });
  const [state, setState] = createSdkState(
    {
      hidden: metaData.hiddenOnLoad,
      collapsed: metaData.collapsedOnLoad
    },
    "hidden-collapsed"
  );
  return {
    hide: async (effectName, effectOptions) => {
      setProps({ hidden: true });
      if (state.collapsed || state.hidden) {
        setState({ hidden: true });
        return;
      }
      if (validateEffect({
        effectName,
        effectOptions,
        propertyName: "hide"
      })) {
        const animationOptions = {
          animationDirection: EFFECTS.HIDE.suffix,
          effectName,
          effectOptions: {
            ...effectDefaultOptions?.[effectName] || sharedEffectDefaultOptions,
            ...effectOptions
          }
        };
        await Promise.all([
          runAnimation(animationOptions),
          hasPortal ? portal.runAnimation(animationOptions) : void 0
        ]);
      } else {
        setStyles(styleUtils.getHiddenStyles());
        if (hasPortal) {
          portal.setStyles(styleUtils.getHiddenStyles());
        }
      }
      setState({ hidden: true });
      viewportState?.onViewportLeave?.forEach((cb) => cb());
    },
    show: async (effectName, effectOptions) => {
      setProps({ hidden: false });
      if (state.collapsed || !state.hidden) {
        setState({ hidden: false });
        return;
      }
      if (validateEffect({
        effectName,
        effectOptions,
        propertyName: "show"
      })) {
        const runAnimationOptions = {
          animationDirection: EFFECTS.SHOW.suffix,
          effectName,
          effectOptions: {
            ...effectDefaultOptions?.[effectName] || sharedEffectDefaultOptions,
            ...effectOptions
          }
        };
        await Promise.all([
          runAnimation(runAnimationOptions),
          hasPortal ? portal.runAnimation(runAnimationOptions) : void 0
        ]);
      } else {
        setStyles(styleUtils.getShownStyles());
        if (hasPortal) {
          portal.setStyles(styleUtils.getShownStyles());
        }
      }
      setState({ hidden: false });
      viewportState?.onViewportEnter?.forEach((cb) => cb());
    },
    collapse: async () => {
      setProps({ collapsed: true });
      if (!state.collapsed) {
        setStyles(styleUtils.getCollapsedStyles());
        if (hasPortal) {
          portal.setStyles(styleUtils.getCollapsedStyles());
        }
        setState({ collapsed: true });
        if (!state.hidden) {
          viewportState?.onViewportLeave?.forEach((cb) => cb());
        }
      }
      return;
    },
    expand: async () => {
      setProps({ collapsed: false });
      if (state.collapsed) {
        const style = {
          ...styleUtils.getExpandedStyles(),
          visibility: state.hidden ? "hidden" : null
        };
        setStyles(style);
        if (hasPortal) {
          portal.setStyles(style);
        }
        setState({ collapsed: false });
        if (!state.hidden) {
          viewportState?.onViewportEnter?.forEach((cb) => cb());
        }
      }
      return;
    },
    get collapsed() {
      return state.collapsed;
    },
    get hidden() {
      return Boolean(state.hidden);
    },
    get isVisible() {
      if (!metaData.isRendered()) {
        return false;
      }
      let parentSdk = getSdkInstance();
      while (parentSdk) {
        if (parentSdk.hidden || parentSdk.collapsed) {
          return false;
        }
        parentSdk = parentSdk.parent;
      }
      return true;
    },
    get isAnimatable() {
      return true;
    }
  };
};

const visibilityPropsSDKFactory = (api, hasPortal = false) => {
  const [state, setState] = api.createSdkState(
    {
      onViewportEnter: [],
      onViewportLeave: []
    },
    "viewport"
  );
  const registerCallback = (type, callback) => {
    setState({ [type]: [...state[type], callback] });
  };
  const hiddenCollapsedSDKFactory = createHiddenCollapsedSDKFactory({
    viewportState: state,
    hasPortal
  });
  const viewportPropsSDKFactory = createViewportPropsSDKFactory(registerCallback);
  return composeSDKFactories([
    hiddenCollapsedSDKFactory,
    viewportPropsSDKFactory
  ])(api);
};
const createVisibilityPropsSDKFactory = (hasPortal) => {
  return (api) => visibilityPropsSDKFactory(api, hasPortal);
};

const validateEffects = (possibleEffects, effects, functionName) => {
  const invalidEffects = effects.filter(
    (name) => !possibleEffects.includes(name)
  );
  if (invalidEffects.length) {
    reportError(
      templates.error_effects_input({
        functionName,
        wrongEffects: invalidEffects,
        allowedEffects: possibleEffects
      })
    );
  }
};
const effectsTriggersSDKFactory = (api) => {
  const getEffects = () => api.effectsTriggersApi?.getEffects() || [];
  return {
    effects: {
      get effects() {
        return getEffects();
      },
      get activeEffects() {
        return api.effectsTriggersApi?.getActiveEffects() || [];
      },
      applyEffects: (effects) => {
        validateEffects(getEffects(), effects, "applyEffects");
        api.effectsTriggersApi?.applyEffects(...effects);
      },
      removeEffects: (effects) => {
        validateEffects(getEffects(), effects, "removeEffects");
        api.effectsTriggersApi?.removeEffects(...effects);
      },
      toggleEffects: (effects) => {
        validateEffects(getEffects(), effects, "toggleEffects");
        api.effectsTriggersApi?.toggleEffects(...effects);
      },
      removeAllEffects: () => api.effectsTriggersApi?.removeAllEffects()
    }
  };
};

const deletePropsSDKFactory = (api) => ({
  delete: () => {
    api.setProps({ deleted: true });
    api.remove();
  },
  restore: () => {
    api.setProps({ deleted: false });
    api.restore();
  },
  get deleted() {
    return !!api.props.deleted;
  }
});

const customClassListPropsSDKFactory = (api) => {
  const { setProps, props } = api;
  return {
    customClassList: {
      get value() {
        return props.customClassNames ? props.customClassNames?.join(" ") : "";
      },
      values() {
        return props.customClassNames ? props.customClassNames : [];
      },
      add(...classNames) {
        const customClassListSet = props.customClassNames ? new Set(props.customClassNames) : /* @__PURE__ */ new Set([]);
        if (!classNames.length) {
          handleMandatorySingleVal("className", "customClassList.add");
          return;
        }
        for (const className of classNames) {
          if (isValidClassName(className, "customClassList.add")) {
            customClassListSet.add(className);
          } else {
            return;
          }
        }
        setProps({ customClassNames: Array.from(customClassListSet) });
      },
      remove(...classNames) {
        if (!classNames.length) {
          handleMandatorySingleVal("className", "customClassList.remove");
          return;
        }
        const customClassListSet = new Set(props.customClassNames);
        for (const className of classNames) {
          if (isValidClassName(className, "customClassList.remove")) {
            customClassListSet.delete(className);
          } else {
            return;
          }
        }
        setProps({ customClassNames: Array.from(customClassListSet) });
      },
      contains(className) {
        if (!className) {
          handleMandatorySingleVal("className", "customClassList.contains");
          return;
        }
        if (isValidClassName(className, "customClassList.contains")) {
          return props.customClassNames ? props.customClassNames.includes(className) : false;
        } else {
          return;
        }
      },
      replace(currentClassName, newClassName) {
        if (!currentClassName || !newClassName) {
          handleMandatoryVals(
            ["currentClassName, newClassName"],
            "customClassList.replace"
          );
          return false;
        }
        if (isValidClassName(newClassName, "customClassList.replace") && isValidClassName(currentClassName, "customClassList.replace")) {
          if (this.contains(currentClassName)) {
            this.remove(currentClassName);
            this.add(newClassName);
            return true;
          }
          return false;
        }
        return false;
      },
      toggle(className) {
        if (!className) {
          handleMandatorySingleVal("className", "customClassList.toggle");
          return false;
        }
        if (isValidClassName(className, "customClassList.toggle")) {
          if (this.contains(className)) {
            this.remove(className);
            return false;
          } else {
            this.add(className);
            return true;
          }
        }
        return false;
      }
    }
  };
};

const toJSONBase = ({
  role,
  compType,
  isGlobal,
  isRendered
}) => ({
  id: role,
  type: `$w.${compType}`,
  global: isGlobal(),
  rendered: isRendered()
});
const baseElementPropsSDKFactory = (api) => ({
  onMouseIn: (handler) => registerCorvidMouseEvent("onMouseEnter", api, handler),
  onMouseOut: (handler) => registerCorvidMouseEvent("onMouseLeave", api, handler),
  removeEventHandler: (type, handler) => {
    const { getSdkInstance } = api;
    if (typeof type !== "string") {
      reportError(
        templates.error_type({
          propertyName: "type",
          functionName: "removeEventHandler",
          value: type,
          expectedType: "string"
        })
      );
      return getSdkInstance();
    }
    if (typeof handler !== "function") {
      reportError(
        templates.error_type({
          propertyName: "handler",
          functionName: "removeEventHandler",
          value: handler,
          expectedType: "function"
        })
      );
      return getSdkInstance();
    }
    return unregisterCorvidEvent(type, api, handler);
  },
  get rendered() {
    return api.metaData.isRendered();
  },
  toJSON() {
    return toJSONBase(api.metaData);
  }
});
const viewportPropsSDKFactory = createViewportPropsSDKFactory();
composeSDKFactories([
  basePropsSDKFactory,
  viewportPropsSDKFactory,
  baseElementPropsSDKFactory,
  effectsTriggersSDKFactory,
  customClassListPropsSDKFactory
]);
const createElementPropsSDKFactory = ({
  useHiddenCollapsed = true,
  hasPortal = false
} = {}) => {
  return composeSDKFactories([
    basePropsSDKFactory,
    baseElementPropsSDKFactory,
    effectsTriggersSDKFactory,
    deletePropsSDKFactory,
    useHiddenCollapsed ? createVisibilityPropsSDKFactory(hasPortal) : viewportPropsSDKFactory,
    customClassListPropsSDKFactory
  ]);
};

const isUndefined = (str) => isNil(str) ? "" : str;
const endBlockTagPattern = new RegExp(endBlockTagRegex, "mg");
const endTagPattern = new RegExp(endTagRegex, "mg");
const startTagPattern = new RegExp(startTagRegex, "mg");
const getText = (html) => html ? decode(
  unescape(
    stripImpliedLinks(removeWixGuard(html)).replace(/\n/g, "").replace(/<br>/g, "\n").replace(/<br><\/br>/g, "\n").replace(/<br\s*\/?>/g, "\n").replace(endBlockTagPattern, "\n").replace(endTagPattern, "").replace(startTagPattern, "").trim()
  )
) : "";
const createWRichTextSdk = (api) => {
  const { props, setProps, getService } = api;
  const linkUtils = getService(LinkUtilsDefinition);
  const convertLinksForSetter = (str) => convertLinkProperties(str, linkUtils.getLinkProps);
  const convertLinksForGetter = (str) => {
    convertLinkProperties(str, linkUtils.getLinkProps, linkUtils.getLink);
    return str;
  };
  const getHtml = (html) => flow(
    removeWixGuard,
    stripImpliedLinks,
    applyTransformationForGetHtml,
    convertLinksForGetter
  )(html);
  const getPreparedHTML = (html, config) => {
    const flowParts = [
      isUndefined,
      (_html) => applyTransformationForSetHtml(_html, config),
      convertLinksForSetter,
      (_html) => (
        // @ts-expect-error TODO: Fix service usage
        linkUtils.getImpliedLinks(_html, false, { parseEscaped: true })
      ),
      sanitizeHTML
    ];
    return flow(...flowParts)(html);
  };
  return {
    get type() {
      return wixCodeName;
    },
    get html() {
      return getHtml(props.richText?.html || "");
    },
    set html(value) {
      setProps({
        richText: {
          html: getPreparedHTML(value, { addDefaultClasses: false })
        }
      });
    },
    get text() {
      return getText(props.richText.html);
    },
    set text(value) {
      const escapedHTML = value ? escape(value).replace(/\n/g, "<br>") : wixGuard;
      const html = linkUtils.getImpliedLinks(
        insertContentInHtml(
          stripImpliedLinks(props.richText.html),
          escapedHTML
        ),
        false,
        // @ts-expect-error TODO: Fix service usage
        { parseEscaped: true }
      );
      setProps({
        richText: { html }
      });
    }
  };
};
const elementPropsSDKFactory = createElementPropsSDKFactory();
const sdk = composeSDKFactories([
  createWRichTextSdk,
  elementPropsSDKFactory,
  createA11ySdk({ a11yProperty: "a11y" })
]);

export { sdk as default };
