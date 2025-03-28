// import { useEffect } from "react";
// import { useIsFocused } from "@react-navigation/native";

// export const useVisible = (isVisible, onVisibleLongEnough) => {
//   useEffect(() => {
//     let timeout;
//     if (isVisible) {
//       timeout = setTimeout(() => {
//         onVisibleLongEnough();
//       }, 2000);
//     }
//     return () => clearTimeout(timeout);
//   }, [isVisible]);
// };
import { useEffect, useRef } from "react";

export const useVisible = ({
  isVisible,
  onVisibleLongEnough,
  delay = 2000,
  once = true,
}) => {
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    let timeout;
    if (isVisible && (!once || !hasTriggeredRef.current)) {
      timeout = setTimeout(() => {
        onVisibleLongEnough();
        if (once) hasTriggeredRef.current = true;
      }, delay);
    }
    return () => clearTimeout(timeout);
  }, [isVisible]);
};
