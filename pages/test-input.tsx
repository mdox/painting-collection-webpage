import TextInput from "components/Input/TextInput";
import NumberInput from "components/Input/NumberInput";
import { useState } from "react";
import DateInput from "components/Input/DateInput";
import SelectInput, { SelectInputItem } from "components/Input/SelectInput";

const TestInputPage = () => {
  const [numberInputValue, setNumberInputValue] = useState<number | undefined>(
    undefined
  );

  const [selectInputSelectedKeys, setSelectInputSelectedKeys] = useState<
    string[]
  >(["1", "3", "8"]);

  const selectInputItems: SelectInputItem[] = [
    { key: "1", text: "1" },
    { key: "2", text: "2" },
    { key: "3", text: "3" },
    { key: "4", text: "4" },
    { key: "5", text: "5" },
    { key: "6", text: "6" },
    { key: "7", text: "7" },
    { key: "8", text: "8" },
    { key: "9", text: "9" },
  ];

  return (
    <div className="prose">
      <SelectInput
        multi
        items={selectInputItems}
        value={selectInputSelectedKeys}
        onChange={(v) => {
          console.log("Change", v);
          setSelectInputSelectedKeys(v);
        }}
      ></SelectInput>
      <DateInput onChange={(v) => console.log(v)}></DateInput>
      <NumberInput
        value={numberInputValue}
        onChange={setNumberInputValue}
      ></NumberInput>
      <TextInput></TextInput>
    </div>
  );
};

export default TestInputPage;
