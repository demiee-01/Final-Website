// List of admin emails who can access the admin dashboard
const ADMIN_EMAILS = [
  "dyk32198@gmail.com", // Your email - replace with actual admin email
  // Add more admin emails here
  // "admin@example.com",
];

export function isAdmin(userEmail) {
  if (!userEmail) return false;
  return ADMIN_EMAILS.includes(userEmail.toLowerCase());
}

export function getAdminEmails() {
  return ADMIN_EMAILS;
}
