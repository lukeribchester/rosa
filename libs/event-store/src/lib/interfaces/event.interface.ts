export interface Event {
  id: number;
  type: 'AVAILABILITY_UPDATED' | 'APPOINTMENT_CREATED';
  payload: {
    from: number;
    to: number;
  };
}
