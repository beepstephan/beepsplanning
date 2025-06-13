export interface Event {
  id: number | null;
  title: string;
  start: string;
  end: string;
  description: string;
  importance: "normal" | "important" | "critical";
}
