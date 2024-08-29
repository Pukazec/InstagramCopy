export interface InstagramLogDto {
  id: number;
  userName: string | null;
  occurredAt: string;
  operation: string;
  requestQuery: string | null;
}
