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

const sanitizeItem = (item) => Object.entries(item).reduce((acc, [key, value]) => {
  if (isNil(value)) {
    return acc;
  } else if (!isDate(value)) {
    if (isObject(value)) {
      return {
        ...acc,
        [key]: sanitizeItem(value)
      };
    } else if (isArray(value)) {
      return {
        ...acc,
        [key]: value.map(sanitizeItem)
      };
    }
  }
  return { ...acc, [key]: value };
}, {});
const transformPropDataToSdkData = (menuDataItem) => sanitizeItem({
  label: menuDataItem.label,
  link: menuDataItem.link?.href,
  selected: menuDataItem.selected,
  target: menuDataItem.link?.target,
  id: menuDataItem._id,
  menuItems: menuDataItem.items?.map(transformPropDataToSdkData)
});
const transformSdkDataToPropData = (sdkMenuItem) => sanitizeItem({
  label: sdkMenuItem.label || "",
  link: {
    href: sdkMenuItem.link,
    target: sdkMenuItem.target
  },
  isVisible: true,
  isVisibleMobile: true,
  selected: sdkMenuItem.selected,
  _id: sdkMenuItem.id,
  items: sdkMenuItem.menuItems?.map(transformSdkDataToPropData)
});

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
const unsupportedLinkType = ({ functionName, wrongValue, index }) => {
  return templates.error_supported_link_type_with_index({
    functionName,
    wrongValue,
    index
  });
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

function defineService(id) {
    return id;
}

const defineStaticService = defineService;

/** @deprecated */
const LinkUtilsDefinition = defineStaticService('@wix/viewer-service-link-utils');

class NilAssignmentError extends Error {
  constructor(params) {
    const message = nilAssignmentMessage(params);
    super(message);
    this.name = "NilAssignmentError";
    this.message = message;
  }
}
class UnsupportedLinkTypeError extends Error {
  constructor(params) {
    const message = unsupportedLinkType(params);
    super(message);
    this.name = "UnsupportedLinkTypeError";
    this.message = message;
  }
}
class InvalidLabelError extends NilAssignmentError {
  constructor(index) {
    super({
      functionName: "menuItems",
      propertyName: "label",
      index
    });
    this.name = "InvalidLabelError";
  }
}
class InvalidIdPatternError extends Error {
  constructor({
    index,
    label,
    id
  }) {
    super(
      templates.error_menu_items_id_pattern({
        index,
        label,
        id
      })
    );
    this.name = "InvalidIdPatternError";
  }
}
class NonUniqueIdError extends Error {
  constructor({ id }) {
    super(templates.error_menu_items_id_uniqueness({ id }));
    this.name = "NonUniqueIdError";
  }
}
class InvalidTargetError extends Error {
  constructor({
    index,
    label,
    target
  }) {
    super(
      templates.error_menu_items_target({
        index,
        label,
        target
      })
    );
    this.name = "InvalidTargetError";
  }
}
class InvalidMenuDepthError extends Error {
  constructor(maxLevels, labelValue) {
    super(
      templates.error_menu_items_depth({
        labelValue,
        maxLevels
      })
    );
    this.name = "InvalidMenuDepth";
  }
}
class LinkTypeError extends UnsupportedLinkTypeError {
  constructor(wrongValue, index) {
    super({
      functionName: "menuItems",
      propertyName: "link",
      wrongValue,
      index
    });
  }
}

const idPattern = /^[a-zA-Z\d-]*$/;
const validateIdPattern = (items, parentIndex) => {
  items?.every(({ id, link = "", label = link, menuItems }, index) => {
    if (id && !idPattern.test(id)) {
      throw new InvalidIdPatternError({
        index: parentIndex === void 0 ? index : parentIndex,
        label,
        id
      });
    }
    return validateIdPattern(menuItems, index);
  });
};
const validateIdUniqueness = (items) => {
  const ids = getItemIds(items || []);
  const duplicatedId = findDuplicate(ids);
  if (duplicatedId !== void 0) {
    throw new NonUniqueIdError({ id: duplicatedId });
  }
};
const getItemIds = (menuItems) => {
  return menuItems.reduce(
    (agg, curr) => {
      return [
        ...agg,
        ...isString(curr.id) ? [curr.id] : [],
        ...curr.menuItems ? getItemIds(curr.menuItems) : []
      ];
    },
    []
  );
};
const findDuplicate = (arr) => {
  return arr.find((value, idx) => {
    return idx !== arr.lastIndexOf(value);
  });
};
const validateMenuItemsId = (menuItems) => {
  try {
    validateIdUniqueness(menuItems);
    validateIdPattern(menuItems);
  } catch (error) {
    reportError(error.message);
    return false;
  }
  return true;
};

const validateMenuItemsTarget = (value) => {
  if (!value) {
    return true;
  }
  const checkMenuItemsTarget = (items, parentIndex) => items?.every(({ target, link = "", label = link, menuItems }, index) => {
    if (target != null && target !== "_blank" && target !== "_self") {
      throw new InvalidTargetError({
        index: parentIndex === void 0 ? index : parentIndex,
        label,
        target
      });
    }
    return checkMenuItemsTarget(menuItems, index);
  }) ?? true;
  try {
    return checkMenuItemsTarget(value);
  } catch (error) {
    reportError(error.message);
    return false;
  }
};

const validateMenuItemsDepth = (maxLevels) => (value) => {
  if (!value) {
    return true;
  }
  const checkMenuItemsLevel = ({
    currentLevel,
    items
  }) => {
    if (!items) {
      return true;
    }
    if (items.length === 0) {
      return true;
    } else if (currentLevel < 0) {
      return false;
    }
    return items.every(({ menuItems, label, link }) => {
      const hasMenuItems = typeof menuItems !== "undefined";
      if (!hasMenuItems) {
        return true;
      }
      const isValidMenuItems = checkMenuItemsLevel({
        items: menuItems,
        currentLevel: currentLevel - 1
      });
      if (!isValidMenuItems) {
        throw new InvalidMenuDepthError(maxLevels + 1, label || link || "");
      }
      return isValidMenuItems;
    });
  };
  return value.every(({ menuItems, label, link }) => {
    try {
      const result = checkMenuItemsLevel({
        items: menuItems,
        currentLevel: maxLevels - 1
      });
      if (result === false) {
        throw new InvalidMenuDepthError(maxLevels + 1, label || link || "");
      }
    } catch (error) {
      reportError(error.message);
      return false;
    }
    return true;
  });
};

const pageUrlRegex = /^\/([^ ?#]*)[?]?(.*)/;
const isPageUrl = (url) => pageUrlRegex.test(url);
const getLink = ({
  link,
  target,
  linkUtils
}) => {
  if (!isNil(link)) {
    const passedTarget = target;
    return linkUtils.getLinkProps(link, passedTarget);
  }
  return {};
};
const getPageTitleFromUrl = (url, pageList) => {
  const key = url.slice(1);
  if (pageList.hasOwnProperty(key)) {
    return pageList[key]?.title;
  }
  return void 0;
};
const getLabel = ({
  link,
  label,
  pageList
}) => {
  if (!isNil(label)) {
    return label;
  }
  if (!isNil(link) && isPageUrl(link)) {
    return getPageTitleFromUrl(link, pageList);
  }
  return void 0;
};

const validators = [
  validateMenuItemsDepth(1),
  validateMenuItemsTarget,
  validateMenuItemsId
];
const validateMenuItems = (menuItems) => {
  let isValid = true;
  isValid = validators.every((validator) => validator(menuItems));
  return isValid;
};
const getMenuItems = (linkUtils, pageList, items) => {
  if (isArray(items)) {
    return items.map(
      (menuItem, i) => createMenuDataItem(menuItem, i, linkUtils, pageList)
    );
  }
  return [];
};
const createMenuDataItem = (menuDataItem, index, linkUtils, pageList) => {
  const menuSdkItem = {};
  try {
    const linkData = getLink({
      linkUtils,
      link: menuDataItem.link,
      target: menuDataItem.target || "_self"
    });
    if (linkData.href) {
      menuSdkItem.link = linkData.href;
      menuSdkItem.target = linkData.target || "_self";
    }
  } catch (error) {
    throw new LinkTypeError(menuDataItem.link || "", index);
  }
  const label = getLabel({
    label: menuDataItem.label,
    link: menuDataItem.link,
    pageList
  });
  if (isNil(label)) {
    throw new InvalidLabelError(index);
  }
  if (!isNil(menuDataItem.id)) {
    menuSdkItem.id = menuDataItem.id;
  }
  menuSdkItem.label = label;
  if (!isNil(menuDataItem.selected)) {
    menuSdkItem.selected = menuDataItem.selected;
  }
  return {
    ...menuSdkItem,
    menuItems: getMenuItems(linkUtils, pageList, menuDataItem.menuItems)
  };
};

const createMenuSdk = (api) => {
  const { props, setProps, getService } = api;
  const linkUtils = getService(LinkUtilsDefinition);
  return {
    get type() {
      return "$w.Menu";
    },
    get menuItems() {
      const menuDataItems = props.elementProps?.navbar?.items?.map(
        transformPropDataToSdkData
      ) ?? [];
      return menuDataItems?.map(
        (menuItem, i) => (
          // TODO: get pageList from sdkData
          createMenuDataItem(menuItem, i, linkUtils, {})
        )
      ) ?? [];
    },
    set menuItems(menuDataItems) {
      const isValidMenuItems = validateMenuItems(menuDataItems);
      if (!isValidMenuItems) {
        return;
      }
      const updatedMenuItems = menuDataItems?.map(
        (menuItem, i) => (
          // TODO: get pageList from sdkData
          createMenuDataItem(menuItem, i, linkUtils, {})
        )
      ).map(transformSdkDataToPropData) ?? [];
      setProps({
        elementProps: {
          ...props.elementProps,
          navbar: { ...props.elementProps.navbar, items: updatedMenuItems }
        }
      });
    },
    onItemMouseIn: (handler) => registerCorvidMouseEvent(
      "onItemMouseIn",
      api,
      handler,
      (payload) => ({
        item: transformPropDataToSdkData(payload),
        type: "itemMouseIn"
      })
    ),
    onItemMouseOut: (handler) => registerCorvidMouseEvent(
      "onItemMouseOut",
      api,
      handler,
      (payload) => ({
        item: transformPropDataToSdkData(payload),
        type: "itemMouseOut"
      })
    ),
    onItemClick: (handler) => registerCorvidMouseEvent(
      "onItemClick",
      api,
      handler,
      (payload) => ({
        item: transformPropDataToSdkData(payload),
        type: "itemMouseClick"
      })
    ),
    onItemDblClick: (handler) => registerCorvidMouseEvent(
      "onItemDblClick",
      api,
      handler,
      (payload) => ({
        item: transformPropDataToSdkData(payload),
        type: "itemMouseDblClick"
      })
    )
  };
};
const sdk = composeSDKFactories([
  createMenuSdk,
  createA11ySdk({ a11yProperty: "a11y" })
]);

export { sdk as default };
