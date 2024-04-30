export const getValueByName = (brew_Inputs: any, inputName: string, name?: string) => {
  if (brew_Inputs) {
    const input = brew_Inputs?.find((input: any) => input?.input_name === inputName);
    if (name) {
      const valueItem = input.input_value.find((item: { name: string }) => item.name === name);
      return valueItem ? valueItem.value : null;
    }
    return input;
  }
};

export function pwmGenerator(currentBrix: number, volumebrixratio: number, targetBrix: number, boilDuration: number) {
  let boiloffVolume,
    pwm = 0;
  boiloffVolume = (targetBrix - currentBrix) * volumebrixratio;
  pwm = (boiloffVolume * 1500) / boilDuration;
  return pwm;
}

export function convertSeconds(seconds: number): string {
  if (seconds < 0) {
    throw new Error('Invalid input: Please provide a non-negative number of seconds.');
  }

  const minutes: number = Math.floor(seconds / 60);
  const remainingSeconds: number = seconds % 60;
  const hours: number = Math.floor(minutes / 60);
  const remainingMinutes: number = minutes % 60;
  const days: number = Math.floor(hours / 24);
  const remainingHours: number = hours % 24;

  let timeString = '';

  if (days > 0) {
    timeString += `${days}:`;
  }
  if (remainingHours > 0 || days > 0) {
    timeString += `${remainingHours.toString().padStart(2, '0')}:`;
  }
  if (remainingMinutes >= 0 || remainingHours > 0 || days > 0) {
    timeString += `${remainingMinutes.toString().padStart(2, '0')}:`;
  }
  timeString += `${remainingSeconds.toString().padStart(2, '0')}`;

  return timeString;
}
