import { useState } from 'react';
import { Button, Group, NumberInput, RangeSlider, Stack } from '@mantine/core';
import { useUsers } from '../context/users.context';

export const AgeRangeFilter = () => {
  const { ageFrom, ageTo, setAgeRange } = useUsers();
  const [ageRange, setAgeRangeValue] = useState<[number, number]>([
    ageFrom,
    ageTo,
  ]);

  const onClear = () => {
    setAgeRangeValue([18, 200]);
    setAgeRange([18, 200]);
  };

  const onDone = () => {
    setAgeRange(ageRange);
  };

  return (
    <Stack>
      <RangeSlider
        min={18}
        max={200}
        minRange={0}
        label={null}
        value={ageRange}
        onChange={setAgeRangeValue}
      />
      <NumberInput
        label="From"
        value={ageRange[0]}
        min={18}
        max={ageTo}
        onChange={(value) => {
          setAgeRangeValue(([_, ageTo]) => {
            if (typeof value === 'string') return [18, ageTo];
            return [value, value > ageTo ? value : ageTo];
          });
        }}
      />
      <NumberInput
        label="To"
        value={ageRange[1]}
        min={ageFrom}
        max={200}
        onChange={(value) => {
          setAgeRangeValue(([ageFrom, _]) => {
            if (typeof value === 'string') return [ageFrom, 200];
            return [value < ageFrom ? value : ageFrom, value];
          });
        }}
      />
      <Group grow>
        <Button onClick={onClear}>Clear</Button>
        <Button onClick={onDone}>Done</Button>
      </Group>
    </Stack>
  );
};
