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

function defineService(id) {
    return id;
}

/** @deprecated */
const SdkStateDefinition = defineService('@wix/viewer-service-sdk-state');

const createValueSdkFactory = ({ valueProperty }) => (api) => {
  const { props, getService } = api;
  const sdkService = getService(SdkStateDefinition);
  const sdkState = sdkService.for(props.wix.wixPath);
  return {
    get value() {
      return sdkState.get(valueProperty);
    },
    set value(_value) {
      sdkState.set(valueProperty, _value);
    }
  };
};

const createValiditySdkFactory = ({ validityIndicationProperty }) => (api) => {
  const { props, getService } = api;
  const sdkService = getService(SdkStateDefinition);
  const sdkState = sdkService.for(props.wix.wixPath);
  return {
    get validityIndication() {
      return sdkState.get(validityIndicationProperty);
    },
    updateValidityIndication() {
      sdkState.set(validityIndicationProperty, true);
    },
    resetValidityIndication() {
      sdkState.set(validityIndicationProperty, false);
    }
  };
};

const createTextInputSdk = (api) => {
  const { props, setProps } = api;
  return {
    get max() {
      return props.max;
    },
    set max(value) {
      if (value === void 0 || value === null) {
        setProps({ max: null });
      }
      setProps({ max: value });
    },
    get min() {
      return props.min;
    },
    set min(value) {
      if (value === void 0 || value === null) {
        setProps({ min: null });
      }
      setProps({ min: value });
    },
    get inputType() {
      return props.inputType;
    },
    set inputType(value) {
      setProps({ inputType: value });
    },
    get prefix() {
      return props.prefix || "";
    },
    set prefix(value) {
      const prefix = value || "";
      setProps({ prefix });
    },
    get numberSpinnerHidden() {
      return typeof props.numberSpinnerHidden !== "undefined" ? props.numberSpinnerHidden : false;
    },
    hideNumberSpinner() {
      setProps({ numberSpinnerHidden: true });
      return Promise.resolve();
    },
    showNumberSpinner() {
      setProps({ numberSpinnerHidden: false });
      return Promise.resolve();
    }
  };
};
const sdk = composeSDKFactories([
  createTextInputSdk,
  createA11ySdk({ a11yProperty: "a11y" }),
  createValueSdkFactory({ valueProperty: "value" }),
  createValiditySdkFactory({
    validityIndicationProperty: "shouldShowValidityIndication"
  })
]);

export { sdk as default };
