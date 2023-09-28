import { component$, useComputed$ } from "@builder.io/qwik";
import { Participant } from "~/types/participant.types";
import Loader from "~/shared/components/ui/loader/loader";
import MainLayout from "~/shared/layouts/main-layout/main-layout";
import { useParticipants } from "~/hooks/useParticipants";
import { useAuth } from "~/hooks/useAuth";
import { useNavigate } from "@builder.io/qwik-city";
import styles from "./index.module.scss";

export default component$(() => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { usersList, store } = useParticipants();
  const people = useComputed$<Participant[]>(() => {
    return [...usersList.value].sort((a, b) => {
      if (a.is_admin === b.is_admin) {
        return a.email.localeCompare(b.email);
      }
      return !!a.is_admin < !!b.is_admin ? 1 : -1;
    });
  });

  return (
    <MainLayout title="Gestione">
      {/*{!people.value && !user && <Loader />}*/}

      {user && <pre>Current user: {user?.email}</pre>}

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
                <tr
                  class={styles.row}
                  key={p.id}
                  onClick$={() => navigate(`/admin/${p.id}`)}
                >
                  <td>{p.id}</td>
                  <td>{p.number}</td>
                  <td>{p.team}</td>
                  <td>{p.firstname}</td>
                  <td>{p.lastname}</td>
                  <td>{p.is_admin ? "X" : ""}</td>
                  <td>{p.email}</td>
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
