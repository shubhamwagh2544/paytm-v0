import { Users } from "../components/Users";

export function DashboardPage({ balance }) {
    return (
        <>
            <div>
                Paytm App
            </div>
            <div>
                Hello, User (U)
            </div>

            <div>
                Your balance ${balance}
            </div>
            <Users />
        </>
    )
}