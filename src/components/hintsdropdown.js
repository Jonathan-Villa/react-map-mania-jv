import React from "react";
import * as M from "@material-ui/core";
import { MdArrowDropDown } from "react-icons/md";

function Hintsdropdown() {
  const hints = [
    {
      hint: "Hint 1",
      caption: "The offical dialect of this country is Mandarin!",
    },
    {
      hint: "Hint 2",
      caption: "This country has the longest river in the world!",
    },
    {
      hint: "Hint 3",
      caption: "Did you know the Eiffel Tower stands at 1,063ft to the tip",
    },
    {
      hint: "Hint 4",
      caption:
        "This clock tower has a name of Ben, and I heard he stands tall!",
    },
    {
      hint: "Hint 5",
      caption: "This country has a spa for elephants. Can you believe that?",
    },
    {
      hint: "Hint 6",
      caption:
        "This country plays football, but not the traditional American football!",
    },
    { hint: "Hint 7", caption: "The captial of this country is Madrid." },
    {
      hint: "Hint 8",
      caption:
        "Wouldn't you say my side of Niagara Falls is better on my side, eh?",
    },
    {
      hint: "Hint 9",
      caption: "Did you know that Christ the Redeemer stands at 125ft?",
    },
    {
      hint: "Hint 10",
      caption:
        "Mount Fuji is a symbol of this country, AND it is my dream to visit here!",
    },
  ];

  return (
    <div className="hints-container">
      <h1 className="hints-header">Hints</h1>
      {hints.map((index, id) => (
        <M.Accordion>
          <M.AccordionSummary
            expandIcon={<MdArrowDropDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            {index.hint}
          </M.AccordionSummary>
          <M.AccordionDetails>{index.caption}</M.AccordionDetails>
        </M.Accordion>
      ))}
    </div>
  );
}

export default Hintsdropdown;
