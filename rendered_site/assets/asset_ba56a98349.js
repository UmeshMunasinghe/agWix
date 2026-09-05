const modifySourceKey = (key) => {
  return "aria" + key.charAt(0).toUpperCase() + key.slice(1);
};
function composeSDKFactories(sources, options) {
  const { modifyAriaSourceKeys } = options ?? {};
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
const invalidStateInputMessage = ({ functionName, propertyName, stateBoxId, value }) => templates.error_state_input({
  functionName,
  propertyName,
  stateBoxId,
  value
});

const WIX_SDK_ERROR_TEXT = "Wix code SDK error:";
const WIX_SDK_WARNING_TEXT = "Wix code SDK warning:";
const reportError = (message) => {
  console.error(`${WIX_SDK_ERROR_TEXT} ${message}`);
};
const reportWarning = (message) => {
  console.warn(`${WIX_SDK_WARNING_TEXT} ${message}`);
};

const isValidStateReference = (functionArgs, sdkFactoryArgs) => {
  const [stateReference] = functionArgs;
  const isObjectStateReference = isObject(stateReference);
  const states = sdkFactoryArgs.getChildren();
  let inputState = -1;
  if (isObject(stateReference)) {
    const isValidStateSDKObject = Object.keys(states[0]).every(
      (key) => stateReference.hasOwnProperty(key)
    );
    if (!isValidStateSDKObject) {
      reportError(
        invalidTypeMessage({
          propertyName: "stateReference",
          functionName: "changeState",
          value: stateReference,
          types: ["state", "string"],
          index: void 0
        })
      );
      return false;
    }
    inputState = states.findIndex(
      (state) => state.uniqueId === stateReference.uniqueId
    );
  }
  if (isString(stateReference)) {
    inputState = states.findIndex((state) => state.role === stateReference);
  }
  if (inputState < 0) {
    reportError(
      invalidStateInputMessage({
        value: isObjectStateReference ? stateReference.role : stateReference,
        propertyName: "stateReference",
        functionName: "changeState",
        stateBoxId: sdkFactoryArgs.metaData.role
      })
    );
    return false;
  }
  return true;
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
function withValidation(sdkFactory, schema, rules = {}) {
  return (api) => {
    const sdk = sdkFactory(api);
    const schemaValidator = createCompSchemaValidator(api.metaData.role);
    const argsSchemaValidator = createCompSchemaValidator(api.metaData.role, {
      suppressIndexErrors: true
    });
    const sdkWithValidation = Object.keys(sdk).reduce((acc, sdkPropName) => {
      const propDesc = Object.getOwnPropertyDescriptor(
        sdk,
        sdkPropName
      );
      const propWithValidationDesc = {
        // retrieve value from sdk
        enumerable: true,
        configurable: true
      };
      if (propDesc.value) {
        if (typeof propDesc.value === "function") {
          propWithValidationDesc.value = (...args) => {
            const argsSchema = schema.properties[sdkPropName] && schema.properties[sdkPropName].args;
            const customValidation = rules[sdkPropName];
            let isValid = true;
            if (argsSchema) {
              isValid = argsSchemaValidator(
                args,
                { type: ["array"], items: argsSchema },
                sdkPropName
              );
            }
            if (isValid && customValidation) {
              isValid = customValidation.every((p) => p(args, api));
            }
            return isValid ? propDesc.value(...args) : void 0;
          };
        } else {
          propWithValidationDesc.value = propDesc.value;
        }
      } else {
        if (propDesc.get) {
          propWithValidationDesc.get = () => sdk[sdkPropName];
        }
        if (propDesc.set) {
          propWithValidationDesc.set = (value) => {
            const customValidation = rules[sdkPropName];
            let isValid = true;
            if (schema.properties[sdkPropName]) {
              isValid = schemaValidator(
                value,
                schema.properties[sdkPropName],
                sdkPropName
              );
            }
            if (isValid && customValidation) {
              isValid = customValidation.every((p) => p(value, api));
            }
            if (!isValid) {
              return;
            }
            sdk[sdkPropName] = value;
          };
        }
      }
      Object.defineProperty(acc, sdkPropName, propWithValidationDesc);
      return acc;
    }, {});
    return sdkWithValidation;
  };
}

const ACTION_TYPES = {
  CLICK: "click",
  DBL_CLICK: "dblClick",
  MOUSE_IN: "mouseenter",
  MOUSE_OUT: "mouseleave",
  CHANGE: "change",
  BLUR: "blur",
  FOCUS: "focus",
  IMAGE_CHANGED: "imageChanged",
  IMAGE_EXPANDED: "imageExpanded",
  ON_INPUT: "onInput",
  ITEM_CLICKED: "itemClicked",
  CELL_SELECT: "cellSelect",
  CELL_EDIT: "cellEdit",
  ROW_SELECT: "rowSelect",
  FETCH_DATA: "fetchData",
  DATA_CHANGE: "dataChange",
  ON_TIMEOUT: "onTimeout",
  ON_VERIFY: "onVerified",
  ON_ERROR: "onError",
  ON_PLAY: "onPlay",
  ON_PAUSE: "onPause",
  ON_PROGRESS: "onProgress",
  ON_ENDED: "onEnded",
  AUTOPLAY_OFF: "autoplayOff",
  AUTOPLAY_ON: "autoplayOn",
  PLAY_ENDED: "playEnded",
  PLAY_PROGRESS: "playProgress",
  KEY_PRESS: "keyPress",
  KEY_UP: "keyUp",
  KEY_DOWN: "keyDown",
  SCREEN_IN: "screenIn",
  VIEWPORT_ENTER: "viewportEnter",
  VIEWPORT_LEAVE: "viewportLeave",
  SCROLL: "scroll",
  VALIDATE: "validate",
  SET_CUSTOM_VALIDITY: "setCustomValidity",
  SYNC_VALIDATION_DATA: "syncValidationData",
  UPDATE_VALIDITY_INDICATION: "updateValidityIndication",
  MESSAGE: "message",
  UPLOAD_COMPLETE: "uploadComplete",
  ITEM_READY: "itemReady",
  ITEM_REMOVED: "itemRemoved",
  TAG_CLICK: "tagClick",
  QUICK_ACTION_BAR_ITEM_CLICKED: "quickActionBarItemClicked",
  GOOGLE_MAP_MARKER_CLICKED: "markerClicked",
  GOOGLE_MAP_CLICKED: "mapClicked",
  ICON_MOUSE_IN: "iconMouseIn",
  ON_STATE_CHANGE: "onStateChange",
  ITEM_MOUSE_IN: "itemMouseIn",
  ITEM_MOUSE_OUT: "itemMouseOut",
  ITEM_MOUSE_CLICK: "itemMouseClick",
  ITEM_MOUSE_DOUBLE_CLICK: "itemMouseDblClick",
  ON_COLOR_CHANGE: "onColorChange",
  ON_FONT_CHANGE: "onFontChange",
  ON_OPACITY_CHANGE: "onOpacityChange"
};
const EVENT_TYPES_MAP = {
  [ACTION_TYPES.CLICK]: "onClick",
  [ACTION_TYPES.DBL_CLICK]: "onDblClick",
  [ACTION_TYPES.MOUSE_IN]: "onMouseIn",
  [ACTION_TYPES.MOUSE_OUT]: "onMouseOut",
  [ACTION_TYPES.CHANGE]: "onChange",
  [ACTION_TYPES.ON_INPUT]: "onInput",
  [ACTION_TYPES.BLUR]: "onBlur",
  [ACTION_TYPES.FOCUS]: "onFocus",
  [ACTION_TYPES.IMAGE_CHANGED]: "onCurrentItemChanged",
  [ACTION_TYPES.IMAGE_EXPANDED]: void 0,
  [ACTION_TYPES.ITEM_CLICKED]: "onItemClicked",
  [ACTION_TYPES.CELL_SELECT]: "onCellSelect",
  [ACTION_TYPES.CELL_EDIT]: void 0,
  [ACTION_TYPES.ROW_SELECT]: "onRowSelect",
  [ACTION_TYPES.FETCH_DATA]: void 0,
  [ACTION_TYPES.DATA_CHANGE]: "onDataChange",
  [ACTION_TYPES.ON_TIMEOUT]: "onTimeout",
  [ACTION_TYPES.ON_VERIFY]: "onVerified",
  [ACTION_TYPES.ON_ERROR]: "onError",
  [ACTION_TYPES.ON_PLAY]: "onPlay",
  [ACTION_TYPES.ON_PAUSE]: "onPause",
  [ACTION_TYPES.ON_PROGRESS]: "onProgress",
  [ACTION_TYPES.ON_ENDED]: "onEnded",
  [ACTION_TYPES.AUTOPLAY_OFF]: "onPause",
  [ACTION_TYPES.AUTOPLAY_ON]: "onPlay",
  [ACTION_TYPES.PLAY_ENDED]: void 0,
  [ACTION_TYPES.PLAY_PROGRESS]: void 0,
  [ACTION_TYPES.KEY_PRESS]: "onKeyPress",
  [ACTION_TYPES.KEY_UP]: "onKeyUp",
  [ACTION_TYPES.KEY_DOWN]: "onKeyDown",
  [ACTION_TYPES.SCREEN_IN]: void 0,
  [ACTION_TYPES.VIEWPORT_ENTER]: "onViewportEnter",
  [ACTION_TYPES.VIEWPORT_LEAVE]: "onViewportLeave",
  [ACTION_TYPES.SCROLL]: void 0,
  [ACTION_TYPES.VALIDATE]: void 0,
  [ACTION_TYPES.SET_CUSTOM_VALIDITY]: void 0,
  [ACTION_TYPES.SYNC_VALIDATION_DATA]: void 0,
  [ACTION_TYPES.UPDATE_VALIDITY_INDICATION]: void 0,
  [ACTION_TYPES.MESSAGE]: "onMessage",
  [ACTION_TYPES.UPLOAD_COMPLETE]: void 0,
  [ACTION_TYPES.ITEM_READY]: "onItemReady",
  [ACTION_TYPES.ITEM_REMOVED]: "onItemRemoved",
  [ACTION_TYPES.TAG_CLICK]: void 0,
  [ACTION_TYPES.QUICK_ACTION_BAR_ITEM_CLICKED]: "onItemClicked",
  [ACTION_TYPES.GOOGLE_MAP_MARKER_CLICKED]: "onMarkerClicked",
  [ACTION_TYPES.GOOGLE_MAP_CLICKED]: "onMapClicked",
  [ACTION_TYPES.ICON_MOUSE_IN]: void 0,
  [ACTION_TYPES.ON_STATE_CHANGE]: "onStateChange",
  [ACTION_TYPES.ITEM_MOUSE_IN]: "onItemMouseIn",
  [ACTION_TYPES.ITEM_MOUSE_OUT]: "onItemMouseOut",
  [ACTION_TYPES.ITEM_MOUSE_CLICK]: "onItemClick",
  [ACTION_TYPES.ITEM_MOUSE_DOUBLE_CLICK]: "onItemDblClick",
  [ACTION_TYPES.ON_COLOR_CHANGE]: "onColorChange",
  [ACTION_TYPES.ON_FONT_CHANGE]: "onFontChange",
  [ACTION_TYPES.ON_OPACITY_CHANGE]: "onOpacityChange"
};

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
const removeOnPrefix = (st) => st.replace(/^on/i, "");
const mapMethodNameToEventName = (methodName) => {
  const mapEntry = Object.entries(eventNameMapToMethodName).find(
    ([_, value]) => removeOnPrefix(value.toLowerCase()) === removeOnPrefix(methodName.toLowerCase())
  );
  return mapEntry?.[0] ?? methodName;
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
const isEventNameMatches = (eventName, userRequestedEventNameOrActionType) => {
  const targetEventName = mapMethodNameToEventName(
    EVENT_TYPES_MAP[userRequestedEventNameOrActionType] ?? userRequestedEventNameOrActionType
  );
  return eventName.toLowerCase() === targetEventName.toLowerCase();
};
const unregisterCorvidEvent = (eventNameOrActionType, api, cb) => {
  const { metaData, getSdkInstance } = api;
  const [eventListenerState, setEventListenerState] = createEventListenerState(api);
  const eventListeners = eventListenerState.listeners.filter(
    (listener) => isEventNameMatches(listener.eventName, eventNameOrActionType) && listener.cb === cb && listener.compId === metaData.compId
  );
  for (const listener of eventListeners) {
    listener.unregister();
  }
  setEventListenerState({
    listeners: eventListenerState.listeners.filter(
      (listener) => !eventListeners.includes(listener)
    )
  });
  return getSdkInstance();
};
const registerCorvidMouseEvent = (eventName, api, cb, payloadProjection) => registerCorvidEvent(eventName, api, cb, ({ componentEvent, eventPayload }) => ({
  ...convertToCorvidMouseEvent(componentEvent),
  ...eventPayload && payloadProjection?.(eventPayload)
}));

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

const createViewportPropsSDKFactory = (registerCallback) => {
  return (api) => {
    const { metaData, getSdkInstance, create$w, createEvent } = api;
    const functionValidator = (value, setterName) => createCompSchemaValidator(metaData.role)(
      value,
      {
        type: ["function"]
      },
      setterName
    );
    return {
      onViewportEnter: (cb) => {
        if (!functionValidator(cb, "onViewportEnter")) {
          return getSdkInstance();
        }
        registerCallback?.("onViewportEnter", () => {
          const corvidEvent = createEvent({ type: "viewportEnter" });
          const $w = create$w();
          cb(corvidEvent, $w);
        });
        return registerCorvidEvent("onViewportEnter", api, cb);
      },
      onViewportLeave: (cb) => {
        if (!functionValidator(cb, "onViewportLeave")) {
          return getSdkInstance();
        }
        registerCallback?.("onViewportLeave", () => {
          const corvidEvent = createEvent({ type: "viewportLeave" });
          const $w = create$w();
          cb(corvidEvent, $w);
        });
        return registerCorvidEvent("onViewportLeave", api, cb);
      }
    };
  };
};

const sharedEffectDefaultOptions = {
  duration: 1200,
  delay: 0
};
const effectDefaultOptions = {
  arc: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  bounce: {
    ...sharedEffectDefaultOptions,
    direction: "topLeft",
    intensity: "medium"
  },
  puff: {
    ...sharedEffectDefaultOptions
  },
  zoom: {
    ...sharedEffectDefaultOptions
  },
  fade: {
    ...sharedEffectDefaultOptions
  },
  flip: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  float: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  fly: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  fold: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  glide: {
    ...sharedEffectDefaultOptions,
    angle: 0,
    distance: 0
  },
  roll: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  slide: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  spin: {
    ...sharedEffectDefaultOptions,
    direction: "cw",
    cycles: 5
  },
  turn: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  ArcIn: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  ArcOut: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  BounceIn: {
    ...sharedEffectDefaultOptions,
    direction: "topLeft",
    intensity: "medium"
  },
  BounceOut: {
    ...sharedEffectDefaultOptions,
    direction: "topLeft",
    intensity: "medium"
  },
  ExpandIn: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  CollapseOut: {
    ...sharedEffectDefaultOptions
  },
  Conceal: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  Reveal: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  FadeIn: {
    ...sharedEffectDefaultOptions
  },
  FadeOut: {
    ...sharedEffectDefaultOptions
  },
  FlipIn: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  FlipOut: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  FloatIn: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  FloatOut: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  FlyIn: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  FlyOut: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  FoldIn: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  FoldOut: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  GlideIn: {
    ...sharedEffectDefaultOptions,
    angle: 0,
    distance: 150
  },
  GlideOut: {
    ...sharedEffectDefaultOptions,
    angle: 0,
    distance: 150
  },
  DropIn: {
    ...sharedEffectDefaultOptions
  },
  PopOut: {
    ...sharedEffectDefaultOptions
  },
  SlideIn: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  SlideOut: {
    ...sharedEffectDefaultOptions,
    direction: "left"
  },
  SpinIn: {
    ...sharedEffectDefaultOptions,
    direction: "cw",
    cycles: 2
  },
  SpinOut: {
    ...sharedEffectDefaultOptions,
    direction: "cw",
    cycles: 2
  },
  TurnIn: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  },
  TurnOut: {
    ...sharedEffectDefaultOptions,
    direction: "right"
  }
};
const EFFECTS = {
  HIDE: {
    suffix: "out",
    deprecatedValues: [
      "ArcOut",
      "BounceOut",
      "CollapseOut",
      "Conceal",
      "FadeOut",
      "FlipOut",
      "FloatOut",
      "FlyOut",
      "FoldOut",
      "GlideOut",
      "PopOut",
      "SlideOut",
      "SpinOut",
      "TurnOut"
    ]
  },
  SHOW: {
    suffix: "in",
    deprecatedValues: [
      "ArcIn",
      "BounceIn",
      "DropIn",
      "ExpandIn",
      "FadeIn",
      "FlipIn",
      "FloatIn",
      "FlyIn",
      "FoldIn",
      "GlideIn",
      "Reveal",
      "SlideIn",
      "SpinIn",
      "TurnIn"
    ]
  }
};
const effectInfoLink = (propertyName) => `https://www.wix.com/corvid/reference/$w/hiddenmixin/${propertyName}`;

const duration = { type: ["number", "nil"], minimum: 0, maximum: 4e3 };
const delay = { type: ["number", "nil"], minimum: 0, maximum: 8e3 };
const direction = {
  type: ["string", "nil"],
  enum: ["left", "right", "top", "bottom"]
};
const effectsValidationSchema = {
  arc: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction: {
        type: ["string", "nil"],
        enum: ["left", "right"]
      }
    }
  },
  bounce: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction: {
        type: ["string", "nil"],
        enum: ["topLeft", "topRight", "bottomRight", "bottomLeft", "center"]
      },
      intensity: {
        type: ["string", "nil"],
        enum: ["soft", "medium", "hard"]
      }
    }
  },
  puff: {
    type: ["object"],
    properties: {
      duration,
      delay
    }
  },
  zoom: {
    type: ["object"],
    properties: {
      duration,
      delay
    }
  },
  fade: {
    type: ["object"],
    properties: {
      duration,
      delay
    }
  },
  flip: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction
    }
  },
  float: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction
    }
  },
  fly: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction
    }
  },
  fold: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction
    }
  },
  glide: {
    type: ["object"],
    properties: {
      duration,
      delay,
      angle: {
        type: ["number", "nil"],
        minimum: 0,
        maximum: 360
      },
      distance: {
        type: ["number", "nil"],
        minimum: 0,
        maximum: 300
      }
    }
  },
  roll: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction
    }
  },
  slide: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction
    }
  },
  spin: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction: {
        type: ["string", "nil"],
        enum: ["cw", "ccw"]
      },
      cycles: {
        type: ["number", "nil"],
        minimum: 1,
        maximum: 15
      }
    }
  },
  turn: {
    type: ["object"],
    properties: {
      duration,
      delay,
      direction: {
        type: ["string", "nil"],
        enum: ["right", "left"]
      }
    }
  }
};

const createInvalidOptionsTypeWarningReporter = ({
  effectName,
  propertyName,
  compName
}) => {
  return (message, messageParams) => {
    reportWarning(
      templates.warning_invalid_type_effect_options({
        propertyName,
        compName,
        effectName,
        wrongValue: `${messageParams?.value}`,
        infoLink: effectInfoLink(propertyName)
      })
    );
  };
};
const createWrongOptionsWarningReporter = ({
  effectName,
  propertyName,
  compName
}) => {
  return (message, messageParams) => {
    reportWarning(
      templates.warning_invalid_effect_options({
        propertyName,
        compName,
        effectName,
        wrongProperty: "value",
        wrongValue: `the key "${messageParams?.propertyName}" cannot be set to the value "${messageParams?.value}"`,
        infoLink: effectInfoLink(propertyName)
      })
    );
  };
};
const createEffectOptionsValidation = ({
  propertyName,
  compName
}) => {
  return (effectName, effectOptions) => {
    if (!effectName) {
      return false;
    }
    if (effectOptions === void 0) {
      return true;
    }
    const invalidOptionTypeReporter = createInvalidOptionsTypeWarningReporter({
      effectName,
      propertyName,
      compName
    });
    const isEffectOptionsTypeValid = () => createSchemaValidator(
      {
        reportError: invalidOptionTypeReporter,
        reportWarning: () => ({})
      },
      compName
    )(effectOptions, { type: ["object"] }, propertyName);
    if (!isEffectOptionsTypeValid()) {
      return false;
    }
    const invalidEffectOptionsReporter = createWrongOptionsWarningReporter({
      effectName,
      propertyName,
      compName
    });
    const isEffectOptionsValid = () => createSchemaValidator(
      {
        reportError: invalidEffectOptionsReporter,
        reportWarning: () => ({})
      },
      compName
    )(effectOptions, effectsValidationSchema[effectName], propertyName);
    if (!isEffectOptionsValid()) {
      return false;
    }
    return true;
  };
};

const isEmpty = (value) => {
  return Object.keys(value).length === 0;
};
const createEffectValidation = ({ compName }) => {
  return ({
    effectName,
    effectOptions,
    propertyName
  }) => {
    const validateEffectOption = createEffectOptionsValidation({
      propertyName,
      compName
    });
    if (!effectName && !effectOptions) {
      return false;
    }
    if (!effectName && effectOptions && !isEmpty(effectOptions)) {
      reportWarning(
        templates.warning_effect_options_not_set({
          propertyName,
          compName,
          infoLink: effectInfoLink(propertyName)
        })
      );
      return false;
    }
    const PROPERTY = propertyName === "hide" ? "HIDE" : "SHOW";
    const deprecatedValues = EFFECTS[PROPERTY]?.deprecatedValues;
    if (effectName && effectOptions && deprecatedValues && deprecatedValues.find((effect) => effect === effectName) && !isEmpty(effectOptions)) {
      reportWarning(
        templates.warning_deprecated_effect_with_options({
          compName,
          effectName,
          propertyName,
          infoLink: effectInfoLink(propertyName)
        })
      );
      return false;
    }
    if (deprecatedValues.find((effect) => effect === effectName)) {
      return true;
    }
    if (effectName && !(effectName in effectsValidationSchema)) {
      reportWarning(
        templates.warning_invalid_effect_name({
          propertyName,
          compName,
          effectName,
          infoLink: effectInfoLink(propertyName)
        })
      );
      return false;
    }
    if (!validateEffectOption(effectName, effectOptions)) {
      return false;
    }
    return true;
  };
};

const isValidClassName = (className, functionName) => {
  const classNameRegex = /^[a-zA-Z_-][a-zA-Z0-9_-]*$/;
  if (typeof className !== "string") {
    handleTypeError(className, functionName, "className", "string");
    return false;
  } else if (!classNameRegex.test(className)) {
    handleUnsupportedChars(className, functionName);
    return false;
  }
  return true;
};
const handleTypeError = (propertyName, functionName, value, expectedType) => {
  reportError(
    templates.error_type({
      propertyName,
      functionName,
      value,
      expectedType
    })
  );
};
const handleMandatoryVals = (propertyNames, functionName) => {
  reportError(
    templates.error_mandatory_multiple_vals({
      propertyNames,
      functionName
    })
  );
};
const handleMandatorySingleVal = (propertyName, functionName) => {
  reportError(
    templates.error_mandatory_val({
      propertyName,
      functionName
    })
  );
};
const handleUnsupportedChars = (propertyName, functionName) => {
  reportError(
    templates.error_unsupported_chars({
      propertyName,
      functionName
    })
  );
};

const createHiddenCollapsedSDKFactory = ({
  viewportState,
  hasPortal = false
} = {}) => ({
  setStyles,
  portal,
  metaData,
  getSdkInstance,
  runAnimation,
  createSdkState,
  styleUtils,
  setProps
}) => {
  const validateEffect = createEffectValidation({
    compName: metaData.role
  });
  const [state, setState] = createSdkState(
    {
      hidden: metaData.hiddenOnLoad,
      collapsed: metaData.collapsedOnLoad
    },
    "hidden-collapsed"
  );
  return {
    hide: async (effectName, effectOptions) => {
      setProps({ hidden: true });
      if (state.collapsed || state.hidden) {
        setState({ hidden: true });
        return;
      }
      if (validateEffect({
        effectName,
        effectOptions,
        propertyName: "hide"
      })) {
        const animationOptions = {
          animationDirection: EFFECTS.HIDE.suffix,
          effectName,
          effectOptions: {
            ...effectDefaultOptions?.[effectName] || sharedEffectDefaultOptions,
            ...effectOptions
          }
        };
        await Promise.all([
          runAnimation(animationOptions),
          hasPortal ? portal.runAnimation(animationOptions) : void 0
        ]);
      } else {
        setStyles(styleUtils.getHiddenStyles());
        if (hasPortal) {
          portal.setStyles(styleUtils.getHiddenStyles());
        }
      }
      setState({ hidden: true });
      viewportState?.onViewportLeave?.forEach((cb) => cb());
    },
    show: async (effectName, effectOptions) => {
      setProps({ hidden: false });
      if (state.collapsed || !state.hidden) {
        setState({ hidden: false });
        return;
      }
      if (validateEffect({
        effectName,
        effectOptions,
        propertyName: "show"
      })) {
        const runAnimationOptions = {
          animationDirection: EFFECTS.SHOW.suffix,
          effectName,
          effectOptions: {
            ...effectDefaultOptions?.[effectName] || sharedEffectDefaultOptions,
            ...effectOptions
          }
        };
        await Promise.all([
          runAnimation(runAnimationOptions),
          hasPortal ? portal.runAnimation(runAnimationOptions) : void 0
        ]);
      } else {
        setStyles(styleUtils.getShownStyles());
        if (hasPortal) {
          portal.setStyles(styleUtils.getShownStyles());
        }
      }
      setState({ hidden: false });
      viewportState?.onViewportEnter?.forEach((cb) => cb());
    },
    collapse: async () => {
      setProps({ collapsed: true });
      if (!state.collapsed) {
        setStyles(styleUtils.getCollapsedStyles());
        if (hasPortal) {
          portal.setStyles(styleUtils.getCollapsedStyles());
        }
        setState({ collapsed: true });
        if (!state.hidden) {
          viewportState?.onViewportLeave?.forEach((cb) => cb());
        }
      }
      return;
    },
    expand: async () => {
      setProps({ collapsed: false });
      if (state.collapsed) {
        const style = {
          ...styleUtils.getExpandedStyles(),
          visibility: state.hidden ? "hidden" : null
        };
        setStyles(style);
        if (hasPortal) {
          portal.setStyles(style);
        }
        setState({ collapsed: false });
        if (!state.hidden) {
          viewportState?.onViewportEnter?.forEach((cb) => cb());
        }
      }
      return;
    },
    get collapsed() {
      return state.collapsed;
    },
    get hidden() {
      return Boolean(state.hidden);
    },
    get isVisible() {
      if (!metaData.isRendered()) {
        return false;
      }
      let parentSdk = getSdkInstance();
      while (parentSdk) {
        if (parentSdk.hidden || parentSdk.collapsed) {
          return false;
        }
        parentSdk = parentSdk.parent;
      }
      return true;
    },
    get isAnimatable() {
      return true;
    }
  };
};

const visibilityPropsSDKFactory = (api, hasPortal = false) => {
  const [state, setState] = api.createSdkState(
    {
      onViewportEnter: [],
      onViewportLeave: []
    },
    "viewport"
  );
  const registerCallback = (type, callback) => {
    setState({ [type]: [...state[type], callback] });
  };
  const hiddenCollapsedSDKFactory = createHiddenCollapsedSDKFactory({
    viewportState: state,
    hasPortal
  });
  const viewportPropsSDKFactory = createViewportPropsSDKFactory(registerCallback);
  return composeSDKFactories([
    hiddenCollapsedSDKFactory,
    viewportPropsSDKFactory
  ])(api);
};
const createVisibilityPropsSDKFactory = (hasPortal) => {
  return (api) => visibilityPropsSDKFactory(api, hasPortal);
};

const validateEffects = (possibleEffects, effects, functionName) => {
  const invalidEffects = effects.filter(
    (name) => !possibleEffects.includes(name)
  );
  if (invalidEffects.length) {
    reportError(
      templates.error_effects_input({
        functionName,
        wrongEffects: invalidEffects,
        allowedEffects: possibleEffects
      })
    );
  }
};
const effectsTriggersSDKFactory = (api) => {
  const getEffects = () => api.effectsTriggersApi?.getEffects() || [];
  return {
    effects: {
      get effects() {
        return getEffects();
      },
      get activeEffects() {
        return api.effectsTriggersApi?.getActiveEffects() || [];
      },
      applyEffects: (effects) => {
        validateEffects(getEffects(), effects, "applyEffects");
        api.effectsTriggersApi?.applyEffects(...effects);
      },
      removeEffects: (effects) => {
        validateEffects(getEffects(), effects, "removeEffects");
        api.effectsTriggersApi?.removeEffects(...effects);
      },
      toggleEffects: (effects) => {
        validateEffects(getEffects(), effects, "toggleEffects");
        api.effectsTriggersApi?.toggleEffects(...effects);
      },
      removeAllEffects: () => api.effectsTriggersApi?.removeAllEffects()
    }
  };
};

const deletePropsSDKFactory = (api) => ({
  delete: () => {
    api.setProps({ deleted: true });
    api.remove();
  },
  restore: () => {
    api.setProps({ deleted: false });
    api.restore();
  },
  get deleted() {
    return !!api.props.deleted;
  }
});

const customClassListPropsSDKFactory = (api) => {
  const { setProps, props } = api;
  return {
    customClassList: {
      get value() {
        return props.customClassNames ? props.customClassNames?.join(" ") : "";
      },
      values() {
        return props.customClassNames ? props.customClassNames : [];
      },
      add(...classNames) {
        const customClassListSet = props.customClassNames ? new Set(props.customClassNames) : /* @__PURE__ */ new Set([]);
        if (!classNames.length) {
          handleMandatorySingleVal("className", "customClassList.add");
          return;
        }
        for (const className of classNames) {
          if (isValidClassName(className, "customClassList.add")) {
            customClassListSet.add(className);
          } else {
            return;
          }
        }
        setProps({ customClassNames: Array.from(customClassListSet) });
      },
      remove(...classNames) {
        if (!classNames.length) {
          handleMandatorySingleVal("className", "customClassList.remove");
          return;
        }
        const customClassListSet = new Set(props.customClassNames);
        for (const className of classNames) {
          if (isValidClassName(className, "customClassList.remove")) {
            customClassListSet.delete(className);
          } else {
            return;
          }
        }
        setProps({ customClassNames: Array.from(customClassListSet) });
      },
      contains(className) {
        if (!className) {
          handleMandatorySingleVal("className", "customClassList.contains");
          return;
        }
        if (isValidClassName(className, "customClassList.contains")) {
          return props.customClassNames ? props.customClassNames.includes(className) : false;
        } else {
          return;
        }
      },
      replace(currentClassName, newClassName) {
        if (!currentClassName || !newClassName) {
          handleMandatoryVals(
            ["currentClassName, newClassName"],
            "customClassList.replace"
          );
          return false;
        }
        if (isValidClassName(newClassName, "customClassList.replace") && isValidClassName(currentClassName, "customClassList.replace")) {
          if (this.contains(currentClassName)) {
            this.remove(currentClassName);
            this.add(newClassName);
            return true;
          }
          return false;
        }
        return false;
      },
      toggle(className) {
        if (!className) {
          handleMandatorySingleVal("className", "customClassList.toggle");
          return false;
        }
        if (isValidClassName(className, "customClassList.toggle")) {
          if (this.contains(className)) {
            this.remove(className);
            return false;
          } else {
            this.add(className);
            return true;
          }
        }
        return false;
      }
    }
  };
};

const toJSONBase = ({
  role,
  compType,
  isGlobal,
  isRendered
}) => ({
  id: role,
  type: `$w.${compType}`,
  global: isGlobal(),
  rendered: isRendered()
});
const baseElementPropsSDKFactory = (api) => ({
  onMouseIn: (handler) => registerCorvidMouseEvent("onMouseEnter", api, handler),
  onMouseOut: (handler) => registerCorvidMouseEvent("onMouseLeave", api, handler),
  removeEventHandler: (type, handler) => {
    const { getSdkInstance } = api;
    if (typeof type !== "string") {
      reportError(
        templates.error_type({
          propertyName: "type",
          functionName: "removeEventHandler",
          value: type,
          expectedType: "string"
        })
      );
      return getSdkInstance();
    }
    if (typeof handler !== "function") {
      reportError(
        templates.error_type({
          propertyName: "handler",
          functionName: "removeEventHandler",
          value: handler,
          expectedType: "function"
        })
      );
      return getSdkInstance();
    }
    return unregisterCorvidEvent(type, api, handler);
  },
  get rendered() {
    return api.metaData.isRendered();
  },
  toJSON() {
    return toJSONBase(api.metaData);
  }
});
const viewportPropsSDKFactory = createViewportPropsSDKFactory();
composeSDKFactories([
  basePropsSDKFactory,
  viewportPropsSDKFactory,
  baseElementPropsSDKFactory,
  effectsTriggersSDKFactory,
  customClassListPropsSDKFactory
]);
const createElementPropsSDKFactory = ({
  useHiddenCollapsed = true,
  hasPortal = false
} = {}) => {
  return composeSDKFactories([
    basePropsSDKFactory,
    baseElementPropsSDKFactory,
    effectsTriggersSDKFactory,
    deletePropsSDKFactory,
    useHiddenCollapsed ? createVisibilityPropsSDKFactory(hasPortal) : viewportPropsSDKFactory,
    customClassListPropsSDKFactory
  ]);
};

const clickPropsSDKFactory = (api) => ({
  onClick: (handler) => registerCorvidMouseEvent("onClick", api, handler),
  onDblClick: (handler) => registerCorvidMouseEvent("onDblClick", api, handler)
});

const childrenPropsSDKFactory = ({ getChildren }) => {
  return {
    get children() {
      return getChildren();
    }
  };
};

const focusPropsSDKFactory = (api) => {
  return {
    focus: () => api.compRef.focus(),
    blur: () => api.compRef.blur(),
    onFocus: (handler) => registerCorvidEvent("onFocus", api, handler),
    onBlur: (handler) => registerCorvidEvent("onBlur", api, handler)
  };
};

const ariaLabelSDKFactory = ({ setProps, props }) => ({
  get label() {
    return props.ariaAttributes?.label;
  },
  set label(value) {
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        label: isNil(value) ? void 0 : value
      }
    });
  }
});
const createAriaLabelSDK = withValidation(ariaLabelSDKFactory, {
  properties: {
    label: {
      type: ["string"],
      minLength: 1,
      maxLength: 1e3
    }
  }
});

const ariaHiddenSDKFactory = ({ setProps, props }) => ({
  get hidden() {
    return props.ariaAttributes?.hidden;
  },
  set hidden(value) {
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        hidden: isNil(value) ? void 0 : String(value)
      }
    });
  }
});
const createAriaHiddenSDK = withValidation(ariaHiddenSDKFactory, {
  properties: {
    hidden: {
      type: ["boolean", "string"],
      enum: ["false", "true"]
    }
  }
});

const ariaPressedSDKFactory = ({ setProps, props }) => ({
  get pressed() {
    return props.ariaAttributes?.pressed;
  },
  set pressed(value) {
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        pressed: isNil(value) ? void 0 : String(value)
      }
    });
  }
});
const createAriaPressedSDK = withValidation(ariaPressedSDKFactory, {
  properties: {
    pressed: {
      type: ["string", "boolean"],
      enum: ["false", "true", "mixed"]
    }
  }
});

const ariaHaspopupSDKFactory = ({ setProps, props }) => ({
  get hasPopup() {
    return props.ariaAttributes?.haspopup;
  },
  set hasPopup(value) {
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        haspopup: isNil(value) ? void 0 : String(value)
      }
    });
  }
});
const createAriaHaspopupSDK = withValidation(ariaHaspopupSDKFactory, {
  properties: {
    hasPopup: {
      type: ["string", "boolean"],
      enum: ["false", "true", "menu", "dialog", "grid", "listbox", "tree"]
    }
  }
});

const atomicSDKFactory = ({ setProps, props }) => ({
  get atomic() {
    return props.ariaAttributes?.atomic;
  },
  set atomic(value) {
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        atomic: isNil(value) ? void 0 : String(value)
      }
    });
  }
});
const createAtomicSDK = withValidation(atomicSDKFactory, {
  properties: {
    atomic: {
      type: ["boolean", "string"],
      enum: ["false", "true"]
    }
  }
});

const busySDKFactory = ({ setProps, props }) => ({
  get busy() {
    return props.ariaAttributes?.busy;
  },
  set busy(value) {
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        busy: isNil(value) ? void 0 : String(value)
      }
    });
  }
});
const createBusySDK = withValidation(busySDKFactory, {
  properties: {
    busy: {
      type: ["boolean", "string"],
      enum: ["false", "true"]
    }
  }
});

const getNotTextSelectorError = (property) => `The parameter that is passed to the ‘${property}’ property must be a selector function of a text element.`;
const getNotSelectorError = (property) => `The parameter that is passed to the ‘${property}’ property must be a selector function of an element.`;
const getInvalidScreenReaderValueError = (property) => `The parameter that is passed to the ‘${property}’ property must be a string or ‘null’.`;

const currentSDKFactory = ({ setProps, props }) => ({
  get current() {
    return props.ariaAttributes?.current;
  },
  set current(value) {
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        current: isNil(value) ? void 0 : String(value)
      }
    });
  }
});
const createCurrentSDK = withValidation(currentSDKFactory, {
  properties: {
    current: {
      type: ["string", "boolean"],
      enum: ["step", "page", "true", "false", "location", "date", "time"]
    }
  }
});

const isTextElement = (sdkInstance) => isElement(sdkInstance) && (sdkInstance.type === "$w.Text" || sdkInstance.type === "$w.CollapsibleText");
const isElement = (sdkInstance) => Boolean(sdkInstance.id && sdkInstance.uniqueId && sdkInstance.type);

const baseValidator = (propertyName, allowNil, predicate, failedPredicateError, sdkInstance) => {
  if (!sdkInstance) {
    if (allowNil) {
      return true;
    }
    reportError(
      invalidTypeMessage({
        value: sdkInstance,
        types: ["object"],
        propertyName,
        functionName: `set ${propertyName}`,
        index: void 0
      })
    );
    return false;
  }
  if (!predicate(sdkInstance)) {
    reportError(failedPredicateError);
    return false;
  }
  return true;
};
const createElementValidator = (propertyName, allowNil = true) => (sdkInstance) => baseValidator(
  propertyName,
  allowNil,
  isElement,
  getNotSelectorError(propertyName),
  sdkInstance
);
const createTextElementValidator = (propertyName, allowNil = true) => (sdkInstance) => baseValidator(
  propertyName,
  allowNil,
  isTextElement,
  getNotTextSelectorError(propertyName),
  sdkInstance
);

const describedBySDKFactory = ({ setProps, props, create$w }) => ({
  get describedBy() {
    if (!props.ariaAttributes?.describedBy) {
      return void 0;
    }
    const $w = create$w();
    return $w(`#${props.ariaAttributes.describedBy}`);
  },
  set describedBy(selector) {
    if (!selector) {
      setProps({
        ariaAttributes: {
          ...props.ariaAttributes,
          describedBy: void 0
        }
      });
      return;
    }
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        describedBy: selector.uniqueId
      }
    });
  }
});
const customRules$5 = {
  describedBy: [createTextElementValidator("describedBy")]
};
const createDescribedBySDK = withValidation(
  describedBySDKFactory,
  {
    properties: {
      describedBy: {
        type: ["object", "nil"]
      }
    }
  },
  customRules$5
);

const errorMessageSDKFactory = ({ setProps, props, create$w }) => ({
  get errorMessage() {
    if (!props.ariaAttributes?.errorMessage) {
      return void 0;
    }
    const $w = create$w();
    return $w(`#${props.ariaAttributes.errorMessage}`);
  },
  set errorMessage(selector) {
    if (!selector) {
      setProps({
        ariaAttributes: {
          ...props.ariaAttributes,
          errorMessage: void 0
        }
      });
      return;
    }
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        errorMessage: selector.uniqueId
      }
    });
  }
});
const customRules$4 = {
  errorMessage: [createTextElementValidator("errorMessage")]
};
const createErrorMessageSDK = withValidation(
  errorMessageSDKFactory,
  {
    properties: {
      errorMessage: {
        type: ["object", "nil"]
      }
    }
  },
  customRules$4
);

const expandedSDKFactory = ({ setProps, props }) => ({
  get expanded() {
    return props.ariaAttributes?.expanded;
  },
  set expanded(value) {
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        expanded: isNil(value) ? void 0 : String(value)
      }
    });
  }
});
const createExpandedSDK = withValidation(expandedSDKFactory, {
  properties: {
    expanded: {
      type: ["boolean", "string"],
      enum: ["false", "true"]
    }
  }
});

const labelledBySDKFactory = ({ setProps, props, create$w }) => ({
  get labelledBy() {
    if (!props.ariaAttributes?.labelledBy) {
      return void 0;
    }
    const $w = create$w();
    return $w(`#${props.ariaAttributes.labelledBy}`);
  },
  set labelledBy(selector) {
    if (!selector) {
      setProps({
        ariaAttributes: {
          ...props.ariaAttributes,
          labelledBy: void 0
        }
      });
      return;
    }
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        labelledBy: selector.uniqueId
      }
    });
  }
});
const customRules$3 = {
  labelledBy: [createTextElementValidator("labelledBy")]
};
const createLabelledBySDK = withValidation(
  labelledBySDKFactory,
  {
    properties: {
      labelledBy: {
        type: ["object", "nil"]
      }
    }
  },
  customRules$3
);

const liveSDKFactory = ({ setProps, props }) => ({
  get live() {
    return props.ariaAttributes?.live;
  },
  set live(value) {
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        live: isNil(value) ? void 0 : value
      }
    });
  }
});
const createLiveSDK = withValidation(liveSDKFactory, {
  properties: {
    live: {
      type: ["string"],
      enum: ["polite", "assertive"]
    }
  }
});

const ownsSDKFactory = ({ setProps, props, create$w }) => ({
  get owns() {
    if (!props.ariaAttributes?.owns) {
      return void 0;
    }
    const $w = create$w();
    return $w(`#${props.ariaAttributes.owns}`);
  },
  set owns(selector) {
    if (!selector) {
      setProps({
        ariaAttributes: {
          ...props.ariaAttributes,
          owns: void 0
        }
      });
      return;
    }
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        owns: selector.uniqueId
      }
    });
  }
});
const customRules$2 = {
  owns: [createElementValidator("owns")]
};
const createOwnsSDK = withValidation(
  ownsSDKFactory,
  {
    properties: {
      owns: {
        type: ["object", "nil"]
      }
    }
  },
  customRules$2
);

const controlsSDKFactory = ({ setProps, props, create$w }) => ({
  get controls() {
    if (!props.ariaAttributes?.controls) {
      return void 0;
    }
    const $w = create$w();
    return $w(`#${props.ariaAttributes.controls}`);
  },
  set controls(selector) {
    if (!selector) {
      setProps({
        ariaAttributes: {
          ...props.ariaAttributes,
          controls: void 0
        }
      });
      return;
    }
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        controls: selector.uniqueId
      }
    });
  }
});
const customRules$1 = {
  controls: [createElementValidator("controls")]
};
const createControlsSDK = withValidation(
  controlsSDKFactory,
  {
    properties: {
      controls: {
        type: ["object", "nil"]
      }
    }
  },
  customRules$1
);

const roleDescriptionSDKFactory = ({ setProps, props }) => ({
  get roleDescription() {
    return props.ariaAttributes?.roleDescription;
  },
  set roleDescription(value) {
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        roleDescription: isNil(value) ? void 0 : value
      }
    });
  }
});
const createRoleDescriptionSDK = withValidation(
  roleDescriptionSDKFactory,
  {
    properties: {
      roleDescription: {
        type: ["string"],
        minLength: 1,
        maxLength: 100
      }
    }
  }
);

const relevantSDKFactory = ({ setProps, props }) => ({
  get relevant() {
    return props.ariaAttributes?.relevant;
  },
  set relevant(value) {
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        relevant: isNil(value) ? void 0 : value
      }
    });
  }
});
const createRelevantSDK = withValidation(relevantSDKFactory, {
  properties: {
    relevant: {
      type: ["string"],
      enum: ["additions", "additions text", "all", "removals", "text"]
    }
  }
});

const roleSDKFactory = ({
  setProps,
  props
}) => ({
  get role() {
    return props.role;
  },
  set role(value) {
    setProps({
      role: isNil(value) ? void 0 : value
    });
  }
});
const createRoleSDK = withValidation(roleSDKFactory, {
  properties: {
    role: {
      type: ["string"]
    }
  }
});

const screenReaderSDKFactory = ({ setProps, props }) => ({
  screenReader: {
    get prefix() {
      return props.screenReader?.prefix;
    },
    set prefix(value) {
      if (value !== null && !isString(value)) {
        reportError(getInvalidScreenReaderValueError("prefix"));
        return;
      }
      setProps({ screenReader: { ...props.screenReader, prefix: value } });
    },
    get suffix() {
      return props.screenReader?.suffix;
    },
    set suffix(value) {
      if (value !== null && !isString(value)) {
        reportError(getInvalidScreenReaderValueError("suffix"));
        return;
      }
      setProps({ screenReader: { ...props.screenReader, suffix: value } });
    },
    get hasHint() {
      return props.screenReader?.hasHint;
    },
    set hasHint(value) {
      setProps({
        screenReader: {
          ...props.screenReader,
          hasHint: isNil(value) ? void 0 : value
        }
      });
    }
  }
});

const tabIndexSDKFactory = ({ setProps, props }) => ({
  get tabIndex() {
    return props.tabIndex;
  },
  set tabIndex(value) {
    setProps({
      tabIndex: isNil(value) ? void 0 : value
    });
  }
});
const createTabIndexSDK = withValidation(tabIndexSDKFactory, {
  properties: {
    tabIndex: {
      type: ["number"],
      enum: [0, -1]
    }
  }
});

const ariaRequiredSDKFactory = ({ setProps, props }) => ({
  get required() {
    return props.ariaAttributes?.required;
  },
  set required(value) {
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        required: isNil(value) ? void 0 : String(value)
      }
    });
  }
});
const createAriaRequiredSDK = withValidation(ariaRequiredSDKFactory, {
  properties: {
    required: {
      type: ["string", "boolean"],
      enum: ["false", "true"]
    }
  }
});

const ariaValueTextSDKFactory = ({ setProps, props }) => ({
  get valueText() {
    return props.ariaAttributes?.valueText;
  },
  set valueText(value) {
    setProps({
      ariaAttributes: {
        ...props.ariaAttributes,
        valueText: isNil(value) ? void 0 : String(value)
      }
    });
  }
});
const createAriaValueTextSDK = withValidation(ariaValueTextSDKFactory, {
  properties: {
    valueText: {
      type: ["string"],
      minLength: 1,
      maxLength: 1e3
    }
  }
});

const langSDKFactory = ({
  setProps,
  props
}) => ({
  get lang() {
    return props.lang;
  },
  set lang(_lang) {
    setProps({
      lang: _lang
    });
  }
});
const createLangSDK = withValidation(langSDKFactory, {
  properties: {
    lang: {
      type: ["string"]
    }
  }
});

const ariaFactoryMap = {
  enableAriaLabel: createAriaLabelSDK,
  enableAriaDescribedBy: createDescribedBySDK,
  enableAriaLabelledBy: createLabelledBySDK,
  enableAriaAtomic: createAtomicSDK,
  enableAriaBusy: createBusySDK,
  enableAriaCurrent: createCurrentSDK,
  enableAriaExpanded: createExpandedSDK,
  enableAriaLive: createLiveSDK,
  enableAriaOwns: createOwnsSDK,
  enableAriaControls: createControlsSDK,
  enableAriaRoleDescription: createRoleDescriptionSDK,
  enableAriaRelevant: createRelevantSDK,
  enableAriaErrorMessage: createErrorMessageSDK,
  enableAriaHidden: createAriaHiddenSDK,
  enableAriaPressed: createAriaPressedSDK,
  enableAriaHaspopup: createAriaHaspopupSDK,
  enableAriaRequired: createAriaRequiredSDK,
  enableAriaValueText: createAriaValueTextSDK
};
const accessibilityFactoryMap = {
  enableScreenReader: screenReaderSDKFactory,
  enableRole: createRoleSDK,
  enableTabIndex: createTabIndexSDK,
  enableLang: createLangSDK
};
const createAriaAttributesSDKFactory = (ariaAttributeOptions) => {
  const sdkFactories = [];
  Object.entries(ariaAttributeOptions).forEach(
    ([option, enabled]) => enabled && ariaFactoryMap[option] && sdkFactories.push(ariaFactoryMap[option])
  );
  return (api) => {
    const factory = composeSDKFactories(sdkFactories, {
      modifyAriaSourceKeys: true
    })(api);
    factory.ariaAttributes = composeSDKFactories(sdkFactories)(api);
    return factory;
  };
};
const createAccessibilityPropSDKFactory = ({
  enableAriaLabel = true,
  enableAriaDescribedBy = true,
  enableAriaLabelledBy = true,
  enableAriaAtomic = false,
  enableAriaBusy = false,
  enableAriaHidden = false,
  enableAriaPressed = false,
  enableAriaHaspopup = false,
  enableAriaCurrent = false,
  enableAriaExpanded = false,
  enableAriaLive = false,
  enableAriaOwns = false,
  enableAriaControls = false,
  enableAriaRoleDescription = false,
  enableAriaRelevant = false,
  enableRole = false,
  enableTabIndex = false,
  enableLang = false,
  enableAriaErrorMessage = false,
  enableScreenReader = false,
  enableAriaRequired = false,
  enableAriaValueText = false
} = {}) => (api) => {
  const sdkFactories = [];
  const ariaAttributesOptions = {
    enableAriaLabel,
    enableAriaDescribedBy,
    enableAriaLabelledBy,
    enableAriaAtomic,
    enableAriaBusy,
    enableAriaCurrent,
    enableAriaExpanded,
    enableAriaLive,
    enableAriaOwns,
    enableAriaControls,
    enableAriaRoleDescription,
    enableAriaRelevant,
    enableAriaErrorMessage,
    enableAriaHidden,
    enableAriaPressed,
    enableAriaHaspopup,
    enableAriaRequired,
    enableAriaValueText
  };
  const otherAccessibilityOptions = {
    enableScreenReader,
    enableRole,
    enableTabIndex,
    enableLang
  };
  const enableAriaAttributes = Object.values(ariaAttributesOptions).some(
    (optionEnabled) => optionEnabled
  );
  if (enableAriaAttributes) {
    const ariaAttributesSDKFactory = createAriaAttributesSDKFactory(
      ariaAttributesOptions
    );
    sdkFactories.push(ariaAttributesSDKFactory);
  }
  Object.entries(otherAccessibilityOptions).forEach(
    ([option, enabled]) => enabled && accessibilityFactoryMap[option] && sdkFactories.push(accessibilityFactoryMap[option])
  );
  const accessibilitySdkFactory = composeSDKFactories(sdkFactories);
  return { accessibility: accessibilitySdkFactory(api) };
};

function createComponentSDKModel(factory) {
  return {
    factory
  };
}

const changePropsSDKFactory = (api) => ({
  onChange: (handler) => registerCorvidEvent("onChange", api, handler)
});
const stateBoxSDKFactory = (api) => {
  const { props, getChildren, metaData, setProps } = api;
  const getStateId = (stateInstance) => {
    const { parent, role, id } = stateInstance;
    const stateMetadata = parent?.children.find(
      (state) => state.role === role
    );
    const stateId = stateMetadata?.uniqueId;
    return stateId || id;
  };
  const createStateSDKInstance = (state) => {
    const instance = {
      ...state,
      get type() {
        return "$w.State";
      },
      toJSON() {
        return {
          ...state.toJSON(),
          type: instance.type
        };
      }
    };
    return instance;
  };
  const sdk2 = {
    get currentState() {
      const states = sdk2.states;
      const selectedState = states.find(
        (state) => getStateId(state) === props.selectedStateId
      );
      const instance = selectedState ? selectedState : states[0];
      return createStateSDKInstance(instance);
    },
    get states() {
      return getChildren().map(createStateSDKInstance);
    },
    changeState(stateReference) {
      const states = getChildren();
      const currentStateId = props.selectedStateId;
      const nextState = isString(stateReference) ? states.find(({ role }) => role === stateReference) : stateReference;
      const nextStateId = nextState ? getStateId(nextState) : null;
      if (currentStateId === nextStateId) {
        return Promise.resolve(this.currentState);
      }
      return new Promise((resolve) => {
        setProps({ selectedStateId: nextStateId });
        resolve(nextState);
      });
    },
    get type() {
      return "$w.MultiStateBox";
    },
    toJSON() {
      return {
        ...toJSONBase(metaData),
        type: sdk2.type,
        currentStateId: sdk2.currentState.id
      };
    }
  };
  return sdk2;
};
const customRules = {
  changeState: [isValidStateReference]
};
const stateBox = withValidation(
  stateBoxSDKFactory,
  {
    properties: {
      changeState: {
        type: ["function"],
        args: [{ type: ["object", "string"] }]
      }
    }
  },
  customRules
);
const accessibilityPropsSDKFactory = createAccessibilityPropSDKFactory({
  enableAriaLabel: true,
  enableAriaDescribedBy: true,
  enableAriaLabelledBy: true,
  enableAriaAtomic: true,
  enableAriaBusy: true,
  enableAriaCurrent: true,
  enableAriaExpanded: true,
  enableAriaLive: true,
  enableAriaOwns: true,
  enableAriaRelevant: true,
  enableRole: true,
  enableTabIndex: true,
  enableAriaErrorMessage: true
});
const sdk = composeSDKFactories([
  createElementPropsSDKFactory(),
  changePropsSDKFactory,
  clickPropsSDKFactory,
  childrenPropsSDKFactory,
  stateBox,
  focusPropsSDKFactory,
  accessibilityPropsSDKFactory
]);
const sdk_default = createComponentSDKModel(sdk).factory;

export { sdk_default as default };
