import * as z from 'zod'
import { Select } from '@base-ui/react/select'
import { Field } from '@base-ui/react/field'
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'

const formSchema = z.object({
  gameName: z
    .string()
    .min(2, 'Game name must be at least 2 characters.')
    .max(64, 'Game name must be at most 64 characters.'),
  tagLine: z.string().max(10, 'Tag must be at most 10'),
  region: z.string().max(10, 'Region must be at most 10'),
})

export function SearchSummonerForm() {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      gameName: '',
      tagLine: '',
      region: 'br1',
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log('You submitted the following values:', value)
      navigate({
        to: `/search-summoners?gameName=${value.gameName}&tagLine=${value.tagLine}&region=${value.region}`,
      })
    },
  })

  const regions = [
    { value: 'br1', label: 'BR - Brazil' },
    { value: 'asia', label: 'Asia' },
    { value: 'europe', label: 'Europe' },
    { value: 'sea', label: 'Sea' },
  ]

  return (
    <div className="w-full mt-10 md:w-fit bg-[#000d1d] rounded-md shadow-2xl shadow-green-400/20 ring-2 ring-green-400/10 mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="flex flex-row gap-2 items-start"
      >
        <form.Field name="region">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field.Root invalid={isInvalid} name={field.name}>
                <Select.Root
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value ?? '')}
                  items={regions}
                >
                  <Select.Trigger
                    className="min-w-[120px] h-12 px-3 flex items-center justify-between
                    rounded-md  text-sm gap-2
                    focus:outline-none focus:ring-2 focus:ring-ring
                    data-[invalid]:border-destructive"
                  >
                    <Select.Value placeholder="Region" />
                    <Select.Icon />
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Positioner align="center" sideOffset={4}>
                      <Select.Popup className="rounded-md  bg-gray-900 shadow-md p-1 min-w-[150px]">
                        <Select.List>
                          {regions.map((r) => (
                            <Select.Item
                              key={r.value}
                              value={r.value}
                              className="flex items-center gap-2 px-2 py-1.5 text-sm rounded cursor-pointer
                              hover:bg-accent hover:text-accent-foreground
                              data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
                            >
                              <Select.ItemIndicator>✓</Select.ItemIndicator>
                              <Select.ItemText>{r.label}</Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.List>
                      </Select.Popup>
                    </Select.Positioner>
                  </Select.Portal>
                </Select.Root>

                {isInvalid && (
                  <Field.Error className="text-xs text-destructive mt-1">
                    {field.state.meta.errors.join(', ')}
                  </Field.Error>
                )}
              </Field.Root>
            )
          }}
        </form.Field>
        <form.Field name="gameName">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field.Root
                invalid={isInvalid}
                name={field.name}
                className="w-[350px]"
              >
                <input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Summoner Name"
                  autoComplete="off"
                  className="h-12 w-full rounded-md  px-3 text-sm
                  focus:outline-none focus:ring-2 focus:ring-ring
                  data-[invalid]:border-destructive"
                />
                {isInvalid && (
                  <Field.Error className="text-xs text-destructive mt-1">
                    {field.state.meta.errors.join(', ')}
                  </Field.Error>
                )}
              </Field.Root>
            )
          }}
        </form.Field>

        <form.Field name="tagLine">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field.Root
                invalid={isInvalid}
                name={field.name}
                className="flex items-center"
              >
                <div>#</div>
                <input
                  id={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="BR1"
                  className="h-12 w-24 rounded-md ml-1  px-3 text-sm
                  focus:outline-none focus:ring-2 focus:ring-ring
                  data-[invalid]:border-destructive"
                />
                {isInvalid && (
                  <Field.Error className="text-xs text-destructive mt-1">
                    {field.state.meta.errors.join(', ')}
                  </Field.Error>
                )}
              </Field.Root>
            )
          }}
        </form.Field>

        <button
          type="submit"
          className="flex items-center h-12 px-4 rounded-md bg-green-400 text-black font-semibold shrink-0 text-sm hover:bg-green-300 cursor-pointer transition-colors"
        >
          <Search className="h-4" />
          GG
        </button>
      </form>
    </div>
  )
}
