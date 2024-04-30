import CustomCardChoice, {
  CustomCardChoiceData,
} from '../../Components/CustomCardChoice';
import RoundData from '../../models/data/rounds.json';

/*
Metadata page for gathering information before a round can be shot such as the type
*/
export default function NewShootSessionPage({ navigation }) {
  const roundTypes: CustomCardChoiceData[] = Object.keys(RoundData.types).map(
    roundKey => ({
      key: roundKey,
      name: RoundData.types[roundKey].displayName,
      icon: null,
    }),
  );

  return (
    <>
      {roundTypes.map((roundType, index) => (
        <CustomCardChoice key={index} data={[roundType]} /> // Render CustomCardChoice for each round type
      ))}
    </>
  );
}
