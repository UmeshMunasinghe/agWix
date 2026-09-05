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

const createBaseSdk = (type) => (_api) => {
  return {
    get type() {
      return type;
    },
    get parent() {
      return null;
    }
  };
};

const createVisibilitySdk = (api) => {
  const { props, setProps } = api;
  return {
    get hidden() {
      return props?.isHidden || props?.hidden || false;
    },
    show() {
      setProps({ hidden: false });
    },
    hide() {
      setProps({ hidden: true });
    }
  };
};

const elementSdkFactory = (type) => composeSDKFactories([createBaseSdk(type), createVisibilitySdk]);

const COLLAPSIBLE_TEXT_SDK_TYPE = "$w.CollapsibleText";
const createCollapsibleTextSdk = (api) => {
  const { props, setProps } = api;
  return {
    get type() {
      return COLLAPSIBLE_TEXT_SDK_TYPE;
    },
    get text() {
      return props.text || "";
    },
    set text(value) {
      setProps({ elementProps: { text: { text: value || "" } } });
    },
    get expandMode() {
      return props.expandMode || "";
    },
    set expandMode(value) {
      setProps({ elementProps: { text: { expandMode: value || "" } } });
    },
    get readMore() {
      return props.readMoreText || "";
    },
    set readMore(value) {
      setProps({ elementProps: { button: { readMoreText: value || "" } } });
    },
    get readLess() {
      return props.readLessText || "";
    },
    set readLess(value) {
      setProps({ elementProps: { button: { readLessText: value || "" } } });
    },
    get linkText() {
      return props.linkText || "";
    },
    set linkText(value) {
      setProps({ elementProps: { button: { linkText: value || "" } } });
    },
    get link() {
      return props.link || "";
    },
    set link(value) {
      setProps({ elementProps: { button: { link: value || "" } } });
    },
    onClick(callback) {
      setProps({ onClick: callback });
    },
    onDblClick(callback) {
      setProps({ onDblClick: callback });
    },
    onMouseEnter(callback) {
      setProps({ onMouseEnter: callback });
    },
    onMouseLeave(callback) {
      setProps({ onMouseLeave: callback });
    },
    toJSON() {
      return {
        type: COLLAPSIBLE_TEXT_SDK_TYPE,
        text: props.text || "",
        expandMode: props.expandMode || "",
        readMore: props.readMoreText || "",
        readLess: props.readLessText || "",
        linkText: props.linkText || ""
      };
    }
  };
};
const sdk = composeSDKFactories([
  elementSdkFactory(COLLAPSIBLE_TEXT_SDK_TYPE),
  createCollapsibleTextSdk,
  createA11ySdk({ a11yProperty: "a11y" })
]);

export { sdk as default };
