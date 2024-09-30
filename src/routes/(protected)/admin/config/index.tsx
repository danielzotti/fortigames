import {$, component$, useComputed$, useSignal, useVisibleTask$} from "@builder.io/qwik";
import {routeLoader$, z} from "@builder.io/qwik-city";
import {
    type FieldElementProps,
    type FieldStore,
    type InitialValues,
    setValues,
    type SubmitHandler,
    useForm,
    zodForm$
} from "@modular-forms/qwik";
import styles from "~/routes/(protected)/admin/users/[id]/index.module.scss";
import Button from "~/shared/components/ui/button/button";
import Loader from "~/shared/components/ui/loader/loader";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import BackButton from "~/shared/components/ui/back-button/back-button";
import {config as configuration} from "~/config";
import {useConfig} from "~/hooks/useConfig";
import {supabaseClient} from "~/supabase/supabase-client";
import {Config} from "~/types/config.types";

const configDefaultValue: Config = {
    games_ended_at: null,
    games_started_at: null,
    id: 1,
    is_paused: null,
    planned_end: null,
    planned_start: null,
    winner: null,
};

const configSchema = z.object({
    games_ended_at: z.string().nullable()/*.refine((arg) =>
        arg?.match(
            /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/
        )),*/,
    games_started_at: z.string().nullable(),
    id: z.number().min(1),
    is_paused: z.boolean().nullable(),
    planned_end: z.string().nullable(),
    planned_start: z.string().nullable(),
    winner: z.string().min(1).nullable(),
});

type ConfigForm = z.infer<typeof configSchema>;

export const useFormLoader = routeLoader$<InitialValues<ConfigForm>>(
    () => configDefaultValue,
);

export default component$(() => {
    const {config: data} = useConfig();

    const config = useSignal<Config>();

    const [configForm, {Form, Field}] = useForm<ConfigForm>({
        loader: useFormLoader(),
        validate: zodForm$(configSchema),
    });

    const handleSubmit = $<SubmitHandler<ConfigForm>>(async (values) => {
        // Runs on client
        const {error} = await supabaseClient
            .from("config")
            .update(values)
            .eq("id", values.id);
        if (error) {
            alert(error.message);
            return;
        }
    });

    useVisibleTask$(async () => {
        const {data} = await supabaseClient
            .from("config")
            .select("*")

        if (!data?.length) {
            // No data
            return;
        }

        config.value = data?.[0];

        setValues(configForm, data?.[0] ?? null);
    });

    return (
        <MainLayout title="Config | Admin">
            <BackButton url={configuration.urls.admin}/>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            {!config.value && <Loader/>}
            {config.value && <>
                <Form onSubmit$={handleSubmit}>
                    <div class={styles.fields}>
                        <Field name="id" type="number">
                            {/*@ts-ignore-*/}
                            {(field, props) => InputNumber(field, props, true)}
                        </Field>
                        <Field name="planned_start" type="string">
                            {/*@ts-ignore-*/}
                            {(field, props) => InputDate(field, props)}
                        </Field>
                        <Field name="planned_end" type="string">
                            {/*@ts-ignore-*/}
                            {(field, props) => InputDate(field, props)}
                        </Field>
                        <Field name="games_started_at" type="string">
                            {/*@ts-ignore-*/}
                            {(field, props) => InputDate(field, props)}
                        </Field>
                        <Field name="games_ended_at" type="string">
                            {/*@ts-ignore-*/}
                            {(field, props) => InputDate(field, props)}
                        </Field>
                        <Field name="winner" type="string">
                            {/*@ts-ignore-*/}
                            {(field, props) => InputString(field, props)}
                        </Field>
                        <div class={styles.checkboxes}>
                            <Field name="is_paused" type="boolean">
                                {/*@ts-ignore-*/}
                                {(field, props) => InputCheckbox(field, props)}
                            </Field>
                        </div>

                        <Button type="submit" variant="selected">
                            Save
                        </Button>
                    </div>
                </Form>
            </>}
        </MainLayout>
    );
});

const InputCheckbox = (
    field: FieldStore<Config, keyof Config>, // TODO: improve types
    props: FieldElementProps<Config, keyof Config>,
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
    field: FieldStore<Config, keyof Config>, // TODO: improve types
    props: FieldElementProps<Config, keyof Config>,
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

const InputDate = (
    field: FieldStore<Config, keyof Config>, // TODO: improve types
    props: FieldElementProps<Config, keyof Config>,
) => (
    <div class={styles.field}>
        <label for={field.name}>{field.name}</label>
        <input
            id={field.name}
            type="datetime-local"
            placeholder={field.name}
            {...props}
            value={field.value as string}
            onInput$={(e) => {
                const newValue = (e.target as HTMLInputElement).value;
                console.log({newValue})
                field.value = newValue ? newValue : null;
            }}
        />
        {field.error && <div class={styles.error}>{field.error}</div>}
    </div>
);

const InputNumber = (
    field: FieldStore<Config, keyof Config>, // TODO: improve types
    props: FieldElementProps<Config, keyof Config>,
    disabled: boolean = false
) => (
    <div class={styles.field}>
        <label for={field.name}>{field.name}</label>
        <input
            id={field.name}
            type="number"
            placeholder={field.name}
            {...props}
            disabled={disabled}
            value={field.value as number}
            onInput$={(e) => {
                const newValue = (e.target as HTMLInputElement).value;
                field.value = newValue ? +newValue : null;
            }}
        />
        {field.error && <div class={styles.error}>{field.error}</div>}
    </div>
);
