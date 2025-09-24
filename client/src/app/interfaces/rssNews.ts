export interface IRssNewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  guid?: string;

}

export interface IRssNews {
  title: string;
  description: string;
  link: string;
  lastBuildDate: string;
  items: IRssNewsItem[];
}