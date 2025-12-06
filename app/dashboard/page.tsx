import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Get user profile with organization
  const { data: profile } = await supabase
    .from("users")
    .select("*, organization:organizations(*)")
    .eq("id", user.id)
    .single()

  if (!profile?.organization) {
    redirect("/auth/error?error=no_organization")
  }

  // Redirect to the main page (which is now the actual dashboard)
  redirect("/")
}
