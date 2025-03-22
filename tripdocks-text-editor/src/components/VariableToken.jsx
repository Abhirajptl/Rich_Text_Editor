import React from "react";
import PropTypes from "prop-types";

const VariableToken = ({ label }) => {
  return <span className="variable-token">{label}</span>;
};

VariableToken.propTypes = {
  label: PropTypes.string.isRequired,
};

export default VariableToken;
