import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { Login } from "~/components/auth/login/login";
import { Logout } from "~/components/auth/logout/logout";
import { supabaseClient } from "~/supabase/supabase-client";
import type { User } from "@supabase/supabase-js";
import { Participant } from "~/types/participant.types";
import { Link } from "@builder.io/qwik-city";

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
      .order("email", { ascending: true });

    people.value = participantList;

    /*if (userInfo?.email) {
                  const { data: otherInfo } = await supabaseClient
                    .from("users")
                    .select("*")
                    .eq("email", userInfo.email);
                  console.log({ otherInfo });
                }*/
  });

  if (!user.value) {
    return <Login />;
  }

  return (
    <>
      <h1>Welcome to Fortigames 2023</h1>

      <Logout />

      <pre>Current user: {user.value.email}</pre>

      {people.value && (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>N.</th>
              <th>Team</th>
              <th>First Name</th>
              <th>Last Name</th>
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
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Fortigames 2023 Admin",
  meta: [
    {
      name: "description",
      content: "Fortigames 2023 description",
    },
  ],
};
