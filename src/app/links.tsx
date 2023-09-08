"use client";
import * as data from "./links.json";
import React, { useState, useEffect, MouseEvent } from "react";
import { Popover } from "@headlessui/react";

export default function LinksColumn() {
  return (
    <ul role="list" className="divide-y divide-gray-100 max-w-xl">
      {data.categories.map((category) => (
        <li key={category}>
          <h2 className="text-xl font-righteous uppercase">{category}</h2>
          <ul role="list">
            {data.links.map((link) =>
              link.category === category ? (
                <li
                  key={link.name}
                  className="flex justify-between gap-x-6 py-5"
                >
                  <HoverPopover image={link.imageUrl}>
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-xl font-mono leading-6 text-white-500">
                          {link.name}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </HoverPopover>
                </li>
              ) : null
            )}
          </ul>
        </li>
      ))}
    </ul>
  );
}

const HoverPopover: React.FC<{ children: React.ReactNode; image: string }> = ({
  children,
  image,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState(0);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    setOffset(window.scrollY);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    if (isOpen) {
      //@ts-ignore
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      //@ts-ignore
      window.removeEventListener("mousemove", handleMouseMove);
    }

    return () => {
      //@ts-ignore
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isOpen]);

  return (
    <Popover>
      {({ open }) => (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {children}

          {isOpen && (
            <div
              className="absolute z-2 transition-transform transition-opacity duration-300 ease-in-out"
              style={{
                top: `${position.y + offset + 10}px`,
                left: `${position.x + 10}px`,
              }}
            >
              <Popover.Panel static>
                <div className="bg-black border border-gray-300 shadow-md p-4 rounded-md">
                  <img className="max-w-6" src={image} />
                </div>
              </Popover.Panel>
            </div>
          )}
        </div>
      )}
    </Popover>
  );
};
