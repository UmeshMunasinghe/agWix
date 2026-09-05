const wixSVGShapeRegExp = /^wix:vector:\/\/v1\/svgshape\.v[12]/;
function isNil(value) {
  return value === null || value === void 0;
}
function isInlineSvg(maybeSvg) {
  return maybeSvg.includes("<svg");
}
function isWixSVGShape(maybeShape) {
  return wixSVGShapeRegExp.test(maybeShape);
}

const SVG_FALLBACK_CONTENT = "<svg data-failed />";
const SVG_TYPE_INLINE = "inline";
const SVG_TYPE_WIX_MEDIA = "wixMedia";
const SVG_TYPE_URL = "url";
const WIX_MEDIA_PREFIX_REGEX = /^wix:vector:\/\/v1\//;
const WIX_MEDIA_REGEX = /^wix:vector:\/\/v1\/[0-9|a-z|_]+.svg/;
const resolveSvgShape = (value, baseSvgMediaUrl) => {
  const extractShapeUri = (svgId) => {
    const [, shapeVersion, hash, svgName] = svgId.replace(/^.*\//, "").split(".");
    const version = shapeVersion === "v1" ? 1 : 2;
    const svgHash = hash.replace(/svg_/i, "");
    return `${svgHash + (version === 1 ? `_svgshape.v1.${svgName}` : "")}.svg`;
  };
  const [svgShape] = value.replace(WIX_MEDIA_PREFIX_REGEX, "").split("/");
  const svgUri = extractShapeUri(svgShape);
  return {
    type: SVG_TYPE_WIX_MEDIA,
    data: `${baseSvgMediaUrl}/${svgUri}`
  };
};
const extractWixMediaUrl = (value) => {
  const [wixMediaUrl] = WIX_MEDIA_REGEX.exec(value) || [];
  return wixMediaUrl;
};
const createSvgWixMediaUrl = (id, title) => {
  const titleSuffix = title ? encodeURIComponent(title) : "";
  return `wix:vector://v1/${id}/${titleSuffix}`;
};
const queryAttribute = (markup, attr) => {
  const re = new RegExp(`${attr}=("|')?([-\\w\\s,]+)\\1`);
  return markup.match(re);
};
const getAttribute = (markup, attr) => {
  const attribute = queryAttribute(markup, attr);
  return attribute ? attribute[2] : null;
};
const addDefaultSizes = (markup) => {
  return markup.replace("<svg", `<svg width="300" height="150"`);
};
const hasDefaultSizes = (svg) => {
  const width = getAttribute(svg, "width");
  const height = getAttribute(svg, "height");
  const viewBox = getAttribute(svg, "viewBox");
  return viewBox || width && height;
};
const resolveSvg = (src, baseSvgMediaUrl) => {
  if (isWixSVGShape(src)) {
    return resolveSvgShape(src, baseSvgMediaUrl);
  }
  const wixMediaUrl = extractWixMediaUrl(src);
  if (wixMediaUrl) {
    const svgId = wixMediaUrl.replace(WIX_MEDIA_PREFIX_REGEX, "");
    return {
      type: SVG_TYPE_WIX_MEDIA,
      data: `${baseSvgMediaUrl}${svgId}`
    };
  }
  if (isInlineSvg(src)) {
    return { type: SVG_TYPE_INLINE, data: src };
  }
  return { type: SVG_TYPE_URL, data: src };
};
const fetchSvg = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return response.text();
    }
  } catch {
  }
  return SVG_FALLBACK_CONTENT;
};
const getSanitizedSvg = async (maybeValidSvg, sanitizeSVG) => {
  const content = hasDefaultSizes(maybeValidSvg) ? maybeValidSvg : addDefaultSizes(maybeValidSvg);
  try {
    const { svg } = await sanitizeSVG(content);
    return svg || SVG_FALLBACK_CONTENT;
  } catch (e) {
    return SVG_FALLBACK_CONTENT;
  }
};
const resolveAndFetchSvg = async (src, baseSvgMediaUrl, sanitizeSVG) => {
  const { type, data } = resolveSvg(src, baseSvgMediaUrl);
  if (type === SVG_TYPE_INLINE) {
    return getSanitizedSvg(data, sanitizeSVG);
  }
  let content = await fetchSvg(data);
  if (!isFallbackSvg(content) && type !== SVG_TYPE_WIX_MEDIA) {
    content = await getSanitizedSvg(content, sanitizeSVG);
  }
  return content;
};
const isFallbackSvg = (svg) => svg === SVG_FALLBACK_CONTENT;

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

const createLinkSdkFactory = ({ linkProperty }) => ({ props, setProps }) => {
  return {
    get link() {
      return props[linkProperty]?.href;
    },
    set link(value) {
      const link = props[linkProperty] ?? {};
      setProps({ [linkProperty]: { ...link, href: value } });
    },
    get rel() {
      return props[linkProperty]?.rel;
    },
    set rel(value) {
      const link = props[linkProperty] ?? {};
      setProps({ [linkProperty]: { ...link, rel: value } });
    },
    get target() {
      return props[linkProperty]?.target;
    },
    set target(value) {
      const link = props[linkProperty] ?? {};
      setProps({ [linkProperty]: { ...link, target: value } });
    }
  };
};

const SVG_IMAGE_SDK_TYPE = "$w.SvgImage";
const createVectorImageSdk = (api) => {
  const { props, setProps, getService } = api;
  return {
    get src() {
      return createSvgWixMediaUrl(props.svgId?.uri, props.a11y?.ariaLabel);
    },
    set src(url) {
      resolveAndFetchSvg(url, getService().mediaSvgUrl, async () => ({})).then(
        (svgId) => {
          setProps({ svgId });
        }
      );
    },
    get alt() {
      return props.a11y?.ariaLabel;
    },
    set alt(value) {
      setProps({
        a11y: {
          ...props.a11y,
          ariaLabel: isNil(value) ? "" : value
        }
      });
    },
    toJSON: () => {
      return {
        type: SVG_IMAGE_SDK_TYPE
      };
    }
  };
};
const sdk = composeSDKFactories([
  createVectorImageSdk,
  createLinkSdkFactory({ linkProperty: "link" })
]);

export { sdk as default };
