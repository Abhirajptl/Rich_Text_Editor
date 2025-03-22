import React from "react";
import { VARIABLES } from "../utils/variables";

const VariablePopover = ({ onSelect }) => {
  return (
    <div className="variable-popover">
      <ul>
        {VARIABLES.map((variable) => (
          <li key={variable.id} onClick={() => onSelect(variable)}>
            {variable.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VariablePopover;
