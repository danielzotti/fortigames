import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { supabaseClient } from "~/supabase/supabase-client";
import type { User } from "@supabase/supabase-js";
import { Participant } from "~/types/participant.types";
import { Link } from "@builder.io/qwik-city";
import Loader from "~/shared/components/ui/loader/loader";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import { LOADIPHLPAPI } from "dns";

export default component$(() => {
  const user = useSignal<User | null>(null);

  const people = useSignal<Array<Participant> | null>();

  useVisibleTask$(async () => {
    const {
      data: { user: userInfo },
    } = await supabaseClient.auth.getUser();
    user.value = userInfo;

    const { data: participantList } = await supabaseClient
      .from("users")
      .select("*")
      .order("is_admin", { ascending: false })
      .order("email", { ascending: true });

    people.value = participantList;
  });

  return (
    <MainLayout title="Gestione">
      {!people.value && !user.value && <Loader />}

      {user.value && <pre>Current user: {user.value?.email}</pre>}

      {people.value && (
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>N.</th>
                <th>Team</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Admin</th>
                <th>Email</th>
                <th>Company</th>
                <th>Form</th>
                <th>Soccer</th>
                <th>Volley</th>
                <th>Ping Pong</th>
                <th>Board Games</th>
                <th>Referee</th>
                <th>Facilitator</th>
              </tr>
            </thead>
            <tbody>
              {people.value.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.number}</td>
                  <td>{p.team}</td>
                  <td>{p.firstname}</td>
                  <td>{p.lastname}</td>
                  <td>{p.is_admin ? "X" : ""}</td>
                  <td>
                    <Link href={"/admin/" + p.id}>{p.email}</Link>
                  </td>
                  <td>{p.company}</td>
                  <td>{p.has_filled_form ? "X" : ""}</td>
                  <td>{p.is_playing_soccer ? "X" : ""}</td>
                  <td>{p.is_playing_volley ? "X" : ""}</td>
                  <td>{p.is_playing_pingpong ? "X" : ""}</td>
                  <td>{p.is_playing_boardgames ? "X" : ""}</td>
                  <td>{p.is_referee ? "X" : ""}</td>
                  <td>{p.is_facilitator ? "X" : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </MainLayout>
  );
});
