"use client";
import { useState, useEffect } from "react";
import { ArrowUpCircleIcon } from "lucide-react";

import { Button } from "@/app/_components/ui/button";

export const ScrollToTop = () => {
  //* Intitialize whether or not to show the scroll to top button
  const [showToTop, setShowToTop] = useState(false);

  //* Add scroll event listener to determine the scroll position at the top of the page
  useEffect(() => {
    window.addEventListener("scroll", () => {
      //* If the scroll position is anywhere except at the top of the page then show the scroll button
      if (window.scrollY > 0) setShowToTop(true);
      //* Otherwise the scroll position is at the top of the page so no need to show the scroll button
      else setShowToTop(false);
    });
  }, []);

  //* Function to smoothly scroll to top of the page
  const smoothScrollToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showToTop && (
        <Button
          className="fixed bottom-8 right-8 z-30 inline-flex items-center justify-center bg-transparent text-foreground hover:bg-transparent"
          onClick={() => smoothScrollToTop()}
        >
          <ArrowUpCircleIcon className="hover:stroke-secondary" size={32} />
        </Button>
      )}
    </>
  );
};
