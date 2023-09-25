import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import {
  routeLoader$,
  useLocation,
  useNavigate,
  z,
} from "@builder.io/qwik-city";
import type {
  FieldElementProps,
  FieldStore,
  InitialValues,
  SubmitHandler,
} from "@modular-forms/qwik";
import { setValues, useForm, zodForm$ } from "@modular-forms/qwik";
import { Participant } from "~/types/participant.types";
import { supabaseClient } from "~/supabase/supabase-client";
import { config } from "~/config";
import BackButton from "~/shared/components/ui/back-button/back-button";

const participantDefaultValue: Participant = {
  company: "",
  firstname: "",
  has_filled_form: false,
  id: 0,
  is_admin: false,
  is_facilitator: false,
  is_playing_boardgames: false,
  is_playing_pingpong: false,
  is_playing_soccer: false,
  is_playing_volley: false,
  is_referee: false,
  lastname: "",
  number: null,
  team: "",
  email: "",
};

const participantSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email.")
    .email("The email address is badly formatted."),
  firstname: z.string().nullable(),
  lastname: z.string().nullable(),
  company: z.string().nullable(),
  is_playing_soccer: z.boolean().nullable(),
  is_playing_volley: z.boolean().nullable(),
  is_playing_pingpong: z.boolean().nullable(),
  is_playing_boardgames: z.boolean().nullable(),
  is_referee: z.boolean().nullable(),
  is_facilitator: z.boolean().nullable(),
  has_filled_form: z.boolean(),
  number: z.number().nullable(),
  team: z.string().nullable(),
});

type ParticipantForm = z.infer<typeof participantSchema>;

export const useFormLoader = routeLoader$<InitialValues<ParticipantForm>>(
  () => participantDefaultValue,
);

// export const useFormAction = formAction$<ParticipantForm>((values) => {
//   // Runs on server
//   console.log("SERVER", values);
// }, zodForm$(participantSchema));

export default component$(() => {
  const location = useLocation();
  const navigate = useNavigate();

  const participant = useSignal<Participant>();

  const [participantForm, { Form, Field }] = useForm<ParticipantForm>({
    loader: useFormLoader(),
    // action: useFormAction(),
    validate: zodForm$(participantSchema),
  });

  const handleSubmit = $<SubmitHandler<ParticipantForm>>(async (values) => {
    // Runs on client
    const { error } = await supabaseClient
      .from("users")
      .update(values)
      .eq("id", location.params.id);
    if (error) {
      alert(error.message);
      return;
    }

    navigate(config.urls.admin);
  });

  useVisibleTask$(async () => {
    const { data } = await supabaseClient
      .from("users")
      .select("*")
      .eq("id", location.params.id);

    console.log({ data });
    if (!data?.length) {
      // No data
      return;
    }

    participant.value = data?.[0];

    setValues(participantForm, data?.[0] ?? null);
  });

  if (!participant.value) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Edit</h1>
      <BackButton url={config.urls.admin} />
      <h3>
        {participant.value.firstname} {participant.value.lastname}
      </h3>
      <Form onSubmit$={handleSubmit}>
        <Field name="email" type="string">
          {(field, props) => InputString(field, props)}
        </Field>
        <Field name="firstname" type="string">
          {(field, props) => InputString(field, props)}
        </Field>
        <Field name="lastname" type="string">
          {(field, props) => InputString(field, props)}
        </Field>
        <Field name="team" type="string">
          {(field, props) => InputString(field, props)}
        </Field>
        <Field name="company" type="string">
          {(field, props) => InputString(field, props)}
        </Field>
        <Field name="number" type="number">
          {(field, props) => InputNumber(field, props)}
        </Field>
        <Field name="is_playing_soccer" type="boolean">
          {(field, props) => InputCheckbox(field, props)}
        </Field>
        <Field name="is_playing_volley" type="boolean">
          {(field, props) => InputCheckbox(field, props)}
        </Field>
        <Field name="is_playing_pingpong" type="boolean">
          {(field, props) => InputCheckbox(field, props)}
        </Field>
        <Field name="is_playing_boardgames" type="boolean">
          {(field, props) => InputCheckbox(field, props)}
        </Field>
        <Field name="is_referee" type="boolean">
          {(field, props) => InputCheckbox(field, props)}
        </Field>
        <Field name="is_facilitator" type="boolean">
          {(field, props) => InputCheckbox(field, props)}
        </Field>
        <Field name="has_filled_form" type="boolean">
          {(field, props) => InputCheckbox(field, props)}
        </Field>

        <button type="submit">Save</button>
      </Form>
    </>
  );
});

const InputCheckbox = (
  field: FieldStore<Participant, keyof Participant>, // TODO: improve types
  props: FieldElementProps<Participant, keyof Participant>,
) => (
  <div>
    <label for={field.name}>{field.name}</label>
    <input
      id={field.name}
      type="checkbox"
      placeholder={field.name}
      {...props}
      checked={(field.value as boolean) ?? undefined}
    />
    {field.error && <div>{field.error}</div>}
  </div>
);

const InputString = (
  field: FieldStore<Participant, keyof Participant>, // TODO: improve types
  props: FieldElementProps<Participant, keyof Participant>,
) => (
  <div>
    <label for={field.name}>{field.name}</label>
    <input
      id={field.name}
      type="text"
      placeholder={field.name}
      {...props}
      value={field.value as string}
      onInput$={(e) => {
        const newValue = (e.target as HTMLInputElement).value;
        field.value = newValue ? newValue : null;
      }}
    />
    {field.error && <div>{field.error}</div>}
  </div>
);

const InputNumber = (
  field: FieldStore<Participant, keyof Participant>, // TODO: improve types
  props: FieldElementProps<Participant, keyof Participant>,
) => (
  <div>
    <label for={field.name}>{field.name}</label>
    <input
      id={field.name}
      type="number"
      placeholder={field.name}
      {...props}
      value={field.value as number}
      onInput$={(e) => {
        const newValue = (e.target as HTMLInputElement).value;
        field.value = newValue ? +newValue : null;
      }}
    />
    {field.error && <div>{field.error}</div>}
  </div>
);