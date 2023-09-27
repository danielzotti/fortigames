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
import Loader from "~/shared/components/ui/loader/loader";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import Button from "~/shared/components/ui/button/button";
import styles from "./index.module.scss";

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
  is_admin: z.boolean().nullable(),
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

export default component$(() => {
  const location = useLocation();
  const navigate = useNavigate();

  const participant = useSignal<Participant>();

  const [participantForm, { Form, Field }] = useForm<ParticipantForm>({
    loader: useFormLoader(),
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

    if (!data?.length) {
      // No data
      return;
    }

    participant.value = data?.[0];

    setValues(participantForm, data?.[0] ?? null);
  });

  return (
    <MainLayout title={"Modifica"}>
      <BackButton url={config.urls.admin} />

      {!participant.value && <Loader />}

      {participant.value && (
        <>
          <h3>
            {participant.value.firstname} {participant.value.lastname}
          </h3>

          <Form onSubmit$={handleSubmit}>
            <div class={styles.fields}>
              <Field name="email" type="string">
                {/*@ts-ignore-*/}
                {(field, props) => InputString(field, props)}
              </Field>
              <Field name="firstname" type="string">
                {/*@ts-ignore-*/}
                {(field, props) => InputString(field, props)}
              </Field>
              <Field name="lastname" type="string">
                {/*@ts-ignore-*/}
                {(field, props) => InputString(field, props)}
              </Field>
              <Field name="team" type="string">
                {/*@ts-ignore-*/}
                {(field, props) => InputString(field, props)}
              </Field>
              <Field name="company" type="string">
                {/*@ts-ignore-*/}
                {(field, props) => InputString(field, props)}
              </Field>
              <Field name="number" type="number">
                {/*@ts-ignore-*/}
                {(field, props) => InputNumber(field, props)}
              </Field>
              <div class={styles.checkboxes}>
                <Field name="is_admin" type="boolean">
                  {/*@ts-ignore-*/}
                  {(field, props) => InputCheckbox(field, props)}
                </Field>
                <Field name="is_playing_soccer" type="boolean">
                  {/*@ts-ignore-*/}
                  {(field, props) => InputCheckbox(field, props)}
                </Field>
                <Field name="is_playing_volley" type="boolean">
                  {/*@ts-ignore-*/}
                  {(field, props) => InputCheckbox(field, props)}
                </Field>
                <Field name="is_playing_pingpong" type="boolean">
                  {/*@ts-ignore-*/}
                  {(field, props) => InputCheckbox(field, props)}
                </Field>
                <Field name="is_playing_boardgames" type="boolean">
                  {/*@ts-ignore-*/}
                  {(field, props) => InputCheckbox(field, props)}
                </Field>
                <Field name="is_referee" type="boolean">
                  {/*@ts-ignore-*/}
                  {(field, props) => InputCheckbox(field, props)}
                </Field>
                <Field name="is_facilitator" type="boolean">
                  {/*@ts-ignore-*/}
                  {(field, props) => InputCheckbox(field, props)}
                </Field>
                <Field name="has_filled_form" type="boolean">
                  {/*@ts-ignore-*/}
                  {(field, props) => InputCheckbox(field, props)}
                </Field>
              </div>

              <Button type="submit" variant="selected">
                Save
              </Button>
            </div>
          </Form>
        </>
      )}
    </MainLayout>
  );
});

const InputCheckbox = (
  field: FieldStore<Participant, keyof Participant>, // TODO: improve types
  props: FieldElementProps<Participant, keyof Participant>,
) => (
  <div class={styles.field}>
    <div class={styles.checkbox}>
      <input
        id={field.name}
        type="checkbox"
        placeholder={field.name}
        {...props}
        checked={(field.value as boolean) ?? undefined}
      />
      <label for={field.name}>{field.name}</label>
    </div>
    {field.error && <div class={styles.error}>{field.error}</div>}
  </div>
);

const InputString = (
  field: FieldStore<Participant, keyof Participant>, // TODO: improve types
  props: FieldElementProps<Participant, keyof Participant>,
) => (
  <div class={styles.field}>
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
    {field.error && <div class={styles.error}>{field.error}</div>}
  </div>
);

const InputNumber = (
  field: FieldStore<Participant, keyof Participant>, // TODO: improve types
  props: FieldElementProps<Participant, keyof Participant>,
) => (
  <div class={styles.field}>
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
    {field.error && <div class={styles.error}>{field.error}</div>}
  </div>
);
