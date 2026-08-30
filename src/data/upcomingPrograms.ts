export interface UpcomingProgram {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  location?: string;
  link?: string;
  isNew?: boolean;
}

// Update this list whenever there is a new program or event.
// Changing `version` will make the popup show again for returning visitors.
export const POPUP_VERSION = "2026-08-30-v1";

export const upcomingPrograms: UpcomingProgram[] = [
  {
    id: "sunday-service",
    title: "Sunday Service",
    date: "Every Sunday",
    time: "3:30 PM",
    description: "Join us for worship, prayer, and the Word.",
    location: "3846 King St, Alexandria, VA",
  },
  {
    id: "friday-night",
    title: "Friday Night Service",
    date: "Every Friday",
    time: "6:30 PM",
    description: "Evening of prayer, worship, and the Word.",
    location: "3846 King St, Alexandria, VA",
  },
  {
    id: "wednesday-ministers",
    title: "Wednesday Ministers Class",
    date: "Every Wednesday",
    time: "8:00 PM",
    description: "Teaching how to be a servant of God via Zoom.",
    location: "Online (Zoom)",
    isNew: true,
  },
];
