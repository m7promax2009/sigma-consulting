/**
 * Backwards compatibility proxy for lead submission.
 * Real implementation is located in src/api/leads.js
 */

export { submitLead, sendLeadToTelegram } from "../api/leads";
export { default } from "../api/leads";
