import { FC } from 'react';
import { NumberInput, RangeSlider, Stack } from '@mantine/core';

interface AgeRangeFilterProps {
  ageRange: [number, number];
  onAgeRangeChange: (range: [number, number]) => void;
}

export const AgeRangeFilter: FC<AgeRangeFilterProps> = ({
  ageRange,
  onAgeRangeChange,
}) => {
  const [ageFrom, ageTo] = ageRange;

  return (
    <Stack>
      <RangeSlider
        min={18}
        max={200}
        minRange={0}
        label={null}
        value={ageRange}
        onChange={onAgeRangeChange}
      />
      <NumberInput
        label="From"
        value={ageRange[0]}
        min={18}
        max={ageTo}
        onChange={(value) => {
          if (typeof value === 'string') {
            onAgeRangeChange([18, ageTo]);
            return;
          }
          onAgeRangeChange([value, value > ageTo ? value : ageTo]);
        }}
      />
      <NumberInput
        label="To"
        value={ageRange[1]}
        min={ageFrom}
        max={200}
        onChange={(value) => {
          if (typeof value === 'string') {
            onAgeRangeChange([ageFrom, 200]);
            return;
          }
          onAgeRangeChange([value < ageFrom ? value : ageFrom, value]);
        }}
      />
    </Stack>
  );
};
