interface Notification {
  _id: string;
  userId: string;
  content: string;
  type: 'New' | 'Update' | 'Warning' | 'Congratulation';
  expireAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export default Notification;
