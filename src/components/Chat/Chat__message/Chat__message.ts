export interface ChatMessageProps {
  isSelf?: boolean;
  type?: 'date' | 'text' | 'image';
  msgContent?: string;
  time?: string; 
  status?: 'delivered' | 'unread' | 'read';
}