import { mdiCancel, mdiClose, mdiMenuDown } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import Button from "components/Button";
import useModal from "components/Modal";
import usePopper from "components/Popper";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export interface SelectInputItem {
  key: string;
  text: string;
}

interface SelectInputProps {
  noDeselect?: boolean;
  multi?: boolean;
  items: SelectInputItem[];
  value?: string[];
  className?: string;
  onChange?(newValue: string[]): void;
}

const SelectInput = (props: SelectInputProps) => {
  const [selectedKeys, setSelectedKeys] = useState(props.value || []);
  const [updateDelayed, setUpdateDelayed] = useState(false);
  const [hideRequested, setHideRequested] = useState(false);

  const updateDelayedRef = useRef(updateDelayed);
  updateDelayedRef.current = updateDelayed;
  const hideRequestedRef = useRef(hideRequested);
  hideRequestedRef.current = hideRequested;
  const checkboxListRef = useRef<HTMLDivElement>(null);

  const {
    Modal,
    showModal: showMenu,
    hideModal: hideMenu,
    isModalShow: isMenuShow,
  } = useModal({
    hideOnClick: true,
    hideOnEscape: true,
    onHide: (hideType) => {
      if (hideType === "escape") {
        setSelectedKeys(props.value || []);
      }

      if (hideRequestedRef.current) setHideRequested(false);
      if (updateDelayedRef.current) setUpdateDelayed(false);
    },
  });

  const { setPoppper, setPoppperTarget } = usePopper();

  const selectedItems = props.items.filter((item) =>
    selectedKeys.includes(item.key)
  );

  useEffect(() => {
    setSelectedKeys(props.value || []);
  }, [props.value]);

  useEffect(() => {
    if (updateDelayed) return;

    const v = props.value || [];
    const a = v.filter((key) => !selectedKeys.includes(key)).length !== 0;
    const b = selectedKeys.filter((key) => !v.includes(key)).length !== 0;

    if (a || b) {
      props.onChange?.(selectedKeys);
    }
  }, [selectedKeys, updateDelayed]);

  const deleteKey = (key: string) => {
    const newSelectedKeys = selectedKeys.filter(
      (selectedKey) => selectedKey !== key
    );

    setSelectedKeys(newSelectedKeys);
  };

  const deleteKeys = () => {
    const newSelectedKeys: string[] = [];

    setSelectedKeys(newSelectedKeys);
  };

  const setKeySelection = (key: string, selected: boolean) => {
    let newSelectedKeys: string[];

    if (selected) {
      if (props.multi) {
        newSelectedKeys = [key, ...selectedKeys];
        newSelectedKeys = props.items
          .filter((item) => newSelectedKeys.includes(item.key))
          .map((item) => item.key);
      } else {
        newSelectedKeys = [key];
      }
    } else {
      if (!props.multi && props.noDeselect) return;

      newSelectedKeys = selectedKeys.filter(
        (selectedKey) => selectedKey !== key
      );
    }

    setSelectedKeys(newSelectedKeys);
  };

  const moveCheckboxFocus = (value: string, up: boolean) => {
    const focusedElement = checkboxListRef.current?.querySelector(
      `input[value="${value}"]`
    );
    const elements = Array.from(
      checkboxListRef.current?.querySelectorAll(`input[type="checkbox"]`) || []
    );

    const index = elements.indexOf(focusedElement as Element);
    const newIndex = index + (up ? -1 : 1);

    if (newIndex < elements.length && newIndex > -1) {
      const newFocusingElement = elements[newIndex];
      (newFocusingElement as HTMLElement).focus();

      return true;
    }

    return false;
  };

  const handleKeyDownCheckbox: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    const moved = moveCheckboxFocus(e.currentTarget.value, e.key === "ArrowUp");

    if (!moved) return;

    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      ref={setPoppperTarget}
      className={twMerge(
        "flex overflow-hidden",
        "rounded border outline-none",
        "min-h-[44px]",
        "text-base",
        "bg-input",
        "text-input-text",
        "border-input-border",
        "focus-within:bg-input-focus",
        "focus-within:border-input-border-focus",
        isMenuShow && clsx("bg-input-focus", "border-input-border-focus"),
        props.className
      )}
      tabIndex={0}
    >
      <Modal>
        <div
          ref={setPoppper}
          className={clsx(
            "fixed pt-1",
            "min-w-[200px]",
            "max-w-full",
            "max-h-full"
          )}
        >
          <div
            className={clsx(
              "overflow-hidden",
              "rounded border shadow outline-none",
              "text-base",
              "text-input-text",
              "bg-input-focus",
              "border-input-border-focus"
            )}
          >
            <div
              ref={checkboxListRef}
              className="flex flex-col space-y-2 overflow-y-scroll p-2"
            >
              {props.items.map((item) => (
                <label
                  key={item.key}
                  className={clsx(
                    "flex items-center rounded",
                    selectedKeys.includes(item.key)
                      ? "bg-sky-200 shadow"
                      : "hover:bg-slate-200"
                  )}
                  onClick={() => {
                    setHideRequested(true);
                  }}
                >
                  <div
                    className="flex h-9 w-9 items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!hideRequested) {
                        setUpdateDelayed(true);
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      value={item.key}
                      checked={selectedKeys.includes(item.key)}
                      className="h-4 w-4"
                      onChange={(e) => {
                        setKeySelection(item.key, e.currentTarget.checked);
                        if (hideRequested) {
                          setUpdateDelayed(false);
                          hideMenu();
                        }
                      }}
                      onKeyDown={handleKeyDownCheckbox}
                    />
                  </div>
                  <span className="text-sm">{item.text}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Modal>
      <div className="flex flex-grow flex-wrap pb-1 pl-1">
        {selectedItems.map((item) => (
          <div
            key={item.key}
            className="mt-1 mr-1 flex h-8 items-stretch overflow-hidden rounded bg-slate-200"
          >
            <span className="flex items-center px-3 text-sm">{item.text}</span>
            <Button
              danger
              small
              rectangular
              hidden={!props.multi}
              onClick={() => deleteKey(item.key)}
            >
              <Icon path={mdiClose} size={0.65}></Icon>
            </Button>
          </div>
        ))}
      </div>
      <div className="flex items-stretch">
        <Button
          danger
          narrow
          rectangular
          className="w-8"
          hidden={
            selectedItems.length === 0 || (!props.multi && props.noDeselect)
          }
          onClick={deleteKeys}
        >
          <Icon path={mdiCancel} size={0.85}></Icon>
        </Button>
        <Button
          narrow
          rectangular
          className="w-8"
          onClick={() => {
            showMenu();
          }}
        >
          <Icon path={mdiMenuDown} size={0.85}></Icon>
        </Button>
      </div>
    </div>
  );
};

export default SelectInput;
