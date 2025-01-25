export interface Event {
  id: string;
  type: string;
}

export interface AvailabilityUpdated extends Event {
  type: 'AVAILABILITY_UPDATED';
  payload: {
    from: Date;
    to: Date;
  };
}

export interface AppointmentCreated extends Event {
  type: 'APPOINTMENT_CREATED';
  payload: {
    from: Date;
    to: Date;
  };
}
