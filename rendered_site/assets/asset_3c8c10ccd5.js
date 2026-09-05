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

const FULL_PROGRESS = 100;
const NO_PROGRESS = 0;

function getProgressValue(value = NO_PROGRESS, targetValue = FULL_PROGRESS) {
  if (targetValue === 0) {
    return NO_PROGRESS;
  }
  const relativeValue = Math.min(value / targetValue * 100, FULL_PROGRESS);
  return +relativeValue.toFixed(2);
}

const PROGRESS_BAR_SDK_TYPE = "$w.ProgressBar";
const createProgressBarSdk = (api) => {
  const { props, setProps } = api;
  return {
    get type() {
      return PROGRESS_BAR_SDK_TYPE;
    },
    get value() {
      return props.value ?? NO_PROGRESS;
    },
    set value(value) {
      const max = props.targetValue ?? FULL_PROGRESS;
      const clampedValue = Math.max(NO_PROGRESS, Math.min(value, max));
      setProps({ value: clampedValue });
    },
    get targetValue() {
      return props.targetValue ?? FULL_PROGRESS;
    },
    set targetValue(targetValue) {
      setProps({ targetValue });
    },
    get label() {
      return props.label;
    },
    set label(label) {
      setProps({ label });
    },
    get percentage() {
      const { value, targetValue } = props;
      return getProgressValue(value, targetValue);
    },
    toJSON() {
      return {
        type: "$w.ProgressBar",
        value: props.value,
        targetValue: props.targetValue ?? FULL_PROGRESS
      };
    }
  };
};
const ProgressBarSdk = composeSDKFactories([
  createProgressBarSdk,
  createA11ySdk({ a11yProperty: "a11y" })
]);

export { ProgressBarSdk as default };
