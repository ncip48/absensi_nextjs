import React from "react";

function CardMain({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md dark:bg-dark-800 dark:text-white">
        {/* <div className="relative bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-gray-900/20 shadow-lg -mt-6 mb-8 p-6"> */}
        <h6 className="p-5 block antialiased tracking-normal font-sans text-base font-bold leading-relaxed text-white">
          {title}
        </h6>
        {/* </div> */}
        <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">{children}</div>
      </div>
    </div>
  );
}

export default CardMain;
