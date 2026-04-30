import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card"
import { useMatch } from "../hooks/useMatches"
import { ParticipantCard } from "./ParticipantCard"

// === Header ====
// Modo, Duração, Há quanto tempo
// ===============

// === Content ====
// Build, Frag, CS, Gold, Vision SCore, Champion Avatar, Spells, Rune?, Trinket, Nome invocador (link)
// ================

interface MatchCardProps {
    matchId: string
}

export function MatchCard({matchId}: MatchCardProps) {
    const { status, data, error, isFetching } = useMatch(matchId)
    
    return (
        <div className="max-w-7xl mx-auto py-8 grid gap-6">
            <Card className="bg-cyan-950">
            <CardHeader>

            </CardHeader>
            <CardContent>
                <div className="flex gap-4">
                    <div className="w-1/2 flex flex-col gap-4">
                    {data?.participants.filter(p => p.teamId === '100')?.map(participant => (
                        <ParticipantCard participant={participant}/>
                     ))}
                </div>
                    <div className="w-1/2 flex flex-col gap-4">
                        {data?.participants.filter(p => p.teamId === '200')?.map(participant => (
                            <ParticipantCard participant={participant}/>
                        ))}
                    </div>
                </div>
            </CardContent>
            </Card>
        </div>
    )
}