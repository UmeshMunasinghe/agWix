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

function camelToKebab(str) {
  return str.split(/(?=[A-Z])/).join("-").toLowerCase();
}
function stringifyOnDemand(value) {
  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value);
  }
  return value;
}
function noop() {
  return createSdkProxy();
}
function createSdkProxy(slotContentSdk = {}) {
  return new Proxy(slotContentSdk, {
    set: (sdk, propName, value) => {
      if (propName in sdk) {
        sdk[propName] = value;
      }
      return true;
    },
    get: (sdk, propName) => {
      if (propName === "isMethodSupported") {
        return (methodName) => methodName in sdk;
      }
      if (propName in sdk) {
        return sdk[propName];
      }
      return noop;
    }
  });
}
function createCustomElementPluginSdkProxy(slotContentSdk = {}) {
  return new Proxy(slotContentSdk, {
    set: (sdk, propName, value) => {
      if (typeof value !== "function") {
        sdk.setAttribute(camelToKebab(propName), stringifyOnDemand(value));
        sdk.setDirectProp(propName, value);
      } else {
        sdk.setDirectMethod(propName, value);
      }
      sdk[propName] = value;
      return true;
    },
    get: (sdk, propName) => {
      if (propName === "isMethodSupported") {
        return () => true;
      }
      if (propName in sdk) {
        return sdk[propName];
      }
      return (cb) => {
        if (typeof cb === "function") {
          console.warn(
            `Passing callbacks to plugin methods will be deprecated soon. Instead assign method directly, like: slot.${propName}(...args);`
          );
          sdk.setDirectMethod(propName, cb);
        }
      };
    }
  });
}
const slotsPlaceholderCompFactory = (slotName) => ({ getSlot }) => {
  const slotContentSdk = getSlot(slotName);
  const pluginType = slotContentSdk?.type;
  return {
    get slot() {
      switch (pluginType) {
        case "$w.CustomElementComponent":
          return createCustomElementPluginSdkProxy(slotContentSdk);
        default:
          return createSdkProxy(slotContentSdk);
      }
    }
  };
};

const SLOT_NAME = "content";
const sdk = composeSDKFactories([
  elementSdkFactory("$w.SlotsPlaceholder"),
  slotsPlaceholderCompFactory(SLOT_NAME),
  createA11ySdk({ a11yProperty: "a11y" })
]);

export { sdk as default };
