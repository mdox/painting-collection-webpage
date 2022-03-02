import {
  Children,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useState,
} from "react";
import usePortal from "react-cool-portal";

export type ModalHideType = "escape" | "click" | "regular";

export interface ModalOptions {
  data?: any;
  hideOnClick?: boolean;
  hideOnEscape?: boolean;
  onHide?(hideType: ModalHideType, data: any): void;
  onShow?(data: any): void;
}

export interface ModalProps {
  children: ReactNode;
}

export default function useModal(options: ModalOptions = {}) {
  const {
    Portal,
    hide: hidePortal,
    isShow: isPortalShow,
    show: showPortal,
  } = usePortal({
    clickOutsideToHide: false,
    containerId: "modals",
    defaultShow: false,
    escToHide: false,
    internalShowHide: false,
  });

  const [shouldFocus, setShouldFocus] = useState(false);

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (!options.hideOnClick) return;
    if (e.currentTarget !== e.target) return;
    options.onHide?.("click", options.data);
    hidePortal();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (!options.hideOnEscape) return;
    if (e.key !== "Escape") return;
    options.onHide?.("escape", options.data);
    hidePortal();
  };

  const focusRef = (ref: HTMLDivElement | null) => {
    if (!ref) return;
    if (!shouldFocus) return;
    setShouldFocus(false);
    ref.focus();
  };

  const Modal = useCallback(
    (props: ModalProps) => {
      if (!isPortalShow) return null;

      return (
        <Portal>
          <div
            ref={focusRef}
            className="fixed inset-0 flex items-center justify-center outline-none"
            tabIndex={-1}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
          >
            {Children.only(props.children)}
          </div>
        </Portal>
      );
    },
    [isPortalShow, options.data]
  );

  const showModal = () => {
    setShouldFocus(true);
    showPortal();
    options.onShow?.(options.data);
  };

  const hideModal = () => {
    hidePortal();
    options.onHide?.("regular", options.data);
  };

  const toggleModal = () => {
    if (isPortalShow) {
      hideModal();
    } else {
      showModal();
    }
  };

  return {
    Modal,
    showModal,
    hideModal,
    toggleModal,
    isModalShow: isPortalShow,
  };
}
