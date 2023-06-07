import { Box } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import MatchCard from "../../components/MatchCard/MatchCard";
import { gameService, IApiMatchHistory, MatchStatus } from "../../services/game-service";

export default function MachesLive(){
  const [matchesList, setMatchesList] = useState<IApiMatchHistory[]>([]);


  useMemo(async () => {
    const matches = await gameService.getMatchesHistory(undefined, MatchStatus.IS_PLAYING);

    setMatchesList(matches);
  }, []);

  return (
    <Box h="98%" w={"100%"} overflowY="scroll">
      <Text
        fontSize={"25px"}
        fontWeight={"bold"}
        textColor="white"
        textAlign="center"
      >
        Jogos ao Vivo
      </Text>
      <Box>
        {matchesList.map((match) => {
          return <MatchCard key={match.id} match={match} />;
        })}
      </Box>
    </Box>
  )
}