import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchMatchParticipantsByMatchId } from '../services/fetchMatchParticipants'

export function useCreateMatchParticipants(matchId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => fetchMatchParticipantsByMatchId(matchId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lol', 'matches', matchId],
      })
    },
  })
}
