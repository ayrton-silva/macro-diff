import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useItems } from '../hooks/useItems'

interface ItemIconProps {
  itemKey: number
}

export function ItemIcon({ itemKey }: ItemIconProps) {
  const { status, data: items, error, isFetching } = useItems()
  let item = ''

  if (items?.data) {
    for (const [key, value] of Object.entries(items?.data)) {
      if (key === itemKey.toString()) {
        item = key
      }
    }
  }

  return (
    <Avatar className="w-7 h-7">
      <AvatarImage
        className="rounded-xs border border-black"
        src={`https://ddragon.leagueoflegends.com/cdn/16.9.1/img/item/${item}.png`}
      />
      <AvatarFallback className="rounded-none border border-black">
        <span className="bg-gray-800 block w-full h-full"></span>
      </AvatarFallback>
    </Avatar>
  )
}
