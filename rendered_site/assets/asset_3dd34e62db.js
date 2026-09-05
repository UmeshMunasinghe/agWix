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
const matchersByType = {
  vector: [matchers$1.vector],
  image: [matchers$1.image, matchers$1.deprecated_image],
  document: [matchers$1.document],
  video: [matchers$1.video, matchers$1.deprecated_video],
  audio: [matchers$1.audio]
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
function isValidMediaItemUri(mediaItemUri = "", type) {
  const typeMatchers = matchersByType[type];
  return typeMatchers && typeMatchers.some((matcher) => matcher.test(mediaItemUri));
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
function isValidMediaSrc(mediaSrc, type) {
  const isValidMediaItemUri$1 = isValidMediaItemUri(
    mediaSrc,
    type
  );
  return isValidMediaItemUri$1 || extraMatchersByType[type] && extraMatchersByType[type].some((matcher) => matcher.test(mediaSrc));
}

// src/index.ts
var wixContext = {};

function resolveContext() {
    const oldContext = typeof $wixContext !== 'undefined' && $wixContext.initWixModules
        ? $wixContext.initWixModules
        : typeof globalThis.__wix_context__ !== 'undefined' &&
            globalThis.__wix_context__.initWixModules
            ? globalThis.__wix_context__.initWixModules
            : undefined;
    if (oldContext) {
        return {
            // @ts-expect-error
            initWixModules(modules, elevated) {
                return runWithoutContext(() => oldContext(modules, elevated));
            },
            fetchWithAuth() {
                throw new Error('fetchWithAuth is not available in this context');
            },
            graphql() {
                throw new Error('graphql is not available in this context');
            },
        };
    }
    const contextualClient = typeof $wixContext !== 'undefined'
        ? $wixContext.client
        : typeof wixContext.client !== 'undefined'
            ? wixContext.client
            : typeof globalThis.__wix_context__ !== 'undefined'
                ? globalThis.__wix_context__.client
                : undefined;
    const elevatedClient = typeof $wixContext !== 'undefined'
        ? $wixContext.elevatedClient
        : typeof wixContext.elevatedClient !== 'undefined'
            ? wixContext.elevatedClient
            : typeof globalThis.__wix_context__ !== 'undefined'
                ? globalThis.__wix_context__.elevatedClient
                : undefined;
    if (!contextualClient && !elevatedClient) {
        return;
    }
    return {
        initWixModules(wixModules, elevated) {
            if (elevated) {
                if (!elevatedClient) {
                    throw new Error('An elevated client is required to use elevated modules. Make sure to initialize the Wix context with an elevated client before using elevated SDK modules');
                }
                return runWithoutContext(() => elevatedClient.use(wixModules));
            }
            if (!contextualClient) {
                throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
            }
            return runWithoutContext(() => contextualClient.use(wixModules));
        },
        fetchWithAuth: (urlOrRequest, requestInit) => {
            if (!contextualClient) {
                throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
            }
            return contextualClient.fetchWithAuth(urlOrRequest, requestInit);
        },
        getAuth() {
            if (!contextualClient) {
                throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
            }
            return contextualClient.auth;
        },
        async graphql(query, variables, opts) {
            if (!contextualClient) {
                throw new Error('Wix context is not available. Make sure to initialize the Wix context before using SDK modules');
            }
            return contextualClient.graphql(query, variables, opts);
        },
    };
}
function runWithoutContext(fn) {
    const globalContext = globalThis.__wix_context__;
    const moduleContext = {
        client: wixContext.client,
        elevatedClient: wixContext.elevatedClient,
    };
    let closureContext;
    globalThis.__wix_context__ = undefined;
    wixContext.client = undefined;
    wixContext.elevatedClient = undefined;
    if (typeof $wixContext !== 'undefined') {
        closureContext = {
            client: $wixContext?.client,
            elevatedClient: $wixContext?.elevatedClient,
        };
        delete $wixContext.client;
        delete $wixContext.elevatedClient;
    }
    try {
        return fn();
    }
    finally {
        globalThis.__wix_context__ = globalContext;
        wixContext.client = moduleContext.client;
        wixContext.elevatedClient = moduleContext.elevatedClient;
        if (typeof $wixContext !== 'undefined') {
            $wixContext.client = closureContext.client;
            $wixContext.elevatedClient = closureContext.elevatedClient;
        }
    }
}

function contextualizeRESTModuleV2(restModule, elevated) {
    return ((...args) => {
        const context = resolveContext();
        if (!context) {
            // @ts-expect-error - if there is no context, we want to behave like the original module
            return restModule.apply(undefined, args);
        }
        return (context
            .initWixModules(restModule, elevated)
            // @ts-expect-error - we know the args here are meant to be passed to the initalized module
            .apply(undefined, args));
    });
}

function createRESTModule(descriptor, elevated = false) {
    return contextualizeRESTModuleV2(descriptor, elevated);
}

const fetchWithAuth = createRESTModule((restModuleOpts) => {
    return ((url, options) => restModuleOpts.fetchWithAuth(url, options));
});

const TITLE_LENGTH_LIMIT = 100;
const snakeToCamel = (s) => s.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
const getObjectValueByKey = (obj, key) => obj[key] || obj[snakeToCamel(key)];
const url2uri = (url) => url.replace(/^(.*[/])/, "");
const getIdFromUrl = (fileUrl) => {
  const result = fileUrl.match(/(?:\/|^)([0-9a-fA-F_]+)(?:\/|$)/) || [];
  return result[1] ?? "";
};
const fixMediaTitleLength = (value, lengthLimit) => {
  const CHARS_TO_ADD = "...";
  const NUM_OF_CHARS_TO_KEEP = 3;
  if (value.length <= lengthLimit) {
    return value;
  }
  const arr = value.split("");
  const numOfCharsToRemove = value.length - lengthLimit + CHARS_TO_ADD.length;
  const hasFileTypeSuffix = value.lastIndexOf(".") > value.length - numOfCharsToRemove - NUM_OF_CHARS_TO_KEEP;
  const fileTypeSuffixIndex = hasFileTypeSuffix ? value.lastIndexOf(".") : value.length - 1;
  const removeIndex = fileTypeSuffixIndex - numOfCharsToRemove - NUM_OF_CHARS_TO_KEEP;
  arr.splice(removeIndex, numOfCharsToRemove, CHARS_TO_ADD);
  return arr.join("");
};
const parseVideoQualities = (fileOutput) => {
  const mp4Videos = fileOutput.video.filter((v) => v.format === "mp4");
  const storyboard = fileOutput.storyboard?.find(
    (s) => s.format === "mp4"
  );
  const qualities = mp4Videos.map(
    ({ width, height, quality, url }) => ({
      width,
      height,
      quality,
      url
    })
  );
  if (storyboard) {
    qualities.push({
      quality: "storyboard",
      width: storyboard.width,
      height: storyboard.height,
      url: storyboard.url
    });
  }
  return qualities;
};
const parseAdaptiveUrls = (fileOutput) => {
  const adaptiveVideo = getObjectValueByKey(
    fileOutput,
    "adaptive_video"
  );
  return adaptiveVideo.map((item) => ({
    format: item.format,
    url: item.url
  }));
};
const parseVideoFileInfo = (fileInfo, info) => {
  const fileInput = getObjectValueByKey(fileInfo, "file_input");
  const fileOutput = getObjectValueByKey(fileInfo, "file_output");
  const videoId = getIdFromUrl(
    getObjectValueByKey(fileInfo, "file_name") || getObjectValueByKey(fileInfo, "file_url")
  );
  const title = fixMediaTitleLength(fileInfo.title, TITLE_LENGTH_LIMIT);
  const imageData = fileOutput.image[0];
  return {
    type: "WixVideo",
    title,
    videoId,
    duration: +(fileInput.duration / 1e3).toFixed(2),
    posterImageRef: {
      type: "Image",
      width: imageData.width,
      height: imageData.height,
      uri: url2uri(imageData.url),
      description: info.path ? info.path : void 0
    },
    qualities: parseVideoQualities(fileOutput),
    adaptiveVideo: parseAdaptiveUrls(fileOutput),
    hasAudio: getObjectValueByKey(fileOutput.video[0], "audio_bitrate") !== -1,
    fps: (fileOutput.video[0]?.fps ?? "").toString()
  };
};
const CORVID_BG_VIDEO_DEFAULTS = {
  loop: true,
  preload: "auto",
  muted: true,
  isVideoEnabled: true
};
const getVideoPosterObject = ({
  mediaId,
  posterId,
  width,
  height,
  title
}) => {
  return {
    type: "WixVideo",
    videoId: mediaId,
    posterImageRef: {
      type: "Image",
      uri: posterId,
      width,
      height,
      title
    }
  };
};
const getVideoId = (videoId) => {
  return videoId.replace("video/", "");
};
const getFullVideoObject = (fileInfo, info) => {
  const MEDIA_OBJECT_DEFAULTS = {
    animatePoster: "none",
    autoPlay: true,
    playbackRate: 1,
    fittingType: "fill",
    hasBgScrollEffect: "",
    bgEffectName: "",
    isVideoDataExists: "1",
    alignType: "center",
    videoFormat: "mp4",
    playerType: "html5",
    isEditorMode: false,
    isViewerMode: true,
    videoHeight: fileInfo.file_input.height,
    videoWidth: fileInfo.file_input.width
  };
  const mediaObject = parseVideoFileInfo(fileInfo, info);
  return {
    mediaObject: {
      ...MEDIA_OBJECT_DEFAULTS,
      ...mediaObject
    },
    ...CORVID_BG_VIDEO_DEFAULTS
  };
};
const getMediaDataFromSrc = (value) => {
  if (isValidMediaSrc(value, "video")) {
    const parseMediaItem = parseMediaSrc(value, "video");
    if (parseMediaItem.error) {
      return null;
    }
    return {
      ...getVideoPosterObject(parseMediaItem),
      ...{
        name: parseMediaItem.title,
        fileName: parseMediaItem.title,
        type: "WixVideo"
      }
    };
  } else {
    const parseMediaItem = parseMediaSrc(value, "image");
    if (parseMediaItem.error) {
      return null;
    }
    return {
      ...parseMediaItem,
      ...{
        name: parseMediaItem.title,
        type: "Image"
      }
    };
  }
};
const getVideoDataByVideoId = async (videoId) => {
  videoId = getVideoId(videoId);
  const VIDEO_INFO_END_POINT = `https://files.wix.com/site/media/files/${videoId}/info`;
  const res = await fetchWithAuth(VIDEO_INFO_END_POINT, {
    method: "GET"
  });
  if (!res.ok) {
    throw new Error(`Request failed with status code ${res.status}`);
  }
  const videoData = await res.json();
  return getFullVideoObject(videoData, {});
};

const createSdk = (api) => {
  const { props, setProps } = api;
  return {
    get src() {
      return createMediaSrc({
        type: "video",
        mediaId: props.video?.uri,
        title: props.video?.name,
        width: props.video?.sources?.[0]?.width,
        height: props.video?.sources?.[0]?.height,
        posterId: props.video?.poster?.uri,
        duration: props.video?.duration
      }).item ?? "";
    },
    set src(value) {
      const src = isNil(value) ? "" : value;
      if (!isValidMediaSrc(src, "video")) {
        reportError(
          `The "src" property cannot be set to "${src}". It must be a valid video URL starting with "wix:video://".`
        );
        return;
      }
      const mediaData = getMediaDataFromSrc(src);
      if (!mediaData || mediaData.type !== "WixVideo" || !mediaData.videoId) {
        return;
      }
      if (mediaData.posterImageRef) {
        const { width, height, uri } = mediaData.posterImageRef;
        const currentVideo = props.video;
        if (currentVideo) {
          setProps({
            video: {
              ...currentVideo,
              poster: {
                uri: uri || "",
                width: width || 0,
                height: height || 0
              }
            }
          });
        }
      }
      getVideoDataByVideoId(mediaData.videoId).then((fullVideoRefData) => {
        const currentPoster = props.video?.poster;
        const updatedVideo = {
          uri: fullVideoRefData.mediaObject.videoId || "",
          name: mediaData.name || fullVideoRefData.mediaObject.title || "",
          sources: fullVideoRefData.mediaObject.qualities?.map((quality) => ({
            quality: quality.quality,
            width: quality.width,
            height: quality.height,
            types: [
              {
                format: quality.format || "mp4",
                uri: quality.url
              }
            ]
          })) || [],
          adaptiveSources: fullVideoRefData.mediaObject.adaptiveVideo?.map(
            (adaptive) => ({
              format: adaptive.format,
              uri: adaptive.url
            })
          ) || [],
          hasAudio: fullVideoRefData.mediaObject.hasAudio || false,
          fps: fullVideoRefData.mediaObject.fps ? Number(fullVideoRefData.mediaObject.fps) : void 0,
          duration: fullVideoRefData.mediaObject.duration
        };
        let updatedPoster;
        if (fullVideoRefData.mediaObject.posterImageRef) {
          updatedPoster = {
            uri: fullVideoRefData.mediaObject.posterImageRef.uri || "",
            width: fullVideoRefData.mediaObject.posterImageRef.width || 0,
            height: fullVideoRefData.mediaObject.posterImageRef.height || 0
          };
        } else if (currentPoster) {
          updatedPoster = currentPoster;
        } else {
          updatedPoster = {
            uri: "",
            width: 0,
            height: 0
          };
        }
        updatedVideo.poster = updatedPoster;
        setProps({ video: updatedVideo });
      }).catch((error) => {
        reportError(error);
      });
    },
    get title() {
      return props.video?.name || "";
    },
    set title(value) {
      const title = isNil(value) ? "" : value.toString();
      const currentVideo = props.video;
      if (!currentVideo?.uri) {
        reportError("Cannot set title when no video is uploaded.");
        return;
      }
      setProps({
        video: {
          ...currentVideo,
          name: title
        }
      });
    },
    get description() {
      return props.a11y?.ariaLabel || "";
    },
    set description(value) {
      const description = isNil(value) ? "" : value.toString();
      setProps({
        a11y: {
          ...props.a11y,
          ariaLabel: description
        }
      });
    },
    get type() {
      return "$w.VideoUpload";
    },
    toJSON() {
      return {
        type: "$w.VideoUpload",
        src: props.video?.uri,
        name: props.video?.name,
        sources: props.video?.sources,
        loop: props.loop,
        autoplay: props.autoplay,
        mute: props.mute,
        enableTitle: props.enableTitle,
        enableControls: props.enableControls
      };
    }
  };
};

export { createSdk as default };
