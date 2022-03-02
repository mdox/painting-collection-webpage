import TextInput from "components/Input/TextInput";
import NumberInput from "components/Input/NumberInput";
import { useState } from "react";
import DateInput from "components/Input/DateInput";

const TestInputPage = () => {
  const [numberInputValue, setNumberInputValue] = useState<number | undefined>(
    undefined
  );

  return (
    <div className="prose">
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
