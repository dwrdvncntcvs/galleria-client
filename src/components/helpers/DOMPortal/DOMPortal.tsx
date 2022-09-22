import ReactDOM from "react-dom";

interface DOMPortalProps {
  element: React.ReactNode;
  elementId: string;
}

export default function DOMPortal({ element, elementId }: DOMPortalProps) {
  return ReactDOM.createPortal(
    element,
    document.getElementById(elementId) as HTMLElement
  );
}
