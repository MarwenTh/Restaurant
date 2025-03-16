import Link from "next/link";

import React, { FC } from "react";

type Props = {
  pathSegments: Array<string>;
};

const BreadcrumbWithCustomSeparator: FC<Props> = ({ pathSegments }) => {
  return (
    <nav aria-label="breadcrumb">
      <ul className="flex items-center space-x-2 text-sm text-gray-600">
        {/* Home Link */}
        <li>
          <Link
            href="/"
            className="text-[#757577] dark:text-[#b9b9be] hover:text-[#e5e5e7] dark:hover:text-[#e5e5e7] font-medium text-xs transition-all duration-200 ease-in-out"
          >
            Home
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;

          return (
            <React.Fragment key={href}>
              <span className="text-gray-400">{">"}</span>
              <li>
                {isLast ? (
                  <span className="text-[#757577] dark:text-[#b9b9be]  text-xs">
                    {segment}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="text-[#757577] dark:text-[#b9b9be] hover:text-[#e5e5e7] dark:hover:text-[#e5e5e7] font-medium text-xs transition-all duration-200 ease-in-out"
                  >
                    {segment}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default BreadcrumbWithCustomSeparator;
