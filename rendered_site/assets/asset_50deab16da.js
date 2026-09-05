function isNil(value) {
  return value === null || value === void 0;
}

const WIX_SDK_ERROR_TEXT = "Wix code SDK error:";
const reportError = (message) => {
  console.error(`${WIX_SDK_ERROR_TEXT} ${message}`);
};

const types = {
  IMAGE: "image",
  DOCUMENT: "document",
  VIDEO: "video",
  AUDIO: "audio",
  VECTOR: "vector"
};
const errors = {
  empty_media_id: "empty_media_id",
  empty_poster_id: "empty_poster_id",
  bad_media_id: "bad_media_id",
  unknown_media_type: "unknown_media_type",
  missing_width_height: "missing_width_height",
  non_string_media_id: "non_string_media_id"
};

const templates = {
  vector: (svgId, filename) => `wix:vector://v1/${svgId}/${filename}`,
  image: (uri, filename, width, height, watermark) => `wix:image://v1/${uri}/${filename}#originWidth=${width}&originHeight=${height}${watermark ? `&watermark=${watermark}` : ""}`,
  document: (uri, filename) => `wix:document://v1/${uri}/${filename}`,
  video: (videoId, posterId, filename, width = 0, height = 0) => `wix:video://v1/${videoId}/${filename}#posterUri=${posterId}&posterWidth=${width}&posterHeight=${height}`,
  audio: (uri, filename, duration) => `wix:audio://v1/${uri}/${filename}#duration=${duration}`
};
const matchers$1 = {
  vector: /^wix:vector:\/\/v1\/([^\/]+)\/([^\/]*)$/,
  image: /^wix:image:\/\/v1\/([^\/]+)\/([^\/]*)#originWidth=([0-9]+)&originHeight=([0-9]+)(?:&watermark=([^\/]+))?$/,
  document: /^wix:document:\/\/v1\/([^\/]+)\/([^\/]+)$/,
  video: /^wix:video:\/\/v1\/([^\/]+)\/([^\/]+)#posterUri=([^\/]+)&posterWidth=([0-9]+)&posterHeight=([0-9]+)$/,
  audio: /^wix:audio:\/\/v1\/([^\/]+)\/([^\/]+)#duration=([0-9]+)$/,
  deprecated_video: /^wix:video:\/\/v1\/([^\/]+)\/([^\/]+)\/#posterUri=([^\/]+)&posterWidth=([0-9]+)&posterHeight=([0-9]+)$/,
  deprecated_image: /^image:\/\/v1\/([^\/]+)\/([0-9]+)_([0-9]+)\/([^\/]*)$/,
  deprecated_type: /^(image):/,
  type: /^wix:(\w+):/,
  splitExtension: /\.(?=[^.]+$)/,
  emptyTitle: /^_\./
};
function convertTitleToFilename(type, title = "", uri) {
  const [uriName, uriExtension] = uri.split(matchers$1.splitExtension);
  const [titleName, titleExtension] = title.split(matchers$1.splitExtension);
  let filename;
  switch (type) {
    case types.IMAGE:
      filename = `${titleName || "_"}.${titleExtension || uriExtension}`;
      break;
    case types.DOCUMENT:
      filename = `${titleName || uriName}.${titleExtension || uriExtension}`;
      break;
    case types.VIDEO:
      filename = `${titleName || "_"}${titleExtension ? `.${titleExtension}` : ""}`;
      break;
    case types.AUDIO:
      filename = `${titleName || uriName}.${titleExtension || uriExtension}`;
      break;
    case types.VECTOR:
      filename = `${titleName || uriName}.${titleExtension || uriExtension}`;
      break;
    default:
      filename = "";
      break;
  }
  return encodeURI(filename);
}
function convertFilenameToTitle(filename) {
  return matchers$1.emptyTitle.test(filename) ? "" : decodeURI(filename);
}
function createImageItem({
  mediaId,
  title,
  width,
  height,
  watermark
}) {
  if (!mediaId) {
    return { error: errors.empty_media_id };
  }
  if (typeof height !== "number" || typeof width !== "number") {
    return { error: errors.missing_width_height };
  }
  const filename = convertTitleToFilename(types.IMAGE, title, mediaId);
  return { item: templates.image(mediaId, filename, width, height, watermark) };
}
function createDocumentItem({
  mediaId,
  title
}) {
  if (!mediaId) {
    return { error: errors.empty_media_id };
  }
  const filename = convertTitleToFilename(types.DOCUMENT, title, mediaId);
  return { item: templates.document(mediaId, filename) };
}
function createVectorItem({
  mediaId,
  title
}) {
  if (!mediaId) {
    return { error: errors.empty_media_id };
  }
  const filename = convertTitleToFilename(types.VECTOR, title, mediaId);
  return { item: templates.vector(mediaId, filename) };
}
function createVideoItem({
  mediaId,
  title,
  width,
  height,
  posterId
}) {
  if (!mediaId) {
    return { error: errors.empty_media_id };
  }
  if (!posterId) {
    return { error: errors.empty_poster_id };
  }
  if (isNaN(height || NaN) || isNaN(width || NaN)) {
    return { error: errors.missing_width_height };
  }
  const strippedMediaId = mediaId.replace("video/", "");
  const filename = convertTitleToFilename(types.VIDEO, title, strippedMediaId);
  return {
    item: templates.video(strippedMediaId, posterId, filename, width, height)
  };
}
function createAudioItem({
  mediaId,
  title,
  duration
}) {
  if (!mediaId) {
    return { error: errors.empty_media_id };
  }
  const filename = convertTitleToFilename(types.AUDIO, title, mediaId);
  return { item: templates.audio(mediaId, filename, duration || 0) };
}
function parseImageItem(item) {
  const [, mediaId, filename, width, height, watermark] = item.match(matchers$1.image) || [];
  const title = convertFilenameToTitle(filename);
  if (mediaId) {
    const parsed = {
      type: types.IMAGE,
      mediaId,
      title,
      width: parseInt(width, 10),
      height: parseInt(height, 10),
      watermark
    };
    return parsed;
  }
  return { error: errors.bad_media_id };
}
function parseDeprecatedImageItem(item) {
  const [, mediaId, width, height, filename] = item.match(matchers$1.deprecated_image) || [];
  const title = convertFilenameToTitle(filename);
  if (mediaId) {
    return {
      type: types.IMAGE,
      mediaId,
      title,
      width: parseInt(width, 10),
      height: parseInt(height, 10)
    };
  }
  return { error: errors.bad_media_id };
}
function parseDocumentItem(item) {
  const [, mediaId, filename] = item.match(matchers$1.document) || [];
  const title = convertFilenameToTitle(filename);
  if (mediaId) {
    return {
      type: types.DOCUMENT,
      mediaId,
      title
    };
  }
  return { error: errors.bad_media_id };
}
function parseVectorItem(item) {
  const [, mediaId, filename] = item.match(matchers$1.vector) || [];
  const title = convertFilenameToTitle(filename);
  if (mediaId) {
    return {
      type: types.VECTOR,
      mediaId,
      title
    };
  }
  return { error: errors.bad_media_id };
}
function parseVideoItem(item) {
  const videoMatcher = matchers$1.deprecated_video.test(item) ? matchers$1.deprecated_video : matchers$1.video;
  const [, mediaId, filename, posterId, width, height] = item.match(videoMatcher) || [];
  const title = convertFilenameToTitle(filename);
  if (mediaId && posterId) {
    return {
      type: types.VIDEO,
      mediaId,
      posterId,
      width: parseInt(width, 10),
      height: parseInt(height, 10),
      title
    };
  }
  return { error: errors.bad_media_id };
}
function parseAudioItem(item) {
  const [, mediaId, filename, duration] = item.match(matchers$1.audio) || [];
  const title = convertFilenameToTitle(filename);
  if (mediaId) {
    return {
      type: types.AUDIO,
      mediaId,
      title,
      duration: parseInt(duration, 10)
    };
  }
  return { error: errors.bad_media_id };
}
function createMediaItemUri({
  mediaId,
  type,
  title,
  width,
  height,
  posterId,
  watermark,
  duration
}) {
  switch (type) {
    case types.IMAGE:
      return createImageItem({ mediaId, title, width, height, watermark });
    case types.DOCUMENT:
      return createDocumentItem({ mediaId, title });
    case types.VECTOR:
      return createVectorItem({ mediaId, title });
    case types.VIDEO:
      return createVideoItem({ mediaId, title, width, height, posterId });
    case types.AUDIO:
      return createAudioItem({ mediaId, title, duration });
    default:
      return { error: errors.unknown_media_type };
  }
}
function parseMediaItemUri(mediaItemUri = "") {
  if (typeof mediaItemUri !== "string") {
    return { error: errors.non_string_media_id };
  }
  const [, type] = mediaItemUri.match(matchers$1.type) || [];
  switch (type) {
    case types.IMAGE:
      return parseImageItem(mediaItemUri);
    case types.DOCUMENT:
      return parseDocumentItem(mediaItemUri);
    case types.VECTOR:
      return parseVectorItem(mediaItemUri);
    case types.VIDEO:
      return parseVideoItem(mediaItemUri);
    case types.AUDIO:
      return parseAudioItem(mediaItemUri);
    default:
      const [, deprecatedType] = mediaItemUri.match(matchers$1.deprecated_type) || [];
      if (deprecatedType) {
        return parseDeprecatedImageItem(mediaItemUri);
      }
      return { error: errors.unknown_media_type };
  }
}

const matchers = {
  externalUrl: /(^https?)|(^data)|(^blob)|(^\/\/)/,
  inlineSvg: /<svg[\s\S]*>[\s\S]*<\/svg>/im
};
const extraMatchersByType = {
  [types.VECTOR]: [matchers.externalUrl, matchers.inlineSvg],
  [types.IMAGE]: [matchers.externalUrl],
  [types.DOCUMENT]: [],
  [types.VIDEO]: [],
  [types.AUDIO]: [matchers.externalUrl]
};
function createMediaSrc({
  mediaId,
  type,
  title,
  width,
  height,
  posterId,
  watermark,
  duration
}) {
  if (
    // @ts-expect-error
    extraMatchersByType[type]?.some((matcher) => matcher.test(mediaId))
  ) {
    return { item: mediaId };
  }
  return createMediaItemUri({
    mediaId,
    type,
    title,
    width,
    height,
    posterId,
    watermark,
    duration
  });
}
function parseMediaSrc(mediaItemSrc, type) {
  if (!Object.values(types).includes(type)) {
    return { error: errors.unknown_media_type };
  }
  if (extraMatchersByType[type].some((matcher) => matcher.test(mediaItemSrc))) {
    return { type, mediaId: mediaItemSrc };
  }
  const mediaItemUri = parseMediaItemUri(mediaItemSrc);
  if (mediaItemUri.error === errors.non_string_media_id) {
    return mediaItemUri;
  }
  if (mediaItemUri.error === errors.unknown_media_type || type !== mediaItemUri.type) {
    return { error: errors.bad_media_id };
  }
  return mediaItemUri;
}

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

const createSdk = (api) => {
  const { props, setProps } = api;
  return {
    get src() {
      return createMediaSrc({
        type: "image",
        mediaId: props?.image?.uri,
        title: props?.image?.name,
        width: props?.image?.width,
        height: props?.image?.height
      }).item ?? "";
    },
    set src(value) {
      const src = isNil(value) ? "" : value;
      const {
        height,
        width,
        title: name,
        error,
        mediaId: uri
      } = parseMediaSrc(src.toString(), "image");
      if (error) {
        reportError(
          `The "src" property cannot be set to "src". It must be a valid URL starting with "http://", "https://", or "wix:image://".`
        );
        return;
      }
      const { image } = props;
      const currentImageData = image;
      const updatedImageData = {
        ...currentImageData,
        width: width || currentImageData?.width,
        height: height || currentImageData?.height,
        uri: uri || currentImageData?.uri,
        name: name || currentImageData?.name,
        crop: null
      };
      setProps({
        image: updatedImageData
      });
    },
    get alt() {
      return props.image?.alt;
    },
    set alt(value) {
      if (isNil(value)) {
        const image = props.image || {};
        delete image.alt;
        setProps({ image });
      } else {
        setProps({
          image: {
            ...props.image,
            alt: value
          }
        });
      }
    },
    get displayMode() {
      return props.displayMode;
    },
    set displayMode(displayMode) {
      setProps({
        displayMode
      });
    },
    get name() {
      return props?.image?.name;
    },
    set name(value) {
      setProps({
        image: {
          ...props.image,
          name: value
        }
      });
    },
    get type() {
      return "$w.Image";
    },
    toJSON() {
      return {
        // ...toJSONBase(metaData),
        type: "$w.Image",
        alt: props?.image?.alt,
        src: props?.image?.uri,
        name: props?.image?.name
      };
    }
  };
};
const sdk = composeSDKFactories([createSdk, basePropsSDKFactory]);

export { sdk as default };
