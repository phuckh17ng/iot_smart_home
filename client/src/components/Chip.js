import React, { id, useEffect, useState } from "react";

const Chip = ({ mainTitle, subTitle, id }) => {
  const [mouseOverState, setMouseOverState] = useState(false);
  const [mainChip, setMainChip] = useState();
  const [title, setTitle] = useState();
  const [firstWidth, setFirstWidth] = useState();
  const [main, setMain] = useState();
  useEffect(() => {
    setMainChip(document.getElementById(`main${id}`));
    setTitle(document.getElementById(id));
  });
  useEffect(() => {
    if (title) setFirstWidth(title.getBoundingClientRect().width + 24);
    if (mainChip) setMain(mainChip?.getBoundingClientRect().width);
  }, [title]);
  console.log(firstWidth);

  useEffect(() => {
    if (!mainChip) return;
    if (!title) return;
    if (mouseOverState) {
      document.getElementById(`main${id}`).style.width = `${main}px`;
    } else {
      document.getElementById(`main${id}`).style.width = `${firstWidth}px`;
    }
    document.getElementById(`main${id}`).style.transition = "width";
    document.getElementById(`main${id}`).style.transitionDuration = "500ms";
    document.getElementById(`main${id}`).style.transitionTimingFunction =
      "ease in out";
  }, [mainChip, mouseOverState, firstWidth]);
  return (
    <div
      id={`main${id}`}
      className="mx-1 px-3 py-2 rounded-[32px] bg-red-300 flex items-center overflow-hidden max-w-fit"
      onMouseEnter={() => setMouseOverState(true)}
      onMouseLeave={() => setMouseOverState(false)}
    >
      <p id={id} className="inline-block">
        {mainTitle}
      </p>
      {<p className="ml-3 inline-block">{subTitle}</p>}
    </div>
  );
};

export default Chip;
