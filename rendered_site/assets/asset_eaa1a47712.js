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

function isNil(value) {
  return value === null || value === void 0;
}

const WIX_SDK_ERROR_TEXT = "Wix code SDK error:";
const reportError = (message) => {
  console.error(`${WIX_SDK_ERROR_TEXT} ${message}`);
};

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

const createHtmlComponentSdk = (api) => {
  const { props, setProps } = api;
  return {
    get scrolling() {
      return props.scrolling || "auto";
    },
    set scrolling(value) {
      const scrolling = isNil(value) ? "auto" : value.toString();
      if (!["yes", "no", "auto"].includes(scrolling)) {
        reportError(
          `The "scrolling" property cannot be set to "${scrolling}". It must be one of: "yes", "no", "auto".`
        );
        return;
      }
      setProps({ scrolling });
    },
    get src() {
      return props.url || "";
    },
    set src(value) {
      const src = isNil(value) ? "" : value.toString();
      setProps({ url: src });
    },
    get allow() {
      return props.allow || "";
    },
    set allow(value) {
      const allow = isNil(value) ? "" : value.toString();
      setProps({ allow });
    },
    allowFullScreen() {
      const current = props.allow || "";
      const permissions = current.split(/[;\s]+/).filter(Boolean);
      if (!permissions.includes("fullscreen")) {
        setProps({ allow: [...permissions, "fullscreen"].join("; ") });
      }
      return this;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onMessage(cb) {
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postMessage(message) {
    },
    get type() {
      return "$w.HtmlComponent";
    },
    toJSON() {
      return {
        type: "$w.HtmlComponent",
        src: props.url || "",
        scrolling: props.scrolling || "auto",
        allow: props.allow || ""
      };
    }
  };
};
const sdk = composeSDKFactories([
  createHtmlComponentSdk,
  createA11ySdk({ a11yProperty: "a11y" })
]);

export { sdk as default };
