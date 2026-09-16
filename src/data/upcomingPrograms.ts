import fastingPrayerVideo from "@/assets/announcements/fasting-prayer.mp4.asset.json";
import worshipHealingVideo from "@/assets/announcements/worship-healing.mp4.asset.json";
import conferenceVideo from "@/assets/announcements/conference.mp4.asset.json";
import schoolOfMinistryVideo from "@/assets/announcements/school-of-ministry.mp4.asset.json";
import sundayServiceVideo from "@/assets/announcements/sunday-service.mp4.asset.json";
import fridayPrayerVideo from "@/assets/announcements/friday-prayer.mp4.asset.json";
import ministersClassVideo from "@/assets/announcements/ministers-class.mp4.asset.json";

export interface UpcomingProgram {
  id: string;
  title: string;
  geezTitle: string;
  date: string;
  time: string;
  description: string;
  geezDescription: string;
  videoUrl: string;
  location?: string;
  link?: string;
  isNew?: boolean;
}

// Update this list whenever there is a new program or event.
// Changing `version` will make the popup show again for returning visitors.
export const POPUP_VERSION = "2026-09-16-geez-v1";

export const upcomingPrograms: UpcomingProgram[] = [
  {
    id: "fasting-prayer-program",
    title: "Fasting and Prayer Program",
    geezTitle: "መደብ ጾምን ጸሎትን",
    date: "September 28 – October 3",
    time: "TBA",
    description: "Join us for a special time of fasting and prayer as we seek God together as a church family.",
    geezDescription: "ከም ስድራ ቤተ ክርስቲያን ብሓባር ንእግዚኣብሔር እናደለና፣ ኣብዚ ፍሉይ ግዜ ጾምን ጸሎትን ተጸንበሩና።",
    videoUrl: fastingPrayerVideo.url,
    location: "3846 King St, Alexandria, VA",
    isNew: true,
  },
  {
    id: "worship-healing-conference",
    title: "Worship and Healing Conference",
    geezTitle: "ኮንፈረንስ ኣምልኾን ፈውስን",
    date: "October 4",
    time: "3:00 PM",
    description: "A powerful evening of worship and healing. Come expecting the presence and touch of God.",
    geezDescription: "ሓያል ምሸት ኣምልኾን ፈውስን። ህላወን ምትንካፍን እግዚኣብሔር እናተጸበኹም ንዑ።",
    videoUrl: worshipHealingVideo.url,
    location: "3846 King St, Alexandria, VA",
    isNew: true,
  },
  {
    id: "upcoming-conference",
    title: "Upcoming Conference",
    geezTitle: "ዝመጽእ ኮንፈረንስ",
    date: "November 6-8",
    time: "TBA",
    description: "A special guest joins us for a powerful conference with a dedicated prayer session for youth and young adults.",
    geezDescription: "ፍሉይ ጋሻ ዝሳተፎ ሓያል ኮንፈረንስ፣ ንመንእሰያትን ንዓበይቲ መንእሰያትን ዝተዳለወ ፍሉይ ናይ ጸሎት ግዜ።",
    videoUrl: conferenceVideo.url,
    location: "3846 King St, Alexandria, VA",
    isNew: true,
  },
  {
    id: "school-of-ministry",
    title: "School of Ministry — Bible School",
    geezTitle: "ቤት ትምህርቲ ኣገልግሎት — ቤት ትምህርቲ መጽሓፍ ቅዱስ",
    date: "Registration open",
    time: "Schedule announced soon",
    description: "Enroll in our Bible school to study the Word and be equipped for ministry. Register on the Announcements page.",
    geezDescription: "ቃል እግዚኣብሔር ንምጽናዕን ንኣገልግሎት ንምድላውን ኣብ ቤት ትምህርቲ መጽሓፍ ቅዱስ ተመዝገቡ።",
    videoUrl: schoolOfMinistryVideo.url,
    location: "3846 King St, Alexandria, VA",
    link: "/announcements#school-of-ministry",
    isNew: true,
  },
  {
    id: "sunday-service",
    title: "Sunday Service",
    geezTitle: "ናይ ሰንበት ኣገልግሎት",
    date: "Every Sunday",
    time: "3:30 PM",
    description: "Join us for worship, prayer, and the Word.",
    geezDescription: "ንኣምልኾ፣ ጸሎትን ቃል እግዚኣብሔርን ተጸንበሩና።",
    videoUrl: sundayServiceVideo.url,
    location: "3846 King St, Alexandria, VA",
  },
  {
    id: "friday-night",
    title: "Friday Night Prayer Service",
    geezTitle: "ናይ ዓርቢ ምሸት ኣገልግሎት ጸሎት",
    date: "Every Friday",
    time: "6:30 PM",
    description: "Evening of prayer, worship, and the Word.",
    geezDescription: "ምሸት ጸሎት፣ ኣምልኾን ቃል እግዚኣብሔርን።",
    videoUrl: fridayPrayerVideo.url,
    location: "3846 King St, Alexandria, VA",
  },
  {
    id: "wednesday-ministers",
    title: "Wednesday Ministers Class",
    geezTitle: "ናይ ረቡዕ ክፍሊ ኣገልገልቲ",
    date: "Every Wednesday",
    time: "8:00 PM",
    description: "Teaching how to be a servant of God via Zoom.",
    geezDescription: "ብዙም ኣቢልካ ኣገልጋሊ እግዚኣብሔር ከመይ ምዃን ከም ዝከኣል ዝወሃብ ትምህርቲ።",
    videoUrl: ministersClassVideo.url,
    location: "Online (Zoom)",
  },
];
