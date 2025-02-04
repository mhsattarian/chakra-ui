import { Avatar, Group } from "@chakra-ui/react"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"

const names = [
  { name: "Naruto Uzumaki", initials: "NU" },
  { name: "Sakura Haruno", initials: "SH" },
  { name: "Kakashi Hatake", initials: "KH" },
  { name: "Hinata Hyuga", initials: "HH" },
  { name: "Shikamaru Nara", initials: "SN" },
]
const maxAvatars = 3

export const AvatarWithOverflow = () => {
  const { items, overflow } = partition(name, maxAvatars)
  return (
    <Group gap="0" spaceX="2">
      {items.map((item) => (
        <Avatar.Root key={item} colorPalette={pickPalette(item)}>
          <Avatar.Fallback>{item}</Avatar.Fallback>
        </Avatar.Root>
      ))}
      {overflow.length > 0 && (
        <MenuRoot positioning={{ placement: "bottom" }}>
          <MenuTrigger rounded="full" focusRing="outside">
            <Avatar.Root variant="outline">
              <Avatar.Fallback>+{overflow.length}</Avatar.Fallback>
            </Avatar.Root>
          </MenuTrigger>
          <MenuContent>
            {overflow.map((item) => (
              <MenuItem value={item} key={item}>
                <Avatar.Root size="xs" colorPalette={pickPalette(item)}>
                  <Avatar.Fallback>{item}</Avatar.Fallback>
                </Avatar.Root>
                {item}
              </MenuItem>
            ))}
          </MenuContent>
        </MenuRoot>
      )}
    </Group>
  )
}

const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"]

const pickPalette = (name: string) => {
  const index = name.charCodeAt(0) % colorPalette.length
  return colorPalette[index]
}

const partition = (arr: string[], max: number) => {
  const items = []
  const overflow = []
  for (const item of arr) {
    if (items.length < max) items.push(item)
    else overflow.push(item)
  }
  return { items, overflow }
}
