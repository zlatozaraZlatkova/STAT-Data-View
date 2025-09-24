
import { XMLParser } from 'fast-xml-parser'
import { IRssNews, IRssNewsItem } from 'src/app/interfaces/rssNews';

export function parseXmlToJson(xmlString: string): IRssNews {
    const xmlToJson = new XMLParser().parse(xmlString);
    const rss = xmlToJson.rss;
    
    if (!rss || !rss.channel) {
        throw new Error('Invalid RSS structure');
    }

    const channel = rss.channel;
    let itemsArr = channel.item || [];

    if (!Array.isArray(itemsArr)) {
        itemsArr = [itemsArr];
    }

    const newsItems: IRssNewsItem[] = itemsArr.map((item: IRssNewsItem) => ({
        title: item.title || 'No title',
        description: item.description || '',
        link: item.link || '',
        pubDate: item.pubDate || ''
    }));

    return {
        title: channel.title || 'RSS News',
        description: channel.description || '',
        link: channel.link || '',
        lastBuildDate: channel.lastBuildDate || new Date().toISOString(),
        items: newsItems 
    };
}