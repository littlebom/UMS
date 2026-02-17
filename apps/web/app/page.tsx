import { getBanners } from "@/actions/cms";
import { getPublicAnnouncements } from "@/actions/announcement";
import { getAiSettings } from "@/actions/ai";
import { HomeClient } from "./home-client";

export default async function Home() {
    const banners = await getBanners(true);
    const announcements = await getPublicAnnouncements();
    const aiSettings = await getAiSettings();

    return (
        <HomeClient
            banners={banners}
            announcements={announcements}
            aiSettings={aiSettings}
        />
    );
}
