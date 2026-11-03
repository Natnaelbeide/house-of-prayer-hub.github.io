import conferenceVideo from "@/assets/announcements/upcoming-conference-oct24.mp4.asset.json";
import schoolOfMinistryVideo from "@/assets/announcements/school-of-ministry.mp4.asset.json";
import sundayServiceVideo from "@/assets/announcements/sunday-service.mp4.asset.json";
import fridayPrayerVideo from "@/assets/announcements/friday-prayer.mp4.asset.json";
import ministersClassVideo from "@/assets/announcements/ministers-class.mp4.asset.json";

export interface UpcomingProgram {
  id: string;
  title: string;
  titleTi?: string;
  date: string;
  time: string;
  description: string;
  descriptionTi?: string;
  videoUrl: string;
  posterUrl?: string;
  location?: string;
  link?: string;
  linkLabel?: string;
  note?: string;
  isNew?: boolean;
}

// Update this list whenever there is a new program or event.
// Changing `version` will make the popup show again for returning visitors.
export const POPUP_VERSION = "2026-11-03-conference-details-v2";

export const upcomingPrograms: UpcomingProgram[] = [
  {
    id: "upcoming-conference",
    title: "Upcoming Conference",
    titleTi: "ዝመጽእ ጉባኤ",
    date: "November 13-15",
    time: "Friday 6:00 PM · Saturday 5:00 PM · Sun TBA",
    description: "Join us for a special conference with Pastor Meseret Daniel from Australia and worship singer Adonay Efrem from Canada, featuring a special healing and deliverance prayer session for youth, young adults, and everyone.",
    descriptionTi: "ምስ ዕዱም ጋሻና ፓ/ር መሰረት ዳንኤል ካብ ኣውስትራሊያ ከምኡውን ዘማሪ ኣዶናይ ካብ ካናዳ ፡ንመንእሰያትን ከም ውን ንኹሉ ዝተዳለወ ፍሉይ ናይ ምንቕቓሕ ፈውሲን ምንጋፍን ጸሎትን ዝተሓወሰ ጉባኤ ክህልወና እዩ። ተወሳኺ ሓበሬታ ምስ እትደልዮ ተወከሱና።",
    videoUrl: conferenceVideo.url,
    location: "3846 King St, Alexandria, VA",
    isNew: true,
  },
  {
    id: "school-of-ministry",
    title: "School of Ministry — Bible School",
    titleTi: "ቤት ትምህርቲ ኣገልግሎት — መጽሓፍ ቅዱስ",
    date: "Registration open",
    time: "Schedule announced soon",
    description: "Enroll in our Bible school to study the Word and be equipped for ministry. Register on the Announcements page.",
    descriptionTi: "ቃል ኣምላኽ ንምምሃርን ንኣገልግሎት ንምዕጣቕን ተመዝገቡ። ኣብ ታሕቲ ዘሎ ቅጥዒ ተጠቐሙ።",
    videoUrl: schoolOfMinistryVideo.url,
    location: "3846 King St, Alexandria, VA",
    link: "/announcements#school-of-ministry",
    linkLabel: "Register Now",
    isNew: true,
  },
  {
    id: "sunday-service",
    title: "Sunday Service",
    titleTi: "ናይ ሰንበት ኣገልግሎት",
    date: "Every Sunday",
    time: "3:00 PM",
    description: "Join us for worship, prayer, and the Word.",
    descriptionTi: "ኣብ 3846 King St, Alexandria, VA ምሳና ኣምልኹ። ሓደስቲ ኣጋይሽን ስድራቤታትን ኩሉ ግዜ እንቋዕ ደሓን መጻእኩም።",
    videoUrl: sundayServiceVideo.url,
    location: "3846 King St, Alexandria, VA",
  },
  {
    id: "friday-night",
    title: "Friday Night Prayer Service",
    titleTi: "ናይ ዓርቢ ምሸት ጸሎት",
    date: "Every Friday",
    time: "6:30 PM",
    description: "Evening of prayer, worship, and the Word.",
    descriptionTi: "ኩሉ ግዜ ዓርቢ ፡ኣዝዩ ደስ ዘብል ናይ ጸሎት ፡ኣምልኾ ን ፈውስን ምሸት",
    videoUrl: fridayPrayerVideo.url,
    location: "3846 King St, Alexandria, VA",
  },
  {
    id: "wednesday-ministers",
    title: "Wednesday Ministers Class",
    titleTi: "ናይ ረቡዕ ትምህርቲ ኣገልገልቲ",
    date: "Every Wednesday",
    time: "8:00 PM",
    description: "Teaching how to be a servant of God via Zoom.",
    descriptionTi: "ንጎይታ ካብ ምስዓብ ዝወጸ ኣገልግሎትን፡ ኣገልጋሊ ኣምላኽ ከመይ ክኸውን ኣለዎ ዝምህር ሰሙናዊ ናይ Zoom ትምህርቲ ኣሎና። ኩሉኹም ኣገልገልቲ ክትሳተፉ ንዕድም።",
    videoUrl: ministersClassVideo.url,
    location: "Online (Zoom)",
  },
];
