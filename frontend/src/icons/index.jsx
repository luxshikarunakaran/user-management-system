import React from "react";

// Navigation Icons
export const IconCap = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M22 10 12 4 2 10l10 6 10-6z" strokeWidth="2" />
    <path d="M6 12v5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5" strokeWidth="2" />
  </svg>
);

export const IconUser = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" />
    <circle cx="12" cy="7" r="4" strokeWidth="2" />
  </svg>
);

export const IconLogout = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeWidth="2" />
    <path d="M16 17l5-5-5-5" strokeWidth="2" strokeLinecap="round" />
    <path d="M21 12H9" strokeWidth="2" />
  </svg>
);

export const IconDashboard = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <rect x="3" y="3" width="7" height="7" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
    <rect x="14" y="14" width="7" height="7" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" strokeWidth="2" />
  </svg>
);

// User Management Icons
export const IconUsers = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const IconUserCog = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M18 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="10" cy="7" r="4" />
    <path d="M23 11l-1.5.3a2 2 0 0 1-.5 1.1l.9 1.2-1.4 1.4-1.2-.9a2 2 0 0 1-1.1.5L17 17l-.3-1.5a2 2 0 0 1-1.1-.5l-1.2.9-1.4-1.4.9-1.2a2 2 0 0 1-.5-1.1L12 11l1.5-.3a2 2 0 0 1 .5-1.1l-.9-1.2L14.5 7l1.2.9a2 2 0 0 1 1.1-.5L17 6l.3 1.5a2 2 0 0 1 1.1.5l1.2-.9L21 8.5l-.9 1.2c.24.32.41.7.5 1.1L23 11z" />
  </svg>
);

// Action Icons
export const IconSearch = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export const IconPlus = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconEdit = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path d="M12 20h9" />
    <path
      d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const IconTrash = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" strokeLinecap="round" />
    <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
  </svg>
);

export const IconBook = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M4 4v15.5A2.5 2.5 0 0 0 6.5 22h13.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z" />
  </svg>
);

// Loading Spinner Icon
export const IconSpinner = (props) => (
  <svg
    className="animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);
