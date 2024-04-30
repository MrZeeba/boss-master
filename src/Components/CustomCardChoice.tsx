import { Text } from 'react-native';

/*
Prescribes the format in which data must be passed to the CustomCardChoice
*/
export type CustomCardChoiceData = {
  key: string;
  name: string;
  icon: React.ReactNode | null;
};

/*
Defines the structure for the props being passed into CustomCardChoice
*/
interface CustomCardChoiceProps {
  data: CustomCardChoiceData[];
}

/*
Presents choices to the user in the form of a card choice with an icon
*/
export default function CustomCardChoice({ data }: CustomCardChoiceProps) {
  return (
    <>
      {data.map(item => (
        <Text key={item.key}>
          {item.name} - {item.key}
        </Text>
      ))}
    </>
  );
}
