const _excluded = ["size", "strokeWidth", "children"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import PropTypes from 'prop-types';

/** Shared 24x24 stroke wrapper for the header's line glyphs; currentColor lets CSS set the color. */
const Glyph = _ref => {
  let {
      size,
      strokeWidth,
      children
    } = _ref,
    attributes = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false"
  }, attributes), children);
};
Glyph.propTypes = {
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  children: PropTypes.node.isRequired
};
Glyph.defaultProps = {
  size: 16,
  strokeWidth: 1.8
};
export const GlobeIcon = props => /*#__PURE__*/React.createElement(Glyph, _extends({
  size: 22
}, props), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "9"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 12h18M12 3a15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9 15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9z"
}));
export const BurgerIcon = props => /*#__PURE__*/React.createElement(Glyph, _extends({
  size: 20
}, props), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  y1: "7",
  x2: "20",
  y2: "7"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  y1: "12",
  x2: "20",
  y2: "12"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  y1: "17",
  x2: "20",
  y2: "17"
}));
export const TickIcon = props => /*#__PURE__*/React.createElement(Glyph, _extends({
  size: 28,
  strokeWidth: 2.5
}, props), /*#__PURE__*/React.createElement("polyline", {
  points: "20 6 9 17 4 12"
}));
export const GridIcon = props => /*#__PURE__*/React.createElement(Glyph, props, /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "3",
  width: "7",
  height: "7",
  rx: "1.5"
}), /*#__PURE__*/React.createElement("rect", {
  x: "14",
  y: "3",
  width: "7",
  height: "7",
  rx: "1.5"
}), /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "14",
  width: "7",
  height: "7",
  rx: "1.5"
}), /*#__PURE__*/React.createElement("rect", {
  x: "14",
  y: "14",
  width: "7",
  height: "7",
  rx: "1.5"
}));
export const CompassIcon = props => /*#__PURE__*/React.createElement(Glyph, props, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "9"
}), /*#__PURE__*/React.createElement("polygon", {
  points: "16.2 7.8 13.6 13.6 7.8 16.2 10.4 10.4 16.2 7.8"
}));
export const HeartIcon = props => /*#__PURE__*/React.createElement(Glyph, props, /*#__PURE__*/React.createElement("path", {
  d: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z"
}));
export const StackIcon = props => /*#__PURE__*/React.createElement(Glyph, props, /*#__PURE__*/React.createElement("polygon", {
  points: "12 3 21 8 12 13 3 8 12 3"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "3 13 12 18 21 13"
}));
export const UserIcon = props => /*#__PURE__*/React.createElement(Glyph, props, /*#__PURE__*/React.createElement("path", {
  d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "7",
  r: "4"
}));
export const GearIcon = props => /*#__PURE__*/React.createElement(Glyph, props, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6 1.65 1.65 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
}));
export const SignOutIcon = props => /*#__PURE__*/React.createElement(Glyph, props, /*#__PURE__*/React.createElement("path", {
  d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "16 17 21 12 16 7"
}), /*#__PURE__*/React.createElement("line", {
  x1: "21",
  y1: "12",
  x2: "9",
  y2: "12"
}));

/** SignOutIcon's same doorway, with the arrow pointing in rather than out. */
export const SignInIcon = props => /*#__PURE__*/React.createElement(Glyph, props, /*#__PURE__*/React.createElement("path", {
  d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "14 7 9 12 14 17"
}), /*#__PURE__*/React.createElement("line", {
  x1: "21",
  y1: "12",
  x2: "9",
  y2: "12"
}));

/** Maps menu items' `iconName` hint to a component, so callers don't need to import icons directly. */
export const NAV_ICONS = {
  dashboard: GridIcon,
  discover: CompassIcon,
  wishlist: HeartIcon,
  programs: StackIcon,
  profile: UserIcon,
  account: GearIcon,
  signout: SignOutIcon,
  login: SignInIcon,
  register: UserIcon
};
export const NavIcon = _ref2 => {
  let {
    iconName
  } = _ref2;
  const Icon = NAV_ICONS[iconName];
  return Icon ? /*#__PURE__*/React.createElement(Icon, null) : null;
};
NavIcon.propTypes = {
  iconName: PropTypes.string
};
NavIcon.defaultProps = {
  iconName: null
};
//# sourceMappingURL=icons.js.map