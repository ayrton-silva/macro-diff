import { useForm } from '@tanstack/react-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useNavigate } from '@tanstack/react-router'

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
      region: '',
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
    { value: "americas", label: "BR - Brazil" },
    { value: "asia", label: "Asia" },
    { value: "europe", label: "Europe" },
    { value: "sea", label: "Sea" },
  ]

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Search summoner</CardTitle>
        <CardDescription>Search by summoner name</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="bug-report-form"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup className='flex-row'>
            <form.Field
              name="gameName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Nidalee é supp"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name="tagLine"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Tag</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="#BR1"
                      aria-invalid={isInvalid}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
            <form.Field
              name="region"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Region</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value ?? '')}
                    >
                      <SelectTrigger
                        id="form-tanstack-select-language"
                        aria-invalid={isInvalid}
                        className="min-w-[120px]"
                      >
                      <SelectValue placeholder="Select">
                        {regions.find(r => r.value === field.state.value)?.label ?? null}
                      </SelectValue>
                      </SelectTrigger>
                      <SelectContent align='center'>
                        {regions.map(f => <SelectItem value={f.value}>{f.label}</SelectItem>)}
                      </SelectContent>
                    </Select>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="bug-report-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
