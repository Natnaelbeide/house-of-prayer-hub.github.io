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
  titleTi?: string;
  date: string;
  time: string;
  description: string;
  descriptionTi?: string;
  videoUrl: string;
  location?: string;
  link?: string;
  isNew?: boolean;
}

// Update this list whenever there is a new program or event.
// Changing `version` will make the popup show again for returning visitors.
export const POPUP_VERSION = "2026-09-16-video-v2";

export const upcomingPrograms: UpcomingProgram[] = [
  {
    id: "fasting-prayer-program",
    title: "Fasting and Prayer Program",
    titleTi: "ጾምን ጸሎትን መደብ",
    date: "September 28 – October 3",
    time: "TBA",
    description: "Join us for a special time of fasting and prayer as we seek God together as a church family.",
    descriptionTi: "ብሓባር ገጽ ኣምላኽ ንምድላይ ኣብ ዝካየድ ፍሉይ ናይ ጾምን ጸሎትን ግዜ ሕበሩና። ተወሳኺ ሓበሬታ ኣብ ቀረባ ግዜ።",
    videoUrl: fastingPrayerVideo.url,
    location: "3846 King St, Alexandria, VA",
    isNew: true,
  },
  {
    id: "worship-healing-conference",
    title: "Worship and Healing Conference",
    titleTi: "ናይ ኣምልኾን ፈውስን መዓልቲ",
    date: "October 18",
    time: "3:00 PM",
    description: "A powerful evening of worship and healing. Come expecting the presence and touch of God.",
    descriptionTi: "ዓቢ ናይ ኣምልኾን ፈውስን ምስጋርን ምሸት። ህላውነት ኣምላኽን ኢዱን ተጸቢኹም ምጹ።",
    videoUrl: worshipHealingVideo.url,
    location: "3846 King St, Alexandria, VA",
    isNew: true,
  },
  {
    id: "upcoming-conference",
    title: "Upcoming Conference",
    titleTi: "ዝመጽእ ጉባኤ",
    date: "November 6-8",
    time: "TBA",
    description: "A special guest joins us for a powerful conference with a dedicated prayer session for youth and young adults.",
    descriptionTi: "ምስ ዕዱም ጋሻና ፓ/ር መሰረት ዳንኤል ካብ ኣውስትራሊያ ንህጻናትን፡ንመንእሰያትን ከም ውን ንኹሉ ዝተዳለወ ፍሉይ ናይ ምንቕቓሕን ጸሎትን ዝተሓወሰ ጉባኤ ክህልወና እዩ። ተወሳኺ ሓበሬታ ኣብ ቀረባ ግዜ።",
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
    isNew: true,
  },
  {
    id: "sunday-service",
    title: "Sunday Service",
    titleTi: "ናይ ሰንበት ኣገልግሎት",
    date: "Every Sunday",
    time: "3:30 PM",
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
