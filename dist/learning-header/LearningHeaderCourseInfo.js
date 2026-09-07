import React from 'react';
import PropTypes from 'prop-types';
const renderMixedText = text => {
  if (!text) {
    return null;
  }
  const tibetanRegex = /[\u0F00-\u0FFF]+/g;
  const parts = [];
  let lastIndex = 0;
  let match = tibetanRegex.exec(text);
  while (match !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(
    /*#__PURE__*/
    // Styling lives in `@edx/brand/paragon/header` as `.course-title-tibetan`
    // - see the comment there for why it's un-bolded and sized the way it is.
    React.createElement("span", {
      key: match.index,
      className: "course-title-tibetan"
    }, match[0]));
    lastIndex = match.index + match[0].length;
    match = tibetanRegex.exec(text);
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
};
const LearningHeaderCourseInfo = ({
  courseTitle
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    minWidth: 0
  }
}, /*#__PURE__*/React.createElement("span", {
  className: "d-block m-0 font-weight-bold course-title"
}, renderMixedText(courseTitle)));
export const courseInfoDataShape = {
  courseOrg: PropTypes.string,
  courseNumber: PropTypes.string,
  courseTitle: PropTypes.string
};
LearningHeaderCourseInfo.propTypes = {
  courseTitle: courseInfoDataShape.courseTitle
};
export default LearningHeaderCourseInfo;
//# sourceMappingURL=LearningHeaderCourseInfo.js.map