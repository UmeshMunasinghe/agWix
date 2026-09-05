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

const SOCIAL_PLAYER_FACEBOOK_SDK_TYPE = "$w.FacebookPlayer";
const createSocialPlayerFacebookSdk = (api) => {
  const { props, setProps } = api;
  return {
    get type() {
      return SOCIAL_PLAYER_FACEBOOK_SDK_TYPE;
    },
    get src() {
      return props.url || "";
    },
    set src(value) {
      setProps({ url: value });
    },
    get description() {
      return props.description || "";
    },
    set description(value) {
      setProps({ description: value });
    },
    get autoPlay() {
      return props.autoPlay ?? false;
    },
    set autoPlay(value) {
      setProps({ autoPlay: value });
    },
    get showCaptions() {
      return props.enabledCaptions ?? false;
    },
    set showCaptions(value) {
      setProps({ enabledCaptions: value });
    }
  };
};
const SocialPlayerFacebookSdk = composeSDKFactories([
  elementSdkFactory(SOCIAL_PLAYER_FACEBOOK_SDK_TYPE),
  createSocialPlayerFacebookSdk
]);

export { SocialPlayerFacebookSdk as default };
